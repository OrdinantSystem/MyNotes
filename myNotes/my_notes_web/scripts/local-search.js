// The exporter supplies the index in the same classic script so search needs no fetch.
const copy = document.documentElement.lang === 'de'
  ? { label: 'Notizen durchsuchen', empty: 'Keine Ergebnisse' }
  : { label: 'Search notes', empty: 'No results' };
const container = document.getElementById('search');
const input = document.createElement('input');
input.type = 'search';
input.placeholder = copy.label;
input.setAttribute('aria-label', copy.label);
const status = document.createElement('p');
status.setAttribute('role', 'status');
const results = document.createElement('ul');
container.append(input, status, results);

function normalize(text) {
  return text.toLocaleLowerCase(document.documentElement.lang).normalize('NFD').replace(/\p{M}/gu, '');
}

const index = entries.map(entry => ({ ...entry, titleKey: normalize(entry.title), textKey: normalize(entry.text) }));
function search() {
  const words = normalize(input.value).trim().split(/\s+/u).filter(Boolean);
  results.replaceChildren();
  status.textContent = '';
  if (!words.length) return;
  const matches = index.filter(entry => words.every(word => entry.titleKey.includes(word) || entry.textKey.includes(word)));
  matches.sort((a, b) => words.filter(word => b.titleKey.includes(word)).length
    - words.filter(word => a.titleKey.includes(word)).length);
  if (!matches.length) status.textContent = copy.empty;
  for (const entry of matches) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = entry.page;
    link.textContent = entry.title;
    item.append(link);
    results.append(item);
  }
}

input.value = new URLSearchParams(location.search).get('q') ?? '';
input.addEventListener('input', search);
search();
