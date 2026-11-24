import assert from 'node:assert/strict';
import {faultyChoice,cancellationState,caseState,auditInput,auditRootInputs,auditPlotX as X,auditPlotY as Y,initialAuditState,auditFigures} from '../src/lib/interactive/audit-model.ts';
import {faultyFeedback,cancellationMarkup,casesMarkup,quadraticGraph,auditFigure,auditTitle} from '../src/lib/interactive/audit-render.ts';
import {auditText} from '../src/lib/reasoning/audit-copy.ts';
import {renderMathText} from '../src/lib/math-text.ts';
assert.equal(faultyChoice(null),null);for(let i=0;i<7;i++)assert.equal(faultyChoice(i),i===4);for(const i of [-1,7,.5])assert.throws(()=>faultyChoice(i));
for(const c of [3,1,0]){const s=cancellationState(c);assert.equal(s.left,4*c);assert.equal(s.right,9*c);assert.equal(s.outputsEqual,c===0);assert.equal(s.canCancel,c!==0);}for(const c of [-1,2,NaN])assert.throws(()=>cancellationState(c));
for(let q=-8;q<=12;q++){const x=q/4,s=caseState(x);assert.equal(auditInput(String(x)),x);assert.equal(s.squared,x*x);assert.equal(s.holds,q*(q-4)>=0);assert.equal(s.covered,s.holds);}
for(const raw of ['',' ','NaN','Infinity','-2.25','3.25','.1'])assert.equal(auditInput(raw),null);for(const x of [-3,4,.1,NaN])assert.throws(()=>caseState(x));
for(let a=-20;a<=20;a++){const b=a;assert.equal(a*a,a*b);assert.equal(a*a-b*b,a*b-b*b);assert.equal((a-b)*(a+b),b*(a-b));assert.equal(a-b,0);if(a!==0)assert.notEqual(a+b,b);assert.equal((a*a)%2===0,a%2===0);assert(a*a>=a);for(let b=-20;b<=20;b++)if(a%2===0&&b%2===0)assert.equal(Math.abs((a+b)%2),0);}
for(let m=-10;m<=10;m++)for(let n=-10;n<=10;n++){const a=2*m+1,b=2*n+1,k=2*m*n+m+n;assert.equal(a*b,2*k+1);assert.equal(Math.abs((a*b)%2),1);}
assert.deepEqual(auditRootInputs,[-3,3]);assert.equal(Math.sqrt((-3)**2),3);assert.notEqual(Math.sqrt((-3)**2),-3);
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
for(const locale of ['en','de']){
 for(const s of strings(auditText(locale))){assert(!/[\x00-\x1f]/.test(s));assert(!renderMathText(s).includes('katex-error'));}
 for(const kind of auditFigures){assert(auditTitle(locale,kind));const html=auditFigure(locale,kind);assert(!/katex-error|>undefined<|NaN/.test(html),kind);assert(!/\sid=/.test(html));}
 for(let i=0;i<7;i++)assert(faultyFeedback(locale,i).includes(`data-audit-correct="${i===4}"`));assert(faultyFeedback(locale,null).includes(auditText(locale).choose));
 for(const c of [0,1,3])assert(!/katex-error|NaN|>undefined</.test(cancellationMarkup(locale,c)));for(let q=-8;q<=12;q++)assert(!/katex-error|NaN|>undefined</.test(casesMarkup(locale,q/4)));
 const graph=quadraticGraph(locale);assert.equal((graph.match(/data-intersection=/g)||[]).length,2);for(const x of [0,1])assert(graph.includes(`cx="${X(x)}" cy="${Y(x)}"`));assert(graph.includes(`data-reference="linear" cx="${X(.5)}" cy="${Y(.5)}"`));assert(graph.includes(`data-reference="square" cx="${X(.5)}" cy="${Y(.25)}"`));assert.equal((auditFigure(locale,'audit-odd-product').match(/data-odd-tile=/g)||[]).length,35);
}
const a=initialAuditState(),b=initialAuditState();a.choice=4;a.factor=0;a.x=1;assert.deepEqual(b,{choice:null,factor:3,x:.5});
console.log('Verified first invalid cancellation, all seven choices, zero/nonzero information loss, 21 exact quarter-unit cases and boundaries, signed parity/square/circular repairs, 441 signed odd products, root sign loss, exact intersections/reference coordinates, all 22 figures in EN/DE and isolated state.');
