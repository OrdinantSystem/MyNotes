import type {Locale} from '../i18n';
import {switchText} from '../reasoning/switch-copy.ts';
import {escapeSvg as esc} from './plane.ts';
import {renderMathText} from '../math-text.ts';
import {switchValues,switchTex,checkpointCorrect,type SwitchPreset,type SwitchState} from './switch-model.ts';
export const switchMath=(tex:string,locale:Locale='en')=>`<div class="switch-math" role="region" tabindex="0" aria-label="${esc(switchText(locale).math)}">${renderMathText(`$${tex}$`)}</div>`;
export function switchMarkup(locale:Locale,preset:SwitchPreset,s:SwitchState){
 const c=switchText(locale),v=switchValues(s.p,s.q,s.r),truth=(b:boolean)=>b?c.true:c.false;
 const wire=(powered:boolean)=>`<i class="switch-wire${powered?' switch-powered':''}" aria-hidden="true"></i>`;
 const door=(open:boolean)=>`<div class="switch-door" data-open="${open}"><span>${esc(c.door)}</span><strong>${esc(open?c.open:c.locked)}</strong></div>`;
 const result=(tex:string,b:boolean)=>`<div class="switch-result">${switchMath(tex,locale)}<strong data-truth-value="${Number(b)}">${esc(truth(b))}</strong></div>`;
 if(preset==='access'){
  const node=(name:string,on:boolean,powered:boolean)=>`<div class="switch-node" data-on="${on}" data-powered="${powered}"><strong>${name}</strong><span>${esc(on?c.on:c.off)}</span></div>`;
  return `<p class="switch-input">${esc(c.input)}</p><div class="switch-series">${wire(true)}${node('P',s.p,s.p)}${wire(s.p)}${node('Q',s.q,v.ordinary)}${wire(v.ordinary)}${door(v.ordinary)}</div>`+result(switchTex.access,v.ordinary);
 }
 if(preset==='override'||preset==='routes'||preset==='simplify'){
  const override=preset==='override',active=[v.ordinary,override?s.r:v.alternate],tex=[switchTex.access,override?'R':switchTex.route2],labels=override?[c.ordinary,c.override]:[`${c.route} 1`,`${c.route} 2`],output=override?v.override:v.simplified;
  const diagram=`<div class="switch-parallel"><div class="switch-branches">${active.map((on,i)=>`<div class="switch-path">${wire(on)}<section class="switch-node" data-powered="${on}"><small>${esc(labels[i])}</small>${switchMath(tex[i],locale)}<strong>${esc(on?c.active:c.inactive)}</strong></section>${wire(on)}</div>`).join('')}</div>${wire(output)}${door(output)}</div>`;
  return diagram+result(override?switchTex.override:switchTex.simplify,output);
 }
 if(preset==='scope'||preset==='demorgan'){
  const scope=preset==='scope',tex=scope?[String.raw`\underbrace{\neg P}_{\text{${c.notP}}}\land Q`,String.raw`\neg\underbrace{(P\land Q)}_{\text{${c.wholeLabel}}}`]:[switchTex.locked,switchTex.failure],values=scope?[v.scope,v.locked]:[v.locked,v.failure],descriptions=scope?[c.onlyP,c.whole]:[c.notBoth,c.oneFails];
  return `<div class="counter-columns">${values.map((b,i)=>`<section class="switch-comparison">${!scope?`<h4>${esc(c.rule)} ${i?'B':'A'}</h4>`:''}${switchMath(tex[i],locale)}<p>${esc(descriptions[i])}</p><strong class="switch-truth" data-truth-value="${Number(b)}">${esc(truth(b))}</strong>${!scope?`<p>${esc(c.door)}: <strong>${esc(b?c.locked:c.open)}</strong></p>`:''}</section>`).join('')}</div>`+(!scope?`<p class="switch-agreement">✓ ${esc(c.agree)}</p>`:'');
 }
 return '';
}
export function switchAnswerMarkup(locale:Locale,question:number,answer:number|null){const correct=checkpointCorrect(question,answer);if(correct===null)return '';const c=switchText(locale);return `<p class="switch-answer-${correct?'correct':'explain'}"><strong>${esc(correct?c.correct:c.tryAgain)}</strong></p><p>${renderMathText(c.explanations[question])}</p>`;}
