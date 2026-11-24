import type {Locale} from '../i18n';
import {worldText} from '../reasoning/world-copy.ts';
import {eightObjects,worldSelection,worldTex,setTex,counterWorld,worldAnswer,type WorldObject,type WorldOperation} from './world-model.ts';
import {escapeSvg as esc} from './plane.ts';
import {renderMathText} from '../math-text.ts';
export const worldMath=(tex:string,locale:Locale)=>`<div class="world-math" tabindex="0" role="region" aria-label="${esc(worldText(locale).math)}">${renderMathText(`$${tex}$`)}</div>`;
const glyph=(o:WorldObject)=>o.sides===3?'<path class="world-glyph" d="M0-22L20 15H-20Z"/>':'<rect class="world-glyph" x="-17" y="-19" width="34" height="34" rx="2"/>';
export function worldDescription(o:WorldObject,locale:Locale){const c=worldText(locale);return `${o.id}: ${o.color==='red'?c.red:c.blue}, ${o.sides===3?c.triangle:c.square}`;}
export function worldShape(o:WorldObject,x:number,y:number,member=true){return `<g class="world-shape world-${o.color}" data-world-object="${esc(o.id)}" data-world-member="${member}" transform="translate(${x} ${y})">${glyph(o)}<text class="world-letter" x="0" y="47" text-anchor="middle">${esc(o.id)}</text></g>`;}
export function worldObjectCard(o:WorldObject,locale:Locale,description=true){return `<div class="world-object-card world-${o.color}" data-world-card="${esc(o.id)}"><svg viewBox="-30 -30 60 60" aria-hidden="true">${glyph(o)}</svg><strong>${esc(o.id)}</strong>${description?`<small>${esc(worldDescription(o,locale).slice(o.id.length+2))}</small>`:''}</div>`;}
export function operationsMarkup(locale:Locale,operation:WorldOperation){
 const c=worldText(locale),selected=worldSelection(operation),positions:Record<string,[number,number]>={a:[320,120],b:[440,120],c:[200,120],d:[65,120],e:[320,240],f:[575,240],g:[200,240],h:[440,240]};
 const description=eightObjects.map(o=>worldDescription(o,locale)).join('; ');
 return `<svg class="world-scene" viewBox="0 0 640 360" role="img" aria-label="${esc(c.universe+': '+description)}"><rect class="world-frame" x="10" y="10" width="620" height="340" rx="8"/><circle class="world-region world-region-red" cx="255" cy="180" r="137"/><circle class="world-region world-region-triangle" cx="385" cy="180" r="137"/><circle class="world-region world-region-red world-outline" cx="255" cy="180" r="137"/><circle class="world-region world-region-triangle world-outline" cx="385" cy="180" r="137"/><g class="world-region-label"><text x="28" y="47">U</text><text x="197" y="90">R</text><text x="435" y="90">T</text></g>${eightObjects.map(o=>worldShape(o,...positions[o.id],selected.includes(o.id))).join('')}</svg>${worldMath(`${worldTex[operation]}=${setTex(selected)}`,locale)}<p class="world-result-copy">${esc(c.operationNames[operation])}</p>`;
}
export function counterWorldMarkup(locale:Locale,include:boolean){
 const c=worldText(locale),s=counterWorld(include),truth=(v:boolean)=>v?c.true:c.false;
 return `<div class="world-object-board"><p class="counter-help">${esc(c.newUniverse)}</p><div class="world-object-list">${s.objects.map(o=>worldObjectCard(o,locale)).join('')}</div></div><dl class="world-claims"><div><dt>${esc(c.premise)}</dt><dd data-truth-value="${Number(s.premise)}">${esc(truth(s.premise))}</dd></div><div><dt>${esc(c.conclusion)}</dt><dd data-truth-value="${Number(s.conclusion)}">${esc(truth(s.conclusion))}</dd></div></dl><p class="world-feedback">${esc(include?c.found.replace('{object}',s.counterexamples.join(', ')):c.initial)}</p>`;
}
export function worldAnswerMarkup(locale:Locale,question:number,answer:number|null){const correct=worldAnswer(question,answer);if(correct===null)return '';const c=worldText(locale);return `<p class="world-answer-${correct?'correct':'compare'}"><strong>${esc(correct?c.correct:c.consider)}</strong></p><p>${renderMathText(c.explanations[question])}</p>`;}
