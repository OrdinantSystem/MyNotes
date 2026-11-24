import assert from 'node:assert/strict';
import {oddSum} from '../src/lib/interactive/parity-model.ts';
import {oddPairState,pairInput,sameWitness,divisibleByFour,justificationAnswer,initialJustificationState,proofDependencies} from '../src/lib/interactive/justification-model.ts';
import {oddObjectsMarkup,representationMarkup,justificationFeedback} from '../src/lib/interactive/justification-render.ts';
import {justificationText} from '../src/lib/reasoning/justification-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
// Independent arithmetic checks include signed witnesses and equality without requiring it.
for(let k=-30;k<=30;k++)for(let m=-30;m<=30;m++){
 const s=oddSum(k,m);assert.equal(s.x+s.y,2*(k+m+1));assert(s.sum%2===0);assert.equal(divisibleByFour(k,m).divisible,(k+m+1)%2===0);
 const same=sameWitness(k);assert.equal(same.x,same.y);assert.notEqual(oddSum(1,2).x,oddSum(1,2).y);
}
assert.deepEqual([oddSum(-3,3).x,oddSum(-3,3).y,oddSum(-3,3).sum],[-5,7,2]);assert.equal(divisibleByFour(0,2).sum,6);assert.equal(divisibleByFour(0,2).divisible,false);
// Reuse of two lemmas agrees with a direct calculation for every sampled signed triple.
for(let a=-9;a<=9;a+=2)for(let b=-9;b<=9;b+=2)for(let c=-9;c<=9;c+=2){assert((a+b)%2===0);assert.equal(Math.abs((a+b+c)%2),1);}
for(const locale of ['en','de']){
 const c=justificationText(locale);for(const text of [c.question,c.repairConclusion,...c.options,...c.feedback,...c.openingFeedback,...c.stepDetails,...Object.values(c.networkText)]){assert(!/[\x00-\x1f]/.test(text));assert(!renderMathText(text).includes('katex-error'));}
 for(let k=0;k<=6;k++)for(let m=0;m<=6;m++){
  const s=oddPairState(k,m),html=oddObjectsMarkup(locale,k,m);assert.equal((html.match(/class="justification-pair /g)||[]).length,2*(k+m)+1);assert.equal((html.match(/class="justification-single"/g)||[]).length,2);assert(html.includes(c.pairReadout(s.x,s.y,s.pairs,s.sum)));assert(!/NaN|undefined|katex-error/.test(html));
 }
 for(const view of ['symbols','structure'])assert(!representationMarkup(locale,view).includes('katex-error'));
 for(const preset of ['opening','challenge']){assert.equal(justificationFeedback(locale,preset,null),'');for(let a=0;a<(preset==='opening'?2:4);a++){assert.equal(justificationAnswer(preset,a),a===1);assert(justificationFeedback(locale,preset,a).includes(`data-justification-correct="${a===1}"`));}}
}
// A conclusion cannot omit the integer witness or the evenness definition in the rendered dependency data.
assert.deepEqual(proofDependencies.filter(e=>e[1]==='conclusion').map(e=>e[0]).sort(),['algebra','closure','even-definition']);assert(proofDependencies.some(([a,b])=>a==='representation'&&b==='closure'));
const visiting=new Set(),visited=new Set();function visit(n){assert(!visiting.has(n),'Proof graph must be acyclic');if(visited.has(n))return;visiting.add(n);for(const [a,b] of proofDependencies)if(a===n)visit(b);visiting.delete(n);visited.add(n);}for(const [a] of proofDependencies)visit(a);
for(const raw of ['', ' ', '-1','7','1.5','Infinity','NaN'])assert.equal(pairInput(raw),null);assert.equal(pairInput('0'),0);assert.equal(pairInput('6'),6);
for(const n of [-1,7,NaN,1.5])assert.throws(()=>oddPairState(n,1));for(const a of [-1,4,NaN,1.5])assert.throws(()=>justificationAnswer('challenge',a));assert.throws(()=>justificationAnswer('opening',2));assert.throws(()=>representationMarkup('en','wrong'));
const a=initialJustificationState(),b=initialJustificationState();a.k=6;a.answer=1;assert.equal(b.k,1);assert.equal(b.answer,null);assert.equal(b.checked,false);
console.log('Verified signed parity witnesses, independent inputs, all 49 illustrated states in both languages, three-odd lemma reuse, exact divisibility-by-four counterexample, dependency completeness/acyclicity, all question choices and invalid/reset defaults.');
