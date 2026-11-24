import type {Locale} from '../i18n';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
import {justificationMath as discoveryMath} from './justification-render.ts';
import {evenOddSelection,workspaceStep,openingAnswer} from './discovery-model.ts';
import {discoveryText} from '../reasoning/discovery-copy.ts';
export {discoveryMath};
export const discoveryTex={
 evenForm:'e=2a',oddForm:'o=2b+1',integers:String.raw`a,b\in\mathbb Z`,
 target:String.raw`\exists k\in\mathbb Z:\ e+o=2k+1`,
 witness:'e+o=2k+1',
 connection:String.raw`\begin{aligned}e+o&=2a+(2b+1)\\&=2(a+b)+1\end{aligned}`,
 from:'2(a+b)+1',required:'2k+1',chosen:String.raw`k=a+b\in\mathbb Z`,
 circular:String.raw`k=\frac{e+o-1}{2}`,
 assumed:String.raw`n=2r,\qquad r\in\mathbb Z`,
 square:String.raw`n^2=4r^2=2(2r^2)`,plus:String.raw`n+2=2r+2=2(r+1)`,
 rules:[String.raw`A\land B`,String.raw`A\Rightarrow B`,String.raw`\exists x\ P(x)`,String.raw`\forall x\ P(x)`],
 dependent:String.raw`\forall n\in\mathbb Z\;\exists m\in\mathbb Z:\ m>n`,
 falseGoal:String.raw`\forall n\in\mathbb Z:\ \operatorname{Even}(n^2)`,falseCase:'1^2=1',
};
export function branchClaim(locale:Locale){const even=locale==='de'?'Gerade':'Even';return String.raw`\forall n\in\mathbb Z,\quad\operatorname{${even}}(n)\Rightarrow\bigl(\operatorname{${even}}(n^2)\land\operatorname{${even}}(n+2)\bigr)`;}
export function parityDiscoveryMarkup(locale:Locale,e:number,o:number){
 const c=discoveryText(locale),s=evenOddSelection(e,o);
 const pair=(role:string)=>`<span class="discovery-pair discovery-${role}" role="img" aria-label="${esc(c.pair)}"><i></i><i></i></span>`;
 const extra=`<span class="discovery-leftover" role="img" aria-label="${esc(c.leftover)}"><i></i><small>+1</small></span>`;
 const row=(name:string,html:string,total:number)=>`<section class="discovery-object-row"><h4>${esc(name)}: ${total}</h4><div class="discovery-objects">${html}</div></section>`;
 return row(c.even,Array.from({length:s.a},()=>pair('even')).join(''),e)+row(c.odd,Array.from({length:s.b},()=>pair('odd')).join('')+extra,o)+`<p class="discovery-arrow" aria-hidden="true">↓</p>`+row(c.combined,Array.from({length:s.a},()=>pair('even')).join('')+Array.from({length:s.b},()=>pair('odd')).join('')+extra,s.sum)+discoveryMath(`${s.e}+${s.o}=2\\cdot${s.k}+1=${s.sum}`,locale)+`<p class="discovery-readout">${esc(c.parityReadout(s.e,s.o,s.sum,s.k))}</p>`;
}
export function workspaceMarkup(locale:Locale,step:number){
 const c=discoveryText(locale),s=workspaceStep(step),p=(t:string)=>`<p>${renderMathText(t)}</p>`;
 return `<div class="discovery-columns" data-goal-established="${s.established}"><section class="discovery-panel discovery-known"><h4>${esc(c.have)}</h4>${c.assumptions.map(p).join('')}${p(c.integers)}${s.assumptionsExpanded?p(c.useDefinitions)+discoveryMath(discoveryTex.evenForm,locale)+discoveryMath(discoveryTex.oddForm,locale)+discoveryMath(discoveryTex.integers,locale):''}</section><section class="discovery-panel discovery-goal"><h4>${esc(c.need)}</h4>${p(c.goal)}${s.goalExpanded?p(c.useDefinition)+discoveryMath(discoveryTex.target,locale)+p(c.findWitness):''}${!s.established?p(c.notYet):''}</section></div>${s.connected?`<section class="discovery-connection"><h4>${esc(c.connection)}</h4>${discoveryMath(discoveryTex.connection,locale)}</section>`:''}${s.established?`<section class="discovery-established">${p(c.choose)}${p(c.closed)}</section>`:''}<p class="discovery-readout">${renderMathText(c.stageNotes[step])}</p>`;
}
export function openingMoveFeedback(locale:Locale,question:number,answer:number|null){const correct=openingAnswer(question,answer);if(answer===null)return '';const c=discoveryText(locale);return `<p data-opening-correct="${correct}"><strong>${esc(correct?c.correct:c.compare)}</strong> ${renderMathText(c.feedback[question][answer])}</p>`;}
