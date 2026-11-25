import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialState,validate,evaluate,setAtom,setMode,addBridge,countermodel,loadCountermodel,rows,moveStep,lastStep,transferResult,correctChoice,choices,truthAndNecessity} from './model.ts';
const implies=(a,b)=>!(a&&!b); // Independent truth-functional oracle.
for(const mode of ['same','different'])for(const bridge of [false,true]){
 if(mode==='same'&&bridge)continue;
 const cases=rows(mode,bridge);assert.equal(cases.length,mode==='same'?8:16);
 let failures=0;
 for(const s of cases){const r=evaluate(s),first=implies(s.c,s.ub),second=implies(!s.s,!s.ua),third=implies(s.ub,s.ua),conclusion=implies(!s.s,!s.c);assert.deepEqual(r,{first,second,bridge:third,conclusion,premises:first&&second&&(!bridge||third),countermodel:first&&second&&(!bridge||third)&&!conclusion});if(r.countermodel)failures++;
  for(const atom of ['c','s','ua','ub'])for(const value of [false,true]){const next=setAtom(s,atom,value);assert.equal(next[atom],value);assert.notEqual(next,s);if(mode==='same')assert.equal(next.ua,next.ub);}
 }
 assert.equal(failures,mode==='different'&&!bridge?1:0);
}
assert(evaluate(countermodel()).countermodel);assert(loadCountermodel(addBridge(countermodel(),true)).bridge);assert(!evaluate(loadCountermodel(addBridge(countermodel(),true))).countermodel);assert.deepEqual(loadCountermodel(initialState()),countermodel());assert.equal(evaluate(addBridge(countermodel(),true)).bridge,false);assert(!evaluate(addBridge(countermodel(),true)).countermodel);
for(const s of rows('different')){const next=setMode(s,'same');assert.equal(next.ua,next.ub);assert(!next.bridge);}
// Complete two-object relational interpretations. U(y,x) deliberately reverses indices.
let relationalChecks=0,consistentCountermodels=0,mixedCountermodels=0,bridgedCountermodels=0;
for(let bits=0;bits<65536;bits++){
 let sameP=true,sameQ=true,sameEnd=true,mixedP=true,mixedQ=true,bridge=true;
 for(let x=0;x<2;x++)for(let y=0;y<2;y++){
  const xy=2*x+y,yx=2*y+x,c=!!(bits&(1<<xy)),s=!!(bits&(1<<(4+xy))),ua=!!(bits&(1<<(8+yx))),ub=!!(bits&(1<<(12+yx)));
  sameP&&=implies(c,ua);sameQ&&=implies(!s,!ua);sameEnd&&=implies(!s,!c);
  mixedP&&=implies(c,ub);mixedQ&&=implies(!s,!ua);bridge&&=implies(ub,ua);
 }
 relationalChecks++;
 if(sameP&&sameQ&&!sameEnd)consistentCountermodels++;
 if(mixedP&&mixedQ&&!sameEnd)mixedCountermodels++;
 if(mixedP&&mixedQ&&bridge&&!sameEnd)bridgedCountermodels++;
}
assert.equal(consistentCountermodels,0);assert(mixedCountermodels>0);assert.equal(bridgedCountermodels,0);
// Distinguish order: a cause at (0,1) requires the understanding at (1,0).
const cause=[[false,true],[false,false]],understanding=[[false,false],[true,false]];
assert(implies(cause[0][1],understanding[1][0]));assert(!implies(cause[0][1],understanding[0][1]));
for(let mask=0;mask<8;mask++){const r=!!(mask&1),k=!!(mask&2),i=!!(mask&4),result=transferResult(r,k,i);assert.deepEqual(result,{first:implies(r,k),second:implies(i,!k),conclusion:implies(i,!r)});assert(!(result.first&&result.second&&!result.conclusion));}
for(let step=0;step<=lastStep;step++){assert.equal(moveStep(step,-1),Math.max(0,step-1));assert.equal(moveStep(step,1),Math.min(lastStep,step+1));}
assert.equal(choices.filter(correctChoice).length,1);assert(correctChoice('conditional'));
for(let mask=0;mask<16;mask++){const worlds=Array.from({length:4},(_,i)=>!!(mask&(1<<i)));for(let actual=0;actual<4;actual++)assert.deepEqual(truthAndNecessity(worlds,actual),{actual:worlds[actual],necessary:mask===15});}
assert.deepEqual(truthAndNecessity([true,false],0),{actual:true,necessary:false});
assert.throws(()=>validate({...initialState(),ua:false}));assert.throws(()=>setAtom(initialState(),'unknown',true));assert.throws(()=>setMode(initialState(),'unknown'));assert.throws(()=>addBridge(initialState(),true));assert.throws(()=>correctChoice('unknown'));assert.throws(()=>moveStep(-1,1));assert.throws(()=>moveStep(6,1));assert.throws(()=>moveStep(0,2));assert.throws(()=>truthAndNecessity([],0));
const fresh=initialState();fresh.c=false;assert(initialState().c);
if(!process.argv.includes('--model-only')){
 const {figureMarkup,truthMarkup,proofMarkup,transferMarkup}=await import('./render.ts');
 const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url)));
 const good=html=>assert(!/katex-error|undefined|NaN|Infinity|\bid=/.test(html));
 for(const locale of ['en','de']){
  for(const kind of manifest.figures)good(figureMarkup(locale,kind));
  for(const mode of ['same','different'])for(const s of rows(mode))good(truthMarkup(locale,s));
  for(const s of rows('different',true))good(truthMarkup(locale,s));
  for(let step=0;step<=lastStep;step++)good(proofMarkup(locale,step));
  for(const choice of [null,...choices])for(const reveal of [false,true])good(transferMarkup(locale,choice,reveal));
  const source=readFileSync(new URL(`./content/${locale}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');
  for(const figure of manifest.figures)assert(source.includes(`figure="${figure}"`),`${locale}/${figure}`);for(const preset of manifest.presets)assert(source.includes(`preset="${preset}"`));
  assert(source.includes('reviewStatus: unreviewed'));assert(source.includes('U_B(y,x)\\to U_A(y,x)'));assert(source.includes('\\Box\\forall x\\forall y'));assert(!/references\/source|\/Users\/|utm_source|Remotion|Manim|images\.openai/.test(source));
 }
 assert(figureMarkup('en','bridge').includes('a55-added'));assert(figureMarkup('de','gap').includes('U_A'));
}
console.log(`AoR 55: 8 consistent and 16 split assignments, bridge repair, ${relationalChecks} complete two-object relational interpretations (mixed countermodels: ${mixedCountermodels}; consistent/bridged: 0), all 8 moral cases, 64 world/actual cases, bounds and isolated defaults passed. ${process.argv.includes('--model-only')?'Staging model check.':'Seventeen EN/DE figures and every activity state render.'}`);
