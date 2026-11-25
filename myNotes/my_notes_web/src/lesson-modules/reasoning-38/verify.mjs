import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {update,multiplierUpdate,reports,readPercent,investigationStep,initial,steps} from './model.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),manifest=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} ≠ ${b}`);
assert.equal(manifest.order,38);assert.equal(manifest.chapter,'reasoning-part-five');
let cases=0;
for(let prior=0;prior<=100;prior++)for(let a=0;a<=100;a++)for(let b=0;b<=100;b++){
 const s=update(prior,a,b);cases++;
 assert.ok(Number.isFinite(s.total));
 if(prior*a+(100-prior)*b===0){assert.equal(s.postA,null);assert.equal(s.postB,null);continue;}
 assert.ok(s.postA>=0&&s.postA<=100&&s.postB>=0&&s.postB<=100);
 near(s.postA+s.postB,100);
 near(s.postA,update(100-prior,b,a).postB);
 if(prior>0&&prior<100){if(a>b)assert.ok(s.postA>prior);if(a<b)assert.ok(s.postA<prior);if(a===b)near(s.postA,prior);}
}
// The source investigation is checked as a finite cohort, independently of update().
const cohort=Array.from({length:100},(_,i)=>({kind:i<75?'a':'b',warning:i<75?i<60:i<95}));
const warning=cohort.filter(x=>x.warning);assert.equal(warning.filter(x=>x.kind==='a').length,60);assert.equal(warning.filter(x=>x.kind==='b').length,20);
assert.deepEqual(steps,[{a:75,b:25},{a:60,b:20},{a:6,b:12}]);
near(update(75,80,80).postA,75);near(update(75,10,60).postA,100/3);near(update(75,10,60).total,22.5);
near(multiplierUpdate(25,6),200/3);near(multiplierUpdate(10,2),200/11);
for(const [p,expected] of [[5,24],[10,40],[25,200/3],[50,600/7],[75,1800/19]])near(multiplierUpdate(p,6),expected);
for(let n=1;n<=3;n++){near(reports(n,'copies').valid,200/3);near(reports(n,'independent').valid,reports(n,'copies').naive);}
near(reports(2,'independent').valid,1200/13);near(reports(3,'independent').valid,7200/73);
assert.equal(multiplierUpdate(0,6),0);assert.equal(multiplierUpdate(100,6),100);assert.equal(multiplierUpdate(100,0),null);assert.equal(multiplierUpdate(100,1e308),100);
assert.equal(update(0,100,0).postA,null);assert.equal(update(100,0,100).postA,null);assert.equal(update(50,0,0).postA,null);
for(const raw of ['',' ','-1','101','3.5','NaN','Infinity'])assert.equal(readPercent(raw),null);
for(const raw of ['0','100','75'])assert.equal(readPercent(raw),Number(raw));
for(const n of [-1,101,NaN,Infinity,1.1])assert.throws(()=>update(n,10,60));
for(const n of [-1,NaN,Infinity])assert.throws(()=>multiplierUpdate(25,n));
assert.throws(()=>reports(4,'copies'));assert.equal(investigationStep(-1),0);assert.equal(investigationStep(3),2);assert.throws(()=>investigationStep(1.5));
for(const locale of ['en','de']){
 const content=readFileSync(join(root,`content/${locale}/reasoning/${manifest.key}.mdx`),'utf8');
 for(const figure of manifest.figures)assert.ok(content.includes(`figure="${figure}"`));
 for(const preset of manifest.presets)assert.ok(content.includes(`preset="${preset}"`));
 assert.equal((content.match(/^## /gm)||[]).length,9);
 assert.ok(content.includes('reviewStatus: unreviewed'));assert.ok(!content.includes('/Users/')&&!content.includes('utm_source'));
 for(const tex of ['P(E_2\\mid H_A,E_1)=0.1','P(E_2\\mid H_B,E_1)=0.6','P(E_1\\mid H)P(E_2\\mid E_1,H)'])assert.ok(content.includes(tex));
 if(root.includes('/src/lesson-modules/')){
  const {figureMarkup,simulatorMarkup,predictionMarkup,reportsMarkup,sensitivityMarkup,investigationMarkup}=await import('./render.ts');
  assert.ok(!investigationMarkup(locale,0).includes(`<h4>${copy(locale).posterior}</h4>`));
  for(const kind of manifest.figures){const html=figureMarkup(locale,kind);assert.ok(html.length>80);assert.ok(!html.includes('NaN')&&!html.includes('undefined'));}
  assert.ok(simulatorMarkup(locale,{priorA:50,likelihoodA:0,likelihoodB:0}).includes('data-undefined'));
  assert.ok(!simulatorMarkup(locale,initial).includes('data-undefined'));
  assert.ok(predictionMarkup(locale,null).includes(copy(locale).choose));
  for(let choice=0;choice<3;choice++)assert.ok(predictionMarkup(locale,choice).includes('katex'));
  assert.ok(reportsMarkup(locale,3,'copies').includes(copy(locale).copiesReason));
  assert.ok(sensitivityMarkup(locale,0).includes('svg'));assert.ok(sensitivityMarkup(locale,100).includes('svg'));
  assert.throws(()=>figureMarkup(locale,'missing'));
 }
}
console.log(`AoR 38: ${cases} bounded probability configurations; zero-evidence/endpoint handling, swap symmetry, update direction, exact source sequence, copied/independent reports, sensitivity rows and complete bilingual component coverage pass.`);
