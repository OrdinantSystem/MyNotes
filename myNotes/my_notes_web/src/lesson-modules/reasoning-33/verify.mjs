import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {scene,crossings,time,countInput,transactions,consecutiveIds,arithmeticErrors,answers,classify,nonDetectionModels} from './model.ts';
import {sceneMarkup,worksheetMarkup,figureMarkup,inspectionNote} from './render.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),m=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
assert.equal(m.order,33);assert.equal(m.chapter,'reasoning-part-five');assert.equal(m.chapterDefinition.title.en,'Part Five');
assert.equal(crossings().length,12);assert.equal(new Set(crossings().map(r=>`${r.id}/${r.at}`)).size,12);
// Independent numerical center-line crossings: neither the event list nor period formulas are used here.
const numeric=[];let previous=scene(0);let visible=0;
for(let k=1;k<=20000;k++){
 const s=scene(k/1000);
 assert.equal(s.circles.length,12);assert.equal(s.circles.filter(p=>p.blue).length,5);
 for(const [i,p] of s.circles.entries()){
  assert.ok(p.x>=160&&p.x<=840&&p.y>=47&&p.y<=532);
  if(p.blue&&previous.circles[i].x<500&&p.x>=500)numeric.push({id:i,at:k/1000});
 }
 if(s.diamond&&s.diamond.x>=32&&s.diamond.x<=968)visible++;
 previous=s;
}
assert.equal(numeric.length,12);assert.ok(visible>=4200);
for(let i=0;i<12;i++){assert.equal(numeric[i].id,crossings()[i].id);assert.ok(Math.abs(numeric[i].at-crossings()[i].at)<.002);}
for(const t of [0,1,8,8.5,10,12.5,13,20])assert.deepEqual(scene(t),scene(t));
assert.equal(scene(7.999).diamond,null);assert.ok(scene(8).diamond);assert.ok(scene(13).diamond);assert.equal(scene(13.001).diamond,null);
assert.equal(time(-1),0);assert.equal(time(21),20);for(const n of [NaN,Infinity,-Infinity])assert.throws(()=>scene(n));
for(const s of ['', ' ', '-1','101','1.5','Infinity','no'])assert.equal(countInput(s),null);
for(const n of [0,12,100])assert.equal(countInput(String(n)),n);
assert.ok(consecutiveIds());assert.deepEqual(arithmeticErrors().map(x=>x.id),['002']);assert.equal(transactions[1].a+transactions[1].b,8);
assert.deepEqual(answers,[0,0,1,2,0,2]);assert.ok(classify([...answers]).every(r=>r.correct));assert.ok(classify(Array(6).fill(null)).every(r=>!r.answered&&!r.correct));
for(const values of [[],Array(6).fill(3),Array(6).fill(NaN)])assert.throws(()=>classify(values));
assert.deepEqual(nonDetectionModels().map(x=>x.detected),[false,false]);assert.deepEqual(nonDetectionModels().map(x=>x.exists),[false,true]);
// Exhaust all Boolean assignments: the detection premise plus non-detection forces absence.
for(const E of [false,true])for(const D of [false,true])if((!E||D)&&!D)assert.equal(E,false);
for(const locale of ['en','de']){
 const c=copy(locale),page=readFileSync(join(root,`content/${locale}/reasoning/${m.key}.mdx`),'utf8');
 for(const preset of m.presets)assert.ok(page.includes(`preset="${preset}"`));
 for(const figure of m.figures){assert.ok(page.includes(`figure="${figure}"`));assert.ok(figureMarkup(locale,figure).length>50);}
 assert.equal((sceneMarkup(locale,0).match(/data-object=/g)||[]).length,12);
 assert.ok(!sceneMarkup(locale,0).includes('data-diamond'));const svg=sceneMarkup(locale,10);assert.ok(svg.indexOf('data-diamond')>svg.lastIndexOf('data-object'));
 assert.ok(!sceneMarkup(locale,10,1,false).includes('data-diamond'));
 assert.ok(worksheetMarkup(locale,2).includes('9 ≠ 8'));assert.ok(inspectionNote(locale,2).includes('6 + 2 = 8'));
 assert.ok(page.includes('reviewStatus: unreviewed'));assert.ok(page.includes('chapter: reasoning-part-five'));
 assert.equal(c.claims.length,6);assert.equal(c.reasons.length,6);assert.ok(!page.includes('references/source/'));
}
console.log('Episode 33: 20,000-frame crossing audit (12), deterministic replay, visibility, logical countermodels, inspection scope and bilingual coverage passed.');
