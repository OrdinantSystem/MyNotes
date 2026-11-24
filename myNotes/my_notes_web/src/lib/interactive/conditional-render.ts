import type {Locale} from '../i18n';
import {conditionalText} from '../reasoning/conditional-copy.ts';
import {conditionalChoice,integerPredicates} from './conditional-model.ts';
import {escapeSvg as esc} from './plane.ts';
import {renderMathText as math} from '../math-text.ts';
export function conditionalMarkup(locale:Locale,n:number){
 conditionalChoice(n);const c=conditionalText(locale),s=integerPredicates(n);
 const marker=(value:number)=>`<span class="conditional-number${n===value?' conditional-selected':''}">${value}</span>`;
 return `<div class="conditional-universe"><p>${esc(c.universe)} ${math('$\\mathbb{Z}$')}</p><div class="conditional-outer"><strong>${esc(c.even)}</strong><div class="conditional-inner"><strong>${esc(c.multiples)}</strong>${marker(4)}</div><div class="conditional-even-only">${marker(6)}</div></div><div class="conditional-neither">${marker(7)}</div></div><p class="conditional-for">${esc(c.forNumber)} ${math(`$n=${n}$`)}:</p><dl class="conditional-predicates"><div><dt>${math('$P(n)$')}: ${esc(c.p)}</dt><dd>${esc(s.p?c.true:c.false)}</dd></div><div><dt>${math('$Q(n)$')}: ${esc(c.q)}</dt><dd>${esc(s.q?c.true:c.false)}</dd></div></dl><p>${esc(c.explanations[n as 4|6|7])}</p>`;
}
