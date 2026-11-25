import {initialState,integer,rates,coinProbability,type Question} from './model';
import {tailsMarkup,searchMarkup,studyMarkup} from './render';
import {text,percent,type Locale} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-a47-lab]')){
 const locale=root.dataset.locale as Locale,c=text(locale),preset=root.dataset.a47Lab,output=root.querySelector<HTMLElement>('[data-a47-output]')!,status=root.querySelector<HTMLElement>('[data-a47-status]')!;let state=initialState();
 function draw(){
  output.innerHTML=preset==='tails'?tailsMarkup(locale,state.heads):preset==='search'?searchMarkup(locale,state.count,state.rate):studyMarkup(locale,state.selected,state.revealed);
  for(const field of ['heads','count'] as const)for(const suffix of ['', '-number']){const input=root.querySelector<HTMLInputElement>(`[data-a47-${field}${suffix}]`);if(input)input.value=String(state[field]);}
  const select=root.querySelector<HTMLSelectElement>('[data-a47-rate]');if(select)select.value=String(state.rate);
  for(const input of root.querySelectorAll<HTMLInputElement>('[data-a47-question]'))input.checked=state.selected.includes(input.value as Question);
  root.querySelector('[data-a47-reveal]')?.setAttribute('aria-expanded',String(state.revealed));
 }
 for(const field of ['heads','count'] as const)for(const suffix of ['', '-number']){
  const input=root.querySelector<HTMLInputElement>(`[data-a47-${field}${suffix}]`);if(!input)continue;
  const update=()=>{try{state[field]=integer(input.valueAsNumber,field==='count'?1:0,100);}catch{return;}draw();status.textContent=`${field==='heads'?c.observed:c.tests}: ${state[field]}. ${c.changed}`;};
  input.addEventListener('input',update);
  if(suffix)for(const event of ['change','blur'])input.addEventListener(event,()=>{try{integer(input.valueAsNumber,field==='count'?1:0,100);}catch{input.value=String(state[field]);}update();});
 }
 root.querySelector<HTMLSelectElement>('[data-a47-rate]')?.addEventListener('change',event=>{const n=Number((event.currentTarget as HTMLSelectElement).value);if(![...rates,coinProbability].includes(n))return;state.rate=n;draw();status.textContent=`${c.rate}: ${percent(n,locale,2)}. ${c.changed}`;});
 for(const input of root.querySelectorAll<HTMLInputElement>('[data-a47-question]'))input.addEventListener('change',()=>{state.selected=[...root.querySelectorAll<HTMLInputElement>('[data-a47-question]:checked')].map(x=>x.value as Question);state.revealed=false;draw();status.textContent=c.prompt;});
 root.querySelector('[data-a47-reveal]')?.addEventListener('click',()=>{state.revealed=true;draw();status.textContent=c.hidden;});
 root.querySelector('[data-a47-reset]')!.addEventListener('click',()=>{state=initialState();draw();status.textContent=c.reset;});
}
