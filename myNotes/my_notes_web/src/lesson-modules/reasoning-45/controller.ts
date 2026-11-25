import {copy} from './copy';
import {initialState,readInteger,reweight} from './model';
import {compositionMarkup,ratesMarkup,intervalsMarkup,peopleMarkup,balanceMarkup,causalMarkup,observationsMarkup,leadMarkup} from './render';
import type {World} from './model';
function init(root:HTMLElement){
 if(root.dataset.ready)return;root.dataset.ready='true';
 const locale=root.dataset.locale||'en',c=copy(locale),kind=root.dataset.aor45Lab;
 let state=initialState();
 const one=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
 const status=(s:string)=>{one('[data-status]').textContent=s;};
 const pressed=(selector:string,attr:string,value:string)=>root.querySelectorAll<HTMLButtonElement>(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===value)));
 function weights(){root.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));const r=reweight(state.a,state.b);one('[data-weights-output]').innerHTML=compositionMarkup(locale,state.a,state.b)+ratesMarkup(locale,r.A,r.B)+intervalsMarkup(locale,state.a,state.b);one('[data-lead]').textContent=leadMarkup(locale,state.a,state.b);for(const m of ['A','B']){const v=m==='A'?state.a:state.b;one<HTMLInputElement>(`[data-range=${m}]`).value=String(v);one<HTMLInputElement>(`[data-number=${m}]`).value=String(v);one(`[data-range=${m}]`).setAttribute('aria-valuetext',`${v} / 110`);}}
 function people(){one('[data-people-output]').innerHTML=peopleMarkup(locale,state.n1,state.n2)+balanceMarkup(locale,state.n1,state.n2);}
 root.addEventListener('input',event=>{const target=event.target;if(!(target instanceof HTMLInputElement))return;
  if(target.matches('[data-range],[data-number]')){const n=readInteger(target.value,0,110);if(n===null){target.setAttribute('aria-invalid','true');status(c.invalid);return;}target.removeAttribute('aria-invalid');if((target.dataset.range||target.dataset.number)==='A')state.a=n;else state.b=n;weights();status(leadMarkup(locale,state.a,state.b));}
  if(target.matches('[data-people]')){const n=readInteger(target.value,1,20);if(n===null){target.setAttribute('aria-invalid','true');status(c.invalid);return;}target.removeAttribute('aria-invalid');if(target.dataset.people==='0')state.n1=n;else state.n2=n;people();status('');}
 });
 root.addEventListener('click',event=>{const target=(event.target as Element).closest<HTMLButtonElement>('button');if(!target||!root.contains(target))return;
  if(target.hasAttribute('data-predict')){pressed('[data-predict]','predict',target.dataset.predict!);status(c.prediction);}
  if(target.hasAttribute('data-reveal')){state.revealed=true;one('[data-revealed]').hidden=false;target.disabled=true;status(c.revealed);}
  if(target.hasAttribute('data-weights')){const preset=target.dataset.weights;if(preset==='equal'){state.a=55;state.b=55;}if(preset==='original'){state.a=10;state.b=100;}if(preset==='allEasy'){state.a=110;state.b=110;}if(preset==='allDifficult'){state.a=0;state.b=0;}root.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));weights();status(leadMarkup(locale,state.a,state.b));}
  if(target.hasAttribute('data-world')){state.world=target.dataset.world as World;pressed('[data-world]','world',state.world);one('[data-causal-output]').innerHTML=causalMarkup(locale,state.world);status(c.worldNote);}
  if(target.hasAttribute('data-check')){const selected=root.querySelector<HTMLInputElement>('input[type=radio]:checked');if(!selected){status(c.unanswered);return;}one('[data-answer]').hidden=false;status(Number(selected.value)===1?c.correct:c.incorrect);}
  if(target.hasAttribute('data-compress')){state.compressed=target.dataset.compress==='yes';pressed('[data-compress]','compress',state.compressed?'yes':'no');one('[data-compression-output]').innerHTML=observationsMarkup(locale,state.compressed);status(c.compressionNote);}
  if(target.hasAttribute('data-reset')){
   state=initialState();root.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(e=>e.checked=false);root.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));
   if(kind==='weights')weights();if(kind==='averages'){one<HTMLInputElement>('[data-people="0"]').value='2';one<HTMLInputElement>('[data-people="1"]').value='8';people();}
   if(kind==='opening'){one('[data-revealed]').hidden=true;one<HTMLButtonElement>('[data-reveal]').disabled=false;pressed('[data-predict]','predict','');}
   if(kind==='causal'){pressed('[data-world]','world','confounder');one('[data-causal-output]').innerHTML=causalMarkup(locale,'confounder');}
   if(kind==='challenge')one('[data-answer]').hidden=true;
   if(kind==='compression'){pressed('[data-compress]','compress','no');one('[data-compression-output]').innerHTML=observationsMarkup(locale);}
   status(c.resetDone);
  }
 });
}
document.querySelectorAll<HTMLElement>('[data-aor45-lab]').forEach(init);
