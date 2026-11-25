import {renderMathText} from '../../lib/math-text.ts';
import {copy} from './copy.ts';
import {evidence,representations,oddParts,oddStatement} from './model.ts';
export function evidenceMarkup(locale:string,n:number){
 const c=copy(locale),status=evidence(n);
 if(status==='found')return `<h4>${c.found}</h4>${representations(n).map(row=>`<p class="aor32-row">${renderMathText(`$${n}=${row.join('+')}$`)}</p>`).join('')}`;
 return `<h4>${status==='excluded'?c.excluded:c.unknown}</h4><p>${status==='excluded'?c.smallDetail:c.unknownDetail}</p>`;
}
export function proofMarkup(locale:'en'|'de',k:number,stage:number){
 const c=copy(locale),p=oddParts(k),units=(n:number,extra=false)=>Array.from({length:n},()=>`<i class="aor32-unit${extra?' aor32-extra':''}" aria-hidden="true"></i>`).join('');
 const group=(n:number,extra=false)=>`<div><div class="aor32-group">${units(n)}${extra?units(1,true):''}</div><p>${n+(extra?1:0)}</p></div>`;
 const card=`<p data-proof-card class="aor32-card ${stage===3?'aor32-established':'aor32-pending'}">${oddStatement[locale]}</p>`;
 return `<p><strong>${stage+1}/4 · ${c.stageLabels[stage]}</strong></p><p>${c.stages[stage]}</p><div class="aor32-row" aria-label="${p.total} = ${p.left} + ${p.right}"><strong>${p.total} = </strong>${group(k)}<span>+</span>${group(k,stage>0)}${stage===0?`<span>+</span><div>${units(1,true)}<p>1</p></div>`:''}</div>${stage>=2?`<p data-general>${renderMathText(c.general)}</p>`:''}<div class="aor32-grid"><section class="aor32-card"><h4>${c.facts}</h4>${stage===3?card:`<p>15 = 7 + 8</p>`}</section><section class="aor32-card"><h4>${c.conjectures}</h4>${stage<3?card:`<p>${c.empty}</p>`}</section><section class="aor32-card aor32-question"><h4>${c.questions}</h4><p>${c.unsettled}</p></section></div>`;
}
