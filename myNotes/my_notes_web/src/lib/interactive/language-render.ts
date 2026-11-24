import type {Locale} from '../i18n';
import {languageText} from '../reasoning/language-copy.ts';
import {escapeSvg as esc} from './plane.ts';
import {renderMathText} from '../math-text.ts';
import {scoreData,statistics,interpretationHolds,threshold,tallAt,freeInference,rewriteVerdict,type LanguagePreset,type LanguageState} from './language-model.ts';
export function signed(value:number,locale:Locale,digits=0){return (value>0?'+':value<0?'−':'')+Math.abs(value).toFixed(digits).replace('.',locale==='de'?',':'.');}
const p=(s:string,cls='')=>`<p${cls?` class="${cls}"`:''}>${esc(s)}</p>`;
const math=(tex:string)=>`<div class="language-formula">${renderMathText(`$${tex}$`)}</div>`;
export function languageMarkup(locale:Locale,preset:LanguagePreset,state:LanguageState){
 const c=languageText(locale),values=scoreData(state.magnitude,state.arrangement),s=statistics(values);
 const stat=(label:string,value:string)=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
 const verdict=(label:string,yes:boolean)=>`<p class="language-verdict">${esc(label)} <strong class="${yes?'language-yes':'language-no'}">${esc(yes?c.yes:c.no)}</strong></p>`;
 if(preset==='interpretations')return p(c.current,'language-eyebrow')+p(c.interpretations[['mean','majority','typical'].indexOf(state.interpretation)],'language-statement')+(state.interpretation==='typical'?p(c.typicalHelp,'counter-help'):'');
 if(preset==='scores'){
  const chart=`<div class="language-chart" role="img" aria-label="${esc(c.units+': '+values.map((v,i)=>`${c.participant} ${i+1}: ${signed(v,locale)}`).join('; '))}"><div class="language-axis" aria-hidden="true">${[40,20,0,-20,-40].map((v,i)=>`<span style="top:${i*70}px">${signed(v,locale)}</span>`).join('')}</div><div class="language-bars" aria-hidden="true">${[0,70,140,210,280].map(y=>`<i class="language-gridline" style="top:${y}px"></i>`).join('')}${values.map((v,i)=>`<div class="language-bar-column"><i class="language-bar ${v<0?'language-loss':'language-gain'}" style="height:${Math.abs(v)*3.5}px;${v<0?'top':'bottom'}:140px"></i><b style="top:${v>=0?140-v*3.5-25:140-v*3.5+4}px">${signed(v,locale)}</b><span class="language-person">${i+1}</span></div>`).join('')}</div></div>`;
  return `<p class="language-legend"><span>${esc(c.positive)} (+)</span><span>${esc(c.negative)} (−)</span></p>`+chart+`<dl class="language-stats">${stat(c.mean,signed(s.mean,locale,1))}${stat(c.median,signed(s.median,locale,1))}${stat(c.improved,`${s.improved}/${s.n}`)}</dl>`+verdict(c.selected,interpretationHolds(state.interpretation,values))+p(c.interpretations[['mean','majority','typical'].indexOf(state.interpretation)],'counter-help');
 }
 if(preset==='median')return p(c.scope,'language-eyebrow')+`<ol class="language-sorted">${s.sorted.map((v,i)=>`<li${i===4||i===5?' class="language-middle"':''}><strong>${signed(v,locale)}</strong><small>${i+1}</small></li>`).join('')}</ol>`+p(c.middle)+p(`${c.medianResult} = ${signed(s.median,locale,1)} ${c.points}`,'language-statement');
 if(preset==='tests')return p(c.scope,'language-eyebrow')+`<div class="counter-columns"><section class="language-case"><h4>${esc(c.meanTest)}</h4>${p(c.meanQuestion)}${math(String.raw`\frac{1}{n}\sum_{i=1}^n\Delta_i>0`)}${p(c.result)}<strong class="language-value">${signed(s.mean,locale,1)}</strong>${p(s.mean>0?c.positiveMean:s.mean<0?c.negativeMean:c.zeroMean)}</section><section class="language-case"><h4>${esc(c.majorityTest)}</h4>${p(c.majorityQuestion)}${math(String.raw`\#\{i:\Delta_i>0\}>\frac{n}{2}`)}${p(c.result)}<strong class="language-value">${s.improved}/${s.n}</strong>${p(s.improved>s.n/2?c.majorityYes:c.majorityNo)}</section></div>`+p(c.notation,'counter-help');
 if(preset==='threshold'){
  const t=threshold(state.gain),position=state.gain/40*100;
  return `<div class="language-threshold" role="img" aria-label="G = ${state.gain}; ${esc(c.mean)} = ${signed(t.mean,locale,1)}"><div class="language-scale"><span>${esc(c.negativeMean)}</span><span>${esc(c.positiveMean)}</span></div><div class="language-track"><i class="language-boundary" style="left:45%"><b>G = 18</b></i><i class="language-marker" style="left:${position}%"><b>G = ${state.gain}</b></i></div><div class="language-scale"><span>0</span><span>40</span></div></div><dl class="language-stats">${stat(c.gainMean,signed(t.mean,locale,1))}${stat(c.gainCount,`${t.improved}/10`)}</dl>`+p(t.mean>0?c.thresholdPositive:t.mean<0?c.thresholdNegative:c.thresholdZero);
 }
 if(preset==='free')return p(c.conclusion,'language-eyebrow')+p(c.freeConclusion,'language-statement')+p(freeInference(state.meaning)?c.freeYes:c.freeNo,freeInference(state.meaning)?'language-yes':'language-no');
 if(preset==='tall')return `<div class="language-height" role="img" aria-label="${esc(c.cutoff)} ${state.cutoff} cm; ${esc(c.person)}"><div class="language-height-track" style="--cutoff:${(state.cutoff-155)*2}%"><i style="left:${(state.cutoff-155)*2}%"><b style="transform:translateX(${state.cutoff>=200?'-100%':state.cutoff<=160?'0':'-50%'})">${state.cutoff} cm</b></i><span style="left:50%">●<b>${esc(c.person)}</b></span></div><div class="language-scale"><span>155 cm</span><span>205 cm</span></div></div>`+verdict(c.tallQuestion,tallAt(state.cutoff))+p(`${c.tallBefore} ${state.cutoff} ${c.tallAfter}`,'counter-help');
 if(preset==='rewrite'){
  const v=rewriteVerdict(state.answer);return v==='unanswered'?'':p(v==='correct'?c.rewriteCorrect:v==='individuals'?c.rewriteIndividuals:c.rewriteCausal,v==='correct'?'language-yes':'language-no')+(v==='correct'?p(c.rewriteCorrectDetail):'');
 }
 return '';
}
