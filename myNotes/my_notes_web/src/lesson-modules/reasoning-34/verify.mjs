import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {frame,duration,study,claims,sourceFeedback,initialDetails,addDetail,removeDetail,validateDetail,maxDetails} from './model.ts';
import {room,figureMarkup,detailRows,worksheetText,esc} from './render.ts';
import {text} from './copy.ts';
// Inspect every 1/100-second frame against event boundaries and deterministic replay.
for(let i=0;i<=1200;i++){const t=i/100,f=frame(t);assert.deepEqual(f,frame(t));assert.equal(f.umbrella,false);assert.equal(f.clockHour,8);assert.equal(f.clockMinute,20);assert.equal(f.bagOnTable,t>=4);assert.equal(f.personVisible,t<11.5);assert.equal(f.cupX,t<6?600:650);assert(f.x>=80&&f.x<=340);}
assert.equal(frame(3.99).bagOnTable,false);assert.equal(frame(4).bagOnTable,true);assert.equal(frame(5.99).cupX,600);assert.equal(frame(6).cupX,650);assert.equal(frame(duration).personVisible,false);
for(const bad of [-.01,12.01,NaN,Infinity])assert.throws(()=>frame(bad));
assert.deepEqual(study.map(d=>d.mean),[31.8,34,38.1,39.3,40.8]);assert.deepEqual(study.map(d=>Math.round(d.mean)),[32,34,38,39,41]);
for(const c of claims){assert.equal(sourceFeedback(c.id,c.source),'supported');assert.equal(sourceFeedback(c.id,'unsure'),'unsure');for(const s of ['seen','inferred','later'])if(s!==c.source)assert.equal(sourceFeedback(c.id,s),c.source);}
assert.throws(()=>sourceFeedback('not-a-claim','seen'));
let rows=initialDetails('en');const independent=initialDetails('en');rows[0].claim='Changed';assert.notEqual(rows[0].claim,independent[0].claim);
while(rows.length<maxDetails){const old=rows;rows=addDetail(rows);assert.equal(rows.length,old.length+1);assert.notEqual(rows[0],old[0]);}
assert.throws(()=>addDetail(rows));while(rows.length>1)rows=removeDetail(rows,rows.length-1);assert.throws(()=>removeDetail(rows,0));assert.throws(()=>removeDetail(initialDetails('en'),-1));assert.throws(()=>validateDetail({...rows[0],claim:'x'.repeat(601)}));assert.throws(()=>validateDetail({...rows[0],source:'guessed'}));
const malicious='<img src=x onerror="alert(1)">&';assert(!esc(malicious).includes('<'));assert(esc(malicious).includes('&amp;'));
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){
 for(const figure of manifest.figures){const html=figureMarkup(locale,figure);assert(!/undefined|NaN|\bid=/.test(html),`${locale}/${figure}`);}
 assert(!room(locale,7).includes('stroke-dasharray="8 5"'));assert(room(locale,7,true).includes('stroke-dasharray="8 5"'));
 const details=initialDetails(locale);assert(worksheetText(text(locale),details).includes(details[0].claim));const html=detailRows(locale,[{...details[0],claim:malicious,evidence:malicious}]);assert(!html.includes('<img'));assert(!html.includes('value="<'));
 const mdx=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');assert(mdx.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source/.test(mdx));
}
console.log('AoR 34: 1,201 deterministic scene frames and boundary checks; source-origin feedback; independent worksheet state, limits, removal and escaping; exact study means; twelve bilingual figure renders.');
