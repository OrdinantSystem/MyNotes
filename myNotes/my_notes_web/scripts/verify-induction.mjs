import assert from 'node:assert/strict';
import {squareGrowth,layerCells,tileInput,chainState,primePolynomial,checkpointAnswer,initialInductionState,inductionFigures} from '../src/lib/interactive/induction-model.ts';
import {tileMarkup,chainMarkup,checkpointFeedback,inductionFigure,inductionTitle} from '../src/lib/interactive/induction-render.ts';
import {inductionText} from '../src/lib/reasoning/induction-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
for(let k=1;k<=8;k++){const s=squareGrowth(k),cells=layerCells(k+1);assert.equal(s.existing+s.column+s.row+s.corner,s.total);assert.equal(s.added,s.total-s.existing);assert.equal(cells.length,s.total);assert.equal(new Set(cells.map(c=>`${c.x},${c.y}`)).size,cells.length);for(let j=1;j<=k+1;j++)assert.equal(cells.filter(c=>c.layer===j).length,2*j-1);assert.equal(tileInput(String(k)),k);}
for(let n=1;n<=100;n++){assert.equal(Array.from({length:n},(_,i)=>2*i+1).reduce((a,b)=>a+b,0),n*n);assert.equal(Array.from({length:n},(_,i)=>i+1).reduce((a,b)=>a+b,0),n*(n+1)/2);assert.equal(Array.from({length:n},(_,i)=>(i+1)**2).reduce((a,b)=>a+b,0),n*(n+1)*(2*n+1)/6);}
const sieve=Array(1682).fill(true);sieve[0]=sieve[1]=false;for(let p=2;p*p<sieve.length;p++)if(sieve[p])for(let j=p*p;j<sieve.length;j+=p)sieve[j]=false;
for(let n=0;n<=40;n++){const s=primePolynomial(n);assert.equal(s.value,n*n+n+41);assert.equal(s.prime,sieve[s.value]);assert.equal(s.prime,n<40);}assert.equal(primePolynomial(40).divisor,41);
assert.deepEqual(chainState('unstarted').established,Array(6).fill(false));assert.deepEqual(chainState('connected').established,Array(6).fill(true));assert.deepEqual(chainState('broken').established,[true,true,true,false,false,false]);
for(const raw of ['',' ','0','9','1.5','-1','NaN','Infinity'])assert.equal(tileInput(raw),null);for(const n of [0,9,1.5,NaN])assert.throws(()=>squareGrowth(n));for(const n of [0,10,1.5])assert.throws(()=>layerCells(n));for(const n of [-1,41,.5])assert.throws(()=>primePolynomial(n));assert.throws(()=>chainState('unknown'));
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 for(const s of strings(inductionText(locale))){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(const kind of inductionFigures){assert(inductionTitle(locale,kind));const html=inductionFigure(locale,kind);assert(!/NaN|undefined|katex-error/.test(html),kind);assert(!/\sid=/.test(html));}
 for(let k=1;k<=8;k++)for(const reveal of [false,true]){const html=tileMarkup(locale,k,reveal);assert(!/NaN|undefined|katex-error/.test(html));assert.equal((html.match(/data-region="existing"/g)||[]).length,k*k);assert.equal((html.match(/data-region="column"/g)||[]).length,k);assert.equal((html.match(/data-region="row"/g)||[]).length,k);assert.equal((html.match(/data-region="corner"/g)||[]).length,1);assert.equal(html.includes('<dl'),reveal);}
 for(const mode of ['unstarted','connected','broken'])assert(!/katex-error|undefined/.test(chainMarkup(locale,mode)));
 for(let row=0;row<4;row++){assert.equal(checkpointAnswer(row,null),null);for(let choice=0;choice<3;choice++){const html=checkpointFeedback(locale,row,choice);assert(!/katex-error|undefined/.test(html));assert(html.includes(`data-induction-correct="${checkpointAnswer(row,choice)}"`));}}
 const grid=inductionFigure(locale,'induction-prime-grid');assert.equal((grid.match(/data-polynomial-prime="true"/g)||[]).length,40);assert.equal((grid.match(/data-polynomial-prime="false"/g)||[]).length,1);
}
for(const row of [-1,4,.5])assert.throws(()=>checkpointAnswer(row,0));for(const choice of [-1,3,.5])assert.throws(()=>checkpointAnswer(0,choice));
const a=initialInductionState(),b=initialInductionState();a.k=8;a.revealed=true;a.mode='broken';a.answers[0]=1;assert.deepEqual(b,{k:4,revealed:false,mode:'unstarted',answers:[null,null,null,null]});
console.log('Verified exact tile partitions/layer counts, odd/triangular/square sums for 100 inputs, polynomial primes against independent sieve and first failure 40, chain reachability, all 20 figures in EN/DE, every checkpoint choice, invalid bounds and independent state.');
