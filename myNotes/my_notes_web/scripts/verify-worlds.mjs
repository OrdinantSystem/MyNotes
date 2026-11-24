import assert from 'node:assert/strict';
import {worldText} from '../src/lib/reasoning/world-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
import {finiteSets} from '../src/lib/reasoning/examples.ts';
import {eightObjects,worldSets,worldSelection,worldClaims,counterWorld,worldAnswer,initialWorldState} from '../src/lib/interactive/world-model.ts';
import {operationsMarkup,counterWorldMarkup,worldAnswerMarkup} from '../src/lib/interactive/world-render.ts';
const expected={red:['a','c','e','g'],triangles:['a','b','e','h'],intersection:['a','e'],union:['a','b','c','e','g','h'],complement:['b','d','f','h']};
assert.equal(eightObjects.length,8);assert.equal(new Set(eightObjects.map(o=>o.id)).size,8);
assert.deepEqual(worldSets.U,['a','b','c','d','e','f','g','h']);assert.deepEqual(worldSets.S,['c','d','f','g']);
for(const [op,ids] of Object.entries(expected))assert.deepEqual(worldSelection(op),ids,op);
assert.equal(worldClaims(eightObjects).premise,false);assert.deepEqual(worldSets.R.filter(id=>!worldSets.T.includes(id)),['c','g']);
assert(finiteSets(worldSets.T,worldSets.S).disjoint);assert(worldSets.T.length&&worldSets.S.length);
assert.deepEqual(worldSets.U.filter(id=>!worldSelection('union').includes(id)),['d','f']);
// Independently exhaust every pair of subsets of the 8-object universe for De Morgan and complement relativity.
for(let a=0;a<256;a++)for(let b=0;b<256;b++){
 const A=worldSets.U.filter((_,i)=>a&(1<<i)),B=worldSets.U.filter((_,i)=>b&(1<<i));
 const union=finiteSets(A,B).union,notUnion=worldSets.U.filter(id=>!union.includes(id)),notA=worldSets.U.filter(id=>!A.includes(id)),notB=worldSets.U.filter(id=>!B.includes(id));
 assert.deepEqual(notUnion,finiteSets(notA,notB).intersection);
}
assert.deepEqual([...expected.complement,'i'],[...worldSets.U,'i'].filter(id=>!worldSets.R.includes(id)));
for(const include of [false,true]){const v=counterWorld(include);assert(v.premise);assert.equal(v.conclusion,!include);assert.deepEqual(v.counterexamples,include?['r']:[]);assert.equal(v.objects.length,include?4:3);}
// All combinations of the four color/shape categories, independently specified truth conditions.
const types=[{id:'rt',color:'red',sides:3},{id:'bt',color:'blue',sides:3},{id:'rs',color:'red',sides:4},{id:'bs',color:'blue',sides:4}];let countermodels=0;
for(let mask=0;mask<16;mask++){const v=worldClaims(types.filter((_,i)=>mask&(1<<i)));assert.equal(v.premise,!(mask&2));assert.equal(v.conclusion,!(mask&4));if(v.premise&&!v.conclusion)countermodels++;}assert.equal(countermodels,4);
for(let q=0;q<3;q++){assert.equal(worldAnswer(q,null),null);for(let a=0;a<(q===2?2:3);a++)assert.equal(worldAnswer(q,a),a===[1,0,1][q]);}
for(const locale of ['en','de']){
 const copy=worldText(locale);for(const text of [...copy.questions,...copy.options.flat()]){assert(!/[\x00-\x1f]/.test(text));const rendered=renderMathText(text);assert(!rendered.includes('katex-error'));}assert(copy.questions[0].includes('\\cap'));assert(copy.questions[2].includes('\\varnothing'));

 for(const [op,ids] of Object.entries(expected)){const html=operationsMarkup(locale,op);assert.equal((html.match(/data-world-member="true"/g)||[]).length,ids.length);assert.equal((html.match(/data-world-object=/g)||[]).length,8);for(const id of ids)assert(html.includes(`data-world-object="${id}" data-world-member="true"`));assert(!/undefined|NaN|katex-error/.test(html));assert(html.includes('katex-mathml'));}
 for(const include of [false,true]){const html=counterWorldMarkup(locale,include);assert(html.includes(`data-truth-value="${include?0:1}"`));assert(!html.includes('{object}'));assert.equal((html.match(/data-world-card=/g)||[]).length,include?4:3);}
 for(let q=0;q<3;q++){assert.equal(worldAnswerMarkup(locale,q,null),'');for(let a=0;a<(q===2?2:3);a++)assert(worldAnswerMarkup(locale,q,a).includes(a===[1,0,1][q]?'world-answer-correct':'world-answer-compare'));}
}
for(const v of [-1,3,NaN,1.5]){assert.throws(()=>worldAnswer(v,null));assert.throws(()=>worldAnswer(0,v));}assert.throws(()=>worldAnswer(2,2));assert.throws(()=>worldSelection('invalid'));assert.throws(()=>counterWorld(1));assert.throws(()=>worldClaims([types[0],types[0]]));
const a=initialWorldState(),b=initialWorldState();a.answers[0]=1;assert.deepEqual(b.answers,[null,null,null]);
console.log('Verified exact eight-object memberships, all 65,536 set pairs for De Morgan, complement relativity, all 16 color/shape worlds, the added red-square countermodel, all quiz choices and EN/DE rendering.');
