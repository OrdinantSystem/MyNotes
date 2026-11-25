import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {deliveries,selection,ratio,population,visibleEmployees,integer,stages,choices,courseResult} from './model.ts';
assert.equal(deliveries.length,100);assert.equal(new Set(deliveries.map(d=>d.id)).size,100);
const published=selection(false),full=selection(true);assert.equal(published.length,10);assert.equal(published.filter(d=>d.failed).length,8);assert.equal(full.filter(d=>d.failed).length,10);for(const d of published)assert(full.includes(d));
let frequencies=0;for(let n=1;n<=1000;n++)for(let f=0;f<=n;f++){const s=ratio(f,n);assert.equal(s.successes+f,n);assert(s.rate>=0&&s.rate<=1);assert(Math.abs(s.rate*n-f)<1e-10);frequencies++;}
assert.equal(ratio(20,1000).rate,.02);assert.equal(ratio(5,20).rate,.25);
let preceding=-1;for(let r=0;r<=100;r+=4){const s=population(r);assert.equal(s.employees.length,100);assert.equal(new Set(s.employees.map(e=>e.id)).size,100);assert.equal(s.employees.filter(e=>e.group==='repair').length,r);
 const repairMatches=s.employees.filter(e=>e.group==='repair'&&e.matches),assemblyMatches=s.employees.filter(e=>e.group==='assembly'&&e.matches);
 assert.equal(repairMatches.length,r*3/4);assert.equal(assemblyMatches.length,(100-r)/4);assert.equal(s.totalMatches,repairMatches.length+assemblyMatches.length);assert.equal(s.posterior,repairMatches.length/s.totalMatches);assert(s.posterior>preceding);preceding=s.posterior;
 assert.equal(s.likelihoodRepair,r===0?null:.75);assert.equal(s.likelihoodAssembly,r===100?null:.25);
 for(const stage of stages){const rows=visibleEmployees(r,stage);assert.equal(rows.length,stage==='filtered'?s.totalMatches:100);for(const row of rows)assert(s.employees.some(e=>e.id===row.id&&e.group===row.group&&e.matches===row.matches));if(stage==='filtered')assert(rows.every(e=>e.matches));}
}
const start=population(20);assert.equal(start.matchingRepair,15);assert.equal(start.matchingAssembly,20);assert.equal(start.totalMatches,35);assert.equal(start.posterior,3/7);assert.equal(population(100).posterior,1);assert.equal(population(0).posterior,0);assert.equal(population(24).posterior<.5,true);assert.equal(population(28).posterior>.5,true);
for(const v of ['', ' ', '-1','1.5','Infinity','NaN','1001','1e2'])assert.equal(integer(v,0,1000),null);assert.equal(integer('0',0,1000),0);assert.equal(integer('20',0,100,4),20);assert.equal(integer('21',0,100,4),null);
for(const args of [[-1,100],[101,100],[0,0],[1,1001],[.5,100],[NaN,100]])assert.throws(()=>ratio(...args));for(const r of [-4,104,1,22,NaN])assert.throws(()=>population(r));assert.throws(()=>visibleEmployees(20,'other'));assert.throws(()=>courseResult('other',true));
for(const choice of choices)for(const revealed of [false,true])assert.equal(courseResult(choice,revealed).justified,choice==='insufficient');
// Staged models can run before activation; shared rendering imports resolve at the active location.
const active=new URL('../../lib/interactive/plane.ts',import.meta.url);
if(existsSync(fileURLToPath(active))){const {figureMarkup,deliveryMarkup,baseMarkup,percent,practiceMarkup}=await import('./render.ts');const manifest=JSON.parse(readFileSync(new URL('manifest.json',import.meta.url),'utf8'));
 for(const l of ['en','de']){
  for(const figure of manifest.figures){const html=figureMarkup(l,figure);assert(!/katex-error|undefined|NaN/.test(html),`${l}/${figure}`);}
  for(const full of [false,true]){const html=deliveryMarkup(l,full);assert.equal((html.match(/data-delivery-id=/g)||[]).length,full?100:10);for(const d of published)assert(html.includes(`data-delivery-id="${d.id}"`));}
  for(const r of [0,20,100])for(const stage of stages){const html=baseMarkup(l,r,stage);assert(!/NaN|>undefined<|="undefined"/.test(html));assert.equal((html.match(/data-employee-id=/g)||[]).length,stage==='filtered'?population(r).totalMatches:100);if(r===20&&stage==='filtered')assert(html.includes(l==='en'?'R: Repair (15); A: Assembly (20)':'R: Reparatur (15); A: Montage (20)'));}
  for(const choice of choices)for(const revealed of [false,true])assert(!/undefined|NaN/.test(practiceMarkup(l,choice,revealed)));
  assert(percent(l,3/7).includes(l==='de'?'42,9':'42.9'));
  const prominent=figureMarkup(l,'prominence');const memoryIds=[...prominent.matchAll(/data-memory-id="([^"]+)"/g)].map(m=>m[1]);assert.equal(memoryIds.length,40);assert.deepEqual(memoryIds.slice(0,20),memoryIds.slice(20));assert.equal(new Set(memoryIds).size,20);
  const text=readFileSync(new URL(`content/${l}/reasoning/memorable-examples-and-judgment.mdx`,import.meta.url),'utf8');assert.equal((text.match(/^## \d+\./gm)||[]).length,10);assert.equal((text.match(/<Interactive/g)||[]).length,4);assert.equal((text.match(/<Exercise>/g)||[]).length,1);assert(text.includes('reviewStatus: unreviewed'));assert(text.includes('P(M\\mid R)=\\frac{15}{20}'));assert(text.includes('P(R\\mid M)=\\frac{15}{35}'));assert(!/\/Users\/jean|references\/source|utm_source|images.openai.com|00:00/.test(text));
 }
}
console.log(`Verified ${frequencies} valid observed-frequency states, 26 integral employee populations in all three views, conserved selected-event/employee identities, conditional denominators, selection rates, bounds and all practice choices.`);
