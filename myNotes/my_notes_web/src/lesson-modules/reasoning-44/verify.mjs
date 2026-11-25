import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';
import {students,selfSelection,assign,composition,seeded,scores,attrition,adherence,protocol,originalScores,intervals} from './model.ts';
const root=fileURLToPath(new URL('.',import.meta.url));
assert.equal(students.length,60);assert.equal(new Set(students.map(s=>s.id)).size,60);
assert.deepEqual(composition(students),[20,20,20]);
assert.deepEqual(selfSelection().map(composition),[[20,10,0],[0,10,20]]);
const original=JSON.stringify(students),totals=[0,0,0];let uneven=0;
for(let seed=1;seed<=2000;seed++){
 const groups=assign(seeded(seed));
 assert.deepEqual(groups.map(g=>g.length),[30,30]);
 assert.deepEqual(groups.flat().map(s=>s.id).sort((a,b)=>a-b),Array.from({length:60},(_,i)=>i));
 for(const s of groups.flat())assert.equal(s.level,students[s.id].level);
 const counts=groups.map(composition);
 for(let j=0;j<3;j++){assert.equal(counts[0][j]+counts[1][j],20);totals[j]+=counts[0][j];}
 if(counts[0].some(n=>Math.abs(n-10)>=4))uneven++;
}
assert.equal(JSON.stringify(students),original);
for(const n of totals)assert.ok(Math.abs(n/2000-10)<.5,'Expected composition should approach 10, not a forced balance');
assert.ok(uneven>0,'Do not discard uneven valid random assignments');
for(const invalid of [-.1,1,NaN,Infinity])assert.throws(()=>assign(()=>invalid),RangeError);
assert.equal(assign(()=>0).flat().length,60);assert.equal(assign(()=>.999999).flat().length,60);
assert.equal(attrition(false).mean,70);assert.equal(attrition(true).mean,82.5);assert.equal(attrition(true).observed.length,6);assert.equal(attrition(true).missing,4);assert.deepEqual(attrition(true).observed,scores.slice(4));assert.ok(attrition(true).mean>attrition(false).mean);assert.deepEqual(scores,[40,48,55,62,70,75,80,85,90,95]);
for(const n of [0,5,50]){const a=adherence(n);assert.deepEqual(a.assigned,[50,50]);assert.equal(a.received.reduce((a,b)=>a+b),100);assert.equal(a.followed+a.switchers,50);}
assert.deepEqual(adherence(5).received,[55,45]);for(const n of [-1,51,.5,NaN])assert.throws(()=>adherence(n),RangeError);
for(const time of [false,true])for(const support of [false,true]){const p=protocol({time,support});assert.equal(p.isolatesMethod,time&&support);assert.deepEqual(originalScores,[68,84]);}
assert.equal(originalScores[1]-originalScores[0],16);assert.equal(intervals[0].estimate,intervals[1].estimate);assert.ok(intervals[0].low<0&&intervals[0].high>0);assert.ok(intervals[1].low>0);assert.ok(intervals[0].high-intervals[0].low>intervals[1].high-intervals[1].low);
const manifest=JSON.parse(await readFile(new URL('manifest.json',import.meta.url),'utf8'));
const {copy}=await import('./copy.ts');
for(const l of ['en','de']){
 const body=await readFile(new URL(`content/${l}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
 for(const figure of manifest.figures)assert.ok(body.includes(`figure="${figure}"`));
 for(const preset of manifest.presets)assert.ok(body.includes(`preset="${preset}"`));
 assert.equal(copy(l).flaws.length,6);assert.equal(copy(l).answers.length,6);assert.equal(copy(l).safeguards.length,7);
}
// Rendering has no active-only imports and can be checked while staged.
const {figureMarkup,assignmentMarkup,protocolMarkup,adherenceMarkup,missingMarkup,workshopMarkup,esc}=await import('./render.ts');
assert.equal(esc('<script>"&'), '&lt;script&gt;&quot;&amp;');
for(const l of ['en','de']){
 for(const f of manifest.figures){const html=figureMarkup(l,f,`test-${l}-${f}`);assert.ok(html.length>100);assert.ok(!/NaN|undefined|Infinity/.test(html));}
 const selection=assignmentMarkup(l);assert.equal((selection.match(/<i class=/g)||[]).length,60);
 assert.ok(missingMarkup(l,true,'one').includes(l==='de'?'82,5':'82.5'));
 assert.ok(!protocolMarkup(l,{time:true,support:true}).includes('60 '));
 assert.ok(adherenceMarkup(l,5).includes('55'));
 const workshop=workshopMarkup(l,'test');assert.equal((workshop.match(/<details /g)||[]).length,6);assert.ok(!workshop.includes('<details open'));
 const one=missingMarkup(l,false,'one'),two=missingMarkup(l,false,'two');assert.ok(one.includes('one-arrow'));assert.ok(two.includes('two-arrow'));assert.ok(!two.includes('one-arrow'));
}
console.log(`reasoning-44: student conservation, random assignment without forced balance (${uneven}/2000 uneven), attrition, adherence, protocol scope, intervals, bilingual rendering and source coverage passed.`);
