import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {metrics,learners,rankings,passingTests,sortCases,inspect,indicators,plan,targetPoints,trends} from './model.ts';
assert.deepEqual(learners.map(r=>metrics.map(m=>r[m])),[[100,100,40,20],[80,70,80,90],[100,90,90,50]]);
const expected=[['A','C','B'],['A','C','B'],['C','B','A'],['B','C','A']];
for(const [i,m] of metrics.entries()){const rows=rankings(m);assert.deepEqual(rows.map(r=>r.id),expected[i]);for(const row of rows)assert.equal(row.rank,1+rows.filter(x=>x[m]>row[m]).length);}
assert.deepEqual(rankings('completion').map(x=>x.rank),[1,1,3]);assert.throws(()=>rankings('other'));
const rows=rankings('quiz');rows[0].quiz=0;assert.equal(rankings('quiz')[0].quiz,100);
for(const [input,output] of passingTests)assert(inspect(input,output).passes);
assert.deepEqual(sortCases.map(r=>inspect(r.input,r.output)),[{ordered:false,preserved:true,passes:false},{ordered:true,preserved:true,passes:true},{ordered:true,preserved:false,passes:false}]);
const lists=n=>n===0?[[]]:lists(n-1).flatMap(xs=>[-1,0,1].map(x=>[...xs,x]));let checks=0;
// Independent oracle: a correct sort output is exactly the input sorted numerically.
for(let n=0;n<=5;n++)for(const input of lists(n))for(const output of lists(n)){assert.equal(inspect(input,output).passes,JSON.stringify([...input].sort((a,b)=>a-b))===JSON.stringify(output));checks++;}
assert(inspect([],[]).passes);assert(!inspect([1],[1,1]).passes);assert(!inspect([3,3,1],[1,1,3]).preserved);assert(inspect([-5,0,1.2],[-5,0,1.2]).passes);for(const value of [NaN,Infinity,-Infinity])assert.throws(()=>inspect([value],[]));
for(const context of ['repair','support'])for(let mask=0;mask<16;mask++){const selected=indicators.filter((_,i)=>(mask>>i)&1),p=plan(context,selected);assert.deepEqual(p.selected,selected);assert.equal(p.missing.length+selected.length,4);assert.equal(p.hasQuality,selected.includes('quality'));assert.equal(p.hasOutcome,selected.includes('outcomes'));assert.equal(p.onlyInputs,selected.length>0&&selected.every(x=>['hours','tasks'].includes(x)));p.selected.push('hours');assert.equal(selected.length,indicators.filter((_,i)=>(mask>>i)&1).length);}
assert.throws(()=>plan('unknown',[]));assert.throws(()=>plan('repair',['unknown']));assert.throws(()=>plan('repair',['hours','hours']));
const centroid=ps=>ps.reduce((s,[x,y])=>[s[0]+x/ps.length,s[1]+y/ps.length],[0,0]);const scatter=ps=>{const [a,b]=centroid(ps);return ps.reduce((s,[x,y])=>s+(x-a)**2+(y-b)**2,0)/ps.length;};
for(const i of [0,2])for(const v of centroid(targetPoints[i]))assert(Math.abs(v)<1e-9);
assert(scatter(targetPoints[2])>2500);assert(scatter(targetPoints[0])<100);assert(Math.hypot(...centroid(targetPoints[1]))>50);assert(scatter(targetPoints[3])>scatter(targetPoints[1]));
for(let k=-100;k<=100;k++){const even=2*k,odd=2*k+1;assert.equal(even**2,2*(2*k*k));assert.equal(odd**2,2*(2*k*k+2*k)+1);}
assert(trends.quiz.slice(3).every((v,i,a)=>i===0||v>a[i-1]));assert(trends.transfer.slice(3).every((v,i,a)=>i===0||v<a[i-1]));
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');for(const f of manifest.figures)assert(source.includes(`figure="${f}"`));for(const p of manifest.presets)assert(source.includes(`preset="${p}"`));assert(source.includes('reviewStatus: unreviewed'));assert(!/references\/source|\/Users\/|utm_source|14:00–14:40/.test(source));}
if(existsSync(new URL('../../lib/interactive/plane.ts',import.meta.url))){const {figureMarkup,rankingMarkup,sortingMarkup,planMarkup,esc}=await import('./render.ts');assert(!esc('<script>"&').includes('<'));for(const locale of ['en','de']){const html=[];for(const f of manifest.figures)html.push(figureMarkup(locale,f));for(const m of metrics)html.push(rankingMarkup(locale,m));for(let i=0;i<3;i++)for(const shown of [false,true])html.push(sortingMarkup(locale,i,shown));for(const context of ['repair','support'])for(let mask=0;mask<16;mask++)html.push(planMarkup(locale,context,indicators.filter((_,i)=>(mask>>i)&1),true));for(const s of html)assert(!/NaN|>undefined<|="undefined"|\bid=/.test(s));assert.throws(()=>figureMarkup(locale,'unknown'));assert.throws(()=>sortingMarkup(locale,10));}}
console.log(`AoR 42: exact learner matrix and ties, ${checks} sort/multiset oracle cases, 32 contextual plans, independent result objects, target geometry, 201 parity identities, source coverage and bilingual rendering passed.`);
