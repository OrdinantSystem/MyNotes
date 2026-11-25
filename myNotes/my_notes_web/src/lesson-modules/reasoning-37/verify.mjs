import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {bayes,factory,population,grouped,stages,rateInput,estimateInput,workshop,figureKinds} from './model.ts';
import {figureMarkup,regroupMarkup,baseMarkup,workshopMarkup} from './render.ts';
let truthTables=0;
for(let prior=0;prior<=10;prior++)for(let sensitivity=0;sensitivity<=10;sensitivity++)for(let falsePositive=0;falsePositive<=10;falsePositive++){
 const s=bayes(prior/10,sensitivity/10,falsePositive/10),tp=prior*sensitivity,fp=(10-prior)*falsePositive;
 assert(Math.abs(s.positive-(tp+fp)/100)<1e-12);
 if(tp+fp===0)assert.equal(s.posterior,null);else assert(Math.abs(s.posterior-tp/(tp+fp))<1e-12);
 truthTables++;
}
assert.equal(bayes(0,1,0).posterior,null);assert.equal(bayes(1,0,1).posterior,null);assert.equal(bayes(0,1,1).posterior,0);assert.equal(bayes(1,1,1).posterior,1);assert.equal(bayes(.2,.5,.5).posterior,.2);
for(const values of [[-1,.9,.1],[1.1,.9,.1],[.1,NaN,.1],[.1,.9,Infinity]])assert.throws(()=>bayes(...values));
let populations=0;const near=(a,b)=>assert(Math.abs(a-b)<1e-12);
for(let rate=1;rate<=50;rate++){
 const state=factory(rate),items=population(rate),identity=items.map(x=>({...x}));populations+=items.length;
 assert.equal(items.length,1000);assert.equal(new Set(items.map(x=>x.id)).size,1000);
 const tp=items.filter(x=>x.defective&&x.flagged).length,fn=items.filter(x=>x.defective&&!x.flagged).length,fp=items.filter(x=>!x.defective&&x.flagged).length,tn=items.filter(x=>!x.defective&&!x.flagged).length;
 assert.deepEqual([tp,fn,fp,tn],[state.tp,state.fn,state.fp,state.tn]);assert.equal(tp+fn+fp+tn,1000);assert.equal(tp/(tp+fn),.9);assert.equal(fp/(fp+tn),.1);near(state.posterior,bayes(rate/100,.9,.1).posterior);
 for(const stage of stages){const s=grouped(items,stage),all=s.groups.flat().concat(s.hidden);assert.equal(all.length,1000);assert.equal(new Set(all.map(x=>x.id)).size,1000);assert.deepEqual([...all].sort((a,b)=>a.id.localeCompare(b.id)),[...identity].sort((a,b)=>a.id.localeCompare(b.id)));if(stage==='flagged'){assert(s.groups.flat().every(x=>x.flagged));assert(s.hidden.every(x=>!x.flagged));assert.equal(s.hidden.length,1000-state.totalFlagged);}}
 assert.deepEqual(items,identity);if(rate>1)assert(state.posterior>factory(rate-1).posterior);
}
assert.deepEqual([1,5,10,20,50].map(r=>[factory(r).tp,factory(r).fp]),[[9,99],[45,95],[90,90],[180,80],[450,50]]);
near(factory(1).posterior,1/12);near(factory(10).posterior,.5);near(factory(50).posterior,.9);
assert.equal(workshop.tp,2000*.05*.8);assert.equal(workshop.fp,2000*.95*.05);assert.equal(workshop.totalFlagged,175);near(workshop.posterior,16/35);
for(const raw of ['',' ','0','51','1.5','NaN','Infinity','x'])assert.equal(rateInput(raw),null);for(const raw of ['1','25','50'])assert.equal(rateInput(raw),Number(raw));for(const raw of ['','-1','101','NaN','Infinity'])assert.equal(estimateInput(raw),null);for(const raw of ['0','45.7','100'])assert.equal(estimateInput(raw),Number(raw));
for(const n of [0,51,.5,NaN,Infinity])assert.throws(()=>factory(n));assert.throws(()=>grouped(population(),'other'));
for(const locale of ['en','de']){
 for(const kind of figureKinds){const html=figureMarkup(locale,kind);assert(!/undefined|NaN|katex-error/.test(html),`${locale}/${kind}`);assert(!/\bid=/.test(html));}
 for(const stage of stages){const html=regroupMarkup(locale,stage);assert.equal((html.match(/data-component=/g)||[]).length,stage==='flagged'?108:1000);assert(!/undefined|NaN|katex-error/.test(html));}
 for(const rate of [1,5,10,20,50])assert(!/undefined|NaN|katex-error/.test(baseMarkup(locale,rate)));
 assert(workshopMarkup(locale).includes('175'));assert(!/katex-error/.test(workshopMarkup(locale)));
 const content=readFileSync(new URL(`content/${locale}/reasoning/accurate-detectors-and-doubtful-results.mdx`,import.meta.url),'utf8');
 assert(content.includes('order: 37'));assert(content.includes('reviewStatus: unreviewed'));assert(content.includes('chapter: reasoning-part-five'));assert(content.includes('P(+)>0'));assert(content.includes('P(D^c)P(+\\mid D^c)'));
 assert.equal((content.match(/<ReasoningFigure /g)||[]).length,13);assert.equal((content.match(/<Interactive /g)||[]).length,4);
 assert(!/\/Users\/jean|references\/source|utm_source|#C65B57|9\.6\/10/.test(content));
}
const first=population(),second=population();first[0].flagged=!first[0].flagged;assert.notEqual(first[0].flagged,second[0].flagged);
console.log(`Lesson 37: ${truthTables} Bayes boundary tables, ${populations} component identities across 50 exact factory populations, all grouping partitions, five source rows, workshop posterior 16/35, bounds and all EN/DE renders verified.`);
