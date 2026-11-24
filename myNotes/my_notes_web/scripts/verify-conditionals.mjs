import assert from 'node:assert/strict';
import {integerPredicates,conditionalChoice,conditionalRows,conditionalForms,admissionAllows} from '../src/lib/interactive/conditional-model.ts';
import {conditionalMarkup} from '../src/lib/interactive/conditional-render.ts';
// Independent expected truth vectors, ordered original/converse/inverse/contrapositive.
const expected={'true,true':[true,true,true,true],'true,false':[false,true,true,false],'false,true':[true,false,false,true],'false,false':[true,true,true,true]};
for(const row of conditionalRows){
 assert.deepEqual(conditionalForms.map(form=>row[form]),expected[`${row.p},${row.q}`]);
 assert.equal(row.implication,row.contrapositive);assert.equal(row.converse,row.inverse);
}
let integers=0;
for(let n=-200;n<=200;n++){
 const s=integerPredicates(n);
 assert.equal(s.p,Number.isInteger(n/4));assert.equal(s.q,Number.isInteger(n/2));
 assert(s.original&&s.contrapositive);assert.equal(s.converse,s.inverse);
 if(s.p){const k=n/4;assert(Number.isInteger(2*k));assert.equal(n,2*(2*k));}
 integers++;
}
assert.equal(integerPredicates(0).p,true);assert.equal(integerPredicates(-4).q,true);
assert.deepEqual(integerPredicates(6),{n:6,p:false,q:true,original:true,converse:false,inverse:false,contrapositive:true});
assert(integerPredicates(7).original);assert(!integerPredicates(Number.MAX_SAFE_INTEGER).q);
for(const n of [NaN,Infinity,1.5,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>integerPredicates(n));
for(const n of [0,-4,8,NaN,6.5])assert.throws(()=>conditionalChoice(n));
for(const n of [4,6,7])assert.equal(conditionalChoice(n),n);
let visitorCases=0;
for(const a of [false,true])for(const t of [false,true])for(const i of [false,true]){
 assert.equal(admissionAllows(a,t,i),!a||(t&&i));visitorCases++;
}
assert(admissionAllows(false,true,true));assert(admissionAllows(false,true,false));assert(!admissionAllows(true,true,false));assert(!admissionAllows(true,false,true));
for(const locale of ['en','de'])for(const n of [4,6,7]){
 const html=conditionalMarkup(locale,n);assert(html.includes(`n=${n}`));assert(!html.includes('chosenNumber'));assert(html.includes('katex-mathml'));
 assert.equal((html.match(/conditional-selected/g)||[]).length,1);assert(html.includes(`${n}</span>`));
 assert(!html.includes('undefined'));assert(!html.includes('NaN'));
}
console.log(`Verified all four truth assignments, both equivalence pairs, ${integers} signed integers including zero, direct-proof witnesses, eight admission combinations, bounded choices and EN/DE number rendering.`);
