import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {weighted,percentageInput,timetables,sleepSchedules,sleepMinutes,diagnose,workshopAnswers,widerOptions,compatibleClaims} from './model.ts';
import {figureMarkup,prioritiesMarkup,esc} from './render.ts';
for(let n=0;n<=1000;n++){
 const s=weighted(n),w=n/1000;
 assert(Math.abs(s.existing-(90-30*w))<1e-10);assert(Math.abs(s.proposed-(55+30*w))<1e-10);
 assert.equal(s.preferred,12*n>7000?'proposed':12*n<7000?'existing':'tie');
 assert.equal(percentageInput(n/10),n);
 assert(s.existing>=60&&s.existing<=90);assert(s.proposed>=55&&s.proposed<=85);
 if(n<1000){assert(weighted(n+1).existing<s.existing);assert(weighted(n+1).proposed>s.proposed);}
}
assert.deepEqual(timetables,{existing:{learning:60,accessibility:90},proposed:{learning:85,accessibility:55}});
assert.equal(weighted(650).existing,70.5);assert.equal(weighted(650).proposed,74.5);
assert.equal(weighted(7,12).preferred,'tie');assert.equal(weighted(7,12).existing,72.5);assert.equal(weighted(7,12).proposed,72.5);
assert.equal(weighted(583).preferred,'existing');assert.equal(weighted(584).preferred,'proposed');
assert.equal(weighted(0).preferred,'existing');assert.equal(weighted(1000).preferred,'proposed');
for(const args of [[-1],[1001],[0.5],[NaN],[Infinity],[1,0],[2,1],[1,1000001],[Number.MAX_SAFE_INTEGER+1,1000]])assert.throws(()=>weighted(...args));
for(const v of [-1,101,NaN,Infinity,58.33])assert.throws(()=>percentageInput(v));
assert.deepEqual(sleepSchedules.map(x=>sleepMinutes(x.bed,x.wake)),[420,480,420]);assert.equal(sleepMinutes(22*60,2*60),240);assert.equal(sleepMinutes(0,0),0);
for(const args of [[-1,0],[0,1440],[NaN,3],[0.5,10]])assert.throws(()=>sleepMinutes(...args));
assert.deepEqual(workshopAnswers,[1,1,1,2]);
for(let q=0;q<4;q++){const correct=[];for(let c=0;c<3;c++)if(diagnose(q,c))correct.push(c);assert.deepEqual(correct,[workshopAnswers[q]]);}
for(const args of [[-1,0],[4,0],[0,3],[0,0.5]])assert.throws(()=>diagnose(...args));
for(const p of [false,true])for(const q of [false,true]){assert.equal(compatibleClaims(p,q).conjunction,p&&q);assert.equal(p||!p,true);}assert.equal(compatibleClaims(true,true).conjunction,true);
assert.equal(new Set(widerOptions).size,6);assert(widerOptions.includes('half-hour')); // Rejecting 9:00 need not mean doing nothing.
assert(!esc('<script>"&').includes('<'));
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){
 for(const figure of manifest.figures){const html=figureMarkup(locale,figure);assert(!/undefined|NaN|Infinity|\bid=/.test(html),`${locale}/${figure}`);}
 for(let n=0;n<=1000;n++)assert(!/NaN|undefined|Infinity/.test(prioritiesMarkup(locale,n)));
 const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
 assert(source.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source/.test(source));assert.equal((source.match(/<ReasoningFigure /g)||[]).length,16);assert.equal((source.match(/<Interactive /g)||[]).length,2);assert(source.includes('\\frac{7}{12}'));
}
assert.throws(()=>figureMarkup('en','missing'));
console.log('AoR 54: all 1,001 weights, exact 7/12 tie, rounded-threshold neighbours, monotonicity and limits; overnight sleep schedules; every workshop choice; compatible claims, alternatives, bilingual rendering and source boundaries passed.');
