import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {formatTime,minute,offsetInput,handPoints,layers,tracking,cases,evidenceState,trialDivisors,isPrime,primeExample,practiceAnswer,initialState} from './model.ts';
for(let a=985;a<=995;a++)for(let b=985;b<=995;b++){const s=layers(a,b);assert.equal(s.truthOfP,a===990);assert.equal(s.believesP,b===990);assert.equal(s.beliefCorrect,a===b);assert.equal(s.proposition,990);}
for(let a=985;a<=995;a++){assert.deepEqual(tracking(a),{actual:a,functioning:a,stopped:990,functioningMatches:true,stoppedMatches:a===990});assert.equal(offsetInput(String(a-985)),a-985);}
for(let n=0;n<1440;n++){assert.equal(formatTime(n),`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`);const h=handPoints(n);assert(Math.abs(Math.hypot(h.hour.x-80,h.hour.y-80)-32)<1e-10);assert(Math.abs(Math.hypot(h.minute.x-80,h.minute.y-80)-49)<1e-10);}
const h=handPoints(990);assert(h.hour.x>80&&h.hour.y>80);assert(Math.abs(h.minute.x-80)<1e-9);assert.equal(h.minute.y,129);
// Independent expected source cases: mechanism, awareness, actual basis, grounds.
const expected={stopped:[false,false,'clock','plausible'],repaired:[true,false,'clock','plausible'],discovered:[false,true,'clock','undermined'],'phone-used':[false,true,'phone','independent'],'phone-unused':[false,true,'clock','undermined'],copies:[false,true,'copies','undermined']};
for(const kind of cases)for(const actual of [990,991]){const s=evidenceState(kind,actual),[working,aware,basis,grounds]=expected[kind];assert.deepEqual([s.working,s.aware,s.basis,s.grounds],[working,aware,basis,grounds]);assert.equal(s.belief,kind==='repaired'||kind==='phone-used'?actual:990);assert.equal(s.beliefCorrect,actual===990||kind==='repaired'||kind==='phone-used');assert.equal(s.independentAvailable,kind==='phone-used'||kind==='phone-unused');assert.equal(s.independentUsed,kind==='phone-used');assert.equal(s.copies,kind==='copies'?10:0);assert(!('knowledge' in s));}
// A sieve supplies an independent primality oracle, rather than calling the trial algorithm twice.
const sieve=Array(10001).fill(true);sieve[0]=sieve[1]=false;for(let p=2;p*p<=10000;p++)if(sieve[p])for(let n=p*p;n<=10000;n+=p)sieve[n]=false;
for(let n=0;n<=10000;n++)assert.equal(isPrime(n),sieve[n],String(n));
assert.deepEqual(primeExample(7).candidateDivisors,[2]);assert.deepEqual(primeExample(9).divisors,[3]);assert.equal(isPrime(1),false);assert.equal(isPrime(9),false);
for(let q=0;q<4;q++)for(let a=0;a<3;a++)assert.equal(practiceAnswer(q,a).matchesReasoning,[1,0,1,2][q]===a);
for(const raw of ['', ' ', '-1','11','1.5','NaN','Infinity','x'])assert.equal(offsetInput(raw),null);
for(const n of [-1,1440,.5,NaN,Infinity])assert.throws(()=>minute(n));for(const n of [984,996])assert.throws(()=>layers(n,990));assert.throws(()=>evidenceState('other',990));assert.throws(()=>evidenceState('stopped',992));assert.throws(()=>primeExample(11));assert.throws(()=>trialDivisors(1));assert.throws(()=>isPrime(10001));assert.throws(()=>practiceAnswer(4,0));assert.throws(()=>practiceAnswer(0,3));
const a=initialState(),b=initialState();a.answers[0]=1;a.revealed[0]=true;a.actual=991;assert.equal(b.actual,990);assert.deepEqual(b.answers,[null,null,null,null]);assert.deepEqual(b.revealed,[false,false,false,false]);
if(!process.argv.includes('--model-only')){
 const {figureMarkup,layersMarkup,trackingMarkup,evidenceMarkup}=await import('./render.ts');const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
 const good=html=>{assert(!/katex-error|undefined|NaN|Infinity|references\/source|\/Users\//.test(html));assert(!/\bid=/.test(html));};
 for(const locale of ['en','de']){for(const f of manifest.figures)good(figureMarkup(locale,f));for(let a=985;a<=995;a++){good(trackingMarkup(locale,a));for(let b=985;b<=995;b++)good(layersMarkup(locale,a,b));}for(const k of cases)for(const n of [990,991])good(evidenceMarkup(locale,k,n));const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');for(const f of manifest.figures)assert(source.includes(`figure="${f}"`));for(const p of manifest.presets)assert(source.includes(`preset="${p}"`));assert(source.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source|Remotion|Manim/.test(source));}
 assert.throws(()=>figureMarkup('en','unknown'));
}
console.log('AoR 49: 121 truth/belief combinations, 11 clock comparisons, 1440 clock geometries, 12 evidence cases, 10001 independent sieve comparisons, all 12 practice choices, input bounds and isolated defaults passed. EN/DE rendering checked unless --model-only.');
