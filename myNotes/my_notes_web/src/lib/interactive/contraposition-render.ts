import type {Locale} from '../i18n';
import {contraText} from '../reasoning/contraposition-copy.ts';
import {truthPair,squareRegions,strategyAnswer,type ContraFigure} from './contraposition-model.ts';
import {justificationMath as math} from './justification-render.ts';
import {renderMathText} from '../math-text.ts';
import {escapeSvg as esc} from './plane.ts';
const p=(s:string)=>`<p>${esc(s)}</p>`;
const panel=(label:string,body:string,role='')=>`<section class="discovery-panel ${role}">${label?`<h4>${esc(label)}</h4>`:''}${body}</section>`;
const columns=(body:string)=>`<div class="discovery-columns">${body}</div>`;
function route(locale:Locale,left:string,right:string,arrow='⇒'){return `<div class="cases-direction">${panel('',math(left,locale),'discovery-known')}<span class="cases-arrow" aria-hidden="true">${arrow}</span>${panel('',math(right,locale),'discovery-goal')}</div>`;}
export function truthMarkup(locale:Locale,a:boolean,b:boolean){const c=contraText(locale),s=truthPair(a,b),value=(v:boolean)=>`<strong class="contra-value ${v?'true':'false'}">${esc(v?c.true:c.false)}</strong>`;return [[c.original,String.raw`P\Rightarrow Q`,s.p,s.q,s.original],[c.contra,String.raw`\neg Q\Rightarrow\neg P`,s.notQ,s.notP,s.contra]].map(([name,tex,x,y,result])=>`<section class="contra-truth"><h4>${esc(String(name))}</h4>${math(String(tex),locale)}<div class="contra-truth-row">${value(Boolean(x))}<span aria-hidden="true">→</span>${value(Boolean(y))}</div><p class="contra-truth-result">${esc(result?c.satisfied:c.broken)}: <strong>${esc(result?c.true:c.false)}</strong></p></section>`).join('')+p(c.same);}
export function tileGrid(locale:Locale,k:number,mode:'plain'|'columns'|'pairs'|'regions'='regions'){
 const c=contraText(locale),s=squareRegions(k),n=s.n,unit=26,extent=n*unit;let cells='',groups='';
 for(let row=0;row<n;row++)for(let col=0;col<n;col++){
  const role=mode==='plain'?'neutral':mode==='regions'?(row===n-1?(col===n-1?'corner':'bottom'):col===n-1?'right':'center'):col<n-1?(Math.floor(col/2)%2?'right':'center'):mode==='pairs'&&row<n-1?'bottom':'corner';
  cells+=`<rect class="contra-tile ${role}" x="${col*unit+2}" y="${row*unit+2}" width="22" height="22" rx="2"/>`;
 }
 if(mode==='columns'||mode==='pairs'){
  for(let row=0;row<n;row++)for(let col=0;col<n-1;col+=2)groups+=`<rect class="contra-pair-outline" x="${col*unit+.5}" y="${row*unit+.5}" width="51" height="25" rx="4"/>`;
  if(mode==='pairs')for(let row=0;row<n-1;row+=2)groups+=`<rect class="contra-pair-outline" x="${(n-1)*unit+.5}" y="${row*unit+.5}" width="25" height="51" rx="4"/>`;
 }
 return `<svg class="contra-square" viewBox="-26 -30 ${extent+36} ${extent+62}" role="img" aria-label="${esc(`${n} × ${n} = ${s.square}; ${mode==='pairs'?c.pairCaption:mode==='columns'?c.column:mode==='regions'?`${c.center}: ${s.center}; ${c.right}: ${s.strip}; ${c.bottom}: ${s.strip}; ${c.corner}: 1`:c.size}`)}"><g class="contra-dimensions">${mode==='regions'?`<text x="${k*unit}" y="-10" text-anchor="middle">2k</text><text x="${(n-.5)*unit}" y="-10" text-anchor="middle">1</text><text x="-14" y="${k*unit}" text-anchor="middle">2k</text><text x="-14" y="${(n-.4)*unit}" text-anchor="middle">1</text>`:`<text x="${extent/2}" y="-10" text-anchor="middle">${n}</text><text x="-14" y="${extent/2}" text-anchor="middle">${n}</text>`}</g>${cells}${groups}<text class="contra-grid-total" x="${extent/2}" y="${extent+24}" text-anchor="middle">${mode==='pairs'?`${s.pairs} ${esc(c.pairs)} + 1 ${esc(c.tile)}`:`${s.square} ${esc(c.tiles)}`}</text></svg>`;
}
export function squareMarkup(locale:Locale,k:number){const c=contraText(locale),s=squareRegions(k);return math(`n=2k+1=${s.n}`,locale)+tileGrid(locale,k)+`<dl class="contra-key">${[[c.center,'4k^2',s.center],[c.right,'2k',s.strip],[c.bottom,'2k',s.strip],[c.corner,'1',1]].map(([label,tex,count],i)=>`<div class="region-${i}"><dt>${esc(String(label))}: ${renderMathText(`$${tex}$`)}</dt><dd>${count} ${esc(Number(count)===1?c.tile:c.tiles)}</dd></div>`).join('')}</dl>`+math(`${s.square}=2\\cdot${s.pairs}+1`,locale);}
export function strategyFeedback(locale:Locale,row:number,choice:number|null){if(choice===null)return '';const c=contraText(locale);return `<p data-contra-suggested="${strategyAnswer(row,choice)}"><strong>${esc(strategyAnswer(row,choice)?c.suggested:c.compare)}</strong></p><p>${renderMathText(c.reasons[row])}</p>`;}
export function strategyTex(row:number,locale:Locale='en'){const word=locale==='de'?'ungerade':'odd';return [String.raw`4\mid n\Rightarrow 2\mid n`,String.raw`ab\text{ ${word}}\Rightarrow (a\text{ ${word}}\land b\text{ ${word}})`,String.raw`n^2\text{ ${word}}\Rightarrow n\text{ ${word}}`][row];}
export function contraFigure(locale:Locale,kind:ContraFigure){const c=contraText(locale),de=locale==='de',m=(s:string)=>math(s,locale),even=de?'gerade':'even',odd=de?'ungerade':'odd',ne=`n\\text{ ${even}}`,se=`n^2\\text{ ${even}}`,no=`n\\text{ ${odd}}`,so=`n^2\\text{ ${odd}}`,key=kind.slice(7);let body='';
 switch(key){
 case 'samples':body=columns([false,true].map(o=>panel(o?c.odd:c.even,[0,1,2,3].map(i=>{const n=2*(i+1)-(o?1:0);return `<div class="cases-sample"><strong>${n}</strong><span>→<sup>2</sup></span><strong>${n*n}</strong></div>`;}).join(''))).join(''))+p(c.sampleCaption);break;
 case 'workspace':body=columns(panel(c.have,m(se)+m('n^2=2k')+p(c.integerK),'discovery-known')+panel(c.need,m(ne)+m('n=2m')+p(c.integerM),'discovery-goal'))+`<p class="contra-transition">? → ${esc(c.connect)}</p>`;break;
 case 'animals':body=`<div class="contra-universe"><strong>${esc(c.all)}</strong><div class="contra-animal-layout"><div class="contra-mammals"><h4>${esc(c.mammals)}</h4><div class="contra-dogs"><strong>${esc(c.dogs)}</strong><span aria-hidden="true">🐕</span></div><p class="contra-cat"><span aria-hidden="true">🐈</span> ${esc(c.cat)}</p></div><p class="contra-bird"><span aria-hidden="true">🐦</span> ${esc(c.bird)}</p></div></div>`+p(c.animalCaption);break;
 case 'animal-routes':body=panel(c.original,route(locale,`\\text{${c.dog}}`,`\\text{${c.mammals}}`))+`<p class="contra-transition">⇕ ${esc(c.figures['animal-routes'])}</p>`+panel(c.contra,route(locale,`\\text{${c.notMammal}}`,`\\text{${c.notDog}}`));break;
 case 'worlds':body=`<div class="contra-worlds">${[[true,true],[true,false],[false,true],[false,false]].map(([a,b])=>{const s=truthPair(a,b);return panel(`P: ${a?c.true:c.false} · Q: ${b?c.true:c.false}`,`<div class="contra-world-arrow">${a?(de?'W':'T'):'F'} → ${b?(de?'W':'T'):'F'}</div>`+p(s.original?c.satisfied:c.broken),s.original?'':'contra-broken');}).join('')}</div>`;break;
 case 'transform':body=panel(c.step1,columns(panel('P',m(se),'discovery-known')+panel('Q',m(ne),'discovery-goal')))+panel(c.step2,route(locale,`\\neg Q: n\\text{ ${de?'nicht gerade':'not even'}}`,`\\neg P: n^2\\text{ ${de?'nicht gerade':'not even'}}`))+panel(c.step3,route(locale,no,so));break;
 case 'before-after':body=panel(c.before,columns(panel(c.available,m('n^2=2k'))+panel(c.goal,m('n=2m'))))+`<p class="contra-transition">↓ ${esc(c.transform)}</p>`+panel(c.after,columns(panel(c.available,m('n=2k+1'))+panel(c.goal,m('n^2=2m+1'))))+p(c.bothInteger);break;
 case 'tiles':body=tileGrid(locale,2,'plain')+m('5\\times5=25');break;
 case 'columns':body=tileGrid(locale,2,'columns')+p(c.column);break;
 case 'paired':body=tileGrid(locale,2,'pairs')+m('25=2\\cdot12+1')+p(c.pairCaption);break;
 case 'regions':body=tileGrid(locale,2)+m('n^2=4k^2+2k+2k+1');break;
 case 'witness':body=panel(c.required,m('2m+1'))+`<p class="contra-transition">↓</p>`+panel(c.constructed,m('2(2k^2+2k)+1')+m('m=2k^2+2k\\in\\mathbb Z'),'discovery-known');break;
 case 'wrong-route':body=panel(c.wanted,route(locale,se,ne))+panel(c.student,route(locale,se,ne,'⇐'))+panel(c.valid,route(locale,no,so));break;
 case 'forms':body=columns(panel(c.original,m('P\\Rightarrow Q'),'discovery-known')+panel(c.contra,m('\\neg Q\\Rightarrow\\neg P'),'discovery-known'))+columns(panel(c.converse,m('Q\\Rightarrow P'),'discovery-goal')+panel(c.inverse,m('\\neg P\\Rightarrow\\neg Q'),'discovery-goal'))+p(c.formCaption);break;
 case 'equivalence':body=panel(c.directProof,route(locale,ne,se))+panel(c.byContra,route(locale,se,ne));break;
 case 'product-cases':body=`<p class="cases-root">${esc(c.atLeast)}</p><div class="cases-branches">${panel(c.case1,m('a=2k,\\quad k\\in\\mathbb Z')+m('ab=2(kb)')+m('kb\\in\\mathbb Z'))}${panel(c.case2,m('b=2k,\\quad k\\in\\mathbb Z')+m('ab=2(ak)')+m('ak\\in\\mathbb Z'))}</div><p class="cases-result">${esc(c.productEven)}</p>`+p(c.overlap);break;
 case 'reformulate':body=columns(panel(c.originalAssumption,m('P'),'discovery-known')+panel(c.originalGoal,m('Q'),'discovery-goal'))+`<p class="contra-transition">? · ${esc(c.difficult)}</p><p class="contra-transition">↓ ${esc(c.transform)} ↓</p>`+columns(panel(c.newAssumption,m('\\neg Q'),'discovery-goal')+panel(c.newGoal,m('\\neg P'),'discovery-known'))+panel(c.proof,m('\\neg Q\\Rightarrow\\neg P'),'discovery-established');break;
 case 'decision':body=panel(c.needProve,m('P\\Rightarrow Q'))+p(c.useful)+columns(panel(`${c.yes} → ${c.tryDirect}`,m('P\\Rightarrow Q'),'discovery-established')+panel(`${c.no} → ${c.examine}`,m('\\neg Q\\Rightarrow\\neg P'),'discovery-goal'))+panel(c.usable,columns(panel(`${c.yes} → ${c.tryContra}`,m('\\neg Q\\Rightarrow\\neg P'),'discovery-established')+panel(`${c.no} → ${c.other}`,'')))+p(c.heuristic);break;
 default:throw new Error('Unknown contraposition figure');
 }return body;
}
