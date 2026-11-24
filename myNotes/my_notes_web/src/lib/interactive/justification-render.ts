import katex from 'katex';
import {mathOptions} from '../math-options.mjs';
import type {Locale} from '../i18n';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
import {oddPairState,justificationAnswer} from './justification-model.ts';
import {justificationText} from '../reasoning/justification-copy.ts';
export const justificationMath=(tex:string,locale:Locale)=>`<span class="math math-block" tabindex="0" role="region" aria-label="${locale==='de'?'Mathematischer Ausdruck':'Mathematical expression'}" data-pagefind-ignore="all">${katex.renderToString(tex,{...mathOptions,displayMode:true})}</span>`;
export function oddObjectsMarkup(locale:Locale,k:number,m:number){
 const c=justificationText(locale),s=oddPairState(k,m);
 const pair=(fresh=false)=>`<span class="justification-pair ${fresh?'justification-new':''}" role="img" aria-label="${esc(fresh?c.newPair:c.existing)}"><i></i><i></i></span>`;
 const row=(label:string,pairs:number,extra:boolean)=>`<section class="justification-object-row"><h4>${esc(label)}</h4><div class="justification-object-items">${Array.from({length:pairs},()=>pair()).join('')}${extra?`<span class="justification-single" role="img" aria-label="${esc(c.leftover)}"><i></i><small>+1</small></span>`:pair(true)}${!pairs&&extra?`<small>${esc(c.none)}</small>`:''}</div></section>`;
 return `${row(c.groups[0],k,true)}${row(c.groups[1],m,true)}<p class="justification-combine" aria-hidden="true">↓</p>${row(c.groups[2],k+m,false)}${justificationMath(`${s.x}+${s.y}=2\\cdot${s.pairs}=${s.sum}`,locale)}<p class="justification-readout">${esc(c.pairReadout(s.x,s.y,s.pairs,s.sum))}</p>`;
}
export const representationTex=[String.raw`a=2k+1,\qquad b=2m+1`,String.raw`a+b=(2k+1)+(2m+1)`,String.raw`a+b=2(k+m+1)`];
export const structureTex=[String.raw`a,b\in\mathbb Z`,String.raw`a=2k+1,\ b=2m+1,\quad k,m\in\mathbb Z`,String.raw`a+b=2(k+m+1),\quad k+m+1\in\mathbb Z`,String.raw`\therefore\ a+b=2t,\quad t\in\mathbb Z`];
export function representationMarkup(locale:Locale,view:'symbols'|'structure'){
 const c=justificationText(locale);if(view!=='symbols'&&view!=='structure')throw new Error('Invalid symbolic view');
 return view==='symbols'?representationTex.map((tex,i)=>justificationMath(tex,locale)+(i<2?'<p class="justification-combine" aria-hidden="true">↓</p>':'')).join('')+`<p>${renderMathText(c.symbols)}</p>`:structureTex.map((tex,i)=>`<section class="justification-step"><h4>${esc(c.stepNames[i])}</h4><p>${renderMathText(c.stepDetails[i])}</p>${justificationMath(tex,locale)}</section>`).join('');
}
export function justificationFeedback(locale:Locale,preset:'opening'|'challenge',answer:number|null){const correct=justificationAnswer(preset,answer);if(answer===null)return '';const c=justificationText(locale);return `<p data-justification-correct="${correct}"><strong>${esc(correct?c.correct:c.compare)}</strong> ${renderMathText(preset==='opening'?c.openingFeedback[answer]:c.feedback[answer])}</p>`;}
