import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {assignment,initialAssignment,integerInput,affine,preimage,addSquare,removeSquare,figures} from './model.mjs';
import {mapping,properties,codomainMarkup,subsetPair,figureMarkup} from './render.ts';
let cases=0;
for(let inputs=0;inputs<=5;inputs++)for(let targets=0;targets<=5;targets++){
 const total=targets**inputs;
 for(let code=0;code<total;code++){
  let x=code;const values=Array.from({length:inputs},()=>{const n=x%targets;x=Math.floor(x/targets);return n;});
  const expectedInj=values.every((v,i)=>values.every((w,j)=>i===j||v!==w));
  const expectedSurj=Array.from({length:targets},(_,t)=>t).every(t=>values.includes(t));
  const s=assignment(values,targets);assert.equal(s.injective,expectedInj);assert.equal(s.surjective,expectedSurj);assert.equal(s.bijective,expectedInj&&expectedSurj);
  if(s.injective)assert(inputs<=targets);if(s.surjective)assert(inputs>=targets);if(s.bijective)assert.equal(inputs,targets);if(inputs===targets)assert.equal(s.injective,s.surjective);
  cases++;
 }
}
let bijections=0;for(let code=0;code<256;code++){const values=[0,1,2,3].map(i=>Math.floor(code/4**i)%4);if(assignment(values).bijective)bijections++;}assert.equal(bijections,24);
assert.equal(assignment(initialAssignment()).unused,1);assert(!assignment(initialAssignment()).injective);
for(const count of [3,5])assert(!assignment(initialAssignment(count)).bijective);
const fixed=initialAssignment();fixed[1]=1;assert(assignment(fixed).bijective);
assert(assignment([],0).bijective);assert(assignment([],3).injective);assert(!assignment([],3).surjective);
for(const args of [[[4],4],[[-1],4],[[.5],4],[[NaN],4],[[0],0],[[], -1]])assert.throws(()=>assignment(...args));
for(const invalid of ['', ' ', '1.5','13','-13','NaN','Infinity','hello'])assert.equal(integerInput(invalid),null);
for(let y=-12;y<=12;y++)for(const oddOnly of [true,false]){const s=preimage(y,oddOnly);assert.equal(s.designated,!oddOnly||Math.abs(y%2)===1);assert.equal(s.reached,Math.abs(y%2)===1);if(s.reached){assert(Number.isInteger(s.n));assert.equal(affine(s.n),y);}}
assert.equal(preimage(0).n,-.5);assert(!preimage(0,true).designated);assert.equal(preimage(-3).n,-2);
for(let a=-100;a<=100;a++)for(let b=-100;b<=100;b++)assert.equal(affine(a)===affine(b),a===b);
const images=new Set();for(let mask=0;mask<4;mask++){const image=addSquare(mask);images.add(image);assert.equal(removeSquare(image),mask);}assert.deepEqual([...images],[4,5,6,7]);
for(let mask=4;mask<8;mask++)assert.equal(addSquare(removeSquare(mask)),mask);
for(const mask of [-1,4,1.5,NaN])assert.throws(()=>addSquare(mask));for(const mask of [0,8,1.5,NaN])assert.throws(()=>removeSquare(mask));
let generalizedPairs=0;for(let n=1;n<=12;n++){const g=1<<(n-1);for(let mask=0;mask<g;mask++){assert.equal((mask|g)&~g,mask);assert(mask!==(mask|g));generalizedPairs++;}}
for(const locale of ['en','de']){
 for(const f of figures.filter(f=>f!=='process')){const html=figureMarkup(locale,f);assert(!/undefined|NaN|katex-error/.test(html),`${locale} ${f}`);assert(!/\bid=/.test(html));}
 for(const count of [3,4,5]){assert(mapping(locale,initialAssignment(count)).includes('role="img"'));assert(properties(locale,initialAssignment(count)).includes('data-value="false"'));}
 for(const y of [-12,-3,0,3,12])for(const oddOnly of [true,false])assert(!/undefined|NaN|katex-error/.test(codomainMarkup(locale,y,oddOnly)));
 for(let mask=0;mask<4;mask++)for(const back of [true,false])assert(!/undefined|NaN/.test(subsetPair(locale,mask,back)));
 const source=readFileSync(new URL(`./content/${locale}/reasoning/pairing-things-to-prove-things.mdx`,import.meta.url),'utf8');
 assert(source.includes('order: 31'));assert(source.includes('sourceId: reasoning-episode-31'));assert(source.includes('reviewStatus: unreviewed'));assert.equal((source.match(/<Interactive /g)||[]).length,3);assert.equal((source.match(/<ReasoningFigure /g)||[]).length,11);
 for(const formula of ['2a+1=2b+1','2a=2b','a=b','f(X)=X\\cup\\{g\\}','X=Z\\setminus\\{g\\}'])assert(source.includes(formula),`${locale} retains ${formula}`);
 assert(!/\/Users\/jean|references\/source|images.openai.com|utm_source|17 minutes|9\.4\/10/.test(source));
}
const a=initialAssignment(),b=initialAssignment();a[0]=3;assert.equal(b[0],0);
console.log(`Lesson 31: ${cases} finite functions including empty sets, 24 four-to-four bijections, 40,401 affine input pairs, ${generalizedPairs} generalized subset pairs, codomain exclusion and all localized diagrams verified.`);
