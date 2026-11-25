import {copy,type Lang} from './copy';
import {deliveryMarkup,frequencyMarkup,baseMarkup,practiceMarkup,percent} from './render';
import {integer,population,type Stage,type Choice} from './model';
for(const root of document.querySelectorAll<HTMLElement>('[data-aor36-lab]')){
 const l=root.dataset.locale as Lang,c=copy(l),preset=root.dataset.aor36Lab;
 const output=root.querySelector<HTMLElement>('[data-output]')!,status=root.querySelector<HTMLElement>('[data-status]')!;
 let full=false,failures=10,attempts=100,repair=20,stage:Stage='population',choice:Choice|null=null,revealed=false;
 const f=root.querySelector<HTMLInputElement>('[data-failures]'),n=root.querySelector<HTMLInputElement>('[data-attempts]'),r=root.querySelector<HTMLInputElement>('[data-repair]'),range=root.querySelector<HTMLInputElement>('[data-repair-range]'),reveal=root.querySelector<HTMLButtonElement>('[data-reveal]'),explain=root.querySelector<HTMLButtonElement>('[data-explain]');
 function draw(){
  if(preset==='selection'){output.innerHTML=deliveryMarkup(l,full);reveal!.setAttribute('aria-expanded',String(full));reveal!.textContent=full?c.hide:c.reveal;}
  if(preset==='frequency'){f!.value=String(failures);n!.value=String(attempts);output.innerHTML=frequencyMarkup(l,failures,attempts);}
  if(preset==='base-rates'){r!.value=String(repair);range!.value=String(repair);output.innerHTML=baseMarkup(l,repair,stage);for(const b of root.querySelectorAll<HTMLButtonElement>('[data-stage]'))b.setAttribute('aria-pressed',String(b.dataset.stage===stage));}
  if(preset==='practice'){for(const b of root.querySelectorAll<HTMLButtonElement>('[data-choice]'))b.setAttribute('aria-pressed',String(b.dataset.choice===choice));explain!.disabled=choice===null;explain!.setAttribute('aria-expanded',String(revealed));explain!.textContent=revealed?c.hideExplanation:c.explain;root.querySelector<HTMLElement>('[data-explanation]')!.innerHTML=choice?practiceMarkup(l,choice,revealed):`<p>${c.practicePrompt}</p>`;}
 }
 reveal?.addEventListener('click',()=>{full=!full;draw();status.textContent=full?`${c.selected}: 8/10; ${c.all}: 10/100.`:c.hide;});
 for(const input of [f,n])input?.addEventListener('change',()=>{const a=integer(f!.value,0,1000),b=integer(n!.value,1,1000);if(a===null||b===null||a>b){draw();status.textContent=c.invalid;return;}failures=a;attempts=b;draw();status.textContent=`${failures}/${attempts} = ${percent(l,failures/attempts)}. ${c.frequencyLimit}`;});
 function changeRepair(raw:string){const value=integer(raw,0,100,4);if(value===null){draw();status.textContent=c.baseInvalid;return;}repair=value;stage='population';draw();const s=population(repair);status.textContent=`${c.repair}: ${repair}; ${c.assembly}: ${s.assembly}. ${c.posterior}: ${percent(l,s.posterior)}.`;}
 r?.addEventListener('change',()=>changeRepair(r.value));range?.addEventListener('input',()=>changeRepair(range.value));
 for(const button of root.querySelectorAll<HTMLButtonElement>('[data-stage]'))button.addEventListener('click',()=>{stage=button.dataset.stage as Stage;draw();status.textContent=`${c.state}: ${c.stageNames[stage]}. ${stage==='filtered'?c.filterNote:''}`;});
 for(const button of root.querySelectorAll<HTMLButtonElement>('[data-choice]'))button.addEventListener('click',()=>{choice=button.dataset.choice as Choice;revealed=false;draw();status.textContent=c.practicePrompt;});
 explain?.addEventListener('click',()=>{if(!choice)return;revealed=!revealed;draw();status.textContent=revealed?(choice==='insufficient'?c.supported:c.unsupported):c.practicePrompt;});
 root.querySelector('[data-reset]')!.addEventListener('click',()=>{full=false;failures=10;attempts=100;repair=20;stage='population';choice=null;revealed=false;draw();status.textContent=c.resetDone;});
}
