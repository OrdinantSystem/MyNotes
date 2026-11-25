import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {relevanceKinds,authorityConditions,criticismTargets,workshopKeys,index,implication,isPrime,feedbackKind,presentation} from './model.ts';
import {copy} from './copy.ts';
const root=fileURLToPath(new URL('.',import.meta.url));
const accepted=[];
for(const p of [false,true])for(const q of [false,true])if(implication(p,q)&&q)accepted.push(p);
assert.deepEqual(accepted,[false,true],'Affirming the consequent admits both false and true conclusions');
assert.equal(implication(false,true),true);
const limit=3000,sieve=Array(limit+1).fill(true);sieve[0]=false;sieve[1]=false;
for(let p=2;p*p<=limit;p++)if(sieve[p])for(let n=p*p;n<=limit;n+=p)sieve[n]=false;
for(let n=0;n<=limit;n++){assert.equal(isPrime(n),sieve[n]);if(isPrime(n)&&n>2)assert.equal(n%2,1);}
assert.equal(isPrime(2),true);assert.equal(2%2,0);assert.equal(17%2,1);assert.equal(isPrime(17),true);assert.equal(15%2,1);assert.equal(isPrime(15),false);assert.equal(3*5,15);
for(const n of [-7,.5,NaN,Infinity])assert.equal(isPrime(n),false);
assert.deepEqual(relevanceKinds,['relevant','insufficient','irrelevant']);assert.deepEqual(authorityConditions,[['met','met','met'],['met','missing','met'],['met','outdated','met'],['missing','missing','missing']]);assert.deepEqual(criticismTargets,['person','connection','scrutiny','evidence']);
for(const inspection of [false,true])assert.equal(presentation(false,inspection).technicalSupport,presentation(true,inspection).technicalSupport);
for(const vivid of [false,true])assert.equal(presentation(vivid,false).emotionalStyle,presentation(vivid,true).emotionalStyle);
assert.equal(new Set([false,true].flatMap(v=>[false,true].map(i=>JSON.stringify(presentation(v,i))))).size,4);
for(let i=0;i<4;i++){assert.equal(index(i-10,4),0);assert.equal(index(i+10,4),3);assert.equal(feedbackKind(i,workshopKeys[i]),'matches');assert.equal(feedbackKind(i,'false'),'truth-confusion');assert.equal(feedbackKind(i,null),'unanswered');assert.equal(feedbackKind(i,workshopKeys[i]==='relevant'?'irrelevant':'relevant'),'reconsider');}
for(const n of [NaN,Infinity,.5])assert.throws(()=>index(n,4),RangeError);assert.equal(index(1,1),0);
const m=JSON.parse(await readFile(new URL('manifest.json',import.meta.url),'utf8'));
for(const l of ['en','de']){
 const c=copy(l),body=await readFile(new URL(`content/${l}/reasoning/${m.key}.mdx`,import.meta.url),'utf8');
 assert.equal(c.workshopQuestions.length,4);assert.equal(c.workshopReasons.length,4);assert.equal(c.answers.length,3);assert.equal(c.questions.length,4);assert.equal(c.background.length,4);assert.equal(c.authorityNames.length,4);
 for(const figure of m.figures)assert.ok(body.includes(`figure="${figure}"`));for(const preset of m.presets)assert.ok(body.includes(`preset="${preset}"`));
 assert.equal((body.match(/preset="/g)||[]).length,5);
}
if(root.includes('/src/lesson-modules/')){
 const r=await import('./render.ts');assert.equal(r.esc('<"&'), '&lt;&quot;&amp;');
 for(const l of ['en','de']){
  for(const f of m.figures){const html=r.figureMarkup(l,f);assert.ok(html.length>100);assert.ok(!/NaN|undefined|Infinity|katex-error/.test(html));}
  assert.throws(()=>r.figureMarkup(l,'unknown'));
  for(let i=0;i<3;i++){const html=r.relevanceMarkup(l,i);assert.ok(html.includes(copy(l).rain));assert.ok(html.includes(copy(l).rainConclusions[i]));}
  for(let i=0;i<4;i++){assert.ok(r.authorityMarkup(l,i).includes(copy(l).authorityNames[i]));assert.ok(r.criticismMarkup(l,i).includes(copy(l).criticismResults[i]));const unrevealed=r.workshopMarkup(l,i);assert.ok(!unrevealed.includes('aor52-reference'));assert.ok(r.workshopMarkup(l,i,'false',true).includes(copy(l).truthConfusion));}
  const plain=r.persuasionMarkup(l,false,false),vivid=r.persuasionMarkup(l,true,false);assert.ok(plain.includes(copy(l).absent));assert.ok(vivid.includes(copy(l).absent));assert.ok(r.persuasionMarkup(l,false,true).includes(copy(l).present));
 }
}
console.log('reasoning-52: Boolean countermodel, independent sieve through 3000, 2/15/17 distinctions, bounded cases, independent presentation/evidence dimensions, workshop feedback and bilingual coverage passed.');
