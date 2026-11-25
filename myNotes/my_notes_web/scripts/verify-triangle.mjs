import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {triangleState,assignPiece,sideRequirement,cornerCompletion,initialTriangleState,firstAttempt,balancedAttempt,solvedAttempt,sideSlots,incidence,strategyChoice,triangleFigures} from '../src/lib/interactive/triangle-model.ts';
import {triangleFigure,triangleTitle,triangleMarkup,sideMarkup,challengeFeedback,challengeProof} from '../src/lib/interactive/triangle-render.ts';
import {triangleText} from '../src/lib/reasoning/triangle-copy.ts';
import {chapters} from '../src/lib/navigation.ts';
function* permutations(xs){if(!xs.length){yield [];return;}for(let i=0;i<xs.length;i++)for(const rest of permutations([...xs.slice(0,i),...xs.slice(i+1)]))yield [xs[i],...rest];}
const all=[...permutations([1,2,3,4,5,6])];assert.equal(all.length,720);const counts={};
assert.deepEqual(incidence,[2,2,2,1,1,1]);for(let i=0;i<6;i++)assert.equal(sideSlots.filter(s=>s.includes(i)).length,incidence[i]);
for(const v of all){
 const s=triangleState(v);const [a,b,c,x,y,z]=v,expected=[a+x+b,a+y+c,b+z+c];assert.deepEqual(s.sums,expected);assert.equal(s.total,21);assert.equal(expected.reduce((sum,x)=>sum+x,0),21+a+b+c);assert(s.unique&&s.complete);
 if(expected[0]===expected[1]&&expected[1]===expected[2]){counts[expected[0]]=(counts[expected[0]]||0)+1;assert.equal(3*expected[0],21+a+b+c);}
 assert.equal(s.solved,expected.every(n=>n===10));assert.equal(triangleState(v,8).solved,false);
 for(let i=0;i<6;i++)for(let n=1;n<=6;n++){const moved=assignPiece(v,i,n);assert.equal(moved[i],n);assert.deepEqual([...moved].sort(),[1,2,3,4,5,6]);assert.deepEqual(v,s.values);}
}
assert.deepEqual(counts,{9:6,10:6,11:6,12:6});
assert.deepEqual(triangleState(firstAttempt).sums,[7,9,11]);assert.deepEqual(triangleState(balancedAttempt).sums,[9,9,9]);assert.equal(triangleState(balancedAttempt).solved,false);assert.equal(triangleState(balancedAttempt).equal,true);assert(triangleState(solvedAttempt).solved);
const blank=initialTriangleState();assert.equal(triangleState(blank.values).complete,false);assert.deepEqual(triangleState(blank.values).sums,[null,null,null]);let moved=assignPiece(blank.values,0,1);moved=assignPiece(moved,3,1);assert.equal(moved[0],null);assert.equal(moved[3],1);moved=assignPiece(moved,3,null);assert.deepEqual(moved,blank.values);assert.equal(initialTriangleState().values[0],null);
for(let mask=0;mask<64;mask++){const p=firstAttempt.map((v,i)=>mask&(1<<i)?v:null),s=triangleState(p);assert(s.unique);for(let i=0;i<3;i++)assert.equal(s.sums[i]===null,sideSlots[i].some(j=>p[j]===null));for(let i=0;i<6;i++){const cleared=assignPiece(p,i,null);assert.equal(cleared[i],null);assert(triangleState(cleared).unique);}}
for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(a!==b){const s=sideRequirement(a,b);assert.equal(a+s.middle+b,10);assert.equal(s.available,[1,2,3,4,5,6].filter(n=>n!==a&&n!==b).includes(s.middle));for(let c=1;c<=6;c++)if(c!==a&&c!==b){const completed=cornerCompletion(a,b,c);const possible=all.some(v=>v[0]===a&&v[1]===b&&v[2]===c&&triangleState(v).solved);assert.equal(completed.valid,possible);if(completed.valid)assert(completed.necessary);}}
assert.equal(sideRequirement(1,2).middle,7);assert.equal(sideRequirement(1,2).available,false);assert.equal(sideRequirement(2,4).available,false);assert.equal(sideRequirement(1,4).available,true);
assert.equal(cornerCompletion(2,3,4).necessary,true);assert.equal(cornerCompletion(2,3,4).valid,false);assert.equal(triangleState(cornerCompletion(2,3,4).values).solved,false);assert.equal(cornerCompletion(1,3,5).valid,true);
assert.equal(3*8-21,3);const tripleSums=all.map(v=>v[0]+v[1]+v[2]);assert.equal(Math.min(...tripleSums),6);assert.equal(Math.max(...tripleSums),15);
for(const args of [[1,1],[0,2],[null,2],[1,7],[1,NaN]])assert.throws(()=>sideRequirement(...args));for(const values of [[1,2],[1,2,3,4,5,7],[1,2,3,4,5,NaN]])assert.throws(()=>triangleState(values));for(const i of [-1,6,.5])assert.throws(()=>assignPiece(blank.values,i,1));assert.throws(()=>assignPiece(blank.values,0,7));assert.throws(()=>assignPiece([1,1,null,null,null,null],0,2));for(const n of [0,19,NaN])assert.throws(()=>triangleState(firstAttempt,n));
assert.equal(strategyChoice(null),null);for(let i=0;i<3;i++)assert.equal(strategyChoice(i),i);assert.throws(()=>strategyChoice(3));
for(const locale of ['en','de']){
 const c=triangleText(locale);assert.equal(c.figureTitles.length,20);
 for(const kind of triangleFigures){assert(triangleTitle(locale,kind));const html=triangleFigure(locale,kind);assert(!/katex-error|>undefined<|NaN|[\x00-\x08]/.test(html),`${locale} ${kind}`);assert(!/\bid=/.test(html));}
 for(let b=2;b<=6;b++)assert(!sideMarkup(locale,b).includes('katex-error'));
 assert(challengeFeedback(locale,null).includes(c.choose));for(let i=0;i<3;i++)assert(challengeFeedback(locale,i).includes(c.feedback[i]));assert(!challengeProof(locale).includes('katex-error'));
 assert(triangleMarkup(locale,blank.values).includes(c.partial));assert(triangleMarkup(locale,balancedAttempt).includes(c.equalWrong));assert(triangleMarkup(locale,solvedAttempt).includes(c.solved));
 const source=readFileSync(`src/content/lessons/${locale}/reasoning/making-progress-when-stuck.mdx`,'utf8');assert(source.includes('chapter: reasoning-part-four'));assert(source.includes('reviewStatus: unreviewed'));assert.equal((source.match(/<ReasoningFigure/g)||[]).length,19);assert.equal((source.match(/<Interactive kind="triangle"/g)||[]).length,3);assert(!/\/Users\/jean|references\/source|utm_source|google.com\/s2\/favicons|NETPOSITIV|images.openai.com/.test(source));
}
const reasoning=chapters.filter(c=>c.course==='reasoning');assert.deepEqual(reasoning.filter(c=>c.groups.some(g=>g.orders.some(n=>n<=28))).map(c=>c.groups.flatMap(g=>g.orders).filter(n=>n<=28)),[[1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16],[17,18,19,20,21,22,23,24],[25,26,27,28]]);
console.log('Verified all 720 permutations, 25920 placement swaps, 64 partial masks, all ordered corner triples and single-side conditions, 24 equal-sum solutions, impossible target 8, necessary-but-insufficient corner sums, all 20 figures in EN/DE and unchanged Parts I–III with Part IV starting at 25.');
