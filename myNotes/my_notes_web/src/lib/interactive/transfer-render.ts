import type {Locale} from '../i18n';
import {transferText} from '../reasoning/transfer-copy.ts';
import {transferFigures,sameRemainder,initialRecord,recordSummary,calibrationX as X,calibrationY as Y,type RecordRow,type TransferFigure,type ExperimentState} from './transfer-model.ts';
import {justificationMath as math,oddObjectsMarkup} from './justification-render.ts';
import {escapeSvg as esc} from './plane.ts';
const p=(t:string)=>`<p>${esc(t)}</p>`;
const panel=(title:string,body:string,role='')=>`<section class="discovery-panel ${role}"><h4>${esc(title)}</h4>${body}</section>`;
const arrow='<p class="transfer-arrow" aria-hidden="true">↓</p>';
const cols=(s:string)=>`<div class="discovery-columns">${s}</div>`;
export const percent=(n:number)=>`${Number(n.toFixed(1))}%`;
export function calibrationGraph(locale:Locale,rows:RecordRow[]){const c=transferText(locale),s=recordSummary(rows);return `<div class="transfer-axis-label">${esc(c.yAxis)}</div><svg class="transfer-chart" viewBox="0 0 430 400" role="img" aria-label="${esc(c.chartCaption)}"><path class="under-region" d="M60 350V30H380Z"/><path class="over-region" d="M60 350H380V30Z"/>${[0,25,50,75,100].map(n=>`<path class="grid" d="M60 ${Y(n)}H380"/><text x="44" y="${Y(n)+4}" text-anchor="end">${n}</text><text x="${X(n)}" y="375">${n}</text>`).join('')}<path class="axis" d="M60 30V350H380"/><path class="ideal" d="M60 350L380 30"/><text x="165" y="65">${esc(c.under)}</text><text x="285" y="325">${esc(c.over)}</text>${s.n?`<circle data-transfer-point cx="${X(s.predicted!)}" cy="${Y(s.observed!)}" r="6"/>`:''}</svg><div class="transfer-axis-label">${esc(c.xAxis)}</div>`+p(c.ideal)+p(c.chartCaption);}
export function recordMarkup(locale:Locale,rows:RecordRow[]){const c=transferText(locale),s=recordSummary(rows);return s.n?cols(panel(c.predicted,p(percent(s.predicted!)),'transfer-purple')+panel(c.observed,p(percent(s.observed!)),'transfer-established'))+p(`${c.paired}: ${s.n}`)+calibrationGraph(locale,rows):p(c.empty)+calibrationGraph(locale,rows);}
export function experimentReadout(locale:Locale,s:ExperimentState){const c=transferText(locale);return p(s.prediction===null?c.noPrediction:`${c.saved}: ${percent(s.prediction)}`)+(s.solutionSeen?p(c.referenceSeen):'')+(s.outcome?p(c.outcomes[['independent','supported','not-yet'].indexOf(s.outcome)])+p(c.report):'');}
export function experimentSolution(locale:Locale,preset:'reconstruct'|'apply'){const c=transferText(locale);return preset==='reconstruct'?math(String.raw`x+y=(2a+1)+(2b+1)=2a+2b+2=2(a+b+1)`,locale)+math(String.raw`a+b+1\in\mathbb Z`,locale)+p(c.reconstructionProof):p(c.transferProof)+math(String.raw`\begin{aligned}x-y&=(5a+2)-(5b+2)\\&=5a+2-5b-2\\&=5a-5b\\&=5(a-b)\end{aligned}`,locale)+math(String.raw`a-b\in\mathbb Z\quad\Longrightarrow\quad5\mid(x-y)`,locale);}
function chain(locale:Locale,hide:number){const c=transferText(locale);return c.chain.map((title,i)=>panel(i>0&&i<=hide?c.hidden:title,i>0&&i<=hide?'<span aria-hidden="true">?</span>':'',i>0&&i<=hide?'transfer-missing':'transfer-blue')+(i<3?arrow:'')).join('');}
export function transferFigure(locale:Locale,kind:TransferFigure){const c=transferText(locale),m=(t:string)=>math(t,locale);switch(kind){
case 'transfer-complete':return chain(locale,0);
case 'transfer-withheld':return chain(locale,2);
case 'transfer-route':return `<svg class="transfer-route" viewBox="0 0 460 250" role="img" aria-label="${esc(c.routeCaption)}">${[55,140,225,310,395].map(x=>`<path class="street" d="M${x} 30V215"/>`).join('')}${[45,115,185].map(y=>`<path class="street" d="M30 ${y}H430"/>`).join('')}<path class="journey" d="M55 185H140V115H310V45H395"/><circle cx="55" cy="185" r="6"/><circle cx="395" cy="45" r="6"/><text x="55" y="237">${esc(c.start)}</text><text x="395" y="23">${esc(c.destination)}</text></svg>`+p(c.routeCaption);
case 'transfer-abilities':return c.abilities.map((t,i)=>panel(`${i+1}. ${t}`,p(c.abilityDetails[i]))).join('')+p(c.evidenceCaption);
case 'transfer-evidence':return c.abilities.map((t,i)=>panel(t,p(`${i===0?'✓':'?'} ${i===0?c.demonstrated:c.untested}`),i===0?'transfer-established':'')).join('')+p(c.evidenceCaption);
case 'transfer-pairs':return oddObjectsMarkup(locale,2,3);
case 'transfer-form':return m(String.raw`x+y=\underbrace{2}_{\text{${c.factor}}}\underbrace{(a+b+1)}_{\text{${c.integer}}}`)+m(String.raw`a+b+1\in\mathbb Z,\qquad x+y\in2\mathbb Z`)+p(c.even);
case 'transfer-decisions':return panel(c.known,m('x=2a+1,\\quad y=2b+1'),'transfer-blue')+arrow+panel(c.goal,m('x+y=2k,\\quad k\\in\\mathbb Z'))+arrow+panel(c.steps[1],p(c.decision),'transfer-purple')+arrow+panel(c.steps[2],m('x+y=2(a+b+1)')+p(c.verify));
case 'transfer-search':return cols(panel(c.supplied,'<div class="transfer-search-art" aria-hidden="true">●<br/>│<br/>●<br/>│<br/>●</div>','transfer-established')+panel(c.found,'<div class="transfer-search-art" aria-hidden="true">●<br/>╱│╲<br/>?　?　?</div>','transfer-missing'))+p(c.searchCaption);
case 'transfer-cognition':return cols(panel(c.cognition,p(c.cognitionText),'transfer-blue')+panel(c.meta,p(c.metaText),'transfer-purple'));
case 'transfer-remainder':{const s=sameRemainder(2,1,5,2);return [s.x,s.y].map((n,i)=>`<svg class="transfer-number-line" viewBox="0 0 550 100" role="img" aria-label="${n}=5·${i===0?2:1}+2"><path d="M25 40H525"/>${Array.from({length:16},(_,k)=>`<text x="${25+k*32}" y="80">${k}</text>`).join('')}<circle cx="${25+n*32}" cy="40" r="6"/></svg>`).join('')+m('12=5\\cdot2+2,\\quad7=5\\cdot1+2')+m('12-7=5')+p(c.remainderCaption);}
case 'transfer-comparison':return cols(panel(c.proofNames[0],m('x=2a+1,\\quad y=2b+1')+arrow+m('x+y=2a+2b+2=2(a+b+1)')+m('a+b+1\\in\\mathbb Z')+p(c.even),'transfer-blue')+panel(c.proofNames[1],m('x=5a+2,\\quad y=5b+2')+arrow+m('x-y=5a-5b=5(a-b)')+m('a-b\\in\\mathbb Z')+m('5\\mid(x-y)'),'transfer-purple'))+c.steps.slice(0,3).map(p).join('');
case 'transfer-structure':return c.steps.map((t,i)=>panel(`${i+1}. ${t}`,'',i===3?'transfer-established':'transfer-blue')+(i<3?arrow:'')).join('');
case 'transfer-calibration':return recordMarkup(locale,initialRecord())+p(c.warning);
case 'transfer-practice':return c.practice.map((t,i)=>panel(t,p(c.practiceDetails[i]),i===0?'transfer-blue':i===3?'transfer-missing':'')+(i<3?arrow:'')).join('');
case 'transfer-questions':return panel(c.feeling,'')+arrow+panel(c.question,c.abilities.map(t=>`<p>${esc(t)}</p>`).join(''));
case 'transfer-fading':return c.fading.map((t,i)=>panel(t,chain(locale,i))).join('');
case 'transfer-course':return c.course.map((t,i)=>panel([c.steps[3],c.abilities[2],c.meta][i],p(t))).join('');
 default:throw new Error('Unknown transfer figure');
}}
export const transferTitle=(locale:Locale,kind:TransferFigure)=>transferText(locale).figureTitles[transferFigures.indexOf(kind)];
