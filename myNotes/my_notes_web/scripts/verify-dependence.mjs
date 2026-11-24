import assert from 'node:assert/strict';
import {relationSummary} from '../src/lib/interactive/analysis-model.ts';
import {networkRelation,networkState,studentState,citationSummary,acquaintanceCounts,initialDependenceState} from '../src/lib/interactive/dependence-model.ts';
import {networkMarkup,studentsMarkup} from '../src/lib/interactive/dependence-render.ts';
assert.deepEqual(networkRelation('cycle'),[[false,true,false],[false,false,true],[true,false,false]]);
assert.deepEqual(networkRelation('shared'),[[false,true,false],[false,true,false],[false,true,false]]);
assert.deepEqual([networkState('cycle',0).separate,networkState('cycle',0).common],[true,false]);
assert.deepEqual([networkState('shared',0).separate,networkState('shared',0).common],[true,true]);
for(const i of [0,1,2]){assert.equal(networkState('cycle',i).witness,(i+1)%3);assert.equal(networkState('shared',i).witness,1);}
// Independent enumeration: every 3x3 directed relation, including loops.
let strictCountermodels=0;
for(let mask=0;mask<512;mask++){
 const cells=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>Boolean(mask&(1<<(3*i+j)))));
 const result=relationSummary(cells,3);let each=true,shared=false;
 for(let i=0;i<3;i++){let found=false;for(let j=0;j<3;j++)if(cells[i][j])found=true;each&&=found;}
 for(let j=0;j<3;j++){let all=true;for(let i=0;i<3;i++)if(!cells[i][j])all=false;shared||=all;}
 assert.equal(result.separate,each);assert.equal(result.common,shared);assert(!shared||each);
 assert.equal(!each,result.failingRows.length>0);if(cells.every((row,i)=>!row[i]))assert(!result.common);if(each&&!shared)strictCountermodels++;
}
assert(strictCountermodels>0);
// Quantified negation, including empty row/column domains; no UI exposes empty domains.
for(let rows=0;rows<=3;rows++)for(let cols=0;cols<=3;cols++)for(let mask=0;mask<2**(rows*cols);mask++){
 const cells=Array.from({length:rows},(_,i)=>Array.from({length:cols},(_,j)=>Boolean(mask&(1<<(i*cols+j))))),r=relationSummary(cells,cols);
 assert.equal(!r.separate,cells.some(row=>row.every(v=>!v)));
}
assert.deepEqual(studentState(false).names,['Maria','Noah']);assert(studentState(false).separate);assert(!studentState(false).common);
assert.deepEqual(studentState(true).failingRows,[2]);assert(!studentState(true).separate);assert(!studentState(true).common);
assert(citationSummary.separate&&!citationSummary.common);
assert.deepEqual(acquaintanceCounts.map(({some,unique})=>[some,unique]),[[false,false],[true,true],[true,false]]);
for(const locale of ['en','de'])for(const mode of ['cycle','shared'])for(const i of [0,1,2]){
 const html=networkMarkup(locale,mode,i,'checked-network');assert(!/undefined|NaN|katex-error/.test(html));assert(html.includes('katex-mathml'));assert.equal((html.match(/class="dependence-person"/g)||[]).length,3);assert(html.includes(`id="checked-network-arrow"`));assert(html.includes(`K(${['A','B','C'][i]},${['A','B','C'][networkState(mode,i).witness]})`));
}
for(const locale of ['en','de'])for(const include of [false,true]){const html=studentsMarkup(locale,include);assert(!/undefined|NaN|katex-error/.test(html));assert.equal((html.match(/data-counterexample="true"/g)||[]).length,include?1:0);}
for(const value of [-1,3,NaN,1.5])assert.throws(()=>networkState('cycle',value));assert.throws(()=>networkRelation('invalid'));assert.throws(()=>studentState(1));
const a=initialDependenceState(),b=initialDependenceState();a.mode='shared';assert.equal(b.mode,'cycle');
console.log(`Verified all 512 directed networks (${strictCountermodels} strict order countermodels), nested negation over finite/empty domains, loop direction, student witnesses, citations, existence counts and EN/DE rendering.`);
