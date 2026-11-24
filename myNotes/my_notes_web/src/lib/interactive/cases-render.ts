import type {Locale} from '../i18n';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
import {justificationMath as caseMath} from './justification-render.ts';
import {consecutive,oddSquare,choiceAnswer,type CasesPreset} from './cases-model.ts';
import {remainder} from './equivalence-model.ts';
import {casesText} from '../reasoning/cases-copy.ts';
export {caseMath};
export const caseTex={integer:String.raw`n\in\mathbb Z`,target:String.raw`\exists m\in\mathbb Z:\ n(n+1)=2m`,even:'n=2k',odd:'n=2k+1',evenAssumed:String.raw`n=2k,\quad k\in\mathbb Z`,oddAssumed:String.raw`n=2k+1,\quad k\in\mathbb Z`,kInteger:String.raw`k\in\mathbb Z`,evenProduct:String.raw`\begin{aligned}n(n+1)&=(2k)(2k+1)\\&=2\bigl[k(2k+1)\bigr]\end{aligned}`,oddProduct:String.raw`\begin{aligned}n(n+1)&=(2k+1)\,2(k+1)\\&=2\bigl[(2k+1)(k+1)\bigr]\end{aligned}`,evenWitness:String.raw`m=k(2k+1)\in\mathbb Z`,oddWitness:String.raw`m=(2k+1)(k+1)\in\mathbb Z`,productConclusion:String.raw`2\mid n(n+1)`,match:'2k(2k+1)',twoM:'2m',successor:'(2k+1)+1=2(k+1)',logic:String.raw`\bigl[(P\lor Q)\land(P\Rightarrow R)\land(Q\Rightarrow R)\bigr]\Rightarrow R`,squareTarget:String.raw`\exists m\in\mathbb Z:\ n^2=2m`,evenSquare:'(2k)^2=2k^2+2k^2',squareAssumed:String.raw`n^2=2m,\quad m\in\mathbb Z`,reverseTarget:String.raw`\exists k\in\mathbb Z:\ n=2k`,squareForward:String.raw`P\Rightarrow Q`,squareReverse:String.raw`Q\Rightarrow P`,both:String.raw`P\Leftrightarrow Q`,contraposition:String.raw`\neg P\Rightarrow\neg Q`,threeForms:['n=3k','n=3k+1','n=3k+2'],threeFactors:['n=3k','n+2=3(k+1)','n+1=3(k+1)'],threeConclusion:String.raw`3\mid n(n+1)(n+2)`,divForward:String.raw`6\mid n\;\Rightarrow\;3\mid n`,divReverse:String.raw`3\mid n\;\Rightarrow\;6\mid n`};
export const mp=(s:string)=>`<p>${renderMathText(s)}</p>`;
export function integerStrip(locale:Locale,start:number,width:2|3){
 const c=casesText(locale),s=consecutive(start,width);
 return `<div class="cases-strip-scroll" tabindex="0" role="region" aria-label="${esc(c.selected)}"><div class="cases-strip">${Array.from({length:9},(_,i)=>start-3+i).map(n=>`<span class="cases-number cases-role-${remainder(n,width)}" data-selected="${n>=start&&n<start+width}"><strong>${n<0?'−'+Math.abs(n):n}</strong><small>${width===2?(remainder(n,2)===0?c.even:c.odd):`${c.remainder} ${remainder(n,3)}`}</small></span>`).join('')}</div></div>`+caseMath(`${s.values.map(v=>v<0?`(${v})`:v).join('\\cdot')}=${s.product}`,locale)+mp(`${c.multiple} ${width}: $${s.factor}$. $${s.product}=${width}\\cdot(${s.quotient})$.`);
}
export function squareGrid(_locale:Locale,n:number,odd=true){
 const s=odd?oddSquare(n):null,size=336,cell=size/n;
 const cells=Array.from({length:n*n},(_,i)=>{const x=i%n,y=Math.floor(i/n),area=odd?(x<n-1&&y<n-1?'center':x===n-1&&y===n-1?'corner':'strip'):(x<n/2?'left':'right');return `<rect data-area="${area}" class="cases-cell cases-area-${area}" x="${48+x*cell}" y="${20+y*cell}" width="${cell}" height="${cell}"/>`;}).join('');
 const label=odd?`${n} × ${n}: ${s!.center} + ${s!.strips} + 1 = ${s!.total}`:`${n} × ${n}: ${n*n/2} + ${n*n/2} = ${n*n}`;
 return `<svg class="cases-square" viewBox="0 0 420 410" role="img" aria-label="${esc(label)}">${cells}<g fill="var(--text)" font-size="18" text-anchor="middle"><text x="216" y="392">${n}</text><text x="24" y="194">${n}</text>${!odd?`<text x="132" y="194">${n*n/2}</text><text x="300" y="194">${n*n/2}</text>`:''}</g></svg>`;
}
export function oddSquareMarkup(locale:Locale,n:number){
 const c=casesText(locale),s=oddSquare(n);
 return caseMath(`n=${n}=2\\cdot${s.k}+1`,locale)+squareGrid(locale,n)+`<dl class="cases-area-key"><div><dt>${esc(c.center)}</dt><dd>${caseMath(`4k^2=${s.center}`,locale)}</dd></div><div><dt>${esc(c.strips)}</dt><dd>${caseMath(`4k=${s.strips}`,locale)}</dd></div><div><dt>${esc(c.corner)}</dt><dd>1</dd></div></dl>`+caseMath(`${n}^2=${s.center}+${s.strips}+1=${s.total}`,locale);
}
export function caseQuestions(locale:Locale,preset:CasesPreset){const c=casesText(locale);if(preset==='inspection')return {questions:[c.inspectionQuestion],options:c.inspectionOptions,answers:[2]};if(preset==='factors')return {questions:c.factorQuestions,options:c.factorOptions,answers:[0,2,1]};if(preset==='coverage-practice')return {questions:c.coverageQuestions,options:c.coverageOptions,answers:[1,0,0,1]};throw new Error('Not a question activity');}
export function caseFeedback(locale:Locale,preset:'inspection'|'factors'|'coverage-practice',row:number,answer:number|null){
 const correct=choiceAnswer(preset,row,answer);if(answer===null)return '';const c=casesText(locale),detail=preset==='inspection'?c.inspectionFeedback[answer]:preset==='factors'?(correct?c.factorFeedback[row]:c.factorRetry):c.coverageFeedback[row];
 return `<p data-cases-correct="${correct}"><strong>${esc(correct?c.correct:c.retry)}</strong> ${renderMathText(detail)}</p>`;
}
