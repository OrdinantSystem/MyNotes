import type {Locale} from '../i18n';
import {escapeSvg as esc} from './plane.ts';
import {renderMathText} from '../math-text.ts';
import {justificationMath as math} from './justification-render.ts';
import {reframeText} from '../reasoning/reframe-copy.ts';
import {reframeFigures,transformedCells,rowState,overlapCells,handshakeCells,handshakePairs,pairState,sumTo,size,type ReframeFigure} from './reframe-model.ts';
const p=(s:string)=>`<p>${renderMathText(s)}</p>`;
const panel=(title:string,body:string,role='')=>`<section class="discovery-panel ${role}"><h4>${esc(title)}</h4>${body}</section>`;
const cols=(s:string)=>`<div class="discovery-columns">${s}</div>`;
const label=(i:number)=>String.fromCharCode(65+i);
export function constructionSvg(locale:Locale,n:number,stage:number,selectedRow=0){const c=reframeText(locale),cells=transformedCells(n,stage),wide=stage===1||stage===2,columns=wide?2*n+3:n+1,w=50+columns*38,h=80+n*38;
 return `<svg class="reframe-scene" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(c.stages[stage])}: ${n} ${esc(c.rows)}${stage===3?`, ${n+1} ${esc(c.columns)}`:''}">${cells.map(t=>`<circle data-object="${t.id}" data-row="${t.r}" data-column="${t.c}" class="reframe-${t.group}${selectedRow===t.r+1?' reframe-selected':''}" cx="${38+38*t.c}" cy="${45+38*t.r}" r="10"/>`).join('')}${stage===3?`<path class="reframe-axis" d="M24 ${h-28}H${38+n*38+14}"/><text x="${38+n*19}" y="${h-7}">${n+1}</text>`:''}</svg>`;
}
const legend=(locale:Locale)=>{const c=reframeText(locale);return `<div class="reframe-legend"><span class="reframe-key original">${esc(c.original)}</span><span class="reframe-key copy">${esc(c.copy)}</span></div>`;};
export function constructionMarkup(locale:Locale,n:number,stage:number){const c=reframeText(locale);return `<h4>${esc(c.stages[stage])}</h4>${constructionSvg(locale,n,stage)}${stage?legend(locale):''}${p(c.stageDetails[stage])}${stage===3?math(`2S_{${n}}=${n}\\cdot${n+1}=${n*(n+1)}`,locale)+math(`S_{${n}}=\\frac{${n}\\cdot${n+1}}{2}=${sumTo(n)}`,locale):''}`;}
export function rowsMarkup(locale:Locale,n:number,k:number){const c=reframeText(locale),s=rowState(n,k);return constructionSvg(locale,n,3,k)+legend(locale)+math(`${s.original}+${s.copy}=${s.total}`,locale)+p(c.row)+math(String.raw`k+(n+1-k)=n+1`,locale)+p(c.finite);}
export function overlapMarkup(locale:Locale,n=5){size(n);const c=reframeText(locale),cells=overlapCells(n),occupied=new Map<string,typeof cells>();for(const cell of cells){const key=`${cell.r},${cell.c}`;occupied.set(key,[...(occupied.get(key)||[]),cell]);}const w=60+38*n;
 return `<svg class="reframe-scene" viewBox="0 0 ${w} ${w}" role="img" aria-label="${esc(c.overlapLabel)}">${[...occupied.values()].map(group=>{const t=group[0],x=40+38*t.c,y=40+38*t.r;return `<circle class="${group.length>1?'reframe-error':'reframe-'+t.group}" cx="${x}" cy="${y}" r="11"/>${group.length>1?`<text x="${x}" y="${y+5}">×2</text>`:''}`;}).join('')}</svg>${p(c.overlap)}${math(`${n}^2=${occupied.size}\\neq 2\\cdot${sumTo(n)}=${cells.length}`,locale)}${math(`${occupied.size}+${n}=${cells.length}`,locale)}`;
}
export function networkMarkup(locale:Locale,n=5){size(n);const c=reframeText(locale),points=Array.from({length:n},(_,i)=>[180+125*Math.cos(2*Math.PI*i/n-Math.PI/2),165+125*Math.sin(2*Math.PI*i/n-Math.PI/2)]);
 return `<svg class="reframe-network" viewBox="0 0 360 330" role="img" aria-label="${esc(c.network)}">${handshakePairs(n).map(([a,b])=>`<line x1="${points[a][0]}" y1="${points[a][1]}" x2="${points[b][0]}" y2="${points[b][1]}"/>`).join('')}${points.map(([x,y],i)=>`<circle class="reframe-original" cx="${x}" cy="${y}" r="16"/><text x="${x}" y="${y+5}">${label(i)}</text>`).join('')}</svg>`;
}
export function handshakeTable(locale:Locale,n:number,a:number|null=null,b:number|null=null){const c=reframeText(locale);pairState(n,a,b);const cells=handshakeCells(n);return `<div class="reframe-table" tabindex="0" role="region" aria-label="${esc(c.titles.handshakes)}"><table><thead><tr><th></th>${Array.from({length:n},(_,i)=>`<th scope="col">${label(i)}</th>`).join('')}</tr></thead><tbody>${Array.from({length:n},(_,r)=>`<tr><th scope="row">${label(r)}</th>${cells.filter(t=>t.r===r).map(t=>{const selected=a!==null&&b!==null&&((t.r===a&&t.c===b)||(t.r===b&&t.c===a));return `<td class="reframe-${t.kind}${selected?' reframe-cell-selected':''}" aria-label="${label(t.r)}${label(t.c)}: ${esc(c[t.kind])}">${t.kind==='diagonal'?'×':label(t.r)+label(t.c)}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>`;}
export function handshakesMarkup(locale:Locale,n:number,a:number|null=null,b:number|null=null){const c=reframeText(locale),s=pairState(n,a,b);return handshakeTable(locale,n,a,b)+`<div class="reframe-legend"><span class="reframe-key original">${esc(c.representative)}</span><span class="reframe-key copy">${esc(c.mirror)}</span><span>${esc(c.diagonal)}</span></div>`+math(`\\frac{${n}^2-${n}}{2}=\\frac{${n}\\cdot${n-1}}{2}=${s.pairs}`,locale)+p(n===1?c.one:!s.selected?c.selection:s.excluded?c.same:c.different);}
function plainRectangle(locale:Locale){const c=reframeText(locale);return `<svg class="reframe-scene" viewBox="0 0 290 250" role="img" aria-label="5 ${esc(c.rows)}, 6 ${esc(c.columns)}">${Array.from({length:30},(_,i)=>`<circle class="reframe-established" cx="${40+38*(i%6)}" cy="${35+38*Math.floor(i/6)}" r="10"/>`).join('')}</svg>`;}
function radial(locale:Locale){const c=reframeText(locale);return `<svg class="reframe-network" viewBox="0 0 340 340" role="img" aria-label="${esc(c.radial)}">${[1,2,3,4,5].map(k=>`${k===1?'':`<circle class="reframe-orbit" cx="170" cy="170" r="${(k-1)*30}"/>`}${Array.from({length:k},(_,i)=>`<circle class="reframe-original" cx="${170+(k-1)*30*Math.cos(2*Math.PI*i/k-Math.PI/2)}" cy="${170+(k-1)*30*Math.sin(2*Math.PI*i/k-Math.PI/2)}" r="9"/>`).join('')}`).join('')}</svg>`;}
export function reframeFigure(locale:Locale,kind:ReframeFigure){const c=reframeText(locale),m=(s:string)=>math(s,locale);switch(kind){
case 'reframe-expression':return m(String.raw`1+2+3+\cdots+n`)+m(String.raw`n-1`)+p(locale==='de'?'Additionen beim direkten schrittweisen Summieren.':'Additions when summing directly, one term at a time.');
case 'reframe-objects':return constructionSvg(locale,5,0)+p(c.correspondence);
case 'reframe-forms':return cols(panel(c.forms[0],m('1+2+3+4+5')+p(c.formDetails[0]))+panel(c.forms[1],m('(1,2,3,4,5)')+p(c.formDetails[1]))+panel(c.forms[2],`<table><tbody><tr><th>${esc(c.position)}</th>${[1,2,3,4,5].map(n=>`<td>${n}</td>`).join('')}</tr><tr><th>${esc(c.value)}</th>${[1,2,3,4,5].map(n=>`<td>${n}</td>`).join('')}</tr></tbody></table>`+p(c.formDetails[2]))+panel(c.forms[3],constructionSvg(locale,5,0)+p(c.formDetails[3])));
case 'reframe-growth':return constructionSvg(locale,5,0)+p(c.growth);
case 'reframe-compare':return cols(panel(c.triangular,constructionSvg(locale,5,0))+panel(c.rectangle,plainRectangle(locale)))+p(c.compare);
case 'reframe-challenge':return constructionSvg(locale,5,0)+p(c.challenge);
case 'reframe-copy':return constructionMarkup(locale,5,1);
case 'reframe-rotate':return constructionMarkup(locale,5,2);
case 'reframe-rectangle':return constructionMarkup(locale,5,3);
case 'reframe-half':return cols(panel(c.rectangle,constructionSvg(locale,5,3)+m('30'))+panel(c.original,constructionSvg(locale,5,0)+m('30/2=15')));
case 'reframe-row':return rowsMarkup(locale,5,3);
case 'reframe-accounting':return [c.preserve,c.double,c.recover].map((s,i)=>panel(s,m([String.raw`S_n\longrightarrow S_n`,String.raw`S_n\longrightarrow 2S_n`,String.raw`2S_n/2=S_n`][i]))).join('');
case 'reframe-overlap':return overlapMarkup(locale);
case 'reframe-methods':return cols(panel(c.methods[0],m(String.raw`S_{k+1}=S_k+(k+1)`)+p(c.methodDetails[0]))+panel(c.methods[1],constructionSvg(locale,5,3)+m(String.raw`2S_n=n(n+1)`)+p(c.methodDetails[1])));
case 'reframe-radial':return cols(panel(c.radial,radial(locale)+p(c.radialDetails))+panel(c.triangular,constructionSvg(locale,5,0)+p(c.triangleDetails)));
case 'reframe-network':return networkMarkup(locale)+p(c.network);
case 'reframe-table':return handshakesMarkup(locale,5);
case 'reframe-synthesis':return m(String.raw`1+2+\cdots+n`)+constructionSvg(locale,5,3)+m(String.raw`\frac{n(n+1)}{2}`);
case 'reframe-process':return c.steps.map((s,i)=>panel(`${i+1}. ${s}`,p(c.questions[i]))).join('');
default:throw new Error('Unknown representation figure');}}
export const reframeTitle=(locale:Locale,kind:ReframeFigure)=>reframeText(locale).figureTitles[reframeFigures.indexOf(kind)];
