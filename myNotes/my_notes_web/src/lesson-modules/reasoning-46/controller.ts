import {text,signed,pointWord} from './copy.ts';
import {potential,trajectory,schoolChoice,type Trend,type ExposureView} from './model.ts';
import {potentialMarkup,timelineMarkup,exposureMarkup} from './render.ts';
export function mountCounterfactualLabs(){
 document.querySelectorAll<HTMLElement>('[data-p46-lab]').forEach(root=>{
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  const locale=root.dataset.locale||'en',c=text(locale);
  const q=<T extends HTMLElement>(selector:string)=>{const element=root.querySelector<T>(selector);if(!element)throw new Error(`Missing counterfactual control: ${selector}`);return element;};
  const status=q('[data-status]'),reset=q('[data-reset]');
  if(root.dataset.preset==='potential-outcomes'){
   const draw=(value:number)=>{const state=potential(value);q('[data-output]').innerHTML=potentialMarkup(locale,value);root.querySelectorAll<HTMLInputElement>('[data-score]').forEach(input=>{input.value=String(value);input.setCustomValidity('');});status.textContent=`${c.effect}: ${signed(locale,state.effect)} ${pointWord(locale,state.effect)}. ${c[state.kind]}`;};
   root.querySelectorAll<HTMLInputElement>('[data-score]').forEach(input=>input.addEventListener('input',()=>{try{if(input.value==='')throw new RangeError();draw(Number(input.value));}catch{input.setCustomValidity(c.invalid);status.textContent=c.invalid;}}));
   reset.addEventListener('click',()=>draw(70));
  }
  if(root.dataset.preset==='timeline'){
   const select=q<HTMLSelectElement>('[data-trend]');
   const draw=()=>{const state=trajectory(select.value as Trend);q('[data-output]').innerHTML=timelineMarkup(locale,select.value as Trend);status.textContent=`${c.change}: +25; ${c.effect}: ${signed(locale,state.effect)} ${c.points}. ${c.hypothesis}.`;};
   select.addEventListener('change',draw);reset.addEventListener('click',()=>{select.value='growth';draw();});
  }
  if(root.dataset.preset==='exposure'){
   const select=q<HTMLSelectElement>('[data-view]');const draw=()=>{q('[data-output]').innerHTML=exposureMarkup(locale,select.value as ExposureView);status.textContent=select.value==='consumption'?c.consumptionNote:c.geographyNote;};
   select.addEventListener('change',draw);reset.addEventListener('click',()=>{select.value='geography';draw();});
  }
  if(root.dataset.preset==='school'){
   root.querySelectorAll<HTMLInputElement>('[data-choice]').forEach(input=>input.addEventListener('change',()=>{const choice=Number(input.value);schoolChoice(choice);status.textContent=c.schoolFeedback[choice];}));
   reset.addEventListener('click',()=>{root.querySelectorAll<HTMLInputElement>('[data-choice]').forEach(input=>input.checked=false);status.textContent=c.schoolPrompt;});
  }
 });
}
