import {text,num,signed,pointWord} from './copy.ts';
import {potential,trajectory,exposure,outbreakSegments,mortality,type Trend,type ExposureView} from './model.ts';
export const esc=(value:unknown)=>String(value).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]!));
const t=(x:number,y:number,label:string,cls='',anchor='middle',size=20)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}" font-size="${size}">${esc(label)}</text>`;
const line=(x1:number,y1:number,x2:number,y2:number,cls='p46-axis',dash=false)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}${dash?' p46-dashed':''}"/>`;
const circle=(x:number,y:number,r:number,cls:string)=>`<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
const rect=(x:number,y:number,w:number,h:number,cls='p46-box')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="${cls}"/>`;
const svg=(label:string,body:string,height=400)=>`<div class="p46-scroll" tabindex="0" role="region" aria-label="${esc(label)}"><svg viewBox="0 0 800 ${height}" role="img" aria-label="${esc(label)}">${body}</svg></div>`;
const caption=(label:string)=>`<p class="p46-caption">${esc(label)}</p>`;
const card=(label:string,value:string,kind='')=>`<div class="p46-card ${kind}"><span>${esc(label)}</span><strong>${value}</strong></div>`;
const pair=(a:string,b:string)=>`<div class="p46-pair">${a}${b}</div>`;
const eq=(a:string,b:string,difference:string)=>`<p class="p46-equation">${a} − ${b} = ${difference}</p>`;
export function potentialMarkup(locale:string,alternative=70){const c=text(locale),s=potential(alternative);
 return pair(card(`${c.observed} · Yᵢ(1)`,String(s.observed),'p46-observed'),card(`${c.assumed} · Yᵢ(0)`,num(locale,s.alternative),'p46-hypothetical'))+
 svg(`${c.observed}: 85; ${c.assumed}: ${s.alternative}`,[85,s.alternative].map((v,i)=>rect(60,40+i*90,680,22,'p46-track')+rect(60,40+i*90,680*v/100,22,i?'p46-alt-bar':'p46-solid-bar')+t(60,30+i*90,i?c.hypothesis:c.observed,'','start',16)+t(750,59+i*90,num(locale,v),'','end',18)).join(''),175)+
 `<div class="p46-result"><span>${esc(c.effect)}</span><strong class="${s.kind==='harm'?'p46-coral':'p46-teal'}">${signed(locale,s.effect)} ${esc(pointWord(locale,s.effect))}</strong>${eq('85',num(locale,s.alternative),signed(locale,s.effect))}<p>${esc(c[s.kind])}</p></div>`;
}
export function timelineMarkup(locale:string,trend:Trend='growth'){const c=text(locale),s=trajectory(trend),y=(v:number)=>320-v*2.5;
 return svg(`${c.before}: 60; ${c.after}: 85; ${c.hypothesis}: ${s.alternative}`,[0,25,50,75,100].map(v=>line(80,y(v),740,y(v),'p46-grid')+t(60,y(v)+6,String(v),'','end',17)).join('')+
 line(280,50,280,330,'p46-coral-line',true)+t(280,30,c.intervention,'p46-coral','middle',18)+
 `<path d="M100 ${y(60)} H280 L680 ${y(85)}" class="p46-observed-line"/><path d="M280 ${y(60)} L680 ${y(s.alternative)}" class="p46-alt-line"/>`+
 circle(280,y(60),7,'p46-dot')+circle(680,y(85),9,'p46-teal-dot')+circle(680,y(s.alternative),8,'p46-alt-dot')+
 t(240,y(60)-15,'60')+t(720,y(85)-12,'85','p46-teal')+t(720,y(s.alternative)+25,String(s.alternative))+
 t(280,365,c.before)+t(680,365,c.after),390)+
 `<p class="p46-legend"><span>— ${esc(c.observed)}</span><span>╌ ${esc(c.hypothesis)}</span></p>`+pair(card(c.change,`${signed(locale,s.change)} ${esc(c.points)}`),card(c.effect,`${signed(locale,s.effect)} ${esc(c.points)}`,'p46-hypothetical'))+caption(c.fixed);
}
function house(x:number,y:number,cls='p46-house'){return `<path d="M${x-40} ${y-20} L${x} ${y-50} L${x+40} ${y-20}" class="${cls}"/>`+rect(x-32,y-20,64,52,cls);}
export function exposureMarkup(locale:string,view:ExposureView='geography'){const c=text(locale),s=exposure(view),pumps={A:[390,185],B:[535,380]};
 return svg(c.exposureTitle,`<path d="M235 20 V540 M550 20 V540 M30 185 H770 M30 380 H770" class="p46-roads"/>`+
 s.links.map(h=>{const [x,y]=pumps[h.pump];return `<path d="M${h.x} ${h.y} Q${h.x} ${y} ${x} ${y}" class="${h.pump==='A'?'p46-coral-line':'p46-blue-line'}"/>`;}).join('')+
 exposure('consumption').links.map(h=>house(h.x,h.y)+circle(h.x,h.y,9,view==='consumption'?(h.pump==='A'?'p46-coral-dot':'p46-blue-dot'):'p46-alt-dot')).join('')+
 Object.entries(pumps).map(([key,[x,y]])=>circle(x,y,19,key==='A'?'p46-coral-dot':'p46-blue-dot')+t(x,y+7,key,'p46-pump-letter','middle',20)+t(x,y+47,`${c.pump} ${key}`,key==='A'?'p46-coral':'p46-blue')).join(''),550)+caption(view==='geography'?c.geographyNote:c.consumptionNote)+caption(c.networkNote);
}
function bars(locale:string,a=60,b=85,labels?:string[]){const c=text(locale),y=(v:number)=>300-v*2.3;return svg(`${labels?.[0]||c.before}: ${a}; ${labels?.[1]||c.after}: ${b}`,[0,25,50,75,100].map(v=>line(80,y(v),740,y(v),'p46-grid')+t(60,y(v)+6,String(v),'','end',17)).join('')+[a,b].map((v,i)=>rect(180+i*320,y(v),160,300-y(v),i?'p46-solid-bar':'p46-alt-bar')+t(260+i*320,y(v)-18,String(v),i?'p46-teal':'', 'middle',32)+t(260+i*320,340,labels?.[i]||[c.before,c.after][i])).join(''),370);}
export const schoolMarkup=(locale:string)=>bars(locale,60,78);
export function figureMarkup(locale:string,figure:string){const c=text(locale);
 switch(figure){
 case 'opening':return svg(c.titles.opening,rect(200,20,400,65)+t(400,60,c.same,'','middle',20)+line(400,85,400,120)+line(200,120,600,120)+line(200,120,200,165,'p46-observed-line')+line(600,120,600,165,'p46-alt-line')+rect(35,165,330,90,'p46-observed-box')+rect(435,165,330,90,'p46-hypothetical-box')+t(200,203,c.recall)+t(600,203,c.reread)+t(200,240,'85','p46-teal','middle',32)+t(600,240,'?','','middle',32)+t(200,290,c.observed)+t(600,290,c.missing),320);
 case 'branches':return svg(c.titles.branches,line(50,210,260,210)+`<path d="M260 210 C350 210 330 90 440 90 H750" class="p46-observed-line"/><path d="M260 210 C350 210 330 330 440 330 H750" class="p46-alt-line"/>`+circle(260,210,10,'p46-coral-dot')+t(145,175,c.past)+t(260,255,c.intervention,'p46-coral')+t(580,60,c.actual,'p46-teal')+t(580,130,c.observed)+t(580,300,c.alternative)+t(580,370,c.missing),400);
 case 'notation':return svg(c.titles.notation,t(390,100,'Yᵢ(1)','','middle',70)+line(335,120,180,185,'p46-blue-line')+line(388,120,388,185,'p46-purple-line')+line(435,120,625,185,'p46-observed-line')+t(180,220,c.outcome,'p46-blue')+t(180,253,c.score)+t(388,220,c.individual,'p46-purple')+t(388,253,c.student)+t(625,220,c.condition,'p46-teal')+t(625,253,c.recall),280)+pair(card(`Yᵢ(1) · ${c.observed}`,'85','p46-observed'),card(`Yᵢ(0) · ${c.missing}`,'?','p46-hypothetical'));
 case 'before-after':return bars(locale)+caption(locale==='de'?'85 − 60 = 25 Punkte Veränderung. Das ist noch kein kausaler Effekt.':'85 − 60 = 25 points of change. This does not yet establish a causal effect.');
 case 'randomization':return svg(c.titles.randomization,t(400,35,c.random)+[0,1].map(i=>rect(25+i*400,80,350,225,i?'p46-box':'p46-observed-box')+Array.from({length:20},(_,j)=>circle(65+(j%10)*30+i*400,105+Math.floor(j/10)*30,7,['p46-alt-dot','p46-purple-dot','p46-blue-dot','p46-coral-dot'][j%4])).join('')+t(200+i*400,185,i?c.reread:c.recall)+t(200+i*400,220,c.group,'','middle',17)+t(200+i*400,265,i?'74':'82',i?'':'p46-teal','middle',38)+t(200+i*400,290,c.mean,'','middle',16)).join(''),330)+pair(card(c.estimate,`+8 ${esc(c.points)}`),card(c.mean,'82 − 74 = 8'))+caption(c.experimentNote);
 case 'brewery':return svg(c.titles.brewery,house(190,100)+`<path d="M500 130 V65 H550 V100 L600 65 V100 L650 65 V130 Z" class="p46-house"/>`+t(190,185,c.homes)+t(590,185,c.brew)+t(400,240,c.setting),270)+pair(`<p>${esc(c.homeWater)}</p>`,`<p>${esc(c.brewWater)}</p>`)+caption(c.brewNote);
 case 'outbreak':{const y=(a:number)=>330-a*1.6,x=(d:number)=>85+(d-1)*58;return svg(c.titles.outbreak,[0,50,100,150].map(a=>line(70,y(a),755,y(a),'p46-grid')+t(55,y(a)+6,String(a),'','end',17)).join('')+line(x(8),75,x(8),330,'p46-coral-line',true)+t(x(8),35,c.removal,'p46-coral','middle',18)+outbreakSegments().map(segment=>`<polyline points="${segment.map(o=>`${x(o.day)},${y(o.attacks)}`).join(' ')}" class="p46-coral-line"/>`+segment.map(o=>circle(x(o.day),y(o.attacks),6,'p46-coral-dot')+t(x(o.day),360,String(o.day),'','middle',17)).join('')).join('')+t(345,260,c.omitted,'','middle',18)+t(400,400,c.day),425)+caption(c.outbreakNote);}
 case 'histories':return svg(c.titles.histories,line(60,350,750,350)+line(330,35,330,350,'p46-coral-line',true)+`<path d="M60 65 C160 80 200 210 330 245 S600 340 750 340" class="p46-observed-line"/><path d="M330 245 Q520 130 750 80" class="p46-coral-line p46-dashed"/><path d="M330 245 Q520 245 750 270" class="p46-blue-line p46-dashed"/><path d="M330 245 Q520 325 750 332" class="p46-alt-line"/>`+t(570,65,c.worse,'p46-coral')+t(575,235,c.slower,'p46-blue')+t(620,310,c.similar)+t(330,390,c.intervention,'p46-coral'),420)+caption(c.historiesNote);
 case 'suppliers':return svg(c.titles.suppliers,`<path d="M40 90 Q230 10 400 100 T770 100" class="p46-river"/>`+t(170,25,c.upstream,'p46-blue')+t(625,25,c.downstream,'p46-coral')+line(170,90,170,190,'p46-blue-line')+line(625,100,625,190,'p46-coral-line')+t(400,100,'→','p46-blue','middle',45)+rect(50,190,300,60,'p46-blue-box')+rect(450,190,300,60,'p46-coral-box')+t(200,228,c.lambeth)+t(600,228,c.southwark)+Array.from({length:8},(_,i)=>{const x=85+i*90,blue=[0,2,5,7].includes(i),source=blue?200:600;return `<path d="M${source} 250 V${blue?280:300} H${x} V350" class="${blue?'p46-blue-line':'p46-coral-line'}"/>`+house(x,385,blue?'p46-blue-house':'p46-coral-house');}).join(''),440)+caption(c.supplierNote);
 case 'mortality':return mortality.map(row=>`<div class="p46-rate"><div><span>${esc(c[row.key])}</span><strong>${num(locale,row.reported)}</strong></div><div class="p46-rate-track"><span class="p46-rate-bar p46-${row.key}" style="width:${row.reported/315*100}%"></span></div></div>`).join('')+caption(c.rateNote);
 case 'assumptions':return `<dl class="p46-assumptions">${c.assumptionTitles.map((label,i)=>`<div><dt>${esc(label)}</dt><dd>${esc(c.assumptionTexts[i])}</dd></div>`).join('')}</dl>`;
 case 'closing':return pair(card(`${c.happened} · Yᵢ(1)`,c.observed,'p46-observed'),card(`${c.otherwise} · Yᵢ(0)`,c.missing,'p46-hypothetical'))+`<p class="p46-equation">${esc(c.causal)} = Yᵢ(1) − Yᵢ(0)</p>`;
 default:throw new RangeError(`Unknown figure: ${figure}`);
 }
}
