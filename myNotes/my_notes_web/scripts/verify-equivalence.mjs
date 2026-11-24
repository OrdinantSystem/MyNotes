import assert from 'node:assert/strict';
import {remainder,related,remainderClasses,relationExample,neighborhoods,checkpointAnswer,initialEquivalenceState} from '../src/lib/interactive/equivalence-model.ts';
import {classesMarkup,chainMarkup,equivalenceAnswerMarkup} from '../src/lib/interactive/equivalence-render.ts';
import {equivalenceText} from '../src/lib/reasoning/equivalence-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
assert.deepEqual(remainderClasses(),[[-6,-3,0,3,6,9],[-5,-2,1,4,7,10],[-4,-1,2,5,8,11]]);
for(let n=-100;n<=100;n++)for(let m=1;m<=9;m++)assert.equal(remainder(n,m),n-m*Math.floor(n/m));
for(const a of [-Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])for(const b of [-Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,0,1]){
 const d=BigInt(a)-BigInt(b);assert.equal(related(a,b,'remainder'),d%3n===0n);assert.equal(related(a,b,'distance'),d>=-1n&&d<=1n);assert.equal(related(a,b,'even-sum'),(BigInt(a)+BigInt(b))%2n===0n);
}
// These finite checks test implementation; the lesson supplies the general proofs.
for(let a=-15;a<=15;a++)for(let b=-15;b<=15;b++){
 assert.equal(related(a,b,'remainder'),(a-b)%3===0);assert.equal(related(a,b,'distance'),Math.abs(a-b)<=1);assert.equal(related(a,b,'even-sum'),(a+b)%2===0);
 for(const rule of ['remainder','even-sum']){assert(related(a,a,rule));assert.equal(related(a,b,rule),related(b,a,rule));for(let c=-15;c<=15;c++)if(related(a,b,rule)&&related(b,c,rule))assert(related(a,c,rule));}
 const values=Array.from({length:31},(_,i)=>i-15),A=values.filter(n=>related(n,a,'remainder')),B=values.filter(n=>related(n,b,'remainder'));if(A.some(n=>B.includes(n)))assert.deepEqual(A,B);
}
assert.deepEqual(relationExample('remainder').pairs.map(p=>p.holds),[true,true,true]);assert.deepEqual(relationExample('distance').pairs.map(p=>p.holds),[true,true,false]);assert.deepEqual(neighborhoods().intersection,[1,2]);assert.notDeepEqual(neighborhoods().left,neighborhoods().right);
assert.equal(checkpointAnswer(null),null);for(let a=0;a<4;a++)assert.equal(checkpointAnswer(a),a===2);
for(const locale of ['en','de']){
 const c=equivalenceText(locale);for(const t of [c.question,c.inclusion,...c.options,...c.feedback]){assert(!/[\x00-\x1f]/.test(t));assert(!renderMathText(t).includes('katex-error'));}
 for(const n of [4,7,8]){const h=classesMarkup(locale,n);assert.equal((h.match(/data-active="true"/g)||[]).length,1);assert.equal((h.match(/data-selected="true"/g)||[]).length,1);assert(h.includes(c.selected(n,remainder(n))));}
 for(const rule of ['remainder','distance','question'])assert(!/NaN|undefined|katex-error/.test(chainMarkup(locale,rule)));
 assert.equal(equivalenceAnswerMarkup(locale,null),'');for(let a=0;a<4;a++){const h=equivalenceAnswerMarkup(locale,a);assert(h.includes(`data-correct="${a===2}"`));assert(!h.includes('katex-error'));}
}
for(const n of [NaN,Infinity,1.5,Number.MAX_SAFE_INTEGER+1]){assert.throws(()=>remainder(n));assert.throws(()=>related(n,1,'remainder'));}for(const m of [0,-1,1.5,NaN])assert.throws(()=>remainder(1,m));for(const a of [-1,4,NaN,1.5])assert.throws(()=>checkpointAnswer(a));assert.throws(()=>related(1,2,'wrong'));assert.throws(()=>relationExample('wrong'));assert.throws(()=>classesMarkup('en',10));
const a=initialEquivalenceState(),b=initialEquivalenceState();a.selected=8;a.answer=3;assert.equal(b.selected,4);assert.equal(b.answer,null);
console.log('Verified Euclidean remainders and negative/safe-integer boundaries, relation properties on −15…15, exact counterexample, partitions/neighborhoods, all quiz choices, localized rendering and independent defaults.');
