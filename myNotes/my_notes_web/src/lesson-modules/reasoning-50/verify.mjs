import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {architecture,workshopEdges,modes,rainChain,sourceState,illusionGeometry,shafts,classify,roles,answers,hyperbolicArc,sphereCircle} from './model.ts';
const close=(a,b,tolerance=1e-9)=>assert(Math.abs(a-b)<tolerance,`${a} != ${b}`);
let graphs=0;
for(const mode of modes)for(let depth=1;depth<=4;depth++){
 const s=architecture(mode,depth);graphs++;assert(s.nodes.includes('rain'));assert.equal(new Set(s.nodes).size,s.nodes.length);
 for(const [from,to] of s.edges){assert(s.nodes.includes(from)&&s.nodes.includes(to));assert.notEqual(from,to);}
 function reaches(id,target,seen=new Set()){if(id===target)return true;if(seen.has(id))return false;seen.add(id);return s.edges.filter(([from])=>from===id).some(([,to])=>reaches(to,target,new Set(seen)));}
 for(const id of s.nodes)assert(reaches(id,'rain'));
 for(const [from,to] of s.edges)assert(!reaches(to,from),'These finite illustrative graphs must not contain an implicit circular dependency');
 if(mode==='chain'){assert.deepEqual(s.nodes,rainChain.slice(0,depth));assert.deepEqual(s.edges,s.nodes.slice(1).map((id,i)=>[id,s.nodes[i]]));assert(s.open);}
 if(mode==='foundation'){assert(s.edges.some(([a,b])=>a==='vision'&&b==='street'));assert(s.nodes.includes('past'));}
 if(mode==='network')assert.equal(s.edges.length,5);
 s.nodes.push('soil');assert.equal(architecture(mode,depth).nodes.length,mode==='chain'?depth:mode==='foundation'?5:6);
}
for(const bad of [0,5,1.5,NaN,Infinity])assert.throws(()=>architecture('chain',bad));assert.throws(()=>architecture('unknown'));
assert(workshopEdges.some(([a,b])=>a==='assumption'&&b==='inference'));assert(workshopEdges.some(([a,b])=>a==='assumption'&&b==='testimony'));
const before=sourceState(false),after=sourceState(true);assert.equal(before.publications,5);assert.equal(before.knownOrigins,null);assert.equal(before.copiedFrom,null);assert.equal(after.publications,5);assert.equal(new Set(after.copiedFrom).size,1);assert.equal(after.knownOrigins,1);after.copiedFrom[0]=9;assert.deepEqual(sourceState(true).copiedFrom,[0,0,0,0,0]);
const lines=illusionGeometry();assert.equal(lines.length,2);for(const s of lines){assert.equal(s.length,390);assert.equal(s.x2-s.x1,390);assert.equal(s.x1,shafts.x1);assert.equal(s.x2,shafts.x2);}assert.notEqual(lines[0].y,lines[1].y);
const verdicts=[];for(let i=0;i<4;i++)for(const role of roles)verdicts.push(classify(i,role));assert.equal(verdicts.filter(v=>v==='fit').length,4);assert.equal(verdicts.filter(v=>v==='conditional').length,1);assert.equal(classify(3,'observation'),'conditional');assert.equal(classify(1,'observation'),'reconsider');assert.throws(()=>classify(-1,'observation'));assert.throws(()=>classify(4,'observation'));assert.throws(()=>classify(0,'other'));
const a=answers(),b=answers();a[0]='inference';assert.deepEqual(b,[null,null,null,null]);
let arcs=0,points=0;
for(const q of [.2,.45,.7])for(let units=-100;units<=100;units++){
 const cx=units/100,g=hyperbolicArc(cx,q);arcs++;
 close(g.cx*g.cx+g.cy*g.cy-g.r*g.r,1);close((0-g.cx)**2+(q-g.cy)**2,g.r*g.r);
 for(const [x,y] of g.endpoints)close(x*x+y*y,1);
 for(const [i,[x,y]] of g.points.entries()){points++;close((x-g.cx)**2+(y-g.cy)**2,g.r*g.r);assert(x*x+y*y<=1+1e-9);assert(y>=-1e-9);if(i>0&&i<64)assert(x*x+y*y<1+1e-9);}
 // Full-circle intersection with baseline y=0 has discriminant cx²−1, hence no real intersection for |cx|<1.
 if(Math.abs(cx)<1)assert(g.r*g.r-g.cy*g.cy<1e-9);
}
for(const [cx,q] of [[1.1,.45],[NaN,.45],[0,0],[0,1],[0,Infinity]])assert.throws(()=>hyperbolicArc(cx,q));
for(const phi of [-.8,0,.8]){const ps=sphereCircle(phi);assert.equal(ps.length,97);close(ps[0][0],0);close(ps[0][1],Math.sqrt(.91));for(const [x,y] of ps)assert(x*x+y*y<=1+1e-9);}assert.throws(()=>sphereCircle(NaN));
const m=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const l of ['en','de']){const source=readFileSync(new URL(`./content/${l}/reasoning/${m.key}.mdx`,import.meta.url),'utf8');for(const f of m.figures)assert(source.includes(`figure="${f}"`));for(const p of m.presets)assert(source.includes(`preset="${p}"`));assert(source.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|bazos|images.openai|utm_source|00:00/.test(source));}
if(existsSync(new URL('../../lib/interactive/plane.ts',import.meta.url))){
 const r=await import('./render.ts');const c=await import('./copy.ts');assert(!r.esc('<script>"&').includes('<'));
 const combos=[null,...roles];const states=[];for(const a of combos)for(const b of combos)for(const d of combos)for(const e of combos)states.push([a,b,d,e]);
 for(const l of ['en','de']){
  const html=m.figures.map(f=>r.figureMarkup(l,f));
  for(const mode of modes)for(let depth=1;depth<=4;depth++){const s=r.architectureMarkup(l,mode,depth);assert(s.includes('data-r50-node="rain"'));html.push(s);}
  for(const reveal of [false,true])html.push(r.illusionMarkup(l,reveal),r.sourcesMarkup(l,reveal));
  for(const state of states){html.push(r.classificationMarkup(l,state,false));if(state.every(Boolean)){const s=r.classificationMarkup(l,state,true);assert(s.includes(c.copy(l).explanations[3]));html.push(s);}}
  for(const s of html)assert(!/NaN|Infinity|>undefined<|="undefined"|\sid=/.test(s));
  assert.throws(()=>r.figureMarkup(l,'unknown'));
 }
}
console.log(`AoR 50: ${graphs} dependency states, support direction/reachability, isolated results, source-origin limits, exact 390-unit shafts, 16 qualified role verdicts and 625 response states, ${arcs} orthogonal geodesics/${points} sampled points, sphere projections and bilingual figure coverage passed.`);
