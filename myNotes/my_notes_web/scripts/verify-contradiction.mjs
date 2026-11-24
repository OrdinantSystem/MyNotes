import assert from 'node:assert/strict';
import {primeCollection,primeFactors,isPrime,primeCountInput,smallestAnswer,euclidStage,initialContradictionState,contradictionFigures} from '../src/lib/interactive/contradiction-model.ts';
import {primeBuilderMarkup,euclidMarkup,smallestFeedback,groupedObjects,contradictionFigure} from '../src/lib/interactive/contradiction-render.ts';
import {contradictionText} from '../src/lib/reasoning/contradiction-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
import {evaluate} from '../src/lib/interactive/logic-model.ts';
const expected=[3,7,31,211,2311,30031,510511];
for(let count=1;count<=7;count++){
 const s=primeCollection(count);assert.equal(s.n,expected[count-1]);assert.equal(s.primes.length,count);assert.equal(s.product,s.primes.reduce((a,b)=>a*b,1));assert.equal(s.factors.reduce((a,b)=>a*b,1),s.n);assert(s.factors.every(isPrime));assert(s.outside);assert(s.factors.every(q=>!s.primes.includes(q)));for(const row of s.remainders){assert.equal(row.remainder,1);assert.equal(row.p*row.quotient+1,s.n);}assert.equal(s.prime,count<=5);
}
assert.deepEqual(primeFactors(30031),[59,509]);assert.deepEqual(primeFactors(510511),[19,97,277]);assert.deepEqual(primeFactors(64),[2,2,2,2,2,2]);
const sieve=Array(1001).fill(true);sieve[0]=sieve[1]=false;for(let p=2;p*p<=1000;p++)if(sieve[p])for(let n=p*p;n<=1000;n+=p)sieve[n]=false;
for(let n=1;n<=1000;n++){assert.equal(isPrime(n),sieve[n]);if(n>1){const f=primeFactors(n);assert.equal(f.reduce((a,b)=>a*b,1),n);assert(f.every(q=>sieve[q]));}}
for(const a of [false,true])for(const b of [false,true]){assert.equal(!evaluate('implication',a,b),a&&!b);assert.equal(evaluate('and',b,!b),false);}
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 const c=contradictionText(locale);for(const s of strings(c)){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(let count=1;count<=7;count++){const html=primeBuilderMarkup(locale,count);assert(!/NaN|undefined|katex-error/.test(html));assert.equal((html.match(/<tr>/g)||[]).length,count+1);}
 for(let stage=0;stage<=5;stage++){const html=euclidMarkup(locale,stage);assert(!/NaN|undefined|katex-error/.test(html));assert(html.includes(c.allPrimes));assert(html.includes(c.stages[stage]));}
 for(const kind of contradictionFigures){assert(kind.slice(14) in c.figures);assert(!/NaN|undefined|katex-error/.test(contradictionFigure(locale,kind)),kind);}
 const grid=contradictionFigure(locale,'contradiction-prime-grid');assert.equal((grid.match(/data-prime="true"/g)||[]).length,15);assert.equal((grid.match(/data-prime=/g)||[]).length,50);
 for(const extra of [false,true]){const groups=groupedObjects(locale,extra);assert.equal((groups.match(/<i>/g)||[]).length,extra?93:90);assert.equal((groups.match(/class="contradiction-object-group"/g)||[]).length,10);}
 for(let choice=0;choice<4;choice++){assert.equal(smallestAnswer(choice),choice===2);assert(!/katex-error|undefined/.test(smallestFeedback(locale,choice)));}
 assert.equal(smallestFeedback(locale,null),'');
}
for(const raw of ['',' ','0','8','1.5','-1','NaN','Infinity'])assert.equal(primeCountInput(raw),null);for(let n=1;n<=7;n++)assert.equal(primeCountInput(String(n)),n);
for(const n of [0,8,1.5,NaN])assert.throws(()=>primeCollection(n));for(const n of [0,1,1000001,NaN])assert.throws(()=>primeFactors(n));for(const n of [-1,6,1.5])assert.throws(()=>euclidStage(n));for(const n of [-1,4,1.5])assert.throws(()=>smallestAnswer(n));assert.equal(smallestAnswer(null),null);
const a=initialContradictionState(),b=initialContradictionState();a.count=6;a.stage=5;a.answer=2;assert.deepEqual(b,{count:3,stage:0,answer:null});
console.log('Verified seven product-plus-one constructions and exact factorizations, 1,000 primality checks against an independent sieve, four conditional valuations, all 24 figures and six proof stages in both locales, object counts, every answer and invalid-input/isolation boundaries.');
