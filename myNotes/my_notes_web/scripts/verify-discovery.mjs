import assert from 'node:assert/strict';
import {evenOddWitness,evenOddSelection,evenChoices,oddChoices,workspaceStep,advanceWorkspace,openingAnswer,initialDiscoveryState,evenConsequences,nextInteger} from '../src/lib/interactive/discovery-model.ts';
import {parityDiscoveryMarkup,workspaceMarkup,openingMoveFeedback,discoveryTex,branchClaim,discoveryMath} from '../src/lib/interactive/discovery-render.ts';
import {discoveryText} from '../src/lib/reasoning/discovery-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
for(let a=-50;a<=50;a++)for(let b=-50;b<=50;b++){
 const v=evenOddWitness(a,b);assert.equal(v.e,2*a);assert.equal(v.o,2*b+1);assert.equal(v.sum,v.e+v.o);assert.equal(v.sum,2*v.k+1);assert.equal(v.k,a+b);assert.equal(Math.abs(v.sum%2),1);
}
for(let r=-100;r<=100;r++){const v=evenConsequences(r);assert.equal(v.n,2*r);assert.equal(v.square,2*v.squareWitness);assert.equal(v.next,2*v.nextWitness);assert(v.square%2===0&&v.next%2===0);assert(nextInteger(r)>r);}
assert.equal(nextInteger(-2),-1);assert.equal(nextInteger(100),101);assert(1%2!==0);assert.deepEqual([evenOddWitness(-3,2).e,evenOddWitness(-3,2).o,evenOddWitness(-3,2).sum],[-6,5,-1]);
for(let n=0;n<5;n++){assert.equal(workspaceStep(n).established,n===4);assert.equal(advanceWorkspace(n,'back'),Math.max(0,n-1));assert.equal(advanceWorkspace(n,'next'),n===4?0:n+1);assert.equal(advanceWorkspace(n,'reset'),0);}
for(let q=0;q<4;q++){assert.equal(openingAnswer(q,null),null);for(let a=0;a<3;a++)assert.equal(openingAnswer(q,a),a===[1,1,0,2][q]);}
function copyStrings(v){if(typeof v==='string')return [v];if(v&&typeof v==='object')return Object.values(v).flatMap(copyStrings);return [];}
for(const locale of ['en','de']){
 const c=discoveryText(locale);for(const text of copyStrings(c)){assert(!/[\x00-\x1f]/.test(text));assert(!renderMathText(text).includes('katex-error'));}
 for(const e of evenChoices)for(const o of oddChoices){const v=evenOddSelection(e,o),html=parityDiscoveryMarkup(locale,e,o);assert.equal((html.match(/class="discovery-pair discovery-/g)||[]).length,2*v.k);assert.equal((html.match(/class="discovery-leftover"/g)||[]).length,2);assert(html.includes(c.parityReadout(e,o,e+o,(e+o-1)/2)));assert(!/undefined|NaN|katex-error/.test(html));}
 for(let n=0;n<5;n++){const html=workspaceMarkup(locale,n);assert(html.includes(`data-goal-established="${n===4}"`));assert.equal(html.includes('class="discovery-established"'),n===4);assert(!/katex-error|undefined|NaN/.test(html));}
 for(const tex of [...Object.values(discoveryTex).flat(),branchClaim(locale)])assert(!discoveryMath(tex,locale).includes('katex-error'));
 for(let q=0;q<4;q++){assert.equal(openingMoveFeedback(locale,q,null),'');for(let a=0;a<3;a++)assert(openingMoveFeedback(locale,q,a).includes(`data-opening-correct="${a===[1,1,0,2][q]}"`));}
}
assert(discoveryTex.target.includes('\\exists'));assert(branchClaim('en').includes('\\forall'));assert(branchClaim('de').includes('Gerade'));
for(const n of [-1,5,NaN,1.5])assert.throws(()=>workspaceStep(n));for(const n of [Infinity,NaN,1.5,Number.MAX_SAFE_INTEGER])assert.throws(()=>evenOddWitness(n,0));assert.throws(()=>evenOddSelection(0,5));assert.throws(()=>evenOddSelection(4,2));assert.throws(()=>nextInteger(Number.MAX_SAFE_INTEGER));assert.throws(()=>evenConsequences(Number.MAX_SAFE_INTEGER));assert.throws(()=>advanceWorkspace(0,'wrong'));assert.throws(()=>openingAnswer(4,0));assert.throws(()=>openingAnswer(0,3));
const a=initialDiscoveryState(),b=initialDiscoveryState();a.answers[0]=2;a.step=4;assert.deepEqual(b.answers,[null,null,null,null]);assert.equal(b.step,0);
console.log('Verified 10,201 signed even/odd witness pairs, all 16 illustrated selections in EN/DE, 201 branching witnesses and successor choices, all workspace states/navigation, every practice choice, restricted math rendering, invalid bounds and independent defaults.');
