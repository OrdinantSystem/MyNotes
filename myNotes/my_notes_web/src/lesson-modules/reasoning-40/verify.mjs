import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {attendance,reference,capacityStatus,boundary,positiveProduct,quotient,journey,targetPoints,schematicIntervals,containsZero} from './model.ts';
import {figureMarkup,attendanceMarkup,boundaryMarkup,journeyMarkup,esc} from './render.ts';
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
// Check whole-chair minimality, threshold equivalence and monotonicity over the full UI lattice.
let scenarios=0;
for(let g=80;g<=100;g++)for(let units=250;units<=300;units++){
 const product=g*units;
 for(let capacity=0;capacity<=400;capacity++){
  const s=attendance({groups:g,size:units/100,capacity});scenarios++;
  assert(Number.isInteger(s.chairs));assert(s.chairs*100>=product);assert((s.chairs-1)*100<product);
  assert.equal(s.enough,s.chairs<=capacity);assert.equal(s.spare-s.shortage,capacity-s.chairs);
 }
 if(g<100)assert(attendance({groups:g+1,size:units/100,capacity:260}).projected>=product/100);
 if(units<300)assert(attendance({groups:g,size:(units+1)/100,capacity:260}).projected>=product/100);
}
assert.equal(attendance(reference()).chairs,252);assert.equal(attendance(reference()).spare,8);
assert.equal(attendance({groups:80,size:2.85,capacity:228}).chairs,228);
assert.equal(attendance({groups:100,size:2.6,capacity:260}).shortage,0);
assert.equal(attendance({groups:100,size:2.61,capacity:260}).shortage,1);
for(const state of [{groups:79},{groups:100.1},{size:NaN},{size:2.499},{size:2.851},{capacity:Infinity},{capacity:-1},{capacity:401}])assert.throws(()=>attendance({...reference(),...state}));
const independent=reference(),changed=reference();changed.groups=100;assert.equal(independent.groups,90);
for(let capacity=0;capacity<=400;capacity++){
 const statuses=[];for(const groups of [80,100])for(const size of [2.5,3])statuses.push(attendance({groups,size,capacity}).enough);
 const independentStatus=statuses.every(Boolean)?'enough':statuses.every(x=>!x)?'shortage':'mixed';assert.equal(capacityStatus(capacity),independentStatus);
 const points=boundary(capacity);assert.equal(points.length>0,capacity>=200&&capacity<=300);
 for(const [g,size] of points){assert(g>=80-1e-9&&g<=100+1e-9);assert(size>=2.5-1e-9&&size<=3+1e-9);close(g*size,capacity);}
}
assert.deepEqual(positiveProduct([80,100],[2.5,3]),[200,300]);assert.deepEqual(quotient([180,210],[70,90]),[2,3]);
for(let d=180;d<=210;d++)for(let v=70;v<=90;v++){const t=d/v;assert(t>=2&&t<=3);}
close(journey('original').widthMinutes,60);close(journey('distance').widthMinutes,260/7);close(journey('speed').widthMinutes,22.5);assert(journey('speed').widthMinutes<journey('distance').widthMinutes);
for(const bad of [[[0,1],[2,3]],[[2,1],[2,3]],[[1,2],[0,3]],[[1,2],[NaN,3]]]){assert.throws(()=>positiveProduct(...bad));assert.throws(()=>quotient(...bad));}assert.throws(()=>journey('unknown'));
const centroid=p=>p.reduce((s,[x,y])=>[s[0]+x/p.length,s[1]+y/p.length],[0,0]);const scatter=p=>{const [a,b]=centroid(p);return p.reduce((s,[x,y])=>s+(x-a)**2+(y-b)**2,0)/p.length;};
for(const i of [0,2]){const [x,y]=centroid(targetPoints[i]);close(x,0);close(y,0);}assert(scatter(targetPoints[2])>50*scatter(targetPoints[0]));assert(scatter(targetPoints[1])<50);assert(Math.hypot(...centroid(targetPoints[1]))>60);
assert.equal(schematicIntervals.filter(containsZero).length,9);
assert(!esc('<script>"&').includes('<'));
const m=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){
 for(const figure of m.figures){const html=figureMarkup(locale,figure);assert(!/undefined|NaN|Infinity|\bid=/.test(html),`${locale}/${figure}`);}
 for(const capacity of [0,180,200,260,300,320,400])for(const size of [2.5,2.85,3])for(const groups of [80,90,100]){
  for(const html of [attendanceMarkup(locale,{groups,size,capacity}),boundaryMarkup(locale,{groups,size,capacity})])assert(!/NaN|undefined|Infinity/.test(html));
 }
 for(const mode of ['original','distance','speed'])assert(!/NaN|undefined/.test(journeyMarkup(locale,mode)));
 const source=readFileSync(new URL(`./content/${locale}/reasoning/${m.key}.mdx`,import.meta.url),'utf8');assert(source.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source/.test(source));
}
console.log(`AoR 40: ${scenarios} attendance/capacity states, chair minimality and exact thresholds; 401 robustness domains and curved boundaries; journey extrema and information widths; target centroids/scatter, schematic interval classification, bilingual rendering and independent defaults passed.`);
