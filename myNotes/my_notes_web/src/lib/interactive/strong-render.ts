import type {Locale} from '../i18n';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
import {justificationMath as math} from './justification-render.ts';
import {isPrime} from './counterexample-model.ts';
import {factorScope,primeFactors,treeState,leastState,strongFigures,type TreeChoice,type StrongFigure} from './strong-model.ts';
import {strongText} from '../reasoning/strong-copy.ts';
const p=(s:string)=>`<p>${renderMathText(s)}</p>`;
const panel=(title:string,body:string,role='')=>`<section class="discovery-panel ${role}"><h4>${renderMathText(title)}</h4>${body}</section>`;
const cols=(body:string)=>`<div class="discovery-columns">${body}</div>`;
const arrow='<p class="discovery-arrow" aria-hidden="true">↓</p>';
export function scopeMarkup(locale:Locale,n:number,a:number|null,applied:boolean){const c=strongText(locale),s=factorScope(n,a),m=(t:string)=>math(t,locale);
 if(s.prime)return `<div data-strong-conclusion="${s.base?'base':'prime'}">${panel(s.base?c.base:c.prime,m(`P(${n}):\\quad ${n}=${n}`)+p(s.base?c.baseCase:c.primeCase),'strong-established')}${p(c.conditional)}</div>`;
 return `<div data-strong-conclusion="${applied?'conditional':'open'}">${cols(panel(c.hypothesis,m(`\\forall m\\in\\mathbb Z:\\;2\\leq m<${n}\\Rightarrow P(m)`)+p(c.assumed),'strong-assumed')+panel(c.goal,m(`P(${n})`)+p(c.notAssumed)))}${panel(c.scope,m(`${n}=${s.a}\\cdot${s.b},\\qquad2\\leq${s.a}<${n},\\quad2\\leq${s.b}<${n}`)+m(`P(${s.a}),\\quad P(${s.b})`),'strong-assumed')}${applied?panel(c.conclusion,m(`P(${s.a})\\land P(${s.b})\\Rightarrow P(${n})`)+p(c.applied),'strong-established'):p(c.unknown)}${p(c.conditional)}</div>`;
}
export function treeMarkup(locale:Locale,choice:TreeChoice,step:number){const c=strongText(locale),s=treeState(choice,step),m=(t:string)=>math(t,locale),height=95+s.max*100;
 const edges=s.nodes.filter(n=>n.parent).map(n=>{const parent=s.nodes.find(p=>p.node.id===n.parent)!;return `<line x1="${40+parent.x}" y1="${45+parent.depth*100+24}" x2="${40+n.x}" y2="${45+n.depth*100-24}"/>`;}).join('');
 const nodes=s.nodes.map(({node,depth,x})=>`<g data-factor-node="${node.id}" data-factor-value="${node.value}" class="${isPrime(node.value)?'prime':'composite'}"><circle cx="${40+x}" cy="${45+depth*100}" r="25"/><text x="${40+x}" y="${51+depth*100}">${node.value}</text><text class="strong-node-kind" x="${40+x}" y="${84+depth*100}">${esc(isPrime(node.value)?c.prime:c.composite)}</text></g>`).join('');
 return `<p data-strong-level>${esc(c.level)} ${step} ${esc(c.of)} ${s.max}</p><div class="strong-tree-scroll" role="region" tabindex="0" aria-label="${esc(c.scroll)}"><svg class="strong-tree" viewBox="0 0 720 ${height}" role="img" aria-label="${esc(`${c.treeChoice}: ${s.root.value}. ${c.leaves}: ${s.frontier.map(n=>n.value).join(' × ')}.`)}"><g class="strong-edges">${edges}</g>${nodes}</svg></div>${panel(c.leaves,m(`${s.root.value}=${s.frontier.map(n=>n.value).join('\\cdot')}`))}${p(s.complete?c.complete:c.incomplete)}${p(c.treeCaption)}`;
}
export function leastMarkup(locale:Locale,step:number){const c=strongText(locale),s=leastState(step),m=(t:string)=>math(t,locale);
 return `<div data-least-stage="${step}" data-assumption-discharged="${s.assumptionDischarged}"><h4>${esc(c.leastStages[step])}</h4>${p(c.hypothetical)}${panel(c.least,m(String.raw`C=\{n\in\mathbb N:n\geq2\land\neg P(n)\}`)+m(String.raw`C\ne\varnothing`),'strong-hypothetical')}${s.leastChosen?panel(c.available,m(String.raw`c=\min C,\qquad\forall m\in\mathbb Z:\;2\leq m<c\Rightarrow P(m)`),'strong-assumed'):''}${s.composite?m(String.raw`c=ab,\qquad2\leq a,b<c`):''}${s.factorsCovered?m(String.raw`P(a)\land P(b)\Rightarrow P(c)`):''}${s.contradiction?panel(c.verified,m(String.raw`P(c)\land\neg P(c)\quad\Longrightarrow\quad C=\varnothing`),'strong-established'):''}${p(c.leastNotes[step])}</div>`;
}
function comparison(locale:Locale){const c=strongText(locale);return cols(panel(c.ordinary,math('P(4)\\Rightarrow P(5)',locale))+panel(c.strong,math('(P(1)\\land P(2)\\land P(3)\\land P(4))\\Rightarrow P(5)',locale),'strong-assumed'))+p(c.conditional);}
export function strongFigure(locale:Locale,kind:StrongFigure){const c=strongText(locale),m=(t:string)=>math(t,locale);switch(kind){
 case 'strong-branch':return treeMarkup(locale,'60-six',2)+cols(panel(c.ordinary,m('P(59)\\;?\\;P(60)')+p(c.unknown))+panel(c.strong,m('60=6\\cdot10')+m('P(6)\\land P(10)\\Rightarrow P(60)')))+p(c.smaller);
 case 'strong-comparison':return comparison(locale);
 case 'strong-scope':return cols(panel(c.hypothesis,m('P(1)\\land P(2)\\land P(3)\\land P(4)'),'strong-assumed')+panel(c.goal,m('P(5)')+p(c.notAssumed)))+p(c.conditional);
 case 'strong-examples':return `<div class="strong-example-grid">${Array.from({length:11},(_,i)=>i+2).map(n=>panel(`${n} · ${isPrime(n)?c.prime:c.composite}`,m(`${n}=${primeFactors(n).join('\\cdot')}`),isPrime(n)?'strong-established':'')).join('')}</div>`+p(c.finite);
 case 'strong-combine':return cols(panel('3',m('3=p_1\\cdots p_r'))+panel('4',m('4=q_1\\cdots q_s')))+m('12=(p_1\\cdots p_r)(q_1\\cdots q_s)')+p(c.merge);
 case 'strong-statement':return m(String.raw`P(n):\quad\exists r\in\mathbb Z_{\geq1},\;p_1,\ldots,p_r\text{ ${c.prime}}:\;n=p_1\cdots p_r`)+p(c.existence);
 case 'strong-base':return panel(c.base,m('P(2):\\quad2=2')+p(c.baseCase),'strong-established');
 case 'strong-hypothesis':return cols(panel(c.hypothesis,m(String.raw`\forall m\in\mathbb Z:\;2\leq m<n\Rightarrow P(m)`),'strong-assumed')+panel(c.goal,m('P(n)')+p(c.notAssumed)))+p(c.conditional);
 case 'strong-factors':return m(String.raw`n=ab,\quad a,b\in\mathbb Z,\quad a,b\geq2`)+m(String.raw`n=ab\geq2a>a,\qquad n=ab\geq2b>b`)+panel(c.scope,m(String.raw`2\leq a<n,\qquad2\leq b<n`),'strong-assumed')+p(c.smaller);
 case 'strong-product':return cols(panel('a',m('a=p_1\\cdots p_r'),'strong-assumed')+panel('b',m('b=q_1\\cdots q_s'),'strong-assumed'))+arrow+m('n=ab=p_1\\cdots p_rq_1\\cdots q_s')+p(c.merge);
 case 'strong-descent':return m('72>8>4>2')+m(String.raw`n_0>n_1>\cdots\geq2,\qquad n_i\in\mathbb Z`)+p(c.integer);
 case 'strong-least':return leastMarkup(locale,1);
 case 'strong-contradiction':return leastMarkup(locale,4);
 case 'strong-reals':return m(String.raw`S=\{x\in\mathbb R:x>0\}`)+m(String.raw`1>\frac12>\frac14>\frac18>\cdots>0`)+m(String.raw`\forall x\in S:\quad0<\frac{x}{2}<x`)+p(c.noLeast);
 case 'strong-methods':return comparison(locale)+panel(c.least,m(String.raw`c=\min C\Rightarrow\forall m\in\mathbb Z:\;2\leq m<c\Rightarrow P(m)`)+p(c.hypothetical),'strong-hypothetical');
 case 'strong-cumulative':return m('Q(k)=P(2)\\land P(3)\\land\\cdots\\land P(k)')+m('Q(2),\\qquad Q(k)\\Rightarrow Q(k+1)')+p(c.cumulative);
 case 'strong-uniqueness':return cols(panel(c.trees[1],treeMarkup(locale,'60-six',2))+panel(c.trees[2],treeMarkup(locale,'60-four',2)))+p(c.comparison)+p(c.existence);
 case 'strong-dependencies':return panel(c.goal,m('P(n)'))+arrow+cols(panel(c.available,m('P(a),\\quad P(b)')+m('2\\leq a,b<n'),'strong-assumed'))+p(c.smaller);
 default:throw new Error('Unknown strong-induction figure');
}}
export const strongTitle=(locale:Locale,kind:StrongFigure)=>strongText(locale).figures[strongFigures.indexOf(kind)];
