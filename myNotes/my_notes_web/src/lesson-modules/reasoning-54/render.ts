import {text,num} from './copy.ts';
import {weighted,sleepSchedules,sleepMinutes} from './model.ts';
export const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const caption=(s:string)=>`<p class="p54-caption">${esc(s)}</p>`;
const box=(title:string,body:string,role='')=>`<section class="p54-box ${role}"><h4>${esc(title)}</h4><p>${esc(body)}</p></section>`;
const pair=(a:string,b:string)=>`<div class="p54-pair"><div class="p54-column">${a}</div><div class="p54-column">${b}</div></div>`;
const arrow=(s='↓',kind='')=>`<div class="p54-arrow ${kind}">${esc(s)}</div>`;
const tx=(x:number,y:number,s:string,cls='',anchor='middle',size=20)=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" font-size="${size}">${esc(s)}</text>`;
const svg=(label:string,body:string,height:number)=>`<div class="p54-scroll" role="region" aria-label="${esc(label)}" tabindex="0"><svg viewBox="0 0 800 ${height}" role="img" aria-label="${esc(label)}">${body}</svg></div>`;
export function prioritiesMarkup(locale:string,tenths=650){const c=text(locale),s=weighted(tenths),choice=s.preferred==='tie'?c.tie:c[s.preferred];
 return `<p class="p54-weights"><span>${esc(c.learning)}: <strong>${num(locale,s.weight*100)}%</strong></span><span>${esc(c.accessibility)}: <strong>${num(locale,(1-s.weight)*100)}%</strong></span></p>`+
 `<div class="p54-bars">${[['existing',s.existing],['proposed',s.proposed]].map(([key,value])=>`<div><div class="p54-bar-label"><span>${esc(c[key as 'existing'|'proposed'])}</span><strong>${num(locale,Number(value),2)}</strong></div><div class="p54-track" aria-hidden="true"><span class="${key==='proposed'?'p54-fill-proposed':'p54-fill-existing'}" style="width:${Number(value)}%"></span></div></div>`).join('')}</div>`+
 `<div class="p54-result"><span>${esc(c.preference)}</span><strong>${esc(choice)}</strong><p>${esc(c.score)}: ${num(locale,s.weight*100)}% × L + ${num(locale,(1-s.weight)*100)}% × A</p></div>`;
}
export function figureMarkup(locale:string,figure:string){const c=text(locale);
 switch(figure){
 case 'opening':return `<p class="p54-proposal">${esc(c.proposal)}</p>`+pair(box(c.a,c.claimA,'p54-a'),box(c.b,c.claimB,'p54-b'))+`<p class="p54-question">${esc(c.question)}</p>`+caption(c.compatible);
 case 'layers':return `<ol class="p54-method">${c.layerNames.map((label,i)=>`<li><strong>${esc(label)}</strong><span>${esc(c.layerQuestions[i])}</span></li>`).join('')}</ol>`;
 case 'definitions':return `<div class="p54-three">${box(c.emphasisA,c.definitionA.join(' · '),'p54-a')}${box(c.shared,c.achievement,'p54-shared')}${box(c.emphasisB,c.definitionB.join(' · '),'p54-b')}</div>`+caption(c.definitionNote);
 case 'predictions':return svg(c.titles.predictions,Array.from({length:10},(_,i)=>`<line x1="${270+i*50}" y1="55" x2="${270+i*50}" y2="290" class="p54-grid"/>`+(i%2===0||i===9?tx(270+i*50,35,`${String((22+i)%24).padStart(2,'0')}:00`,'','middle',17):'')).join('')+sleepSchedules.map((schedule,i)=>{const start=((schedule.bed/60)-22+24)%24,x=270+start*50,w=sleepMinutes(schedule.bed,schedule.wake)/60*50;return tx(30,112+i*80,[c.original,c.predictA,c.predictB][i],i===1?'p54-svg-a':i===2?'p54-svg-b':'','start',21)+`<rect x="${x}" y="${80+i*80}" width="${w}" height="45" rx="8" class="${i===1?'p54-sleep-a':i===2?'p54-sleep-b':'p54-sleep-original'}"/>`+tx(x+w/2,110+i*80,`${sleepMinutes(schedule.bed,schedule.wake)/60} h`);}).join(''),315)+caption(c.sleepNote);
 case 'inference':return box(c.sleep,'','p54-shared')+arrow()+box(c.concentration,'','p54-a')+arrow(`╌ ↓ ${c.disputed} ╌`,'p54-error')+box(c.results,'','p54-b')+caption(c.causalNote);
 case 'thresholds':return svg(c.titles.thresholds,`<rect x="60" y="105" width="680" height="24" rx="12" class="p54-evidence-track"/><rect x="60" y="105" width="380" height="24" rx="12" class="p54-evidence-fill"/><circle cx="440" cy="117" r="12" class="p54-evidence-point"/><line x1="300" y1="80" x2="300" y2="155" class="p54-tick-a"/><line x1="620" y1="80" x2="620" y2="155" class="p54-tick-b"/>`+tx(440,60,c.evidence,'p54-svg-shared')+tx(300,195,c.trial,'p54-svg-a')+tx(620,230,c.permanent,'p54-svg-b')+tx(60,275,c.weak,'','start',18)+tx(740,275,c.strong,'','end',18),295)+caption(c.thresholdNote);
 case 'map':return `<div class="p54-shared-region"><h4>${esc(c.sharedFacts)}</h4><p>${esc(c.claimA)}</p><p>${esc(c.claimB)}</p></div>`+arrow()+pair(box(c.a,c.priorityA,'p54-a')+arrow()+box(c.adopt,'','p54-a'),box(c.b,c.priorityB,'p54-b')+arrow()+box(c.reject,'','p54-b'));
 case 'straw':return box(c.actualTitle,c.actualPosition,'p54-shared')+arrow(`╌ ↓ ${c.distortion}`,'p54-error')+box(c.fallacies[0],c.substitute,'p54-error')+arrow()+box(c.attack,c.unanswered,'p54-error');
 case 'alternatives':return `<h4>${esc(c.apparent)}</h4>`+pair(box(c.proposed,'','p54-a'),box(c.ignore,'','p54-error'))+arrow()+`<h4>${esc(c.wider)}</h4><ul class="p54-option-grid">${c.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`+caption(c.optionsNote);
 case 'diversion':return `<p class="p54-proposal">${esc(c.originalIssue)}</p>`+pair(box(c.originalTitle,c.originalIssue,'p54-shared'),box(c.fallacies[2],c.computers,'p54-error'))+caption(c.diversionNote);
 case 'displacement':return `<dl class="p54-comparison">${c.fallacies.map((fallacy,i)=>`<div><dt>${esc(fallacy)}</dt><dd><span>${esc(c.from[i])}</span> → <span>${esc(c.to[i])}</span><small>${esc(c.defects[i])}</small></dd></div>`).join('')}</dl>`;
 case 'charity':return c.charityNames.map((name,i)=>`<section class="p54-box ${i===0?'p54-error':i===1?'p54-shared':'p54-added'}"><h4>${esc(name)}</h4><p>${esc(c.charityStatements[i])}</p><small>${esc(c.charityNotes[i])}</small></section>`).join('');
 case 'provenance':return c.premiseKinds.map((kind,i)=>box(kind,c.premiseExamples[i],['p54-shared','p54-inferred','p54-added'][i])).join('');
 case 'consequences':return `<dl class="p54-consequences">${c.consequenceValues.map((value,i)=>`<div><dt>${esc(value)}</dt><dd>${esc(c.consequenceLabels[i])}</dd></div>`).join('')}</dl>`+caption(c.consequenceNote);
 case 'narrowing':return `<div class="p54-stages">${c.stages.map((stage,i)=>`<section><h4>${esc(stage)}</h4><div class="p54-stage-bar" aria-hidden="true"><div style="height:${[20,65,85][i]}%" class="p54-agreement"></div><div class="p54-disagreement"></div></div><p>${esc(c.stageNotes[i])}</p></section>`).join('')}</div><p class="p54-legend"><span>━ ${esc(c.shared)}</span><span>▰ ${esc(c.remaining)}</span></p>`+caption(c.narrowingNote);
 case 'method':return `<ol class="p54-method">${c.methodTitles.map((title,i)=>`<li><strong>${esc(title)}</strong><span>${esc(c.methodQuestions[i])}</span></li>`).join('')}</ol>`;
 default:throw new RangeError(`Unknown disagreement figure: ${figure}`);
 }
}
