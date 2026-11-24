import assert from 'node:assert/strict';
import {switchValues,switchRows,switchPresets,initialSwitchState,checkpointCorrect} from '../src/lib/interactive/switch-model.ts';
import {switchMarkup,switchAnswerMarkup} from '../src/lib/interactive/switch-render.ts';
const vectors={ordinary:[1,0,0,0],inclusive:[1,1,1,0],xor:[0,1,1,0],scope:[0,0,1,0],locked:[0,1,1,1],failure:[0,1,1,1],neither:[0,0,0,1],bothFail:[0,0,0,1],simplified:[1,1,0,0],factored:[1,1,0,0],tautology:[1,1,1,1],implication:[1,0,1,1],notOr:[1,0,1,1],alternate:[0,1,0,0]};
for(const [key,expected] of Object.entries(vectors))assert.deepEqual(switchRows.map(row=>Number(row[key])),expected,key);
assert.deepEqual(switchRows.map(({p,q})=>[p,q]),[[true,true],[true,false],[false,true],[false,false]]);
for(const p of [false,true])for(const q of [false,true])for(const r of [false,true]){
 const v=switchValues(p,q,r);assert.equal(v.override,r||(p&&q));
 assert.equal(v.simplified,p);assert.equal(v.factored,p);assert.equal(v.locked,v.failure);assert.equal(v.neither,v.bothFail);
 if(p)assert.notEqual(v.ordinary,v.alternate);else assert(!v.ordinary&&!v.alternate);
 for(const locale of ['en','de'])for(const preset of switchPresets){
  const html=switchMarkup(locale,preset,{...initialSwitchState(),p,q,r});assert(!/NaN|undefined|katex-error/.test(html));
  if(['access','override','routes','simplify'].includes(preset))assert(html.includes(`data-open="${preset==='access'?v.ordinary:preset==='override'?v.override:p}"`));
  if(preset==='demorgan')assert.equal((html.match(new RegExp(`data-truth-value="${Number(v.locked)}"`,'g'))||[]).length,2);
  if(preset!=='checkpoint')assert(html.includes('katex-mathml'));
 }
}
assert.equal(switchValues(true,false).scope,false);assert.equal(switchValues(true,false).locked,true);
for(let question=0;question<3;question++){
 assert.equal(checkpointCorrect(question,null),null);
 for(let answer=0;answer<3;answer++)for(const locale of ['en','de']){
  const expected=answer===[1,0,1][question];assert.equal(checkpointCorrect(question,answer),expected);
  const html=switchAnswerMarkup(locale,question,answer);assert(html.includes(expected?'switch-answer-correct':'switch-answer-explain'));assert(html.includes('katex-mathml')||question===1);
 }
}
assert.deepEqual(initialSwitchState().answers,[null,null,null]);const a=initialSwitchState(),b=initialSwitchState();a.answers[0]=1;assert.equal(b.answers[0],null);
for(const locale of ['en','de'])assert.equal(switchAnswerMarkup(locale,0,null),'');
for(const bad of [-1,3,NaN,1.5]){assert.throws(()=>checkpointCorrect(bad,null));assert.throws(()=>checkpointCorrect(0,bad));}
assert.throws(()=>switchValues(1,true));
console.log('Verified complete Boolean truth vectors, eight override combinations, both De Morgan laws, every proof stage, scope witness, all quiz answers, bounded state and EN/DE rendering.');
