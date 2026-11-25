import {copy,type Lang} from './copy';
import {constraintModes,parseBounded,winners,evaluate,payoff,venues,type Constraint,type Weather} from './model';
import {weatherMarkup,utilityMarkup,decisionMarkup,number,euro} from './render';
for(const root of document.querySelectorAll<HTMLElement>('[data-r58-lab]')){
 const l=root.dataset.locale as Lang,c=copy(l),preset=root.dataset.r58Lab,output=root.querySelector<HTMLElement>('[data-output]')!,status=root.querySelector<HTMLElement>('[data-status]')!;
 const weather=root.querySelector<HTMLSelectElement>('[data-weather]'),constraint=root.querySelector<HTMLSelectElement>('[data-constraint]'),range=root.querySelector<HTMLInputElement>('[data-range]'),numeric=root.querySelector<HTMLInputElement>('[data-number]'),value=root.querySelector<HTMLElement>('[data-value]'),error=root.querySelector<HTMLElement>('[data-error]');
 let w:Weather='dry',mode:Constraint='none',n=preset==='utility'?3:20;
 function draw(){output.innerHTML=preset==='weather'?weatherMarkup(l,w):preset==='utility'?utilityMarkup(l,n):decisionMarkup(l,n/100,mode);if(range&&numeric&&value){range.value=String(n);numeric.value=String(n);numeric.removeAttribute('aria-invalid');value.textContent=number(l,n)+(preset==='decision'?'%':'');error!.textContent='';}status.textContent=preset==='weather'?(w==='dry'?c.dry:c.rain)+': '+venues.map((v,i)=>c.names[i]+' '+euro(l,payoff(v.id,w),true)).join('; '):(preset==='utility'?c.units:c.best)+': '+winners(preset==='utility'?.2:n/100,mode,preset==='utility'?n:1).map(id=>c.names[venues.findIndex(v=>v.id===id)]+' '+(preset==='utility'?number(l,evaluate(id,.2,n)):euro(l,evaluate(id,n/100)))).join(' / ');}
 weather?.addEventListener('change',()=>{if(!['dry','rain'].includes(weather.value))return;w=weather.value as Weather;draw();});
 constraint?.addEventListener('change',()=>{if(!constraintModes.includes(constraint.value as Constraint))return;mode=constraint.value as Constraint;draw();});
 function update(raw:string){const parsed=parseBounded(raw,preset==='utility'?1:0,preset==='utility'?5:100);if(parsed===null){numeric!.setAttribute('aria-invalid','true');error!.textContent=c.invalid;return;}n=parsed;draw();}
 range?.addEventListener('input',()=>update(range.value));numeric?.addEventListener('change',()=>update(numeric.value));
 root.querySelector('[data-reset]')!.addEventListener('click',()=>{w='dry';mode='none';n=preset==='utility'?3:20;if(weather)weather.value=w;if(constraint)constraint.value=mode;draw();status.textContent=c.resetDone;});
}
