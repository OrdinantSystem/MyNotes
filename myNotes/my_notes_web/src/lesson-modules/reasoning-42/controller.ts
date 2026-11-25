import {copy,type Lang} from './copy';
import {rankingMarkup,sortingMarkup,planMarkup} from './render';
import {metrics,indicators,type Metric,type Context,type Indicator} from './model';
for(const root of document.querySelectorAll<HTMLElement>('[data-a42-lab]')){
 const l=root.dataset.locale as Lang,c=copy(l),preset=root.dataset.a42Lab,output=root.querySelector<HTMLElement>('[data-output]')!,status=root.querySelector<HTMLElement>('[data-status]')!;
 const metric=root.querySelector<HTMLSelectElement>('[data-metric]'),sortCase=root.querySelector<HTMLSelectElement>('[data-case]'),context=root.querySelector<HTMLSelectElement>('[data-context]'),evaluate=root.querySelector<HTMLButtonElement>('[data-evaluate]'),inspect=root.querySelector<HTMLButtonElement>('[data-inspect]');
 const boxes=[...root.querySelectorAll<HTMLInputElement>('[data-indicator]')];let selectedMetric:Metric='completion',index=0,revealed=false,selectedContext:Context='repair',selected:Indicator[]=[],evaluated=false;
 function draw(){
  if(preset==='rankings')output.innerHTML=rankingMarkup(l,selectedMetric);
  if(preset==='sorting'){output.innerHTML=sortingMarkup(l,index,revealed);inspect!.setAttribute('aria-expanded',String(revealed));}
  if(preset==='plan'){output.innerHTML=planMarkup(l,selectedContext,selected,evaluated);evaluate!.disabled=selected.length===0;evaluate!.setAttribute('aria-expanded',String(evaluated));}
 }
 metric?.addEventListener('change',()=>{if(!metrics.includes(metric.value as Metric))return;selectedMetric=metric.value as Metric;draw();status.textContent=c.rankNotes[metrics.indexOf(selectedMetric)];});
 sortCase?.addEventListener('change',()=>{const value=Number(sortCase.value);if(![0,1,2].includes(value))return;index=value;revealed=false;draw();status.textContent=c.sortPrompt;});
 inspect?.addEventListener('click',()=>{revealed=!revealed;draw();status.textContent=revealed?(index===1?c.pass:c.counter):c.sortPrompt;});
 context?.addEventListener('change',()=>{if(!['repair','support'].includes(context.value))return;selectedContext=context.value as Context;evaluated=false;draw();status.textContent=c.contextNotes[selectedContext==='repair'?0:1];});
 for(const box of boxes)box.addEventListener('change',()=>{selected=boxes.filter(b=>b.checked).map(b=>b.dataset.indicator as Indicator).filter(x=>indicators.includes(x));evaluated=false;draw();status.textContent=selected.length?c.select:c.noSelection;});
 evaluate?.addEventListener('click',()=>{if(!selected.length)return;evaluated=!evaluated;draw();status.textContent=evaluated?c.justify:c.select;});
 root.querySelector('[data-reset]')!.addEventListener('click',()=>{selectedMetric='completion';index=0;revealed=false;selectedContext='repair';selected=[];evaluated=false;if(metric)metric.value='completion';if(sortCase)sortCase.value='0';if(context)context.value='repair';for(const b of boxes)b.checked=false;draw();status.textContent=c.resetDone;});
}
