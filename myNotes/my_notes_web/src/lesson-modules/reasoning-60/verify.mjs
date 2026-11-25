import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {counts,pairs,finitePairs,finiteSet,natural,index,witness,proofSteps,answers,completeProof} from './model.ts';
import {copy} from './copy.ts';
const root=fileURLToPath(new URL('.',import.meta.url));
for(const count of counts){const q=pairs(count);assert.equal(q.length,count);assert.equal(new Set(q.map(p=>`${p.m},${p.n}`)).size,count);for(const p of q){assert.equal(p.m%2,0);assert.equal(p.n%2,0);assert.equal(p.sum,p.m+p.n);assert.ok(p.even);}assert.ok(q.every(p=>p.m<=22&&p.n<=18));}
assert.equal(pairs(0).length,0);assert.deepEqual(pairs(120).at(-1),{m:22,n:18,sum:40,even:true});
assert.equal(finitePairs.length,finiteSet.length**2);assert.equal(new Set(finitePairs.map(p=>`${p.m},${p.n}`)).size,16);
for(const a of finiteSet)for(const b of finiteSet)assert.deepEqual(finitePairs.find(p=>p.m===a&&p.n===b),{m:a,n:b,sum:a+b});
for(const p of finitePairs)assert.equal(p.sum%2,0);
const productSuccesses=[];for(let a=0;a<=6;a++)for(let b=0;b<=6;b++){const s=witness(a,b);assert.equal(s.sum,2*a+2*b);assert.equal(s.k,a+b);assert.equal(s.double,2*(a+b));assert.ok(s.works);if(witness(a,b,true).works)productSuccesses.push([a,b]);}
assert.deepEqual(productSuccesses,[[0,0],[2,2]]);assert.equal(witness(2,3,true).sum,10);assert.equal(witness(2,3,true).double,12);
// Independent algebraic audit: 2a+2b has coefficients 2,2; 2ab has a nonzero mixed coefficient.
const samples=[[0,0],[1,0],[0,1],[1,1]];const values=samples.map(([a,b])=>2*a+2*b-2*a*b);assert.deepEqual(values,[0,2,2,2]);
for(const invalid of [-1,7,.5,NaN,Infinity])assert.throws(()=>natural(invalid),RangeError);for(const invalid of [-1,121,.5,NaN])assert.throws(()=>pairs(invalid),RangeError);
assert.equal(index(-1,5),0);assert.equal(index(6,5),4);assert.throws(()=>index(NaN,5));assert.equal(proofSteps.length,5);assert.ok(proofSteps[2].goal.includes('2 * (a + b)'));assert.deepEqual(answers,[1,0,2,0,1]);
const m=JSON.parse(await readFile(new URL('manifest.json',import.meta.url),'utf8'));
for(const l of ['en','de']){const c=copy(l),body=await readFile(new URL(`content/${l}/reasoning/${m.key}.mdx`,import.meta.url),'utf8');assert.equal(c.questions.length,5);assert.equal(c.options.length,5);for(const opts of c.options)assert.equal(opts.length,3);assert.equal(c.reasons.length,5);assert.equal(c.proofMeanings.length,5);for(const f of m.figures)assert.ok(body.includes(`figure="${f}"`));for(const p of m.presets)assert.ok(body.includes(`preset="${p}"`));assert.equal(body.match(/```lean\n([\s\S]*?)```/)[1],completeProof);assert.ok(body.includes('reviewStatus: unreviewed'));}
if(root.includes('/src/lesson-modules/')){const r=await import('./render.ts');for(const l of ['en','de']){for(const f of m.figures)assert.ok(!/undefined|NaN|katex-error/.test(r.figureMarkup(l,f)));for(let i=0;i<3;i++){const h=r.gridMarkup(l,i);assert.equal((h.match(/>✓<\/text>/g)||[]).length,counts[i]);}assert.equal((r.boundedMarkup(l,true).match(/ ✓<\/td>/g)||[]).length,16);for(let i=0;i<5;i++){assert.ok(r.proofMarkup(l,i).includes(copy(l).proofMeanings[i]));assert.ok(!r.challengeMarkup(l,i).includes('aor60-reference'));assert.ok(r.challengeMarkup(l,i,answers[i],true).includes(copy(l).matches));}assert.throws(()=>r.figureMarkup(l,'unknown'));assert.ok(r.witnessMarkup(l,2,3,true).includes(copy(l).incorrect));assert.ok(r.witnessMarkup(l,2,2,true).includes(copy(l).accidental));}}
console.log('reasoning-60: finite enumeration, ordered-pair completeness, numeric bounds, zero/product-witness boundaries, proof obligations, five challenge answers, complete Lean code parity and bilingual representations passed. Runtime Lean evidence is recorded separately.');
