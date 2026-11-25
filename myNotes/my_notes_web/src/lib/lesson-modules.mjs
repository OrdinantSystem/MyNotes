/** Build-time registration. Browser controllers must not import this filesystem module. */
import {existsSync,readdirSync,readFileSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';

const slug=/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
export function validateModules(rows){
 const ids=new Set(),keys=new Set(),orders=new Set(),sources=new Set();
 for(const m of rows){
  if(!Number.isSafeInteger(m.order)||m.order<29||m.id!==`reasoning-${m.order}`||m.course!=='reasoning'||!slug.test(m.key)||!slug.test(m.chapter))throw new Error('Invalid lesson module identity');
  if(m.sourceId!==`reasoning-episode-${m.order}`||typeof m.sourceTitle!=='string'||!m.sourceTitle.trim()||typeof m.title!=='string'||!m.title.trim())throw new Error(`Invalid source/title: ${m.id}`);
  for(const [set,value] of [[ids,m.id],[keys,m.key],[orders,m.order],[sources,m.sourceId]]){if(set.has(value))throw new Error(`Duplicate lesson module identity: ${value}`);set.add(value);}
  for(const name of ['figures','presets'])if(!Array.isArray(m[name])||new Set(m[name]).size!==m[name].length||m[name].some(x=>typeof x!=='string'||!slug.test(x)))throw new Error(`Invalid ${name}: ${m.id}`);
  if(m.chapterDefinition){const d=m.chapterDefinition;if(d.course!=='reasoning'||d.id!==m.chapter||!d.title?.en||!d.title?.de||!d.description?.en||!d.description?.de)throw new Error(`Invalid chapter definition: ${m.id}`);}
 }
 return [...rows].sort((a,b)=>a.order-b.order);
}
export function readModules(root=resolve('src/lesson-modules')){
 if(!existsSync(root))return [];
 const rows=readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()&&!e.name.startsWith('.')).map(e=>{
  const dir=join(root,e.name),m=JSON.parse(readFileSync(join(dir,'manifest.json'),'utf8'));
  if(m.id!==e.name)throw new Error(`Module folder mismatch: ${e.name}`);
  for(const file of ['Figure.astro','Lab.astro','Thumbnail.astro','verify.mjs',`content/en/reasoning/${m.key}.mdx`,`content/de/reasoning/${m.key}.mdx`])if(!statSync(join(dir,file)).isFile())throw new Error(`Incomplete module ${m.id}: ${file}`);
  return m;
 });
 return validateModules(rows);
}
export const lessonModules=readModules();
export function moduleFor(id){const m=lessonModules.find(m=>m.id===id);if(!m)throw new Error(`Unregistered lesson module: ${id}`);return m;}
export const moduleThumbnail=id=>`module:${id}`;
export function moduleLessonFiles(locale){return lessonModules.map(m=>({name:`reasoning/${m.key}.mdx`,file:`src/lesson-modules/${m.id}/content/${locale}/reasoning/${m.key}.mdx`}));}
