import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {originalHypotheses,observations,predictions,findings,investigation,compare,evidence,moveStage,lastStage,partition,tests,plantChoices,plantAnswer,relativeOdds,initialState} from './model.ts';
// Independent source table, in conveyor/display/authorization/mode order.
const expected={power:['stopped','off','unavailable','unavailable'],motor:['stopped','on','yes','run'],pause:['stopped','on','no','pause'],interlock:['stopped','on','no','run']};
for(const h of Object.keys(expected))assert.deepEqual(observations.slice(0,4).map(k=>predictions[h][k]),expected[h]);
const survivors=[['power','motor','pause'],['motor','pause'],['pause'],[],['interlock'],['interlock']];
for(let stage=0;stage<=lastStage;stage++){const s=investigation(stage);assert.deepEqual(s.survivors,survivors[stage]);assert.equal(s.observed.length,Math.min(stage+1,5));assert.equal(s.restored,stage===5);assert.equal(moveStage(stage,1),Math.min(5,stage+1));assert.equal(moveStage(stage,-1),Math.max(0,stage-1));}
assert.deepEqual(evidence(4),evidence(5));assert.equal(predictions.interlock.guard,'open');assert(!investigation(3).candidates.includes('interlock'));
let subsetChecks=0;
for(let mask=0;mask<16;mask++){const es=observations.slice(0,4).flatMap((key,i)=>mask&(1<<i)?[{key,value:findings[key]}]:[]);for(const h of Object.keys(expected)){subsetChecks++;const conflicts=observations.slice(0,4).filter((key,i)=>(mask&(1<<i))&&expected[h][i]!==findings[key]);assert.deepEqual(compare(h,es).conflicts,conflicts);assert.equal(compare(h,es).compatible,conflicts.length===0);for(let i=0;i<4;i++)if(!(mask&(1<<i))){const more=compare(h,[...es,{key:observations[i],value:findings[observations[i]]}]);if(!compare(h,es).compatible)assert.equal(more.compatible,false);}}}
// Test partition membership independently against the source prediction rows.
for(const t of tests){const groups=partition(t),flat=groups.flatMap(g=>g.hypotheses);assert.deepEqual([...flat].sort(),[...originalHypotheses].sort());for(const group of groups)for(const h of group.hypotheses)assert.equal(expected[h][tests.indexOf(t)],group.outcome);}
assert.deepEqual(partition('conveyor').map(g=>g.hypotheses.length),[3]);assert.deepEqual(partition('display').map(g=>g.hypotheses.length),[1,2]);assert.equal(partition('authorization').length,3);assert.equal(partition('mode').length,3);
let oddsChecks=0;for(let prior=1;prior<=9;prior++)for(let a=1;a<=9;a++)for(let b=1;b<=9;b++){oddsChecks++;const updated=relativeOdds(prior/10,a/10,b/10);assert(Math.abs(updated/(prior/10)-a/b)<1e-12);if(a===b)assert(Math.abs(updated-prior/10)<1e-12);if(a>b)assert(updated>prior/10);}
assert(relativeOdds(.001,.9,.1)<1); // A favorable likelihood need not outweigh prior odds.
for(const x of [0,-1,NaN,Infinity])assert.throws(()=>relativeOdds(x,.5,.5));assert.throws(()=>relativeOdds(1,0,0));assert.throws(()=>relativeOdds(1,1.1,.5));
for(const choice of plantChoices){const x=plantAnswer(choice);assert.equal(x.discriminatesWater,choice==='soil');assert.equal(x.diagnosisEstablished,false);}
for(const n of [-1,6,.5,NaN,Infinity])assert.throws(()=>investigation(n));assert.throws(()=>partition('other'));assert.throws(()=>plantAnswer('other'));assert.throws(()=>compare('other',[]));assert.throws(()=>moveStage(0,2));
const s=initialState();s.stage=5;s.test='mode';s.plant='soil';assert.deepEqual(initialState(),{stage:0,test:null,testRevealed:false,plant:null,plantRevealed:false});
if(!process.argv.includes('--model-only')){
 const {figureMarkup,investigationMarkup,matrix,testsMarkup,plantMarkup}=await import('./render.ts');
 const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
 for(const locale of ['en','de']){
  const good=html=>{assert(!/katex-error|undefined|NaN|Infinity/.test(html));assert(!/\bid=/.test(html));};
  for(const kind of manifest.figures)good(figureMarkup(locale,kind));
  for(let stage=0;stage<=5;stage++){const html=investigationMarkup(locale,stage);good(html);assert.equal((matrix(locale,stage).match(/scope="col"/g)||[]).length,stage>=4?5:4);if(stage===0)assert(!html.includes(locale==='de'?'Beobachtet: Betrieb':'Observed: Run'));}
  for(const t of [null,...tests])for(const revealed of [false,true])good(testsMarkup(locale,t,revealed));
  for(const choice of [null,...plantChoices])for(const revealed of [false,true])good(plantMarkup(locale,choice,revealed));
  assert(!plantMarkup(locale,'soil',false).includes(locale==='de'?'keine Diagnose':'not a diagnosis'));assert(plantMarkup(locale,'soil',true).includes(locale==='de'?'keine Diagnose':'not a diagnosis'));
  const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');assert(source.includes('reviewStatus: unreviewed'));for(const kind of manifest.figures)assert(source.includes(`figure="${kind}"`),`${locale}/${kind} unused`);for(const preset of manifest.presets)assert(source.includes(`preset="${preset}"`));assert(!/references\/source|\/Users\/|utm_source|Remotion|Manim|9\.7\/10/.test(source));
 }
}
console.log(`AoR 41: six cumulative investigation states, ${subsetChecks} independent evidence-subset comparisons, four test partitions, ${oddsChecks} relative-odds identities, all four plant choices, bounds and isolated defaults passed.${process.argv.includes('--model-only')?' Model-only staging.':' Thirteen EN/DE figures and every activity state render correctly.'}`);
