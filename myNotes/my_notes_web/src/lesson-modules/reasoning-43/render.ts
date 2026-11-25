import {escapeSvg as esc} from '../../lib/interactive/plane.ts';
import {renderMathText} from '../../lib/math-text.ts';
import {comparison,students,selection,validateDAG,causalEdges,intervened,firePoints,type Group,type Edge} from './model.ts';
import {text,type Locale} from './copy.ts';
export const p=(s:string)=>`<p>${renderMathText(s)}</p>`;
const math=(s:string)=>`<div class="causal-equation">${renderMathText(`$${s}$`)}</div>`;
const panel=(title:string,body:string)=>`<section class="causal-panel"><h4>${renderMathText(title)}</h4>${body}</section>`;
type Key=keyof ReturnType<typeof text>['nodes'];
type Node=readonly [Key,number,number];
const role=(id:string)=>['P','E','M','T','U','A','Z'].includes(id)?'purple':['Y','B'].includes(id)?'accent':'blue';
function graph(locale:Locale,nodes:Node[],edges:readonly Edge[],height=350,cut:Edge[]=[],association=false){
 const c=text(locale);validateDAG(nodes.map(n=>n[0]),association?[]:edges);
 const label=(id:string)=>c.nodes[id as Key];
 const edgeLine=([a,b]:Edge,removed=false)=>{const A=nodes.find(n=>n[0]===a)!,B=nodes.find(n=>n[0]===b)!,dx=B[1]-A[1],dy=B[2]-A[2],t=Math.min(100/Math.abs(dx),34/Math.abs(dy)),x1=A[1]+dx*t,y1=A[2]+dy*t,x2=B[1]-dx*t,y2=B[2]-dy*t,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,mx=(x1+x2)/2,my=(y1+y2)/2;return `<g class="causal-edge ${removed?'causal-cut':association?'causal-association':''}"><path d="M${x1} ${y1}L${x2} ${y2}"/>${removed?`<path d="M${mx-8} ${my-8}l16 16m-16 0l16 -16"/>`:association?'':`<path d="M${x2-ux*10-uy*5} ${y2-uy*10+ux*5}L${x2} ${y2}L${x2-ux*10+uy*5} ${y2-uy*10-ux*5}"/>`}</g>`;};
 const description=edges.map(([a,b])=>`${label(a)} ${association?'…':'→'} ${label(b)}`).join('; ');
 return `<div class="causal-graph"><svg viewBox="0 0 780 ${height}" role="img" aria-label="${esc(description)}">${edges.map(e=>edgeLine(e)).join('')}${cut.map(e=>edgeLine(e,true)).join('')}${nodes.map(([id,x,y])=>`<g class="causal-node ${role(id)}"><rect x="${x-100}" y="${y-34}" width="200" height="68" rx="9"/><text x="${x}" y="${y-2}" text-anchor="middle">${esc(label(id))}</text><text class="causal-node-symbol" x="${x}" y="${y+23}" text-anchor="middle">${id}</text></g>`).join('')}</svg><ul class="causal-relations">${edges.map(([a,b])=>`<li><span class="causal-term ${role(a)}">${esc(label(a))}</span><span>${association?'···':'→'}</span><span class="causal-term ${role(b)}">${esc(label(b))}</span></li>`).join('')}</ul>${cut.map(([a,b])=>p(`${c.cut}: $${a}\\to ${b}$`)).join('')}${p(association?c.association:c.assumptions)}</div>`;
}
export function causalGraph(locale:Locale,kind:string,after=false){switch(kind){
 case 'association':return graph(locale,[['S',140,100],['Y',640,100]],[['S','Y']],210,[],true);
 case 'direct':return graph(locale,[['S',140,100],['Y',640,100]],[['S','Y']],210);
 case 'reverse':return graph(locale,[['E',140,100],['S',640,100]],[['E','S']],210);
 case 'common':case 'fork':return graph(locale,[['P',390,65],['S',140,260],['Y',640,260]],[['P','S'],['P','Y']]);
 case 'combined':case 'cut':return graph(locale,[['P',390,65],['S',140,260],['Y',640,260]],after?intervened(causalEdges,'S'):causalEdges,350,after?[['P','S']]:[]);
 case 'chain':return graph(locale,[['S',125,100],['U',390,100],['Y',655,100]],[['S','U'],['U','Y']],210);
 case 'collider':return graph(locale,[['S',140,65],['Y',640,65],['A',390,260]],[['S','A'],['Y','A']]);
 case 'time':return graph(locale,[['E',125,80],['S',390,200],['Y',655,80]],[['E','S'],['S','Y'],['E','Y']],300)+p(text(locale).timeCaption);
 case 'fire':return graph(locale,[['Z',390,65],['F',140,260],['B',640,260]],[['Z','F'],['Z','B']]);
 case 'network':return graph(locale,[['P',125,50],['M',390,50],['T',655,50],['S',125,225],['U',390,225],['Y',655,225],['L',125,425],['D',655,425]],[['P','S'],['P','U'],['M','S'],['M','U'],['T','S'],['S','U'],['U','Y'],['L','U'],['D','Y']],480);
 default:throw new Error('Unknown causal graph');
}}
export function comparisonMarkup(locale:Locale,group:Group){const c=text(locale),s=comparison(group);return `<div class="causal-bars">${s.groups.map(g=>`<div><div class="causal-bar-label"><strong>${g.study===1?c.one:c.three}</strong><span>${g.mean}% · ${g.n} ${c.students}</span></div><div class="causal-track"><i class="${g.study===1?'blue':'accent'}" style="width:${g.mean}%"></i></div></div>`).join('')}</div>${p(`${c.average}. ${c.difference}: ${s.difference>0?'+':''}${s.difference} ${c.points}.`)}${p(s.difference<0?c.negative:c.positive)}${p(c.caveat)}`;}
function composition(locale:Locale){const c=text(locale),s=students();return `<div class="causal-columns">${[1,3].map(study=>panel(study===1?c.one:c.three,`<div class="causal-students">${s.filter(x=>x.study===study).map(x=>`<span class="causal-student ${x.prep}" data-student="${x.id}" title="${esc(x.prep==='well'?c.well:c.poor)}">${x.prep==='well'?'●':'■'}</span>`).join('')}</div>`+p(`${study===1?8:2} ${c.well}; ${study===1?2:8} ${c.poor}.`))).join('')}</div><p>● ${esc(c.well)} · ■ ${esc(c.poor)}</p>${p(c.membership)}`;}
export function subgroupMarkup(locale:Locale,group:Group){return comparisonMarkup(locale,group)+`<div class="causal-membership">${comparison(group).groups.map(g=>`<span>${g.study===1?text(locale).one:text(locale).three}: ${g.items.map(x=>`<i data-student="${x.id}" class="${x.prep}">${x.prep==='well'?'●':'■'}</i>`).join(' ')}</span>`).join('')}</div>`+p(text(locale).membership);}
export function selectionMarkup(locale:Locale,selected:boolean){const c=text(locale),s=selection(selected);return `<div class="causal-case-grid">${s.all.map(r=>`<div class="causal-case" data-case="${r.x}${r.y}" data-excluded="${selected&&!r.z}">${math(`X=${r.x},\\quad Y=${r.y},\\quad Z=${r.z}`)}${p(c.quarter)}${selected&&!r.z?p(c.excluded):selected?p(`${c.conditional}: $\\frac13$`):''}</div>`).join('')}</div><div class="causal-columns">${[0,1].map((x)=>panel(`$P(Y=1\\mid X=${x}${selected?',Z=1':''})$`,math(`${x===0?s.p0*100:s.p1*100}\\%`))).join('')}</div>${p(selected?c.selected:c.original)}${p(selected?c.dependent:c.independent)}`;}
export function interventionMarkup(locale:Locale,after:boolean){const c=text(locale);return causalGraph(locale,'cut',after)+math(after?'P(Y\\mid\\operatorname{do}(S=3))':'P(Y\\mid S=3)')+p(after?c.changed:c.unchanged);}
function reversal(locale:Locale){const c=text(locale);return `<svg class="causal-reversal" viewBox="0 0 600 310" role="img" aria-label="${esc(`${c.well}: 80 → 90; ${c.poor}: 50 → 60; ${c.all}: 74 → 66`)}">${[40,60,80,100].map(y=>`<line x1="60" x2="540" y1="${270-2.2*y}" y2="${270-2.2*y}"/><text x="50" y="${275-2.2*y}" text-anchor="end">${y}%</text>`).join('')}${[[80,90,'well'],[50,60,'poor'],[74,66,'all']].map(([a,b,key])=>`<g class="${key}"><path d="M130 ${270-2.2*Number(a)}L470 ${270-2.2*Number(b)}"/><circle cx="130" cy="${270-2.2*Number(a)}" r="5"/><circle cx="470" cy="${270-2.2*Number(b)}" r="5"/><text x="115" y="${275-2.2*Number(a)}" text-anchor="end">${a}</text><text x="485" y="${275-2.2*Number(b)}">${b}</text></g>`).join('')}<text x="130" y="290" text-anchor="middle">${c.one}</text><text x="470" y="290" text-anchor="middle">${c.three}</text></svg>${p(`● ${c.well}: +10; ■ ${c.poor}: +10; ${c.all}: −8 ${c.points}.`)}${p(c.caveat)}`;}
function firePlot(locale:Locale){const c=text(locale);return `<svg class="causal-fire-plot" viewBox="0 0 600 310" role="img" aria-label="${esc(`${c.firefighters}; ${c.damage}. ${c.fiction}`)}"><path class="causal-axis" d="M50 20V265H570"/>${firePoints.map(q=>`<circle cx="${45+q.firefighters*25}" cy="${260-q.damage*2.5}" r="5"/>`).join('')}<text x="310" y="300" text-anchor="middle">${c.firefighters}</text></svg>${p(c.damage)}${p(c.fiction)}`;}
export function figureMarkup(locale:Locale,kind:string){const c=text(locale);switch(kind){
 case 'opening':return comparisonMarkup(locale,'all');
 case 'observation':return `<div class="causal-columns">${panel(c.before,p(c.observation)+math('P(Y\\mid S=3)'))}${panel(c.after,p(c.intervention)+math('P(Y\\mid\\operatorname{do}(S=3))'))}</div>`;
 case 'composition':return composition(locale);
 case 'reversal':return reversal(locale);
 case 'arrows':return [['A\\Rightarrow B',c.implication,c.implicationText],['x\\mapsto f(x)',c.mapping,c.mappingText],['X\\to Y',c.causal,c.causalText],['X\\cdots Y',c.statistical,c.statisticalText]].map(([m,title,body])=>panel(title,math(m)+p(body))).join('');
 case 'randomization':return `<div class="causal-columns">${[c.one,c.three].map(title=>panel(title,`<div class="causal-students">${Array.from({length:10},(_,i)=>`<span class="causal-student ${i%2?'poor':'well'}">${i%2?'■':'●'}</span>`).join('')}</div>`)).join('')}</div>${p(c.balanced)}`;
 case 'cut':return panel(c.before,interventionMarkup(locale,false))+panel(c.after,interventionMarkup(locale,true));
 case 'fire':return firePlot(locale);
 case 'process':return `<ol class="causal-process">${c.conclusion.map(t=>`<li>${t}</li>`).join('')}</ol>${p(c.closing)}`;
 case 'fork':return causalGraph(locale,kind)+p(c.roleFork);
 case 'chain':return causalGraph(locale,kind)+p(c.roleChain);
 case 'collider':return causalGraph(locale,kind)+p(c.roleCollider);
 default:return causalGraph(locale,kind);
}}
