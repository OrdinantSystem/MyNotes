import assert from 'node:assert/strict';
import {claimsFromCount,solutionSummary,uniquenessInput,machineState,convergenceStage,inspectionAnswer,initialUniquenessState,keyWorlds,uniquenessFigures} from '../src/lib/interactive/uniqueness-model.ts';
import {machineMarkup,convergenceMarkup,inspectionFeedback,comparisonMarkup,squareGraph,uniquenessFigure} from '../src/lib/interactive/uniqueness-render.ts';
import {uniquenessText} from '../src/lib/reasoning/uniqueness-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
for(let n=0;n<=100;n++){const objects=Array.from({length:n},(_,i)=>i),c=claimsFromCount(n);assert.equal(c.exists,objects.some(()=>true));assert.equal(c.atMostOne,objects.every(x=>objects.every(y=>x===y)));assert.equal(c.exactlyOne,c.exists&&c.atMostOne);}
assert.deepEqual(claimsFromCount(0),{exists:false,atMostOne:true,exactlyOne:false});for(const n of [-1,.5,Infinity,NaN,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>claimsFromCount(n));
for(const [kind,solutions] of [['linear',[4]],['two',[-2,2]],['none',[]]])assert.deepEqual(solutionSummary(kind).solutions,solutions);
let witnesses=0;for(let x=-5;x<=10;x+=.5){const s=machineState(x);assert.equal(uniquenessInput(String(x)),x);assert.equal(s.doubled,x+x);assert.equal(s.output,x+x+3);assert.equal(s.works,x===4);if(s.works)witnesses++;}assert.equal(witnesses,1);
for(const raw of ['',' ','NaN','Infinity','-5.5','10.5','.25','4.1'])assert.equal(uniquenessInput(raw),null);for(const n of [-6,11,.25,NaN])assert.throws(()=>machineState(n));for(const n of [-1,5,.5,NaN])assert.throws(()=>convergenceStage(n));
for(const row of [-1,4,.5])assert.throws(()=>inspectionAnswer(row,0));for(const choice of [-1,4,.5])assert.throws(()=>inspectionAnswer(0,choice));
for(let row=0;row<4;row++){assert.equal(inspectionAnswer(row,null),null);for(let choice=0;choice<4;choice++)assert.equal(inspectionAnswer(row,choice),row===choice);}
assert(keyWorlds.every(w=>w[2]));assert.deepEqual(keyWorlds.map(w=>w.filter(Boolean).length),[1,2]);
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 const c=uniquenessText(locale);for(const s of strings(c)){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(let x=-5;x<=10;x+=.5)assert(!/NaN|undefined|katex-error/.test(machineMarkup(locale,x)));
 for(let stage=0;stage<5;stage++){const html=convergenceMarkup(locale,stage);assert(!/NaN|undefined|katex-error/.test(html));assert(html.includes(c.stages[stage]));assert.equal(html.includes('unique-merged'),stage>=3);}
 for(let row=0;row<4;row++){assert(inspectionFeedback(locale,row,null).includes(c.choose));for(let choice=0;choice<4;choice++){const html=inspectionFeedback(locale,row,choice);assert(html.includes(`data-unique-correct="${row===choice}"`));assert(!/katex-error|undefined/.test(html));}}
 for(const kind of uniquenessFigures){assert(kind.slice(7) in c.figures);const html=uniquenessFigure(locale,kind);assert(!/NaN|undefined|katex-error/.test(html),kind);assert(!/\sid=/.test(html));}
 const two=squareGraph(locale,4),none=squareGraph(locale,-1);assert.equal((two.match(/data-root=/g)||[]).length,2);assert(two.includes('cx="160" cy="210"'));assert(two.includes('cx="440" cy="210"'));assert(!none.includes('data-root='));assert(none.includes('M65 360H550'));
 const table=comparisonMarkup(locale);assert.equal((table.match(/data-claim="true"/g)||[]).length,5);assert.equal((table.match(/data-claim="false"/g)||[]).length,4);
}
const a=initialUniquenessState(),b=initialUniquenessState();a.answers[0]=1;a.x=4;a.stage=4;assert.deepEqual(b,{x:2,stage:0,answers:[null,null,null,null]});
console.log('Verified 31 exact half-unit inputs, solution counts against arbitrary-pair quantification including empty sets, complete known solution sets, key worlds, scaled roots/no roots, 18 figures and five stages in EN/DE, every argument choice, invalid inputs and isolated initial states.');
