import {initialState,uniformSample,sampleSummary,maxDraws,rateInput,type ProbabilityCase,type Design,type Target} from './model';
import {sampleMarkup,pollMarkup,probabilityMarkup,designMarkup,percent} from './render';
import {text,type Locale} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-s35-lab]')){
 const locale=root.dataset.locale as Locale,c=text(locale),preset=root.dataset.s35Lab;let state=initialState();
 const output=root.querySelector<HTMLElement>('[data-s35-output]')!,status=root.querySelector<HTMLElement>('[data-s35-status]')!;
 function draw(){
  if(preset==='sampling'){output.innerHTML=sampleMarkup(locale,state.ids,state.history,state.revealed);root.querySelector<HTMLSelectElement>('[data-s35-size]')!.value=String(state.n);root.querySelector<HTMLButtonElement>('[data-s35-draw]')!.disabled=state.history.length>=maxDraws;const reveal=root.querySelector<HTMLButtonElement>('[data-s35-reveal]')!;reveal.textContent=state.revealed?c.hide:c.reveal;reveal.setAttribute('aria-expanded',String(state.revealed));}
  if(preset==='selection'){output.innerHTML=pollMarkup(locale,state.shortRate,state.longRate);for(const group of ['short','long'] as const){const value=group==='short'?state.shortRate:state.longRate;root.querySelector<HTMLInputElement>(`[data-s35-range=${group}]`)!.value=String(value);root.querySelector<HTMLInputElement>(`[data-s35-number=${group}]`)!.value=String(value);root.querySelector<HTMLOutputElement>(`[data-s35-rate-label=${group}]`)!.value=`${value}%`;}}
  if(preset==='probability'){output.innerHTML=probabilityMarkup(locale,state.probability);root.querySelector<HTMLSelectElement>('[data-s35-probability]')!.value=state.probability;}
  if(preset==='designs'){output.innerHTML=designMarkup(locale,state.design,state.target,state.evaluated);root.querySelector<HTMLSelectElement>('[data-s35-design]')!.value=state.design;root.querySelector<HTMLSelectElement>('[data-s35-target]')!.value=state.target;root.querySelector('[data-s35-design-summary]')!.textContent=c.designs['abc'.indexOf(state.design)];}
 }
 root.querySelector('[data-s35-draw]')?.addEventListener('click',()=>{if(state.history.length>=maxDraws)return;state.ids=uniformSample(state.n,Math.random);state.history.push(sampleSummary(state.ids).proportion);draw();status.textContent=`${c.draws}: ${state.history.length}. ${c.sampleProportion}: ${percent(sampleSummary(state.ids).proportion,locale)}.`;});
 root.querySelector('[data-s35-reveal]')?.addEventListener('click',()=>{state.revealed=!state.revealed;draw();status.textContent=state.revealed?c.revealed:c.unknown;});
 root.querySelector<HTMLSelectElement>('[data-s35-size]')?.addEventListener('change',event=>{state.n=Number((event.currentTarget as HTMLSelectElement).value);state.ids=[];state.history=[];draw();status.textContent=c.sizeChanged;});
 for(const group of ['short','long'] as const)for(const control of ['range','number'] as const){root.querySelector<HTMLInputElement>(`[data-s35-${control}=${group}]`)?.addEventListener(control==='range'?'input':'change',event=>{const value=rateInput((event.currentTarget as HTMLInputElement).value);if(value===null){draw();status.textContent=c.invalid;return;}if(group==='short')state.shortRate=value;else state.longRate=value;draw();status.textContent=`${c.shortRate}: ${state.shortRate}%. ${c.longRate}: ${state.longRate}%.`;});}
 root.querySelector<HTMLSelectElement>('[data-s35-probability]')?.addEventListener('change',event=>{state.probability=(event.currentTarget as HTMLSelectElement).value as ProbabilityCase;draw();status.textContent=c.complementNote;});
 root.querySelector<HTMLSelectElement>('[data-s35-design]')?.addEventListener('change',event=>{state.design=(event.currentTarget as HTMLSelectElement).value as Design;state.evaluated=false;draw();status.textContent=c.notEvaluated;});
 root.querySelector<HTMLSelectElement>('[data-s35-target]')?.addEventListener('change',event=>{state.target=(event.currentTarget as HTMLSelectElement).value as Target;state.evaluated=false;draw();status.textContent=c.targetChanged;});
 root.querySelector('[data-s35-evaluate]')?.addEventListener('click',()=>{state.evaluated=true;draw();status.textContent=c.evaluated;});
 root.querySelector('[data-s35-reset]')!.addEventListener('click',()=>{state=initialState();draw();status.textContent=c.reset;});
}
