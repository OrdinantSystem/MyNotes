import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {evaluate,matrix,toggle,masks,filterModels,readerState,readMask,proofLines,proofStage,initialState} from './model.ts';
import {networkMarkup,matrixMarkup,figureMarkup,proofMarkup} from './render.ts';
import {copy} from './copy.ts';
const manifest=JSON.parse(await readFile(new URL('./manifest.json',import.meta.url)));
// Independent nested quantifier oracle over every relation, up to four objects.
let examined=0;
for(let n=1;n<=4;n++){
 let countP=0,countQ=0,countCounter=0;
 for(let mask=0;mask<2**(n*n);mask++){
  const bit=(r,c)=>Math.floor(mask/2**(r*n+c))%2===1;
  let p=true,q=false;
  for(let r=0;r<n;r++){let exists=false;for(let c=0;c<n;c++)if(bit(r,c))exists=true;p&&=exists;}
  for(let c=0;c<n;c++){let all=true;for(let r=0;r<n;r++)if(!bit(r,c))all=false;q||=all;}
  const actual=evaluate(mask,n);assert.equal(actual.P,p);assert.equal(actual.Q,q);assert.equal(actual.countermodel,p&&!q);assert.ok(!q||p);
  assert.deepEqual(actual.commonWitnesses,Array.from({length:n},(_,c)=>c).filter(c=>Array.from({length:n},(_,r)=>bit(r,c)).every(Boolean)));
  countP+=Number(p);countQ+=Number(q);countCounter+=Number(p&&!q);examined++;
  if(n===3){for(let r=0;r<n;r++)for(let c=0;c<n;c++){const changed=toggle(mask,r,c);assert.notEqual(changed,mask);assert.equal(toggle(changed,r,c),mask);assert.equal(evaluate(changed).cells[r][c],!bit(r,c));}
   for(const locale of ['en','de'])assert.equal((networkMarkup(locale,mask).match(/data-edge=/g)||[]).length,Array.from({length:9},(_,i)=>Math.floor(mask/2**i)%2).reduce((a,b)=>a+b,0));
  }
 }
 assert.equal(countP,(2**n-1)**n);assert.equal(countQ,2**(n*n)-(2**n-1)**n);
 if(n===3){assert.equal(countP,343);assert.equal(countQ,169);assert.equal(countCounter,174);}
}
assert.deepEqual(matrix(masks.shared),[[false,true,false],[false,true,false],[false,true,false]]);
assert.deepEqual(matrix(masks.cycle),[[false,true,false],[false,false,true],[true,false,false]]);
assert.equal(evaluate(masks.identity).countermodel,true);assert.equal(evaluate(masks.full).Q,true);
for(const n of [1,2,3])for(const p of ['none','P','Q','contradiction'])for(const q of ['P','Q','notQ']){
 const f=filterModels(n,p,q);assert.equal(f.total,2**(n*n));assert.equal(f.countermodels,f.worlds.filter(w=>w.included&&!w.holds).length);
 assert.equal(f.included,f.worlds.filter(w=>w.included).length);assert.equal(f.firstCounter,f.worlds.find(w=>w.counter)?.mask??null);
 if(p==='Q'&&q==='P'||p==='contradiction')assert.equal(f.countermodels,0);
}
assert.equal(filterModels(1,'P','Q').countermodels,0);assert.equal(filterModels(2,'P','Q').countermodels,2);assert.equal(filterModels(3,'P','Q').countermodels,174);
// Rectangular reading relations include empty student/book predicate extensions.
let reading=0;
for(let students=0;students<=3;students++)for(let books=0;books<=3;books++)for(let mask=0;mask<2**(students*books);mask++){
 const s=readerState(mask,students,books);assert.ok(!s.premise||s.conclusion);reading++;
 if(books===0){assert.equal(s.conclusion,true);assert.equal(s.premise,students>0);}
 if(students===0&&books>0){assert.equal(s.premise,false);assert.equal(s.conclusion,false);}
}
assert.equal(readerState(56).premise,true);assert.equal(readerState(98).premise,false);assert.equal(readerState(98).conclusion,true);
// One-sorted transfer oracle also permits overlapping student/book extensions.
let sorted=0;
for(let S=0;S<8;S++)for(let B=0;B<8;B++)for(let R=0;R<512;R++){
 const objects=[0,1,2],student=x=>Boolean(S&(1<<x)),book=y=>Boolean(B&(1<<y)),reads=(x,y)=>Boolean(R&(1<<(3*x+y)));
 const T=objects.some(x=>student(x)&&objects.every(y=>!book(y)||reads(x,y)));
 const U=objects.every(y=>!book(y)||objects.some(x=>student(x)&&reads(x,y)));
 assert.ok(!T||U);sorted++;
}
assert.equal(proofLines.length,6);assert.deepEqual(proofLines.map(l=>l.scope),[0,1,1,1,1,0]);
assert.deepEqual(proofLines.map(l=>l.rule),['premise','witness','allE','someI','allI','someE']);
assert.ok(!/[ab]/.test(proofLines[5].tex.replace(/forall/g,'').replace(/exists/g,'')));
for(let i=0;i<6;i++){assert.equal(proofStage(i),i);assert.equal((proofMarkup('en',i).match(/data-proof-line=/g)||[]).length,i+1);}
for(const x of [-1,512,NaN,1.5])assert.throws(()=>evaluate(x));assert.throws(()=>evaluate(0,0));assert.throws(()=>toggle(0,3,0));assert.throws(()=>filterModels(4,'P','Q'));assert.throws(()=>proofStage(6));
for(const raw of ['',' ','512','-1','1.5','NaN'])assert.equal(readMask(raw),null);assert.equal(readMask('98'),98);
const a=initialState(),b=initialState();a.mask=98;assert.equal(b.mask,0);
for(const locale of ['en','de']){
 const article=await readFile(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
 for(const block of article.matchAll(/\$\$([\s\S]*?)\$\$/g))assert.ok(block[1].startsWith('\n')&&block[1].endsWith('\n'),'Display delimiters occupy their own lines');
 for(const f of manifest.figures){assert.ok(article.includes(`figure="${f}"`));assert.ok(figureMarkup(locale,f).length>50);}
 for(const p of manifest.presets){assert.ok(article.includes(`preset="${p}"`));assert.ok(copy(locale).titles[p]);}
 assert.equal((matrixMarkup(locale,0,true).match(/aria-pressed="false"/g)||[]).length,9);
 assert.ok(networkMarkup(locale,146).includes('data-edge="1-1"'));
}
console.log(`AoR61: ${examined} relations (domains1–4), ${reading} rectangular reading relations, ${sorted} one-sorted transfer interpretations; toggles, filters, rendering, input bounds, proof scope and bilingual coverage passed. Enumeration is bounded, not a metatheorem proof.`);
