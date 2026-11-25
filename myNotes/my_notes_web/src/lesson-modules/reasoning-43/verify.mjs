import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cells,students,comparison,selection,validateDAG,intervened,causalEdges,firePoints} from './model.ts';
import {figureMarkup,subgroupMarkup,selectionMarkup,interventionMarkup} from './render.ts';
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
assert.deepEqual(cells.map(c=>[c.prep,c.study,c.n,c.mean]),[['well',1,8,80],['well',3,2,90],['poor',1,2,50],['poor',3,8,60]]);
const roster=students();assert.equal(roster.length,20);assert.equal(new Set(roster.map(x=>x.id)).size,20);
assert.deepEqual(comparison('all').groups.map(x=>[x.n,x.mean]),[[10,74],[10,66]]);assert.equal(comparison('all').difference,-8);
for(const [group,means,counts] of [['well',[80,90],[8,2]],['poor',[50,60],[2,8]]]){const c=comparison(group);assert.deepEqual(c.groups.map(x=>x.mean),means);assert.deepEqual(c.groups.map(x=>x.n),counts);assert.equal(c.difference,10);}
assert.deepEqual(comparison('well').groups.flatMap(g=>g.items).concat(comparison('poor').groups.flatMap(g=>g.items)).map(s=>s.id).sort(),roster.map(s=>s.id).sort());assert.throws(()=>comparison('other'));
const altered=comparison('all');altered.groups[0].items[0].cellMean=0;assert.equal(comparison('all').groups[0].mean,74);
// Independent Kahn deletion check over every directed graph on four labeled nodes.
let dags=0;const nodes=['A','B','C','D'],possible=nodes.flatMap(a=>nodes.filter(b=>a!==b).map(b=>[a,b]));
for(let mask=0;mask<4096;mask++){
 const edges=possible.filter((_,i)=>mask&(1<<i));let left=[...nodes];
 while(left.length){const removable=left.filter(n=>!edges.some(([a,b])=>b===n&&left.includes(a)));if(!removable.length)break;left=left.filter(n=>!removable.includes(n));}
 if(left.length){assert.throws(()=>validateDAG(nodes,edges));continue;}
 assert(validateDAG(nodes,edges));dags++;
 for(const variable of nodes){const next=intervened(edges,variable);assert(validateDAG(nodes,next));assert(next.every(([,b])=>b!==variable));assert.deepEqual(next,edges.filter(e=>e[1]!==variable));}
}
assert.equal(dags,543);assert.throws(()=>validateDAG(['A','A'],[]));assert.throws(()=>validateDAG(['A'],[['A','B']]));assert.throws(()=>validateDAG(['A'],[['A','A']]));assert.throws(()=>validateDAG(['A','B'],[['A','B'],['A','B']]));
assert.deepEqual(intervened(causalEdges,'S'),[['P','Y'],['S','Y']]);
const before=selection(),after=selection(true);assert.deepEqual(before.all,[{x:0,y:0,z:0},{x:0,y:1,z:1},{x:1,y:0,z:1},{x:1,y:1,z:1}]);assert.equal(before.p0,.5);assert.equal(before.p1,.5);assert.equal(after.p0,1);assert.equal(after.p1,.5);assert.equal(after.rows.length,3);assert(after.rows.every(r=>r.z));assert.equal(after.rows.filter(r=>r.x===0&&r.y===1).length,1);
assert.equal(firePoints.length,18);assert(firePoints.every(p=>p.firefighters>=0&&p.damage>=0&&p.damage<=100));
for(const locale of ['en','de']){
 for(const figure of manifest.figures){const html=figureMarkup(locale,figure);assert(!/undefined|NaN|katex-error/.test(html),`${locale}/${figure}`);assert(!/\bid=/.test(html));}
 for(const group of ['all','well','poor']){const html=subgroupMarkup(locale,group);assert.equal((html.match(/data-student=/g)||[]).length,group==='all'?20:10);assert(!/katex-error/.test(html));}
 for(const selected of [false,true]){const html=selectionMarkup(locale,selected);assert.equal((html.match(/data-case=/g)||[]).length,4);assert.equal((html.match(/data-excluded="true"/g)||[]).length,selected?1:0);assert(!/katex-error/.test(html));}
 assert(interventionMarkup(locale,true).includes('causal-cut'));assert(!/katex-error/.test(interventionMarkup(locale,true)));
 const source=readFileSync(new URL(`content/${locale}/reasoning/does-a-connection-mean-a-cause.mdx`,import.meta.url),'utf8');assert(source.includes('order: 43'));assert(source.includes('reviewStatus: unreviewed'));assert.equal((source.match(/<ReasoningFigure /g)||[]).length,19);assert.equal((source.match(/<Interactive /g)||[]).length,4);
 for(const tex of ['8(80)+2(50)','2(90)+8(60)','66-74=-8','90-80=+10','60-50=+10','P(Y=1\\mid X=0,Z=1)=1'])assert(source.includes(tex),`${locale}: ${tex}`);
 assert(!/\/Users\/jean|references\/source|utm_source|images.openai.com|PubMed Central/.test(source));
}
console.log(`Lesson 43: exact four-cell Simpson reversal and 20 student identities; all 4096 four-node directed graphs (543 DAGs) and incoming-edge interventions; fair-bit collider dependence; all EN/DE figures and activities verified.`);
