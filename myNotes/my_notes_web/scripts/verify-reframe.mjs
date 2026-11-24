import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {triangleCells,transformedCells,rowState,overlapCells,handshakeCells,handshakePairs,pairState,sumTo,handshakeCount,size,reframeInput,person,initialReframeState,reframeFigures} from '../src/lib/interactive/reframe-model.ts';
import {constructionMarkup,rowsMarkup,overlapMarkup,handshakeTable,handshakesMarkup,reframeFigure,reframeTitle} from '../src/lib/interactive/reframe-render.ts';
import {chapters} from '../src/lib/navigation.ts';
let rows=0,objects=0;
for(let n=1;n<=10;n++){
 const triangle=triangleCells(n);assert.equal(triangle.length,Array.from({length:n},(_,i)=>i+1).reduce((a,b)=>a+b,0));assert.equal(triangle.length,sumTo(n));
 for(const cell of triangle){assert(cell.r>=0&&cell.r<n&&cell.c>=0&&cell.c<=cell.r);assert.equal(cell.id,`${cell.r}-${cell.c}`);}
 for(let stage=0;stage<=3;stage++){
  const cells=transformedCells(n,stage);assert.equal(cells.length,(stage?2:1)*triangle.length);assert.equal(new Set(cells.map(c=>c.id)).size,cells.length);
  assert.deepEqual(cells.filter(c=>c.group==='original').map(({r,c})=>[r,c]),triangle.map(({r,c})=>[r,c]));
  if(stage){assert.deepEqual([...cells.map(c=>c.id)].sort(),transformedCells(n,1).map(c=>c.id).sort());for(const cell of cells.filter(c=>c.group==='copy')){const [r,c]=cell.id.slice(5).split('-').map(Number);assert.equal(cell.r,stage>=2?n-1-r:r);assert.equal(cell.c,(stage>=2?n-c:c)+(stage<3?n+3:0));}}
 }
 const combined=transformedCells(n,3),positions=new Set(combined.map(c=>`${c.r},${c.c}`));assert.equal(positions.size,n*(n+1));
 for(let r=0;r<n;r++)for(let c=0;c<=n;c++)assert(positions.has(`${r},${c}`),'Every rectangle position occupied once');
 for(let k=1;k<=n;k++){
  rows++;const s=rowState(n,k),row=combined.filter(c=>c.r===k-1);assert.equal(row.filter(c=>c.group==='original').length,k);assert.equal(row.filter(c=>c.group==='copy').length,n+1-k);assert.equal(row.length,n+1);assert.equal(s.original+s.copy,s.total);assert.equal(s.rectangle,2*s.triangle);
 }
 const multiplicities=new Map();for(const t of overlapCells(n)){const key=`${t.r},${t.c}`;multiplicities.set(key,(multiplicities.get(key)||0)+1);}
 assert.equal(multiplicities.size,n*n);assert.equal([...multiplicities.values()].filter(x=>x===2).length,n);assert.equal([...multiplicities.values()].reduce((a,b)=>a+b,0),n*(n+1));
 for(let i=0;i<n;i++)assert.equal(multiplicities.get(`${i},${i}`),2);
 const cells=handshakeCells(n),pairs=handshakePairs(n);assert.equal(cells.length,n*n);assert.equal(cells.filter(c=>c.kind==='diagonal').length,n);assert.equal(pairs.length,handshakeCount(n));
 const canonical=new Set();for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)canonical.add(`${i},${j}`);assert.deepEqual(new Set(pairs.map(p=>p.join(','))),canonical);
 for(let a=0;a<n;a++)for(let b=0;b<n;b++){
  const s=pairState(n,a,b),mirror=pairState(n,b,a);assert.equal(s.pairs,mirror.pairs);assert.equal(s.excluded,a===b);assert.equal(cells.filter(c=>c.r===a&&c.c===b).length,1);if(a!==b)assert.deepEqual(cells.find(c=>c.r===a&&c.c===b).pair,cells.find(c=>c.r===b&&c.c===a).pair);
 }
 assert.equal(pairState(n,null,null).selected,false);objects+=combined.length;
 for(const locale of ['en','de']){
  for(let stage=0;stage<4;stage++){const html=constructionMarkup(locale,n,stage);assert(!/katex-error|undefined|NaN/.test(html));assert.equal((html.match(/data-object=/g)||[]).length,(stage?2:1)*sumTo(n));assert.equal(html.includes('S_{'),stage===3,'Formula follows the completed construction');}
  for(let k=1;k<=n;k++)assert(!rowsMarkup(locale,n,k).includes('katex-error'));
  assert(!overlapMarkup(locale,n).includes('katex-error'));assert(!handshakesMarkup(locale,n).includes('katex-error'));
  assert.equal((handshakeTable(locale,n,0,0).match(/reframe-cell-selected/g)||[]).length,1);
  if(n>1)assert.equal((handshakeTable(locale,n,0,1).match(/reframe-cell-selected/g)||[]).length,2);
 }
}
let iterative=0;for(let n=0;n<=10000;n++){iterative+=n;assert.equal(sumTo(n),iterative);if(n)assert.equal(handshakeCount(n),iterative-n);}
assert.equal(sumTo(100),5050);assert.equal(sumTo(1000000),500000500000);assert.equal(handshakeCount(100),4950);
for(const bad of [0,-1,11,.5,NaN,Infinity,null])assert.throws(()=>size(bad));for(const bad of [-1,4,.5,NaN])assert.throws(()=>transformedCells(5,bad));for(const bad of [0,7,.5,NaN])assert.throws(()=>rowState(6,bad));for(const bad of [-1,1000001,.5,NaN])assert.throws(()=>sumTo(bad));assert.throws(()=>pairState(5,5,0));assert.throws(()=>handshakeCount(0));
for(const raw of ['',' ','0','11','1.5','NaN','Infinity'])assert.equal(reframeInput(raw),null);for(const raw of ['1','5','10'])assert.equal(reframeInput(raw),Number(raw));assert.equal(reframeInput('7',6),null);assert.equal(person('',5),null);assert.equal(person('5',5),null);assert.equal(person('4',5),4);
const first=initialReframeState('construction');first.n=10;assert.equal(initialReframeState('construction').n,5);assert.equal(initialReframeState('rows').n,6);assert.equal(initialReframeState('handshakes').a,null);assert.throws(()=>initialReframeState('other'));
for(const locale of ['en','de']){
 for(const kind of reframeFigures){const html=reframeFigure(locale,kind);assert(!/katex-error|undefined|NaN/.test(html),`${locale} ${kind}`);assert(!/\bid=/.test(html));assert(reframeTitle(locale,kind));}
 const source=readFileSync(`src/content/lessons/${locale}/reasoning/changing-representations.mdx`,'utf8');assert.equal((source.match(/<ReasoningFigure/g)||[]).length,19);assert.equal((source.match(/<Interactive kind="reframe"/g)||[]).length,3);assert.equal((source.match(/<Exercise>/g)||[]).length,1);assert(source.includes('reviewStatus: unreviewed'));assert(source.includes('chapter: reasoning-part-four'));assert(!/\/Users\/jean|references\/source|utm_source|images.openai.com|NETPOSITIV/.test(source));assert(source.includes('k+(n+1-k)=n+1'));assert(source.includes('n(n-1)'));assert(source.includes('\\frac{(k+1)(k+2)}{2}'));
}
assert.deepEqual(chapters.filter(c=>c.course==='reasoning').map(c=>c.groups.flatMap(g=>g.orders)),[[1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16],[17,18,19,20,21,22,23,24],[25,26,27]]);
console.log(`Verified exact copy/rotation/rectangle bijections for sizes 1–10 (${objects} objects), ${rows} arbitrary-row examples, all overlap multiplicities and handshake mirrors/diagonals, 10001 independent summation counts, bounds, 19 figures in EN/DE, delayed formula and Part IV starting at 25.`);
