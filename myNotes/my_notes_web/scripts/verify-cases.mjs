import assert from 'node:assert/strict';
import {consecutive,productCase,squareWitness,oddSquare,casesInput,coverage,coverageAnswers,factorAnswers,choiceAnswer,casesPrinciple,multipleOffset,initialCasesState} from '../src/lib/interactive/cases-model.ts';
import {remainder} from '../src/lib/interactive/equivalence-model.ts';
import {integerStrip,oddSquareMarkup,squareGrid,caseQuestions,caseFeedback,caseTex,caseMath} from '../src/lib/interactive/cases-render.ts';
import {casesText} from '../src/lib/reasoning/cases-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
for(let n=-500;n<=500;n++){
 for(const width of [2,3]){const s=consecutive(n,width);assert(s.product===s.values.reduce((p,v)=>p*v,1));assert.equal(s.values.length,width);assert.equal(s.remainders.filter(r=>r===0).length,1);assert.equal(remainder(s.factor,width),0);assert.equal(s.product,width*s.quotient);}
 assert.equal(remainder(n*n,3)===2,false);
 for(let row=0;row<4;row++)assert.equal(coverage(row,n).some(Boolean),coverageAnswers[row]||!([0].includes(row)&&n===0||row===3&&(n===3||n===4)));
 for(let m=1;m<=25;m++){const {r,j}=multipleOffset(n,m);assert(r>=0&&r<m);assert(j>=0&&j<m);assert.equal(remainder(n+j,m),0);}
}
for(let k=-100;k<=100;k++)for(const odd of [false,true]){const s=productCase(k,odd);assert.equal(s.product,2*s.m);const q=squareWitness(k,odd);assert.equal(q.square,q.n*q.n);assert.equal(q.square,2*q.witness+(odd?1:0));}
assert.deepEqual([consecutive(-3,2).product,consecutive(0,2).product,consecutive(7,2).product],[6,0,56]);
for(const p of [false,true])for(const q of [false,true])for(const r of [false,true])assert.equal(casesPrinciple(p,q,r),true);
assert.deepEqual(factorAnswers,[0,2,1]);assert.deepEqual(coverage(1,0),[true,true]);assert.deepEqual(coverage(2,3),[true,false]);assert.deepEqual(coverage(2,4),[false,true]);assert.deepEqual(coverage(3,3),[false,false]);assert.deepEqual(coverage(3,4),[false,false]);
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 for(const s of strings(casesText(locale))){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(const tex of Object.values(caseTex).flat())assert(!caseMath(tex,locale).includes('katex-error'));
 for(let n=-12;n<=12;n++)for(const width of [2,3]){const html=integerStrip(locale,n,width);assert.equal((html.match(/data-selected="true"/g)||[]).length,width);assert(html.includes(String(consecutive(n,width).product)));assert(!/undefined|NaN|katex-error/.test(html));}
 for(let n=3;n<=11;n+=2){const s=oddSquare(n),grid=squareGrid(locale,n);assert.equal(s.center+s.strips+s.corner,s.total);assert.equal((grid.match(/data-area="center"/g)||[]).length,(n-1)**2);assert.equal((grid.match(/data-area="strip"/g)||[]).length,2*(n-1));assert.equal((grid.match(/data-area="corner"/g)||[]).length,1);assert(!/undefined|NaN|katex-error/.test(oddSquareMarkup(locale,n)));}
 const evenGrid=squareGrid(locale,6,false);assert.equal((evenGrid.match(/data-area="left"/g)||[]).length,18);assert.equal((evenGrid.match(/data-area="right"/g)||[]).length,18);
 for(const preset of ['inspection','factors','coverage-practice']){const q=caseQuestions(locale,preset);for(let row=0;row<q.questions.length;row++){assert.equal(choiceAnswer(preset,row,null),null);assert.equal(caseFeedback(locale,preset,row,null),'');for(let a=0;a<q.options.length;a++){const correct=a===q.answers[row];assert.equal(choiceAnswer(preset,row,a),correct);assert(caseFeedback(locale,preset,row,a).includes(`data-cases-correct="${correct}"`));}}}
}
for(const n of [NaN,Infinity,1.5,Number.MAX_SAFE_INTEGER]){assert.throws(()=>consecutive(n,2));assert.throws(()=>squareWitness(n,false));}
for(const n of [1,2,4,12,NaN])assert.throws(()=>oddSquare(n));
for(const raw of ['', ' ', '13','-13','2.5','Infinity','NaN'])assert.equal(casesInput(raw),null);
for(const raw of ['2','4','12','3.5'])assert.equal(casesInput(raw,true),null);
for(const raw of ['-12','0','12'])assert.equal(casesInput(raw),Number(raw));for(const raw of ['3','7','11'])assert.equal(casesInput(raw,true),Number(raw));
assert.throws(()=>consecutive(3,4));assert.throws(()=>coverage(4,0));assert.throws(()=>choiceAnswer('factors',3,0));assert.throws(()=>choiceAnswer('inspection',0,4));assert.throws(()=>multipleOffset(0,0));
const a=initialCasesState(),b=initialCasesState();a.answers[0]=2;a.consecutive=-12;assert.equal(b.consecutive,7);assert.deepEqual(b.answers,[null,null,null,null]);
console.log('Verified 2,002 signed consecutive products, 402 branch/square witnesses, all eight logical valuations, 25,025 general remainder offsets, finite coverage boundaries, every illustrated grid and question choice in EN/DE, input bounds and independent defaults.');
