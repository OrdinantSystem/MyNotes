import {copy} from './copy';
import {integer,initialState} from './model';
import type {Source,Question,Scenario} from './model';
import {publicationMarkup,investigationMarkup,credibilityMarkup,searchMarkup,posteriorMarkup,workshopMarkup} from './render';
function init(root:HTMLElement){
 if(root.dataset.ready)return;root.dataset.ready='true';
 const c=copy(root.dataset.locale||'en'),locale=root.dataset.locale||'en',kind=root.dataset.aor53Lab;
 let state=initialState();
 const one=<T extends HTMLElement=HTMLElement>(s:string)=>root.querySelector<T>(s)!;
 const status=(s:string)=>{one('[data-status]').textContent=s;};
 const pressed=(selector:string,key:string,value:string)=>root.querySelectorAll<HTMLButtonElement>(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===value)));
 function publications(){one('[data-publications-output]').innerHTML=publicationMarkup(locale,state.count,state.stage);one<HTMLButtonElement>('[data-back]').disabled=state.stage===0;one<HTMLButtonElement>('[data-next]').disabled=state.stage===3;one<HTMLInputElement>('[data-range=count]').value=String(state.count);one<HTMLInputElement>('[data-number=count]').value=String(state.count);}
 function search(){one<HTMLInputElement>('[data-prior]').value=String(state.prior);one('[data-search-output]').innerHTML=searchMarkup(locale,state.sensitivity);one('[data-posterior-output]').innerHTML=posteriorMarkup(locale,state.prior,state.sensitivity);one<HTMLInputElement>('[data-range=sensitivity]').value=String(state.sensitivity);one<HTMLInputElement>('[data-number=sensitivity]').value=String(state.sensitivity);}
 function credibility(){one('[data-credibility-output]').innerHTML=credibilityMarkup(locale,state.source,state.question);}
 root.addEventListener('input',event=>{const target=event.target;if(!(target instanceof HTMLInputElement))return;
  if(target.matches('[data-range],[data-number],[data-prior]')){const key=target.dataset.range||target.dataset.number||(target.hasAttribute('data-prior')?'prior':''),min=key==='count'?1:0,max=key==='count'?10:100,n=integer(target.value,min,max);if(n===null){target.setAttribute('aria-invalid','true');status(c.invalid);return;}target.removeAttribute('aria-invalid');if(key==='count'){state.count=n;publications();status(c.layers[state.stage]);}else {if(key==='prior')state.prior=n;else state.sensitivity=n;search();status('');}root.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));}
 });
 root.addEventListener('change',event=>{const target=event.target;if(!(target instanceof HTMLSelectElement))return;
  if(target.hasAttribute('data-question')){state.question=target.value as Question;credibility();status(c.questionNotes[state.question]);}
  if(target.hasAttribute('data-trace')){one('[data-workshop-output]').innerHTML=workshopMarkup(locale,target.value);status(c.originNote);}
 });
 root.addEventListener('click',event=>{const target=(event.target as Element).closest<HTMLButtonElement>('button');if(!target||!root.contains(target))return;
  if(target.hasAttribute('data-next')||target.hasAttribute('data-back')){state.stage=Math.max(0,Math.min(3,state.stage+(target.hasAttribute('data-next')?1:-1)));publications();status(c.layers[state.stage]);}
  if(target.hasAttribute('data-scenario')){state.scenario=target.dataset.scenario as Scenario;pressed('[data-scenario]','scenario',state.scenario);one('[data-independence-output]').innerHTML=investigationMarkup(locale,state.scenario);status(c.originNote);}
  if(target.hasAttribute('data-source')){state.source=target.dataset.source as Source;pressed('[data-source]','source',state.source);credibility();status(c.noScore);}
  if(target.hasAttribute('data-bayes')){state.posterior=!state.posterior;target.setAttribute('aria-expanded',String(state.posterior));target.textContent=state.posterior?c.hideBayes:c.showBayes;one('[data-bayes-panel]').hidden=!state.posterior;}
  if(target.hasAttribute('data-reveal')){const answer=root.querySelector<HTMLInputElement>('input[type=radio]:checked');if(!answer){status(c.choose);return;}state.workshopAnswer=Number(answer.value);state.revealed=true;one('[data-workshop-answer]').hidden=false;one('[data-workshop-output]').innerHTML=workshopMarkup(locale,one<HTMLSelectElement>('[data-trace]').value);status(state.workshopAnswer===1?c.correct:c.incorrect);}
  if(target.hasAttribute('data-reset')){state=initialState();root.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));if(kind==='publications')publications();if(kind==='independence'){pressed('[data-scenario]','scenario','separate');one('[data-independence-output]').innerHTML=investigationMarkup(locale);}if(kind==='credibility'){pressed('[data-source]','source','hydrologist');one<HTMLSelectElement>('[data-question]').value='measurement';credibility();}if(kind==='search'){search();one<HTMLInputElement>('[data-prior]').value='50';one('[data-bayes-panel]').hidden=true;one('[data-bayes]').textContent=c.showBayes;one('[data-bayes]').setAttribute('aria-expanded','false');}if(kind==='workshop'){one('[data-workshop-answer]').hidden=true;one<HTMLSelectElement>('[data-trace]').value='F';root.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(e=>e.checked=false);}status(c.resetDone);}
 });
}
document.querySelectorAll<HTMLElement>('[data-aor53-lab]').forEach(init);
