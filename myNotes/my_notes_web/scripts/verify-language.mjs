import assert from 'node:assert/strict';
import {scoreData,statistics,interpretationHolds,threshold,tallAt,freeInference,rewriteVerdict,initialLanguageState,languagePresets} from '../src/lib/interactive/language-model.ts';
import {languageMarkup} from '../src/lib/interactive/language-render.ts';
// Independent sum/count/order-statistic oracle over every permitted slider value.
let cases=0;
for(let magnitude=0;magnitude<=40;magnitude++)for(const arrangement of ['gain','loss']){
 const values=scoreData(magnitude,arrangement),s=statistics(values),gain=arrangement==='gain';
 assert.equal(values.length,10);assert.equal(s.sum,gain?magnitude-18:18-magnitude);
 assert.equal(s.mean,s.sum/10);assert.equal(s.median,gain?-2:2);
 assert.equal(s.improved,gain?(magnitude>0?1:0):9);
 assert(s.sorted.every((x,i,a)=>i===0||a[i-1]<=x));
 assert.equal(interpretationHolds('mean',values),gain?magnitude>18:magnitude<18);
 assert.equal(interpretationHolds('majority',values),!gain);
 assert.equal(interpretationHolds('typical',values),!gain);
 cases++;
}
assert.equal(threshold(18).mean,0);assert.equal(threshold(0).improved,0);assert.equal(threshold(30).mean,1.2);
assert.equal(interpretationHolds('majority',[1,1,1,1,1,0,0,0,0,0]),false);
assert.equal(statistics([1,8]).median,4.5);assert.equal(statistics([3,1,2]).median,2);
for(let cutoff=155;cutoff<=205;cutoff++)assert.equal(tallAt(cutoff),cutoff<=180);
assert(freeInference('price'));assert(!freeInference('freedom'));
assert.equal(rewriteVerdict(null),'unanswered');assert.equal(rewriteVerdict(1),'correct');assert.equal(rewriteVerdict(0),'individuals');assert.equal(rewriteVerdict(2),'causal');
for(const invalid of [-1,41,NaN,Infinity,1.5])assert.throws(()=>scoreData(invalid));
for(const invalid of [154,206,NaN,180.5])assert.throws(()=>tallAt(invalid));
assert.throws(()=>statistics([]));assert.throws(()=>statistics([NaN]));assert.throws(()=>rewriteVerdict(3));
for(const locale of ['en','de']){
 const state=initialLanguageState();
 for(const preset of languagePresets)assert.equal(typeof languageMarkup(locale,preset,state),'string');
 assert.equal(languageMarkup(locale,'rewrite',state),'');
 for(const arrangement of ['gain','loss'])for(const magnitude of [0,12,18,30,40]){
  const markup=languageMarkup(locale,'scores',{...state,arrangement,magnitude});assert(!markup.includes('NaN'));assert(markup.includes(`style="height:${magnitude*3.5}px`));
 }
 const median=languageMarkup(locale,'median',state);assert.equal((median.match(/class="language-middle"/g)||[]).length,2);
 assert(languageMarkup(locale,'tests',state).includes('katex-mathml'));
 assert(languageMarkup(locale,'threshold',{...state,gain:18}).includes(locale==='de'?'Mittelwert ist null':'mean is zero'));
}
console.log(`Verified ${cases} signed-score cases, strict majority, zero/18 boundaries, even/odd medians, 51 inclusive height rules, meaning-sensitive inference, rewrite judgments and localized mathematical rendering.`);
