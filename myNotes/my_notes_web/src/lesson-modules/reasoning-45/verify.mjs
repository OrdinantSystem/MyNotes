import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {groups,observations,pooled,rate,reweight,weightedMean,peopleMean,recovery,standardizedRecovery,readInteger,edges,initialState} from './model.ts';
import {figureMarkup,observationsMarkup,percent,leadMarkup,causalMarkup} from './render.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),m=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
assert.equal(m.order,45);assert.equal(m.chapter,'reasoning-part-six');assert.equal(observations.length,220);assert.equal(new Set(observations.map(o=>o.id)).size,220);
assert.equal(observations.filter(o=>o.success).length,121);
for(const g of groups){const rows=observations.filter(o=>o.method===g.method&&o.difficulty===g.difficulty);assert.equal(rows.length,g.n);assert.equal(rows.filter(o=>o.success).length,g.success);}
close(pooled('A'),39/110);close(pooled('B'),82/110);close(reweight(10,100).A,39/110);close(reweight(10,100).B,82/110);
// Compare all 12,321 control combinations to an independent integer sign and convex bounds.
for(let a=0;a<=110;a++)for(let b=0;b<=110;b++){const r=reweight(a,b);assert.equal(Math.sign(r.A-r.B),Math.sign(55+3*(a-b)));assert.ok(r.A>=.3-1e-12&&r.A<=.9+1e-12);assert.ok(r.B>=.2-1e-12&&r.B<=.8+1e-12);}
for(let p=0;p<=110;p++)close(rate('A',p/110)-rate('B',p/110),.1);
// Continuous shares include an exact tie beyond the discrete control grid.
close(rate('A',0),rate('B',1/6));close(rate('A',.5),.6);close(rate('B',.5),.5);
assert.equal(peopleMean(2,8),58);assert.equal(peopleMean(8,2),82);assert.equal(peopleMean(1,1),70);for(let a=1;a<=20;a++)for(let b=1;b<=20;b++)close(peopleMean(a,b),(90*a+50*b)/(a+b));
close(recovery('X'),28/110);close(recovery('Y'),71/110);close(standardizedRecovery('X'),.5);close(standardizedRecovery('Y'),.4);
for(let p=0;p<=100;p++)close(standardizedRecovery('X',p/100)-standardizedRecovery('Y',p/100),.1);
for(const n of [-1,1.1,NaN,Infinity]){assert.throws(()=>rate('A',n));assert.throws(()=>standardizedRecovery('X',n));}
for(const args of [[[],[]],[[1],[0]],[[1],[-1]],[[NaN],[1]],[[1],[Infinity]],[[1],[1,2]]])assert.throws(()=>weightedMean(...args));
for(const raw of ['', ' ', '-1','111','3.5','NaN','Infinity','abc'])assert.equal(readInteger(raw,0,110),null);for(const n of [0,10,55,100,110])assert.equal(readInteger(String(n),0,110),n);
assert.throws(()=>peopleMean(0,8));assert.throws(()=>peopleMean(2,21));assert.throws(()=>peopleMean(2.5,8));assert.deepEqual(edges('confounder'),[['Z','X'],['Z','Y'],['X','Y']]);assert.deepEqual(edges('mediator'),[['X','Z'],['Z','Y'],['X','Y']]);assert.throws(()=>edges('other'));
const changed=initialState();changed.a=110;changed.world='mediator';assert.equal(initialState().a,10);assert.equal(initialState().world,'confounder');
for(const locale of ['en','de']){
 const page=readFileSync(join(root,`content/${locale}/reasoning/${m.key}.mdx`),'utf8'),c=copy(locale);
 for(const figure of m.figures){assert.ok(page.includes(`figure="${figure}"`));assert.ok(figureMarkup(locale,figure).length>100);}
 for(const preset of m.presets)assert.ok(page.includes(`preset="${preset}"`));
 const grouped=observationsMarkup(locale),combined=observationsMarkup(locale,true);
 for(const html of [grouped,combined]){assert.equal((html.match(/data-observation=/g)||[]).length,220);assert.equal((html.match(/data-success="true"/g)||[]).length,121);}
 const ids=html=>[...html.matchAll(/data-observation="([^"]+)"/g)].map(x=>x[1]).sort();assert.deepEqual(ids(grouped),ids(combined));
 assert.ok(c.options.length===4);assert.ok(causalMarkup(locale,'confounder').includes('data-edge="Z-X"'));assert.ok(causalMarkup(locale,'mediator').includes('data-edge="X-Z"'));assert.ok(!causalMarkup(locale,'mediator').includes('data-edge="Z-X"'));
 assert.ok(leadMarkup(locale,10,100).includes(locale==='de'?'39,1':'39.1'));assert.equal(percent(locale,39/110),locale==='de'?'35,5 %':'35.5%');assert.equal(percent(locale,82/110),locale==='de'?'74,5 %':'74.5%');
 assert.ok(page.includes('reviewStatus: unreviewed'));assert.ok(!/references\/source|utm_source|google.com\/s2/.test(page));assert.ok(page.includes('w_i(r_{Ai}-r_{Bi})>0'));
}
console.log('Episode 45: 220 conserved observations, 12,321 independent mixture comparisons, 400 person means, common-weight ordering, convex bounds, recovery transfer, directed causal graphs, inputs, reset and bilingual coverage passed.');
