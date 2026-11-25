import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fairDistribution,twoSided,familyProbability,coinProbability,thresholds,results,questions,relevant,initialState} from './model.ts';
// An independent integer combinatorial oracle, not the floating recurrence used by the UI.
function choose(n,k){let out=1n;for(let i=1;i<=k;i++)out=out*BigInt(n-i+1)/BigInt(i);return out;}
let binomialChecks=0;
for(let n=0;n<=100;n++){
 const distribution=fairDistribution(n);assert(Math.abs(distribution.reduce((s,p)=>s+p,0)-1)<2e-14);
 for(let h=0;h<=n;h++){
  let numerator=0n;for(let k=0;k<=n;k++)if(Math.abs(2*k-n)>=Math.abs(2*h-n))numerator+=choose(n,k);
  const oracle=Number(numerator)/Number(2n**BigInt(n));assert(Math.abs(twoSided(h,n)-oracle)<2e-14);assert(Math.abs(twoSided(h,n)-twoSided(n-h,n))<2e-14);binomialChecks++;
 }
}
assert(Math.abs(coinProbability-.0352002002177048)<1e-14);
assert.equal(twoSided(50),1);assert.equal(twoSided(0),2**(-99));
assert.deepEqual(thresholds(61),{low:39,high:61});
assert.equal(Math.max(...results),61);assert.equal(results.length,20);
assert(Math.abs(familyProbability(20,.05)-.641514077591458)<1e-14);
assert(Math.abs(familyProbability(20,coinProbability)-.511635492637726)<1e-10);
// Enumerate all tiny independent test outcomes with rational integer weights.
let familyChecks=0;
for(let count=0;count<=8;count++)for(let numerator=0;numerator<=10;numerator++){
 let atLeastOne=0n;for(let mask=1;mask<2**count;mask++){let weight=1n;for(let i=0;i<count;i++)weight*=BigInt(mask&(1<<i)?numerator:10-numerator);atLeastOne+=weight;}
 const oracle=Number(atLeastOne)/10**count;assert(Math.abs(familyProbability(count,numerator/10)-oracle)<1e-14);familyChecks++;
}
for(const rate of [0,.01,.05,.1,coinProbability,1]){let previous=-1;for(let n=0;n<=100;n++){const p=familyProbability(n,rate);assert(p>=previous&&p>=0&&p<=1);previous=p;}}
for(let h=50;h<100;h++)assert(twoSided(h+1)<=twoSided(h));
for(const x of [-1,101,.5,NaN,Infinity]){assert.throws(()=>twoSided(x));assert.throws(()=>familyProbability(x,.05));assert.throws(()=>fairDistribution(x));}
for(const x of [-.1,1.1,NaN,Infinity])assert.throws(()=>familyProbability(20,x));
assert.throws(()=>relevant('unknown'));assert.equal(questions.filter(relevant).length,5);
const a=initialState(),b=initialState();a.selected.push('comparisons');a.count=100;assert.equal(b.selected.length,0);assert.equal(b.count,20);
if(!process.argv.includes('--model-only')){
 const {figureMarkup,tailsMarkup,searchMarkup,studyMarkup}=await import('./render.ts');
 const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url)));
 const good=html=>{assert(!/katex-error|undefined|NaN|Infinity|\bid=/.test(html));};
 for(const locale of ['en','de']){
  for(const figure of manifest.figures)good(figureMarkup(locale,figure));
  for(let heads=0;heads<=100;heads++)good(tailsMarkup(locale,heads));
  for(const rate of [.01,.05,.1,coinProbability])for(const count of [1,20,100])good(searchMarkup(locale,count,rate));
  for(let mask=0;mask<64;mask++){const selected=questions.filter((_,i)=>mask&(1<<i));good(studyMarkup(locale,selected,true));assert(!studyMarkup(locale,selected,false).includes('60'));}
  const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
  for(const figure of manifest.figures)assert(source.includes(`figure="${figure}"`));for(const preset of manifest.presets)assert(source.includes(`preset="${preset}"`));
  assert(source.includes('reviewStatus: unreviewed'));assert(!/references\/source|\/Users\/|utm_source|Manim|Remotion/.test(source));
 }
}
console.log(`AoR 47: ${binomialChecks} exact combinatorial p-value comparisons; ${familyChecks} enumerated family probabilities; symmetry, monotonicity, bounds, five relevant study questions and isolated state passed. ${process.argv.includes('--model-only')?'Staging model check.':'Twelve bilingual figures, all head counts and all 64 study selections rendered.'}`);
