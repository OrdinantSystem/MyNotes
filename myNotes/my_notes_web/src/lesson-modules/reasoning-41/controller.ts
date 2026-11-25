import {initialState,moveStage,lastStage,type Test,type PlantChoice} from './model';
import {investigationMarkup,testsMarkup,plantMarkup} from './render';
import {text,type Locale} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-a41-lab]')){
 const locale=root.dataset.locale as Locale,c=text(locale),preset=root.dataset.a41Lab,output=root.querySelector<HTMLElement>('[data-a41-output]')!,status=root.querySelector<HTMLElement>('[data-a41-status]')!;let state=initialState();
 function draw(){
  if(preset==='investigation'){
   output.innerHTML=investigationMarkup(locale,state.stage);root.querySelector('[data-a41-progress]')!.textContent=`${c.step} ${state.stage+1} ${c.of} ${lastStage+1}`;
   root.querySelector<HTMLButtonElement>('[data-a41-previous]')!.disabled=state.stage===0;
   const next=root.querySelector<HTMLButtonElement>('[data-a41-next]')!;next.disabled=state.stage===lastStage;next.textContent=c.stepAction[state.stage]??c.next;
  }
  if(preset==='tests'){output.innerHTML=testsMarkup(locale,state.test,state.testRevealed);root.querySelector<HTMLSelectElement>('[data-a41-test]')!.value=state.test??'';root.querySelector<HTMLButtonElement>('[data-a41-compare]')!.disabled=state.test===null;}
  if(preset==='plant'){output.innerHTML=plantMarkup(locale,state.plant,state.plantRevealed);for(const radio of root.querySelectorAll<HTMLInputElement>('[data-a41-plant]'))radio.checked=radio.value===state.plant;const reveal=root.querySelector<HTMLButtonElement>('[data-a41-reveal]')!;reveal.disabled=state.plant===null;reveal.setAttribute('aria-expanded',String(state.plantRevealed));}
 }
 for(const [attribute,delta] of [['previous',-1],['next',1]] as const)root.querySelector(`[data-a41-${attribute}]`)?.addEventListener('click',()=>{state.stage=moveStage(state.stage,delta);draw();status.textContent=`${c.step} ${state.stage+1} ${c.of} ${lastStage+1}. ${c.stages[state.stage]}`;});
 root.querySelector<HTMLSelectElement>('[data-a41-test]')?.addEventListener('change',event=>{state.test=((event.currentTarget as HTMLSelectElement).value||null) as Test|null;state.testRevealed=false;draw();status.textContent=c.changed;});
 root.querySelector('[data-a41-compare]')?.addEventListener('click',()=>{if(!state.test)return;state.testRevealed=true;draw();status.textContent=c.compared;});
 for(const radio of root.querySelectorAll<HTMLInputElement>('[data-a41-plant]'))radio.addEventListener('change',()=>{state.plant=radio.value as PlantChoice;state.plantRevealed=false;draw();status.textContent=c.changed;});
 root.querySelector('[data-a41-reveal]')?.addEventListener('click',()=>{if(!state.plant)return;state.plantRevealed=true;draw();status.textContent=c.examined;});
 root.querySelector('[data-a41-reset]')!.addEventListener('click',()=>{state=initialState();draw();status.textContent=c.resetOther;});
}
