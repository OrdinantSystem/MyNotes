import assert from 'node:assert/strict';
import {truthPair,squareRegions,contraInput,strategyAnswer,initialContraState,contraFigures} from '../src/lib/interactive/contraposition-model.ts';
import {truthMarkup,squareMarkup,tileGrid,contraFigure,strategyFeedback,strategyTex} from '../src/lib/interactive/contraposition-render.ts';
import {squareWitness} from '../src/lib/interactive/cases-model.ts';
import {contraText} from '../src/lib/reasoning/contraposition-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
for(const p of [false,true])for(const q of [false,true]){const t=truthPair(p,q);assert.equal(t.original,t.contra);assert.equal(t.original,!(p&&!q));assert.equal(t.notQ,!q);assert.equal(t.notP,!p);}
for(let k=-100;k<=100;k++){const s=squareWitness(k,true);assert.equal(s.n,2*k+1);assert.equal(s.square,2*s.witness+1);assert(Number.isInteger(s.witness));}
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 for(const s of strings(contraText(locale))){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(const p of [false,true])for(const q of [false,true])assert(!/NaN|undefined|katex-error/.test(truthMarkup(locale,p,q)));
 for(let k=1;k<=6;k++){
  const s=squareRegions(k);assert.equal(s.center+2*s.strip+s.corner,s.square);assert.equal(2*s.pairs+1,s.square);
  for(const mode of ['plain','columns','pairs','regions']){
   const html=tileGrid(locale,k,mode);assert.equal((html.match(/class="contra-tile /g)||[]).length,s.square);
   if(mode==='pairs')assert.equal((html.match(/class="contra-pair-outline"/g)||[]).length,s.pairs);
   if(mode==='regions'){assert.equal((html.match(/class="contra-tile corner"/g)||[]).length,1);assert.equal((html.match(/class="contra-tile center"/g)||[]).length,s.center);}
  }assert(!/NaN|undefined|katex-error/.test(squareMarkup(locale,k)));
 }
 for(const kind of contraFigures)assert(!/NaN|undefined|katex-error/.test(contraFigure(locale,kind)),kind);
 for(let row=0;row<3;row++){assert.equal(strategyAnswer(row,null),null);assert.equal(strategyFeedback(locale,row,null),'');assert(strategyTex(row,locale));for(let choice=0;choice<2;choice++){assert.equal(strategyAnswer(row,choice),choice===(row===0?0:1));assert(!/katex-error|undefined/.test(strategyFeedback(locale,row,choice)));}}
}
for(const raw of ['',' ','0','7','1.5','NaN','Infinity','-1'])assert.equal(contraInput(raw),null);
for(let n=1;n<=6;n++)assert.equal(contraInput(String(n)),n);
for(const n of [0,7,-1,1.5,NaN])assert.throws(()=>squareRegions(n));
assert.throws(()=>truthPair(1,true));assert.throws(()=>strategyAnswer(3,0));assert.throws(()=>strategyAnswer(0,2));
const a=initialContraState(),b=initialContraState();a.answers[0]=1;a.p=false;assert.deepEqual(b,{p:true,q:false,k:2,problem:0,answers:[null,null,null]});
console.log('Verified all four truth valuations, 201 signed odd-square witnesses, six region/pair grids in both locales, eighteen figures, every strategy choice, invalid inputs and independent initial state.');
