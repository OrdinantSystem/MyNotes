import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {representations,evidence,oddParts,readK,step,caseBound,oddStatement} from './model.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),manifest=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
assert.equal(manifest.order,32);assert.equal(manifest.key,'discover-a-theorem');
// Independent accumulation rather than the model's closed formula.
for(let n=1;n<=400;n++){
 const brute=[];
 for(let a=1;a<n;a++){
  let sum=a;const terms=[a];
  for(let b=a+1;sum<n;b++){sum+=b;terms.push(b);if(sum===n)brute.push([...terms]);}
 }
 const normalize=rows=>rows.map(r=>r.join(',')).sort();
 assert.deepEqual(normalize(representations(n)),normalize(brute));
 for(const row of representations(n)){
  assert.ok(row.length>=2&&row[0]>=1);assert.equal(row.reduce((a,b)=>a+b,0),n);
  assert.ok(row.every((x,i)=>i===0||x===row[i-1]+1));
 }
}
assert.deepEqual(representations(15),[[7,8],[4,5,6],[1,2,3,4,5]]);
assert.deepEqual([4,8,16].map(evidence),['unknown','unknown','unknown']);
assert.deepEqual([1,2].map(evidence),['excluded','excluded']);
for(const n of [3,5,6,7,9,10,11,12,13,14,15,17,18,19,20])assert.equal(evidence(n),'found');
assert.equal(caseBound(8),3);assert.equal(caseBound(16),5);assert.equal(caseBound(1),1);
for(let k=1;k<=10;k++){const p=oddParts(k);assert.equal(p.left+p.right,p.total);assert.equal(p.right-p.left,1);assert.ok(p.left>=1);}
for(const raw of ['', ' ', '0', '-1', '1.5', '11', 'Infinity', 'no'])assert.equal(readK(raw),null);
assert.equal(readK('1'),1);assert.equal(readK('10'),10);
for(const n of [0,-1,1.5,10001,NaN,Infinity])assert.throws(()=>representations(n));
for(const n of [0,-1,11,NaN])assert.throws(()=>oddParts(n));
assert.equal(step(0,-1),0);assert.equal(step(3,1),3);assert.equal(step(2,-1),1);
for(const locale of ['en','de']){
 const c=copy(locale);
 if(root.includes('/src/lesson-modules/')){
 const {evidenceMarkup,proofMarkup}=await import('./render.ts');
 for(const n of [4,8,16]){const html=evidenceMarkup(locale,n);assert.ok(html.includes(c.unknown));assert.ok(!html.includes(c.excluded));}
 for(let stage=0;stage<4;stage++){
  const html=proofMarkup(locale,5,stage);assert.ok(html.includes(oddStatement[locale]));
  assert.equal((html.match(/data-proof-card/g)||[]).length,1);
  assert.ok(html.includes(`data-proof-card class="aor32-card ${stage===3?'aor32-established':'aor32-pending'}"`));
  assert.equal(html.includes('data-general'),stage>=2);
 }
 }
 const content=readFileSync(join(root,`content/${locale}/reasoning/${manifest.key}.mdx`),'utf8');
 assert.ok(content.includes(`locale: ${locale}`)&&content.includes('reviewStatus: unreviewed'));
 for(const preset of manifest.presets)assert.ok(content.includes(`preset="${preset}"`));
 for(const figure of manifest.figures)assert.ok(content.includes(`figure="${figure}"`));
 assert.equal((content.match(/^## /gm)||[]).length,12);
 assert.ok(!content.includes('creator\'s reference'));
}
const en=readFileSync(join(root,'content/en/reasoning/discover-a-theorem.mdx'),'utf8');
for(const phrase of ['We didn\'t check more numbers. We changed the nature of our justification.','Our argument has covered every possible number of terms','not a power of two.','Since $k\\geq 1$, both summands are positive.'])assert.ok(en.includes(phrase),phrase);
assert.ok(!en.includes('utm_source')&&!en.includes('/Users/')&&!en.includes('attachments/'));
console.log('Lesson 32: independent witness enumeration 1–400; evidence scope, odd construction, input boundaries, proof stages and bilingual component coverage pass.');
