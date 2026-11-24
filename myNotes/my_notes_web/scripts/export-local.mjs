import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Script } from 'node:vm';
import { parse, serialize } from 'parse5';
import { rolldown } from 'rolldown';

const dist = 'dist';
const output = 'local-web';
const files = new Set((await readdir(dist, { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile())
  .map(entry => path.relative(dist, path.join(entry.parentPath, entry.name))));
const pages = [...files].filter(file => file.endsWith('.html'));
const searchPages = new Map([['search/index.html', 'en'], ['suche/index.html', 'de']]);
const indexes = { en: [], de: [] };
const scripts = new Map();

function relative(from, to) {
  return path.relative(path.dirname(from), to).split(path.sep).map(encodeURIComponent).join('/');
}

function localUrl(page, url) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const [, pathname, suffix] = url.match(/^\/([^?#]*)(.*)$/u);
  const file = decodeURIComponent(pathname);
  const target = files.has(file) ? file : path.posix.join(file, 'index.html');
  if (!files.has(target)) throw new Error(`Missing local URL ${url} in ${page}`);
  return relative(page, target) + suffix;
}

function* elements(node) {
  if (node.tagName) yield node;
  for (const child of node.childNodes ?? []) yield* elements(child);
}

function attr(node, name) {
  return node.attrs.find(attribute => attribute.name === name);
}

function searchText(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.tagName && (attr(node, 'data-pagefind-ignore') || ['script', 'style'].includes(node.tagName))) return '';
  return (node.childNodes ?? []).map(searchText).join(' ').replace(/\s+/gu, ' ').trim();
}

async function classicScript(src, inlineCode) {
  const key = src ?? inlineCode;
  if (!scripts.has(key)) {
    let code;
    if (src) {
      const bundle = await rolldown({ input: path.join(dist, src.slice(1)) });
      try {
        const { output: chunks } = await bundle.generate({ format: 'iife', codeSplitting: false });
        const [chunk] = chunks;
        if (chunks.length !== 1 || chunk.type !== 'chunk' || chunk.imports.length || chunk.dynamicImports.length) {
          throw new Error(`Could not make ${src} a standalone script`);
        }
        code = chunk.code;
      } finally {
        await bundle.close();
      }
    } else {
      code = `(() => {'use strict';\n${inlineCode}\n})();\n`;
    }
    const name = `_local/${createHash('sha256').update(code).digest('hex').slice(0, 24)}.js`;
    new Script(code, { filename: src ?? name });
    scripts.set(key, { name, code });
  }
  return scripts.get(key).name;
}

function remove(node) {
  const siblings = node.parentNode.childNodes;
  siblings.splice(siblings.indexOf(node), 1);
}

function rewriteRedirects(page, code) {
  return code
    .replace(/^(\s*const destinations = )([^\n]+);$/m, (_, declaration, json) => {
      const destinations = Object.fromEntries(Object.entries(JSON.parse(json))
        .map(([key, url]) => [key, localUrl(page, url)]));
      return declaration + JSON.stringify(destinations).replace(/</gu, '\\u003c') + ';';
    })
    .replace(/^(\s*const fallback = )("[^\n]*");$/m, (_, declaration, json) =>
      declaration + JSON.stringify(localUrl(page, JSON.parse(json))).replace(/</gu, '\\u003c') + ';');
}

async function rewritePage(page) {
  const document = parse(await readFile(path.join(dist, page), 'utf8'), { scriptingEnabled: false });
  const nodes = [...elements(document)];
  const locale = attr(nodes.find(node => node.tagName === 'html'), 'lang')?.value;
  const bodyText = nodes.filter(node => attr(node, 'data-pagefind-body')).map(searchText).join(' ').trim();
  if (bodyText && indexes[locale]) {
    const heading = nodes.find(node => attr(node, 'data-pagefind-meta')?.value === 'title')
      ?? nodes.find(node => node.tagName === 'h1');
    if (heading) indexes[locale].push({ page, title: searchText(heading), text: bodyText });
  }

  for (const node of nodes) {
    const src = attr(node, 'src');
    const href = attr(node, 'href');
    if ([src, href].some(attribute => attribute?.value.startsWith('/pagefind/'))) {
      remove(node);
      continue;
    }
    if (node.tagName === 'script' && attr(node, 'type')?.value === 'module') {
      const name = await classicScript(src?.value, node.childNodes[0]?.value);
      node.attrs = [{ name: 'defer', value: '' }, { name: 'src', value: relative(page, name) }];
      node.childNodes = [];
      continue;
    }
    if (node.tagName === 'script' && !src && !attr(node, 'type') && node.childNodes.length) {
      const content = node.childNodes[0];
      if (searchPages.has(page) && content.value.includes('new PagefindUI')) {
        remove(node);
        continue;
      }
      content.value = rewriteRedirects(page, content.value);
    }
    if (node.tagName === 'meta' && attr(node, 'http-equiv')?.value.toLowerCase() === 'refresh') {
      const content = attr(node, 'content');
      content.value = content.value.replace(/(url=)(.*)$/i, (_, prefix, url) => prefix + localUrl(page, url));
    }
    for (const attribute of [href, src].filter(Boolean)) {
      attribute.value = localUrl(page, attribute.value);
    }
  }
  return serialize(document);
}

if (!files.has('index.html') || !files.has('pagefind/pagefind-ui.js')) {
  throw new Error('Run npm run build with the default base path before exporting.');
}

const staging = await mkdtemp('.local-web-');
try {
  await cp(dist, staging, { recursive: true, filter: file => file !== path.join(dist, 'pagefind') });
  await mkdir(path.join(staging, '_local'));

  for (const page of pages) {
    await writeFile(path.join(staging, page), await rewritePage(page));
  }

  for (const file of files) {
    if (!file.startsWith('_astro/') || !file.endsWith('.css')) continue;
    const css = await readFile(path.join(dist, file), 'utf8');
    await writeFile(path.join(staging, file), css.replace(/url\((["']?)(\/[^)"']+)\1\)/g,
      (_, quote, url) => `url(${quote}${localUrl(file, url)}${quote})`));
  }

  for (const { name, code } of scripts.values()) await writeFile(path.join(staging, name), code);

  const searchScript = await readFile(new URL('./local-search.js', import.meta.url), 'utf8');
  for (const [page, locale] of searchPages) {
    const data = indexes[locale].map(entry => ({
      ...entry, page: relative(page, entry.page),
    }));
    const name = `_local/search-${locale}.js`;
    await writeFile(path.join(staging, name), `(() => {\nconst entries = ${JSON.stringify(data)};\n${searchScript}\n})();\n`);
    const html = await readFile(path.join(staging, page), 'utf8');
    await writeFile(path.join(staging, page), html.replace('</body>',
      `<script defer src="${relative(page, name)}"></script></body>`));
  }

  await rm(output, { recursive: true, force: true });
  await rename(staging, output);
  console.log(`Exported ${pages.length} pages to ${output}/. Open ${output}/index.html directly.`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
