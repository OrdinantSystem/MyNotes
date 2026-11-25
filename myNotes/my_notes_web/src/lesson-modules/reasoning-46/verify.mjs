import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pointWord} from './copy.ts';
import {potential,trajectory,observedScore,outbreak,outbreakSegments,mortality,rate,rateRatio,households,exposure,schoolChoice} from './model.ts';
import {figureMarkup,potentialMarkup,timelineMarkup,exposureMarkup,schoolMarkup,esc} from './render.ts';
for(let y0=0;y0<=100;y0++){
 const state=potential(y0);assert.equal(state.observed,85);assert.equal(state.effect+y0,85);
 assert.equal(state.kind,y0<85?'benefit':y0===85?'zero':'harm');
 if(y0<100)assert.equal(potential(y0+1).effect,state.effect-1);
}
assert.equal(pointWord('en',1),'point');assert.equal(pointWord('de',-1),'Punkt');assert.equal(pointWord('en',0),'points');assert.equal(pointWord('de',2),'Punkte');
assert.equal(observedScore,85);assert.equal(potential(65).effect,20);assert.equal(potential(85).effect,0);assert.equal(potential(95).effect,-10);
for(const value of [-1,101,0.1,NaN,Infinity,'70',null])assert.throws(()=>potential(value));
for(const [trend,end,effect] of [['growth',80,5],['stable',60,25],['decline',40,45]]){
 const state=trajectory(trend);assert.equal(state.alternative,end);assert.equal(state.effect,effect);assert.equal(state.change,25);assert.equal(state.before,60);assert.equal(state.after,85);
}
assert.throws(()=>trajectory('missing'));
assert.deepEqual(outbreak.map(o=>[o.day,o.attacks]),[[1,143],[2,116],[3,54],[8,12],[9,11],[10,5],[11,5],[12,1]]);
const segments=outbreakSegments();assert.equal(segments.length,2);assert.deepEqual(segments.flat(),outbreak);
for(const segment of segments)for(let i=1;i<segment.length;i++)assert.equal(segment[i].day-segment[i-1].day,1);
assert(outbreak[2].attacks>outbreak[3].attacks);assert.equal(outbreak[3].day,8);
assert.deepEqual(mortality.map(x=>x.reported),[315,37,59]);
assert.equal(Math.round(rate(1263,40046)*100),31539);assert.equal(Math.round(rate(98,26107)*100),3754);
assert(rate(1422,256423)>55.45&&rate(1422,256423)<55.46);assert.equal(Math.round(rate(1422,256423)),55);
assert(rateRatio()>8.40&&rateRatio()<8.41);assert(315/37>8.51&&315/37<8.52);
for(const values of [[1,0],[-1,20],[NaN,20],[1,Infinity]])assert.throws(()=>rate(...values));
assert.equal(households.length,9);assert.equal(new Set(households.map(h=>`${h.x},${h.y}`)).size,9);
assert.equal(exposure('geography').links.length,0);assert.equal(exposure('consumption').links.length,9);assert.equal(households.filter(h=>h.pump==='A').length,6);
const remote=households.at(-1),a=[390,185],b=[535,380];assert(Math.hypot(remote.x-b[0],remote.y-b[1])<Math.hypot(remote.x-a[0],remote.y-a[1]));assert.equal(remote.pump,'A');assert.throws(()=>exposure('unknown'));
assert.deepEqual([0,1,2,3].map(schoolChoice),[false,false,true,false]);assert.throws(()=>schoolChoice(4));assert.throws(()=>schoolChoice(0.2));
assert(!esc('<script>"&').includes('<'));
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){
 for(const figure of manifest.figures.filter(x=>x!=='map'))assert(!/undefined|NaN|Infinity|\bid=/.test(figureMarkup(locale,figure)),`${locale}/${figure}`);
 for(let value=0;value<=100;value++)assert(!/undefined|NaN|Infinity/.test(potentialMarkup(locale,value)));
 for(const trend of ['growth','stable','decline'])assert(!/undefined|NaN|Infinity/.test(timelineMarkup(locale,trend)));
 for(const view of ['geography','consumption'])assert(!/undefined|NaN|Infinity/.test(exposureMarkup(locale,view)));
 assert(schoolMarkup(locale).includes('78'));
 const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
 assert(source.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source/.test(source));
 assert.equal((source.match(/<Interactive /g)||[]).length,4);assert.equal((source.match(/<ReasoningFigure /g)||[]).length,13);
}
assert.throws(()=>figureMarkup('en','unknown'));
console.log('AoR 46: all 101 counterfactual scores/signs, fixed observed trajectories, historical counts/calendar gaps, printed versus recalculated mortality, exposure misclassification, comparison choices and bilingual rendering passed.');
