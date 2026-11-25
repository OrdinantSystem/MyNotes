import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {outcomes,dots,distribution,expected,variance,posterior,delta,readEstimate,frame,checkAnswers,initialState} from './model.ts';
import {gridMarkup,dotsMarkup,riskMarkup,figureMarkup,riskNote} from './render.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),m=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
assert.equal(m.order,39);assert.equal(m.chapter,'reasoning-part-five');assert.equal(m.key,'anchoring-and-framing');
assert.equal(outcomes.length,100);assert.equal(new Set(outcomes.map(o=>o.id)).size,100);assert.equal(outcomes.filter(o=>o.success).length,90);
for(const o of outcomes){assert.equal(o.success,o.id<90);assert.ok(o.x>=0&&o.x+24<=365&&o.y>=0&&o.y+20<=330);}
assert.equal(dots.length,137);assert.equal(new Set(dots.map(d=>d.id)).size,137);
for(let i=0;i<dots.length;i++){
 const d=dots[i];assert.ok(d.x>4.5&&d.x<615.5&&d.y>4.5&&d.y<345.5);
 for(let j=i+1;j<dots.length;j++)assert.ok(Math.hypot(d.x-dots[j].x,d.y-dots[j].y)>9,'Dots must remain independently visible');
}
assert.equal(expected('A'),60);assert.equal(expected('B'),60);assert.equal(variance('A'),0);assert.equal(variance('B'),2400);
// Independently enumerate a 100-case probability space, not the expected-value formula.
const b=Array.from({length:100},(_,i)=>i<60?100:0);assert.equal(b.reduce((a,x)=>a+x,0)/100,60);assert.equal(b.filter(x=>x===60).length,0);
for(const rows of Object.values(distribution)){
 assert.equal(rows.reduce((a,r)=>a+r.probability,0),1);
 for(const r of rows)assert.equal(r.saved+r.lost,100);
}
for(let p=0;p<=100;p++)for(let q=1;q<=100;q++)assert.ok(Math.abs(posterior(p/100,q/100,q/100)-p/100)<1e-12);
assert.equal(posterior(.5,.8,.2),.8);assert.throws(()=>posterior(.5,0,0));
for(const p of [-1,1.1,NaN,Infinity])assert.throws(()=>posterior(p,.5,.5));
assert.equal(delta(80000,60000),20000);assert.equal(delta(80000,100000),-20000);assert.equal(delta(80000,80000),0);assert.throws(()=>delta(NaN,1));
for(const raw of ['', ' ', '-1','1001','3.5','NaN','Infinity','abc'])assert.equal(readEstimate(raw),null);
for(const n of [0,137,210,1000])assert.equal(readEstimate(String(n)),n);
for(const f of ['positive','negative','neutral'])assert.equal(frame(f),f);assert.throws(()=>frame('other'));
assert.ok(checkAnswers([1,2,0,1]).every(x=>x.correct));assert.ok(checkAnswers([null,null,null,null]).every(x=>!x.answered));assert.throws(()=>checkAnswers([1]));assert.throws(()=>checkAnswers([3,0,0,0]));
const s=initialState();s.opening=2;s.frame='negative';s.gain='B';assert.equal(initialState().opening,0);assert.equal(initialState().frame,'positive');assert.equal(initialState().gain,null);
for(const locale of ['en','de']){
 const c=copy(locale),page=readFileSync(join(root,`content/${locale}/reasoning/${m.key}.mdx`),'utf8');
 assert.equal(c.questions.length,4);assert.equal(c.explanations.length,4);assert.ok(c.options.every(x=>x.length===3));
 for(const count of [0,60,90,100]){const svg=gridMarkup(locale,count);assert.equal((svg.match(/data-outcome=/g)||[]).length,100);assert.equal((svg.match(/data-class="success"/g)||[]).length,count);}
 assert.throws(()=>gridMarkup(locale,101));assert.equal((dotsMarkup(locale).match(/data-dot=/g)||[]).length,137);
 for(const preset of m.presets)assert.ok(page.includes(`preset="${preset}"`));
 for(const figure of m.figures){assert.ok(page.includes(`figure="${figure}"`));assert.ok(figureMarkup(locale,figure).length>50);}
 for(let stage=0;stage<3;stage++){assert.ok(riskMarkup(locale,stage).length>100);assert.ok(!riskNote(locale).includes('{'));}
 assert.ok(page.includes('0<P(H)<1'));assert.ok(page.includes('P(E)>0'));assert.ok(page.includes('P(H\\mid E)=P(H)'));assert.ok(page.includes('J(I)=J(T(I))'));assert.ok(page.includes('reviewStatus: unreviewed'));
 assert.ok(!/references\/source|utm_source|Netpositiv|google.com\/s2/.test(page));
}
console.log('Episode 39: exact 100-outcome/137-dot identities and visibility, 10,100 independent Bayesian checks, gain/loss equivalence, equal means/unequal risks, input boundaries, reset and bilingual coverage passed.');
