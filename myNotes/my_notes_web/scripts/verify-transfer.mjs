import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {probability,initialExperiment,recordPrediction,beginAttempt,viewReference,initialRecord,recordSummary,sameRemainder,oddExample,transferFigures,calibrationX as X,calibrationY as Y} from '../src/lib/interactive/transfer-model.ts';
import {transferFigure,transferTitle,recordMarkup,calibrationGraph,experimentSolution,experimentReadout} from '../src/lib/interactive/transfer-render.ts';
import {transferText} from '../src/lib/reasoning/transfer-copy.ts';
import {oddSum} from '../src/lib/interactive/parity-model.ts';
for(let n=0;n<=100;n++)assert.equal(probability(String(n)),n);
for(const s of ['',' ','NaN','Infinity','-1','101','3.5'])assert.equal(probability(s),null);
const untouched=initialExperiment();assert.deepEqual(untouched,{draft:null,prediction:null,started:false,solutionSeen:false,outcome:null});assert.deepEqual(recordPrediction(untouched),untouched);
for(const n of [0,80,100]){const s={...initialExperiment(),draft:n},p=recordPrediction(s);assert.equal(p.prediction,n);assert.equal(s.prediction,null);assert.equal(recordPrediction({...p,draft:5}).prediction,n);assert.equal(recordPrediction(beginAttempt(s)).prediction,null);assert.equal(recordPrediction(viewReference(s)).prediction,null);}
assert.equal(recordPrediction({...initialExperiment(),draft:101}).prediction,null);
assert.deepEqual(recordSummary(initialRecord()),{n:5,predicted:84,observed:60});
assert.deepEqual(recordSummary([]),{n:0,predicted:null,observed:null});
assert.deepEqual(recordSummary([{prediction:null,success:true},{prediction:90,success:null}]),{n:0,predicted:null,observed:null});
assert.deepEqual(recordSummary([{prediction:0,success:false},{prediction:100,success:true},{prediction:null,success:true}]),{n:2,predicted:50,observed:50});
for(const r of [[{prediction:101,success:true}],[{prediction:50,success:'yes'}]])assert.throws(()=>recordSummary(r));
const rows=initialRecord(),other=initialRecord();rows[0].prediction=0;assert.equal(other[0].prediction,100);assert.equal(recordSummary(rows).predicted,64);assert.equal(recordSummary(rows).observed,60);
assert.equal(X(0),60);assert.equal(Y(0),350);assert.equal(X(100),380);assert.equal(Y(100),30);assert.equal(X(84),328.8);assert.equal(Y(60),158);
assert.deepEqual([oddExample.x,oddExample.y,oddExample.sum,oddExample.pairs],[5,7,12,6]);
for(let a=-12;a<=12;a++)for(let b=-12;b<=12;b++){
 const s=oddSum(a,b);assert.equal(BigInt(s.sum),2n*(BigInt(a)+BigInt(b)+1n));assert.equal(s.sum,2*s.pairs);const x=2*a+1,y=2*b+1;assert.equal(x-y,2*(a-b));assert.equal(x*y,2*(2*a*b+a+b)+1);
 for(let d=1;d<=8;d++)for(let rem=0;rem<d;rem++){const t=sameRemainder(a,b,d,rem);assert.equal(BigInt(t.difference),BigInt(d)*(BigInt(a)-BigInt(b)));assert.equal(t.rx,rem);assert.equal(t.ry,rem);assert.equal(t.x-t.y,t.d*t.witness);}
}
for(const args of [[0,0,0,0],[0,0,-1,0],[0,0,5,5],[.5,0,5,2],[Number.MAX_SAFE_INTEGER,0,5,2]])assert.throws(()=>sameRemainder(...args));
for(const locale of ['en','de']){
 const c=transferText(locale);assert.equal(c.abilities.length,4);assert.equal(c.figureTitles.length,18);
 for(const kind of transferFigures){const html=transferFigure(locale,kind);assert(transferTitle(locale,kind));assert(!/katex-error|>undefined<|NaN|[\x00-\x08]/.test(html),`${locale} ${kind}`);assert(!/\bid=/.test(html));}
 const graph=calibrationGraph(locale,initialRecord());assert(graph.includes('cx="328.8" cy="158"'));assert(!calibrationGraph(locale,[]).includes('data-transfer-point'));assert(!recordMarkup(locale,[]).includes('NaN'));
 for(const preset of ['reconstruct','apply'])assert(!experimentSolution(locale,preset).includes('katex-error'));
 assert(experimentReadout(locale,initialExperiment()).includes(c.noPrediction));assert(!experimentReadout(locale,initialExperiment()).includes(c.report));
 const source=readFileSync(`src/content/lessons/${locale}/reasoning/understanding-and-independent-reasoning.mdx`,'utf8');assert.equal((source.match(/<Interactive kind="transfer"/g)||[]).length,3);assert.equal((source.match(/<Exercise>/g)||[]).length,5);assert.equal((source.match(/<ReasoningFigure kind="transfer-/g)||[]).length,17);
 assert(source.includes('reviewStatus: unreviewed'));assert(!/references\/source|\/Users\/jean|google.com\/s2\/favicons|utm_source|Target duration/.test(source));
}
assert.equal(2*1+2*2,6);assert.equal(4*1*2,8);assert.equal(2*(3/2),3);
console.log('Verified 101 confidence values, prediction timing and isolation, empty/partial records, exact 84%/60% coordinates, 625 signed parity proofs, 22500 signed common-remainder cases, all 18 figures in EN/DE, five exercise disclosures and source boundaries.');
