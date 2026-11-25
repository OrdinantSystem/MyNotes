import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {people,edges,degrees,incidences,auditRows,months,distribution,integer,tokenGroups,multiplicities,completeGraph} from './model.ts';
import {figureMarkup,copy,monthMarkup,regroupMarkup,distributionMarkup} from './render.ts';
const root=new URL('./',import.meta.url),manifest=JSON.parse(readFileSync(new URL('manifest.json',root),'utf8'));
assert.deepEqual(degrees,[3,2,2,2,1]);assert.equal(incidences.length,10);assert.equal(new Set(incidences.map(i=>i.id)).size,10);
for(const group of ['edge','person']){const rows=tokenGroups(group);assert.deepEqual(rows.flatMap(r=>r.tokens.map(i=>i.id)).sort(),incidences.map(i=>i.id).sort());}
assert.deepEqual(multiplicities().map(m=>m.count),[1,2,2,1,2,2]);assert.equal(Object.values(auditRows).flat().length,10);
for(let p=0;p<=13;p++){const s=months(p);assert.equal(s.counts.reduce((a,b)=>a+b,0),p);assert.equal(s.collision,p===13);assert.equal(Math.max(...s.counts),p===0?0:p===13?2:1);}
for(let n=0;n<=60;n++)for(let k=1;k<=12;k++){const s=distribution(n,k);assert.equal(s.counts.length,k);assert.equal(s.counts.reduce((a,b)=>a+b,0),n);assert.equal(Math.max(...s.counts),s.bound);assert(Math.max(...s.counts)-Math.min(...s.counts)<=1);assert(k*(s.bound-1)<n);}
// Exhaust every simple graph through six vertices. Count edges independently from a bit mask.
let graphs=0;for(let n=1;n<=6;n++){const all=completeGraph(n);assert.equal(all.length,n*(n-1)/2);for(let mask=0;mask<2**all.length;mask++){const ds=Array(n).fill(0);let edgeCount=0;for(let i=0;i<all.length;i++)if(mask&(1<<i)){edgeCount++;ds[all[i][0]]++;ds[all[i][1]]++;}assert.equal(ds.reduce((a,b)=>a+b,0),2*edgeCount);assert.equal(ds.filter(d=>d%2).length%2,0);assert(ds.every(d=>d<=n-1));graphs++;}}
for(const v of ['',' ','-1','61','1.5','NaN','Infinity','cat'])assert.equal(integer(v,0,60),null);assert.equal(integer('0',0,60),0);assert.equal(integer('60',0,60),60);assert.equal(integer('0',1,12),null);
for(const [n,k] of [[-1,2],[61,2],[2,0],[2,13],[1.5,2],[NaN,2]])assert.throws(()=>distribution(n,k));for(const p of [-1,14,.5,NaN])assert.throws(()=>months(p));assert.throws(()=>tokenGroups('other'));
for(const l of ['en','de']){for(const figure of manifest.figures){const html=figureMarkup(l,figure);assert(!/katex-error|undefined|NaN/.test(html),`${l}/${figure}`);assert(copy(l).titles[figure]);}
 for(const group of ['edge','person']){const html=regroupMarkup(l,group);assert.equal((html.match(/data-token=/g)||[]).length,10);for(const i of incidences)assert(html.includes(`data-token="${i.id}"`));}
 for(const placed of [0,12,13])assert(!/undefined|NaN/.test(monthMarkup(l,placed)));
 for(const [n,k] of [[0,12],[1,1],[13,12],[25,12],[60,1]])assert(distributionMarkup(l,n,k).includes(`data-bound="${Math.ceil(n/k)}"`));
 const text=readFileSync(new URL(`content/${l}/reasoning/proving-by-counting.mdx`,root),'utf8');assert.equal((text.match(/^## \d+\./gm)||[]).length,10);assert.equal((text.match(/<Exercise>/g)||[]).length,5);assert.equal((text.match(/<Interactive/g)||[]).length,3);assert(text.includes('reviewStatus: unreviewed'));assert(text.includes('I=\\{(v,e)'));assert(text.includes('\\boxed{\\sum_{v\\in V}\\deg(v)=2|E|}'));assert(!/\/Users\/jean|references\/source|utm_source|images.openai.com|00:00/.test(text));
}
console.log(`Verified ${graphs} simple graphs through six vertices, 732 balanced distributions, all month placements, ten conserved token identities, unequal multiplicities, input bounds and all bilingual counting figures.`);
