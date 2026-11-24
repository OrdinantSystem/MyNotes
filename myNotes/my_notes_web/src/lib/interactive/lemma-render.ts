import type {Locale} from '../i18n';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
import {justificationMath as math} from './justification-render.ts';
import {consecutive} from './cases-model.ts';
import {lemmaText} from '../reasoning/lemma-copy.ts';
import {lemmaFigures,tripleCollection,bridgeStep,practiceCheck,multipleRows,divisibilityCase,type LemmaFigure} from './lemma-model.ts';
const p=(s:string)=>`<p>${renderMathText(s)}</p>`;
const panel=(title:string,body:string,role='')=>`<section class="discovery-panel ${role}"><h4>${renderMathText(title)}</h4>${body}</section>`;
const cols=(s:string)=>`<div class="discovery-columns">${s}</div>`;
const arrow='<p class="discovery-arrow" aria-hidden="true">↓</p>';
export function tripleMarkup(locale:Locale,k:number){const c=lemmaText(locale),s=tripleCollection(k);
 const pair=(fresh=false)=>`<span class="discovery-pair ${fresh?'lemma-newpair':'lemma-pair'}" role="img" aria-label="${esc(c.pair)}"><i></i><i></i></span>`,single=`<span class="lemma-leftover" role="img" aria-label="${esc(c.leftover)}"><i></i></span>`;
 return Array.from({length:3},(_,i)=>panel(`${c.copy} ${i+1}`,`<div class="lemma-objects">${Array.from({length:s.pairs},()=>pair()).join('')}${s.leftover?single:''}</div>`)).join('')+(s.pooled?arrow+panel(c.pool,`<div class="lemma-objects">${pair(true)}${single}</div>`)+p(c.regroup):p(c.none))+math(`${k}+${k}+${k}=3\\cdot${k}=${s.product}`,locale)+p(`${c.original}: ${k} — ${s.even?c.even:c.odd}. ${c.tripled}: ${s.product} — ${s.productEven?c.even:c.odd}.`)+p(`${c.pairs}: ${s.totalPairs}. ${c.remaining}: ${s.remaining}.`)+p(c.physical);
}
export function bridgeMarkup(locale:Locale,step:number){const c=lemmaText(locale),s=bridgeStep(step),m=(tex:string)=>math(tex,locale);
 const given=m(String.raw`n\in\mathbb Z,\quad 2\mid n,\quad 3\mid n`)+(step>=2?m(String.raw`n=3k,\quad k\in\mathbb Z`):'');
 const goal=m(String.raw`6\mid n`)+(s.goalExpanded?m(String.raw`\exists m\in\mathbb Z:\ n=6m`):'')+(s.factorsExposed?m('n=3(2m)'):'');
 const candidate=s.candidate?panel(s.lemmaEstablished?c.proved:c.candidate,m(String.raw`k=2m,\quad m\in\mathbb Z`)+(s.lemmaEstablished?m(String.raw`k=2r+1\Rightarrow3k=2(3r+1)+1,\quad r\in\mathbb Z`)+p(c.dichotomy)+m(String.raw`2\mid3k\Rightarrow2\mid k`):p(c.conditional)),s.lemmaEstablished?'lemma-established':'lemma-pending'):'';
 return `<div data-lemma-candidate="${s.candidate||'none'}" data-lemma-established="${s.lemmaEstablished}" data-goal-established="${s.goalEstablished}"><h4>${esc(c.stages[step])}</h4>${cols(panel(c.have,given,'lemma-known')+panel(s.goalEstablished?c.established:c.need,goal,s.goalEstablished?'lemma-established':''))}${candidate}${s.goalEstablished?panel(c.established,m(String.raw`n=3k=3(2m)=6m,\quad m\in\mathbb Z`),'lemma-established'):''}${p(c.notes[step])}</div>`;
}
export function practiceFeedback(locale:Locale,answer:number|null){const c=lemmaText(locale),s=practiceCheck(answer);if(s===null)return p(c.unanswered);return `<div data-lemma-correct="${s.correct}">${p(c.feedback[answer!])}${p(c.ungraded)}</div>`;}
export function multiplesMarkup(locale:Locale,a=2,b=3,target=6,limit=30){const c=lemmaText(locale),rows=multipleRows(a,b,target,limit);return rows.map(row=>panel(`${c.multiples} ${row.divisor}`,`<div class="lemma-numbers">${row.values.map(n=>{const common=divisibilityCase(n,a,b,target);return `<span class="${common.first&&common.second?(common.conclusion?'lemma-established':'lemma-error'):''}">${n}</span>`;}).join('')}</div>`)).join('')+p(c.finite);}
export function lemmaFigure(locale:Locale,kind:LemmaFigure){const c=lemmaText(locale),m=(tex:string)=>math(tex,locale);switch(kind){
case 'lemma-chain':return cols(panel('A',m('A'))+panel('B',m('A\\Rightarrow B'))+panel('C',m('B\\Rightarrow C')));
case 'lemma-gap':return cols(panel(c.have,'', 'lemma-known')+panel('?',p(c.gap),'lemma-pending')+panel(c.need,''));
case 'lemma-multiples':return multiplesMarkup(locale);
case 'lemma-assumptions':return cols(panel(c.have,m(String.raw`2\mid n,\quad3\mid n`)+m(String.raw`n=2a=3k,\quad a,k\in\mathbb Z`),'lemma-known')+panel(c.need,m(String.raw`\exists m\in\mathbb Z:\ n=6m`)+p(c.integer)));
case 'lemma-match':return cols(panel(c.have,m(String.raw`n=3k,\quad k\in\mathbb Z`),'lemma-known')+panel(c.need,m(String.raw`n=3(2m),\quad m\in\mathbb Z`)))+panel(c.candidate,m(String.raw`k=2m,\quad m\in\mathbb Z`)+p(c.conditional),'lemma-pending');
case 'lemma-contrapositive':return cols(panel(c.oddRule,m(String.raw`k=2r+1\Rightarrow3k=2(3r+1)+1`),'lemma-established')+panel(c.contraRule,m(String.raw`2\mid3k\Rightarrow2\mid k`),'lemma-established'))+p(c.dichotomy);
case 'lemma-definition':return p(c.lemma)+m(String.raw`\forall k\in\mathbb Z:\ 2\mid3k\Rightarrow2\mid k`);
case 'lemma-order':return panel(c.discovery,p(c.discoveryText))+panel(c.presentation,p(c.presentationText),'lemma-established');
case 'lemma-criteria':return cols(panel(c.accessible,p(c.accessQuestion))+panel(c.sufficient,p(c.sufficientQuestion)))+p(c.criteria);
case 'lemma-counterexample':return multiplesMarkup(locale,4,6,24,24)+panel(c.counterexample,m(String.raw`12=4\cdot3=6\cdot2,\qquad24\nmid12`),'lemma-error');
case 'lemma-compare':return cols(panel(c.proved,m(String.raw`2\mid3k\Rightarrow2\mid k`)+p(c.validClaim),'lemma-established')+panel(c.counterexample,m(String.raw`4\mid6\cdot2,\quad4\nmid2`)+p(c.falseClaim),'lemma-error'));
case 'lemma-consecutive':return cols([2,5].map(k=>{const s=consecutive(k,2);return panel(s.values.join(', '),m(`${s.values.join('\\cdot')}=${s.product}=2\\cdot${s.quotient}`),'lemma-established');}).join(''))+m(String.raw`k(k+1)=2m,\quad m\in\mathbb Z`);
case 'lemma-bridge':return panel(c.known,m(String.raw`2\mid n,\quad n=3k`),'lemma-known')+arrow+panel(c.proved,m(String.raw`2\mid3k\Rightarrow2\mid k`),'lemma-established')+arrow+panel(c.conclusion,m(String.raw`k=2m\Rightarrow n=6m`),'lemma-established');
case 'lemma-directions':return cols(panel(c.forward,p(c.forwardQuestion),'lemma-known')+panel(c.backward,p(c.backwardQuestion),'lemma-pending'))+panel(c.middle,p(c.meeting))+p(c.directions);
default:throw new Error('Unknown lemma figure');}}
export const lemmaTitle=(locale:Locale,kind:LemmaFigure)=>lemmaText(locale).figures[lemmaFigures.indexOf(kind)];
