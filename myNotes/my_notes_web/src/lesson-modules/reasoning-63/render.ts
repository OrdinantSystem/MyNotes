import {geometry,oddSquare,consecutive,ringCounts,assessment,type Stage,type NumericPreset} from './model.ts';
import {text,type Locale} from './copy.ts';
import {escapeSvg} from '../../lib/interactive/plane.ts';
import {renderMathText} from '../../lib/math-text.ts';
const e=escapeSvg;
const math=(s:string)=>`<div class="a63-math" tabindex="0">${renderMathText(`$${s}$`)}</div>`;
const p=(s:string)=>`<p>${renderMathText(s)}</p>`;
const box=(heading:string,body:string,role='')=>`<div class="a63-box ${role}"><h4>${e(heading)}</h4>${body}</div>`;
const arrow='<div class="a63-arrow" aria-hidden="true">↓</div>';
const colors=['var(--blue)','var(--purple)','var(--accent)','var(--coral)'];
export function tilesMarkup(locale:Locale,k:number,stage:Stage|'layers'){
 if(!['square','rectangles','pairs','layers'].includes(stage))throw new Error('Unknown tile stage');
 const c=text(locale),g=geometry(k),scale=30,size=g.n*scale;
 const title=`${g.n} × ${g.n}; ${g.tiles.length} ${c.tiles}; ${g.m} ${c.groups} + 1`;
 let body=g.tiles.map(t=>`<rect data-tile="${t.id}" x="${t.c*scale+2}" y="${t.r*scale+2}" width="26" height="26" rx="2" fill="${t.region===-1?'var(--surface)':stage==='layers'?colors[(t.ring-1)%4]:stage==='square'?'var(--axis)':colors[t.region]}"${t.region===-1?' stroke="var(--accent)" stroke-width="2"':''}/>${t.region===-1?`<text x="${t.c*scale+15}" y="${t.r*scale+20}" text-anchor="middle" fill="var(--text)" font-size="15">1</text>`:''}`).join('');
 if(stage==='pairs')for(const region of g.pairs)for(const pair of region){const [a,b]=pair.tiles,minR=Math.min(a.r,b.r),minC=Math.min(a.c,b.c);body+=`<rect x="${minC*scale+4}" y="${minR*scale+4}" width="${a.c===b.c?22:52}" height="${a.r===b.r?22:52}" rx="3" fill="none" stroke="var(--text)" stroke-width="${pair.index===0?2:0.7}" opacity="${pair.index===0?1:0.65}"/>`;if(pair.index===0)body+=`<text x="${minC*scale+(a.c===b.c?15:30)}" y="${minR*scale+(a.r===b.r?20:35)}" text-anchor="middle" font-size="12" fill="var(--text)" stroke="var(--panel)" stroke-width="3" paint-order="stroke">①</text>`;}
 return `<svg class="a63-tiles" viewBox="0 0 ${size} ${size}" role="img" aria-label="${e(title)}"><title>${e(title)}</title>${body}</svg>`;
}
export function numericMarkup(locale:Locale,preset:NumericPreset,value:number,stage:Stage='square'){
 const c=text(locale);
 if(preset==='explore'){const v=oddSquare(value);return `<dl class="a63-readouts">${[[c.square,v.square],[c.quotient,v.quotient],[c.remainder,v.remainder]].map(([name,n])=>`<div><dt>${e(String(name))}</dt><dd>${n}</dd></div>`).join('')}</dl>${math(`(${v.n})^2=8\\cdot ${v.quotient}+${v.remainder}`)}<div class="a63-equation-parts"><span>${v.quotient} × 8 = ${8*v.quotient}</span><b>+</b><span class="a63-result">1</span></div>${p(c.exploreNote)}`;}
 if(preset==='consecutive'){const v=consecutive(value);return `<div class="a63-columns">${box(`k = ${v.k}`,p(v.k%2===0?c.evenLabel:c.oddLabel),v.k%2===0?'a63-blue':'a63-purple')}${box(`k + 1 = ${v.next}`,p(v.next%2===0?c.evenLabel:c.oddLabel),v.next%2===0?'a63-blue':'a63-purple')}</div>${math(`(${v.k})(${v.next})=2\\cdot (${v.m})`)}${p(c.consecutiveNote)}`;}
 const g=geometry(value);return `<p class="a63-summary">${c.side}: ${g.n} · k = ${g.k}</p>${tilesMarkup(locale,value,preset==='layers'?'layers':stage)}${preset==='layers'?`<div class="a63-ring-sum">${ringCounts(value).map((v,i)=>`<span>${i===0?'1':`${8} × ${i} = ${v}`}</span>`).join('<b>+</b>')}</div>${math(`${g.n}^2=1+8\\cdot ${g.m}`)}${p(c.layersNote)}`:`${math(stage==='pairs'?`${g.n}^2=8\\cdot ${g.m}+1`:`${g.n}^2=4\\cdot ${g.k}\\cdot ${g.k+1}+1`)}<p class="a63-summary">${stage==='square'?`${g.tiles.length} ${c.tiles}`:stage==='rectangles'?`4 ${c.rectangle} × ${g.k*(g.k+1)} + 1`:`${g.m} ${c.pair} → ${g.m} ${c.groups} + 1`}</p>${p(stage==='pairs'?c.pairNote:c.geometryNote)}`}`;
}
export function examMarkup(locale:Locale,index:number,choice:number){const c=text(locale);return box(assessment(index,choice)?c.aligned:c.reconsider,p(c.feedback[index]),'a63-result');}
export function figureMarkup(locale:Locale,kind:string):string{
 const c=text(locale);
 switch(kind){
 case 'process':case 'reflection':return `<ol class="a63-sequence">${(kind==='process'?c.process:c.reflection).map(s=>{const [heading,body]=s.split('|');return `<li><strong>${e(heading)}</strong>${p(body)}</li>`;}).join('')}</ol>`;
 case 'opening':return `<div class="a63-example-grid">${[1,3,5,7,9].map(n=>{const v=oddSquare(n);return box(`${n} → ${v.square}`,math(`${n}^2=8\\cdot ${v.m}+1`),'a63-purple');}).join('')}</div>${p(c.exploreNote)}`;
 case 'goal':return `${box(c.hypothesis,p(c.given)+math('n=2k+1,\\quad k\\in\\mathbb Z'),'a63-blue')}${arrow}${box(c.goalLabel,math('n^2=8m+1,\\quad m\\in\\mathbb Z'),'a63-result')}`;
 case 'factorization':return math('4k^2+4k+1')+arrow+`<div class="a63-equation-parts"><span class="a63-blue">4</span><span class="a63-purple">k(k + 1)<small>${e(c.consecutiveLabel)}</small></span><b>+</b><span class="a63-result">1</span></div>`;
 case 'pairing':return `<div class="a63-example-grid">${colors.map((color,i)=>`<div class="a63-box"><svg viewBox="0 0 100 50" role="img" aria-label="${locale==='de'?'Ein Paar':'One pair'} ${i+1}"><rect x="5" y="5" width="40" height="40" rx="3" fill="${color}"/><rect x="50" y="5" width="40" height="40" rx="3" fill="${color}"/></svg><p class="a63-summary">2</p></div>`).join('')}</div>${math('2+2+2+2=8')}${p(c.pairNote)}`;
 case 'dependency':return `${box(c.hypothesis,p(c.given),'a63-blue')}${arrow}${box(c.definition,math('n=2k+1,\\quad k\\in\\mathbb Z'),'a63-purple')}${arrow}<div class="a63-columns a63-branches">${box(c.algebra,math('n^2=4k(k+1)+1'),'')}${box(c.parity,p(locale==='de'?'Genau einer von k und k + 1 ist gerade.':'Exactly one of k and k + 1 is even.')+arrow+math('k(k+1)=2m,\\quad m\\in\\mathbb Z'),'a63-result')}</div><p class="a63-merge">${locale==='de'?'Beide Zweige werden benötigt.':'Both branches are needed.'}</p>${arrow}${box(c.substitution,math('n^2=4(2m)+1=8m+1'))}${arrow}${box(c.congruence,math('n^2\\equiv1\\pmod8')+p(c.arbitrary),'a63-result')}`;
 case 'comparison':return `<div class="a63-columns">${box(c.algebraTitle,math('n=2k+1')+arrow+math('n^2=4k(k+1)+1')+math('k(k+1)=2m')+arrow+math('n^2=8m+1')+p(c.algebraCaption),'a63-purple')}${box(c.geometryTitle,tilesMarkup(locale,3,'rectangles')+p(c.geometryCaption),'a63-result')}</div>`;
 case 'even':return `<div class="a63-example-grid">${[2,4,6,8,10,12,14,16].map(n=>box(`${n}² = ${n*n}`,p(`${c.remainder}: ${n*n%8}`),n*n%8===0?'a63-blue':'a63-purple')).join('')}</div>`;
 case 'classification':return `${box(locale==='de'?'Eine beliebige ganze Zahl n':'An arbitrary integer n',math('n\\in\\mathbb Z'))}${arrow}<div class="a63-columns">${box(c.oddLabel,math('n^2\\equiv1\\pmod8'),'a63-result')}${box(`${c.evenLabel}: n = 2k`,`<div class="a63-columns">${box(`k: ${c.evenLabel}`,math('n^2\\equiv0\\pmod8'),'a63-blue')}${box(`k: ${c.oddLabel}`,math('n^2\\equiv4\\pmod8'),'a63-purple')}</div>`)}</div><p>${e(c.allowed)}</p><div class="a63-residues">${Array.from({length:8},(_,i)=>`<span class="${[0,1,4].includes(i)?'a63-result':''}">${i}<small>${[0,1,4].includes(i)?'✓':'×'}</small></span>`).join('')}</div>${math('n^2\\bmod8\\in\\{0,1,4\\}')}${p(c.impossible)}`;
 default:throw new Error('Unknown workshop figure');
 }
}
