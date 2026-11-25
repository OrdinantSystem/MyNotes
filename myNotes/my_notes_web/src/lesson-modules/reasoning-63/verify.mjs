import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {limits,validValue,normalize,oddSquare,consecutive,geometry,ringCounts,assessment,nextHint,stages,draftLimit} from './model.ts';
// Independent BigInt arithmetic checks; numerical enumeration checks the implementation,
// while the learner-facing proof supplies the universal justification.
let signed=0;
for(let n=-10001;n<=10001;n+=2){const v=oddSquare(n),N=BigInt(n);assert.equal(BigInt(v.square),N*N);assert.equal(BigInt(v.m),(N*N-1n)/8n);assert.equal(v.remainder,1);assert.equal(v.m,v.quotient);signed++;}
for(let k=-1000;k<=1000;k++){const v=consecutive(k);assert.equal(Math.abs(v.even%2),0);assert.equal(v.product,2*v.m);assert(Number.isInteger(v.m));assert.equal(v.next-v.k,1);}
for(let k=0;k<=6;k++){
 const g=geometry(k),ids=g.tiles.map(t=>t.id);assert.equal(ids.length,(2*k+1)**2);assert.equal(new Set(ids).size,ids.length);assert.equal(g.center.id,`${k}-${k}`);
 const partition=g.rectangles.flat();assert.equal(partition.length,4*k*(k+1));assert.equal(new Set(partition.map(t=>t.id)).size,partition.length);assert(!partition.some(t=>t.id===g.center.id));
 for(const rectangle of g.rectangles)assert.equal(rectangle.length,k*(k+1));
 for(let i=0;i<4;i++){const pairs=g.pairs[i];assert.equal(pairs.length,k*(k+1)/2);const paired=pairs.flatMap(p=>p.tiles);assert.deepEqual(new Set(paired.map(t=>t.id)),new Set(g.rectangles[i].map(t=>t.id)));for(const pair of pairs){const [a,b]=pair.tiles;assert(a&&b);assert.equal(Math.abs(a.r-b.r)+Math.abs(a.c-b.c),1);assert.equal(a.region,i);assert.equal(b.region,i);}}
 const grouped=g.groups.flat();assert.equal(grouped.length,8*g.m);assert.equal(new Set(grouped.map(t=>t.id)).size,grouped.length);assert.deepEqual(new Set(grouped.map(t=>t.id)),new Set(partition.map(t=>t.id)));for(const group of g.groups){assert.equal(group.length,8);for(let i=0;i<4;i++)assert.equal(group.filter(t=>t.region===i).length,2);}
 const rings=ringCounts(k);assert.equal(rings.reduce((a,b)=>a+b,0),g.n*g.n);for(let j=0;j<=k;j++)assert.equal(g.tiles.filter(t=>t.ring===j).length,j===0?1:8*j);
 // A concrete geometry check independent of the grouping algorithm.
 for(const tile of g.tiles){assert(tile.r>=0&&tile.r<g.n&&tile.c>=0&&tile.c<g.n);if(tile.region===0)assert(tile.r<k&&tile.c<=k);if(tile.region===1)assert(tile.r<=k&&tile.c>k);if(tile.region===2)assert(tile.r>k&&tile.c>=k);if(tile.region===3)assert(tile.r>=k&&tile.c<k);}
}
const residues=new Set();for(let n=-1000;n<=1000;n++){const r=Number((BigInt(n)*BigInt(n))%8n);residues.add(r);if(n%2)assert.equal(r,1);else assert([0,4].includes(r));if(n%4===0)assert.equal(r,0);if(Math.abs(n%4)===2)assert.equal(r,4);}assert.deepEqual([...residues].sort(),[0,1,4]);
for(const [p,b] of Object.entries(limits)){for(let n=b.min;n<=b.max;n+=b.step){assert.equal(validValue(p,n),n);assert.equal(normalize(p,n,n),n);}assert.equal(normalize(p,-999,b.initial),b.min);assert.equal(normalize(p,999,b.initial),b.max);assert.equal(normalize(p,NaN,b.initial),b.initial);assert.throws(()=>validValue(p,b.max+1));assert.throws(()=>validValue(p,NaN));}
assert.equal(normalize('explore',0,9),1);assert.equal(nextHint(0),1);assert.equal(nextHint(3),3);assert.throws(()=>nextHint(-1));assert.equal(draftLimit,12000);
for(let i=0;i<4;i++)assert.equal([0,1,2].filter(c=>assessment(i,c)).length,1);
for(const n of [0,2,NaN,Infinity,1000001,1.2])assert.throws(()=>oddSquare(n));for(const k of [-1,7,1.5,NaN])assert.throws(()=>geometry(k));assert.throws(()=>assessment(4,0));assert.throws(()=>assessment(0,3));assert.throws(()=>consecutive(Infinity));
if(!process.argv.includes('--model-only')){
 const {figureMarkup,numericMarkup,tilesMarkup,examMarkup}=await import('./render.ts');const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
 const good=html=>assert(!/undefined|NaN|Infinity|katex-error|\bid=/.test(html));
 for(const locale of ['en','de']){
  for(const figure of manifest.figures)good(figureMarkup(locale,figure));
  for(const [p,b] of Object.entries(limits))for(let v=b.min;v<=b.max;v+=b.step)for(const stage of stages)good(numericMarkup(locale,p,v,stage));
  for(let k=0;k<=6;k++)for(const stage of [...stages,'layers']){const html=tilesMarkup(locale,k,stage);good(html);assert.equal((html.match(/data-tile=/g)||[]).length,(2*k+1)**2);}
  for(let i=0;i<4;i++)for(let c=0;c<3;c++)good(examMarkup(locale,i,c));
  const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');for(const figure of manifest.figures)assert(source.includes(`figure="${figure}"`));for(const preset of manifest.presets)assert(source.includes(`preset="${preset}"`));assert(source.includes('reviewStatus: unreviewed'));assert(source.includes('n^2=4(8m+1)=8(4m)+4'));assert(source.includes('n^2=|n|^2'));assert(!/references\/source|\/Users\/|utm_source|images\.openai|Manim|Remotion/.test(source));
 }
 assert.throws(()=>figureMarkup('en','unknown'));assert.throws(()=>tilesMarkup('en',3,'unknown'));
}
console.log(`AoR 63: ${signed} signed odd squares, signed parity, all tile partitions/pairs/groups/rings k=0…6, exhaustive residues and boundaries passed.`);
