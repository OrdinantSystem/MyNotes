import {copy} from './copy.ts';
import {groups,observations,pooled,peopleMean,reweight,edges} from './model.ts';
import type {Method,World} from './model.ts';
export const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function number(locale:string,n:number,digits=1){return new Intl.NumberFormat(locale==='de'?'de-DE':'en-GB',{maximumFractionDigits:digits,minimumFractionDigits:0}).format(n);}
export function percent(locale:string,r:number){return `${number(locale,100*r)}${locale==='de'?' %':'%'}`;}
function svg(title:string,body:string,w=640,h=300){return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${body}</svg>`;}
function text(x:number,y:number,label:string,style=''){return `<text x="${x}" y="${y}" ${style}>${esc(label)}</text>`;}
export function ratesMarkup(locale:string,a=pooled('A'),b=pooled('B'),labels?:[string,string]){const c=copy(locale);return `<div class="aor45-rates">${(['A','B'] as Method[]).map((m,i)=>{const rate=i?b:a;return `<div class="aor45-rate" data-method="${m}"><div><strong>${labels?esc(labels[i]):`${c.method} ${m}`}</strong><strong>${percent(locale,rate)}</strong></div><div class="aor45-track"><span style="width:${rate*100}%"></span></div></div>`;}).join('')}</div>`;}
export function comparisonMarkup(locale:string){const c=copy(locale);return `<div class="aor45-compare">${[[c.easy,.9,.8],[c.difficult,.3,.2],[c.combined,pooled('A'),pooled('B')]].map(([label,a,b])=>`<section><h4>${label}</h4>${ratesMarkup(locale,a as number,b as number)}<p>${Number(a)>Number(b)?'A':'B'} ${locale==='de'?'führt':'leads'}</p></section>`).join('')}</div>`;}
export function observationsMarkup(locale:string,compressed=false){const c=copy(locale);return `<p>${c.success}: ■ · ${c.failure}: □</p><div class="aor45-observations">${(['A','B'] as Method[]).map(m=>`<section data-method="${m}"><h4>${c.method} ${m}</h4>${(compressed?[null]:['easy','difficult']).map(d=>{const rows=observations.filter(o=>o.method===m&&(d===null||o.difficulty===d)),n=rows.length,s=rows.filter(o=>o.success).length;return `<div class="aor45-group"><p>${d===null?c.combined:d==='easy'?c.easy:c.difficult} · <strong>${s}/${n} = ${percent(locale,s/n)}</strong></p><div class="aor45-grid" role="img" aria-label="${esc(`${s}/${n}: ${c.successes}`)}">${rows.map(o=>`<span data-observation="${o.id}" data-success="${o.success}" ${compressed?'':`data-difficulty="${o.difficulty}"`} aria-hidden="true"></span>`).join('')}</div></div>`;}).join('')}</section>`).join('')}</div><p>${compressed?c.hidden:c.compressionNote}</p>`;}
export function compositionMarkup(locale:string,a=10,b=100){const c=copy(locale);return `<p>${c.easy}: <span class="aor45-easy">■</span> · ${c.difficult}: <span class="aor45-difficult">■</span></p>${[['A',a],['B',b]].map(([m,n])=>`<div class="aor45-mix"><p>${c.method} ${m}: ${percent(locale,Number(n)/110)} ${c.easy.toLowerCase()} · ${percent(locale,1-Number(n)/110)} ${c.difficult.toLowerCase()}</p><div class="aor45-composition" role="img" aria-label="${esc(`${m}: ${n}/110 ${c.easy}`)}"><span style="width:${Number(n)/110*100}%"></span><span style="width:${(110-Number(n))/110*100}%"></span></div></div>`).join('')}`;}
export function intervalsMarkup(locale:string,a=10,b=100){const c=copy(locale),r=reweight(a,b),x=(n:number)=>55+530*n;let body='';for(let p=0;p<=1;p+=.2)body+=`<path d="M${x(p)} 35V255" class="grid"/>`+text(x(p),285,percent(locale,p),'text-anchor="middle"');
 for(const [m,lo,hi,y] of [['A',.3,.9,95],['B',.2,.8,215]] as const){body+=text(12,y-44,`${c.method} ${m}`)+`<path d="M${x(lo)} ${y}H${x(hi)}" stroke="var(--${m==='A'?'blue':'coral'})" stroke-width="7" opacity=".45"/>`;
 for(const v of [lo,hi])body+=`<circle cx="${x(v)}" cy="${y}" r="7" fill="var(--${m==='A'?'blue':'coral'})"/>`+text(x(v),y-16,percent(locale,v),'text-anchor="middle"');
 body+=`<circle cx="${x(r[m])}" cy="${y}" r="9" fill="var(--${m==='A'?'blue':'coral'})" stroke="var(--text)" stroke-width="2"/>`+text(x(r[m]),y+29,percent(locale,r[m]),'text-anchor="middle"');}
 return svg(c.intervalNote,body)+`<p>${c.intervalNote}</p>`;}
export function peopleMarkup(locale:string,a=2,b=8){const c=copy(locale);return `<div class="aor45-people">${[[a,90],[b,50]].map(([n,score],i)=>`<section><h4>${locale==='de'?'Gruppe':'Group'} ${i+1}: ${n} ${c.people}</h4><div>${Array.from({length:n},()=>`<span class="aor45-person" data-score="${score}">${score}</span>`).join('')}</div><p>${c.mean}: ${score}</p></section>`).join('')}</div>`;}
export function balanceMarkup(locale:string,a=2,b=8){const c=copy(locale),mean=peopleMean(a,b),x=(n:number)=>50+(n-50)*13.5;let body=`<path d="M50 115H590" class="axis"/>`;
 for(const n of [50,60,70,80,90])body+=`<path d="M${x(n)} 107V123" class="axis"/>`+text(x(n),153,String(n),'text-anchor="middle"');
 body+=`<circle cx="50" cy="115" r="${8+2*b}" fill="var(--purple)"/><circle cx="590" cy="115" r="${8+2*a}" fill="var(--blue)"/><path d="M320 80V130" stroke="var(--text)" stroke-dasharray="4 4"/><path d="M${x(mean)-9} 50h18l-9 16z" fill="var(--accent)"/>`+text(x(mean),38,number(locale,mean),'text-anchor="middle" fill="var(--accent)"');
 return `<p><strong>${c.personMean}: ${number(locale,mean)}</strong> · ${c.groupMean}: 70</p>`+svg(c.balanceNote,body,640,175)+`<p>${c.balanceNote}</p>`;}
export function causalMarkup(locale:string,world:World){const c=copy(locale),e=edges(world);let body='';
 const coords:Record<string,[number,number]>={Z:[320,65],X:[125,245],Y:[515,245]};
 for(const [from,to] of e){const [x1,y1]=coords[from],[x2,y2]=coords[to],len=Math.hypot(x2-x1,y2-y1),dx=(x2-x1)/len,dy=(y2-y1)/len,boundary=Math.min(105/Math.abs(dx),29/Math.abs(dy))+8,sx=x1+dx*boundary,sy=y1+dy*boundary,ex=x2-dx*boundary,ey=y2-dy*boundary;
 body+=`<g data-edge="${from}-${to}"><path d="M${sx} ${sy}L${ex} ${ey}" class="axis"/><path d="M${ex} ${ey}l${-dx*12-dy*6} ${-dy*12+dx*6}l${dy*12} ${-dx*12}z" fill="var(--secondary)"/></g>`;}
 for(const [key,label,color] of [['Z',c.z,'purple'],['X',c.x,'blue'],['Y',c.y,'accent']]){const [x,y]=coords[key];body+=`<rect x="${x-105}" y="${y-29}" width="210" height="58" rx="6" fill="var(--${color==='accent'?'tint':`${color}-tint`})" stroke="var(--${color})"/>`+text(x,y+5,label,'text-anchor="middle"');}
 return svg(world==='confounder'?c.confounder:c.mediator,body,640,305)+`<p>${world==='confounder'?c.world1:c.world2}</p><p>${c.worldNote}</p>`;}
export function proofMarkup(locale:string){const c=copy(locale);let body='';for(let i=0;i<=5;i++){const v=i/5;body+=`<path d="M65 ${265-220*v}H605" class="grid"/>`+text(53,270-220*v,percent(locale,v),'text-anchor="end"');}for(let i=0;i<=4;i++)body+=text(65+540*i/4,293,percent(locale,i/4),'text-anchor="middle"');body+=`<path d="M65 45V265H605" class="axis"/><path d="M65 199L605 67" stroke="var(--blue)" stroke-width="4"/><path d="M65 221L605 89" stroke="var(--coral)" stroke-width="4"/>`+text(610,65,'A')+text(610,106,'B')+text(335,335,locale==='de'?'Anteil leichter Aufgaben':'Proportion of easy tasks','text-anchor="middle"');return svg(c.proofNote,body,640,350)+`<p>${c.proofNote}</p>`;}
export function figureMarkup(locale:string,figure:string){const c=copy(locale);switch(figure){
 case 'comparison':return comparisonMarkup(locale);
 case 'people':return peopleMarkup(locale);
 case 'balance':return balanceMarkup(locale);
 case 'observations':return observationsMarkup(locale);
 case 'composition':return compositionMarkup(locale);
 case 'intervals':return intervalsMarkup(locale);
 case 'standardization':return `<h4>${c.original}</h4>${ratesMarkup(locale)}<h4>${c.equal}</h4>${ratesMarkup(locale,.6,.5)}<p>${c.standardNote}</p>`;
 case 'proof':return proofMarkup(locale);
 case 'confounder':case 'mediator':return causalMarkup(locale,figure);
 case 'compression':return `<p>${c.compressionNote}</p>${compositionMarkup(locale)}<p>↓</p>${ratesMarkup(locale)}`;
 default:throw new Error('Unknown figure');
}}
export function leadMarkup(locale:string,a:number,b:number){const c=copy(locale),r=reweight(a,b),d=r.A-r.B;return Math.abs(d)<1e-12?c.same:`${d>0?'A':'B'} ${c.leads} ${number(locale,Math.abs(d)*100)} ${c.pp}. ${c.advantage}`;}
