import type {Locale} from '../i18n';
import {triangleText} from '../reasoning/triangle-copy.ts';
import {triangleFigures,trianglePoints,slotNames,sideSlots,incidence,triangleState,sideRequirement,strategyChoice,firstAttempt,balancedAttempt,solvedAttempt,type Piece,type TriangleFigure} from './triangle-model.ts';
import {justificationMath as math} from './justification-render.ts';
import {escapeSvg as esc} from './plane.ts';
const p=(s:string)=>`<p>${esc(s)}</p>`;
const panel=(title:string,body:string,role='')=>`<section class="discovery-panel ${role}"><h4>${esc(title)}</h4>${body}</section>`;
const cols=(s:string)=>`<div class="discovery-columns">${s}</div>`;
const arrow='<p class="triangle-arrow" aria-hidden="true">↓</p>';
export function triangleDiagram(locale:Locale,labels:readonly string[],counts=false){const c=triangleText(locale);return `<svg class="triangle-scene" viewBox="0 0 500 435" role="img" aria-label="${esc(c.positions.map((name,i)=>name+': '+labels[i]).join('; '))}"><path class="triangle-edge" d="M250 55L70 375H430Z"/>${trianglePoints.map(([x,y],i)=>`<g><circle class="${i<3?'triangle-corner':'triangle-middle'} ${labels[i]==='?'?'triangle-unknown':''}" cx="${x}" cy="${y}" r="28"/><text x="${x}" y="${y+8}">${esc(labels[i])}</text>${counts?`<circle class="triangle-count" cx="${x+24}" cy="${y-24}" r="17"/><text class="triangle-count-text" x="${x+24}" y="${y-19}">${incidence[i]}×</text>`:''}</g>`).join('')}</svg>`;}
export function triangleMarkup(locale:Locale,values:readonly Piece[],target=10){const c=triangleText(locale),s=triangleState(values,target);return triangleDiagram(locale,values.map(n=>n===null?'?':String(n)))+`<div class="triangle-sums">${s.sums.map((sum,i)=>`<section class="${sum===null?'':sum===target?'triangle-ok':'triangle-violated'}"><h4>${esc(c.sides[i])}</h4>${math(sideSlots[i].map(j=>values[j]===null?'?':values[j]).join('+')+'='+(sum===null?'?':sum),locale)}</section>`).join('')}</div>`+p(`${c.target}: ${target}`)+p(!s.complete?c.partial:!s.unique?c.duplicate:s.solved?c.solved:s.equal?c.equalWrong:c.notSolved)+p(`${c.remaining}: ${s.remaining.join(', ')||'—'}`);}
export function sideMarkup(locale:Locale,second:number){const c=triangleText(locale),s=sideRequirement(1,second);return `<svg class="triangle-side" viewBox="0 0 500 110" role="img" aria-label="1 + ${s.middle} + ${second} = 10"><path d="M80 50H420"/>${[1,s.middle,second].map((n,i)=>`<circle class="${i===1?(s.available?'triangle-middle':'triangle-bad'):'triangle-corner'}" cx="${80+i*170}" cy="50" r="28"/><text x="${80+i*170}" y="58">${n}</text>`).join('')}</svg>`+math(`1+${s.middle}+${second}=10`,locale)+p(s.available?c.available:c.unavailable);}
export function challengeFeedback(locale:Locale,choice:number|null){const c=triangleText(locale);strategyChoice(choice);return choice===null?p(c.choose):p(c.feedback[choice])+p(c.report);}
export function challengeProof(locale:Locale){const c=triangleText(locale);return math(String.raw`3S=21+a+b+c,\qquad S=8`,locale)+math(String.raw`a+b+c=24-21=3<1+2+3=6`,locale)+p(c.impossible);}
function symbols(locale:Locale){return triangleDiagram(locale,slotNames);}
export function triangleFigure(locale:Locale,kind:TriangleFigure){const c=triangleText(locale),m=(tex:string)=>math(tex,locale);switch(kind){
case 'triangle-empty':return triangleMarkup(locale,[null,null,null,null,null,null]);
case 'triangle-initial':return triangleMarkup(locale,firstAttempt);
case 'triangle-exchange':return triangleMarkup(locale,balancedAttempt);
case 'triangle-diagnosis':return c.obstacle.map((label,i)=>panel(label,p(c.obstacleQuestions[i]))).join('');
case 'triangle-polya':return c.polya.map((label,i)=>panel(`${i+1}. ${label}`,'',i===3?'triangle-cyan':'triangle-blue')+(i<3?arrow:'')).join('')+p(c.polyaCaption);
case 'triangle-roles':return symbols(locale)+cols(panel(c.corners,p(c.cornerRole),'triangle-blue')+panel(c.middles,p(c.middleRole),'triangle-cyan'));
case 'triangle-representation':return symbols(locale)+m(String.raw`a+x+b=10,\quad a+y+c=10,\quad b+z+c=10`)+p(c.representation);
case 'triangle-one-side':return sideMarkup(locale,2)+m('x=10-1-2=7');
case 'triangle-dependence':return cols(panel('a,b,c',m('a,b,c'))+panel('x,y,z',m(String.raw`x=10-a-b`)+m(String.raw`y=10-a-c`)+m(String.raw`z=10-b-c`),'triangle-cyan'))+p(c.dependency);
case 'triangle-relax':return p(c.relax)+m(String.raw`a+x+b=S,\quad a+y+c=S,\quad b+z+c=S`);
case 'triangle-counting':return triangleDiagram(locale,slotNames,true)+cols(panel(c.countedTwice,m('2a+2b+2c'),'triangle-blue')+panel(c.countedOnce,m('x+y+z'),'triangle-cyan'))+p(c.doubleCount);
case 'triangle-invariant':return m(String.raw`3S=21+a+b+c`)+p(c.invariant);
case 'triangle-corner-nine':return m(String.raw`S=10\quad\Longrightarrow\quad a+b+c=9`)+p(c.necessary);
case 'triangle-partial':return triangleDiagram(locale,['1','3','5','?','?','?'])+p(c.partialCaption);
case 'triangle-solution':return triangleMarkup(locale,solvedAttempt);
case 'triangle-learning':return cols(panel(c.learning[0],p(c.repetition),'triangle-cyan')+panel(c.learning[1],p(c.adapt),'triangle-established'));
case 'triangle-challenge':return triangleDiagram(locale,['?','?','?','?','?','?'])+p(`${c.target}: 8`);
case 'triangle-impossible':return m(String.raw`1+2+3=6,\qquad a+b+c\geq6`)+`<svg class="triangle-bound" viewBox="0 0 540 130" role="img" aria-label="${esc(c.bound)}"><path class="triangle-axis" d="M40 70H490"/><path class="triangle-possible" d="M220 70H490"/>${[0,3,6,9,12,15].map(n=>`<text x="${40+30*n}" y="110">${n}</text>`).join('')}<circle class="triangle-bad" cx="130" cy="70" r="7"/><circle class="triangle-corner" cx="220" cy="70" r="7"/></svg>`+p(c.bound)+p(c.impossible);
case 'triangle-next':return c.next.map((label,i)=>panel(label,'',i===3?'triangle-established':'')+(i<4?arrow:'')).join('');
case 'triangle-progress':return c.progress.map((label,i)=>panel(`${i+1}. ${label}`,p(c.progressDetails[i]))).join('');
 default:throw new Error('Unknown triangle figure');
}}
export const triangleTitle=(locale:Locale,kind:TriangleFigure)=>triangleText(locale).figureTitles[triangleFigures.indexOf(kind)];
