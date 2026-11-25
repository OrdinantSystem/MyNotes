import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {searchState,searchMaximum,relationState,exampleModels,baseMask,modelComparison,extensionState,diagonalState,encodeToy,symbolCodes,answers,classify} from './model.ts';
import {figureMarkup,searchMarkup,modelsMarkup,extensionsMarkup,diagonalMarkup,esc} from './render.ts';
for(const count of [0,1,4,5,6,1000,1e6,searchMaximum])for(const mode of ['unspecified','witness']){
 const s=searchState(count,mode);assert.equal(s.found,mode==='witness'&&count>=5);assert.equal(s.unprovableEstablished,false);assert.equal(s.witness,s.found?5:null);
}
for(const n of [-1,searchMaximum+1,NaN,Infinity,1.5])assert.throws(()=>searchState(n,'unspecified'));assert.throws(()=>searchState(5,'invalid'));
let original=0,direct=0,without=0;
for(let mask=0;mask<512;mask++){
 const state=relationState(mask),edges=new Set(Array.from({length:9},(_,i)=>mask&(1<<i)?`${Math.floor(i/3)},${i%3}`:'').filter(Boolean));
 let closed=true;for(const edge of edges){const [a,b]=edge.split(',');for(const next of edges){const [c,d]=next.split(',');if(b===c&&!edges.has(`${a},${d}`))closed=false;}}
 assert.equal(state.transitive,closed);assert.equal(state.axioms,edges.has('0,1')&&edges.has('1,2'));
 if(state.axioms){original++;state.direct?direct++:without++;if(state.transitive)assert(state.direct);}
}
assert.equal(original,128);assert.equal(direct,64);assert.equal(without,64);assert.equal(baseMask,34);
assert.deepEqual(exampleModels.map(m=>relationState(m).direct),[true,false]);assert.deepEqual(modelComparison(false).map(m=>m.allowed),[true,true]);assert.deepEqual(modelComparison(true).map(m=>m.allowed),[true,false]);
for(const n of [-1,512,1.5,NaN])assert.throws(()=>relationState(n));assert.throws(()=>modelComparison('true'));
for(let n=0;n<=3;n++){const s=extensionState(n);assert.equal(s.next,n);assert.deepEqual(s.added,Array.from({length:n},(_,i)=>i));}
for(const n of [-1,4,0.1,NaN,Infinity])assert.throws(()=>extensionState(n));
for(const prediction of ['halts','loops']){const s=diagonalState(prediction);assert.notEqual(s.actual,prediction);assert.equal(s.contradiction,true);}assert.throws(()=>diagonalState('unknown'));
assert.equal(encodeToy('0=0'),90n);assert.notEqual(encodeToy('0='),encodeToy('=0'));assert.notEqual(encodeToy('0'),encodeToy('00'));
const seen=new Set();function allStrings(prefix='',depth=0){if(prefix){const n=encodeToy(prefix).toString();assert(!seen.has(n),`Encoding collision: ${prefix}`);seen.add(n);}if(depth<4)for(const s of Object.keys(symbolCodes))allStrings(prefix+s,depth+1);}allStrings();assert.equal(seen.size,1554);
for(const s of ['', 'x','0'.repeat(7)])assert.throws(()=>encodeToy(s));
assert.deepEqual(answers,[0,1,2,0,1]);for(let q=0;q<5;q++)for(let a=0;a<3;a++)assert.equal(classify(q,a),answers[q]===a);for(const p of [[-1,0],[5,0],[0,3],[0,1.5]])assert.throws(()=>classify(...p));
assert(!esc('<script>"&').includes('<'));
const m=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
for(const locale of ['en','de']){
 for(const f of m.figures)assert(!/undefined|NaN|\bid=/.test(figureMarkup(locale,f)));
 for(let stage=0;stage<4;stage++)assert(!/undefined|NaN/.test(extensionsMarkup(locale,stage)));
 for(const v of [false,true])assert(!/undefined|NaN/.test(modelsMarkup(locale,v)));
 for(const p of ['halts','loops'])assert(!/undefined|NaN/.test(diagonalMarkup(locale,p)));
 for(const n of [0,4,5,1e9])for(const mode of ['unspecified','witness'])assert(!/undefined|NaN/.test(searchMarkup(locale,n,mode)));
 const mdx=readFileSync(new URL(`./content/${locale}/reasoning/${m.key}.mdx`,import.meta.url),'utf8');
 assert.equal((mdx.match(/<ReasoningFigure /g)||[]).length,12);assert.equal((mdx.match(/<Interactive /g)||[]).length,5);assert(mdx.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source|<script|<svg/.test(mdx));assert(mdx.includes('\\operatorname{Con}(T)'));assert(mdx.includes('Robinson'));assert(mdx.includes('Rosser'));
}
assert.throws(()=>figureMarkup('en','unknown'));
console.log('AoR 62: finite search boundaries; all 512 three-object relations and both countermodels; transitivity forcing the direct edge; finite extension stages; both diagonal contradictions; 1,554 injective toy sequence codes; all classification choices; bilingual rendering and private-source boundaries passed. These finite checks do not prove Gödel’s theorems.');
