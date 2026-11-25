import {text} from './copy.ts';
import {searchState,classify} from './model.ts';
import type {SearchMode,Prediction} from './model.ts';
import {searchMarkup,modelsMarkup,extensionsMarkup,diagonalMarkup} from './render.ts';
export function mountProofLimits(){document.querySelectorAll<HTMLElement>('[data-p62-lab]').forEach(root=>{
 if(root.dataset.mounted)return;root.dataset.mounted='true';
 const locale=root.dataset.locale||'en',c=text(locale);
 const q=<T extends HTMLElement>(selector:string)=>{const e=root.querySelector<T>(selector);if(!e)throw new Error(`Missing proof-limits control: ${selector}`);return e;};
 const output=()=>q('[data-output]');const reset=q<HTMLButtonElement>('[data-reset]');
 if(root.dataset.preset==='search'){
  let count=1000;const mode=q<HTMLSelectElement>('[data-mode]');
  const draw=(n:number)=>{searchState(n,mode.value as SearchMode);count=n;root.querySelectorAll<HTMLInputElement>('[data-count]').forEach(e=>{e.value=String(n);e.setCustomValidity('');});output().innerHTML=searchMarkup(locale,count,mode.value as SearchMode);q('[data-status]').textContent='';};
  root.querySelectorAll<HTMLInputElement>('[data-count]').forEach(input=>input.addEventListener('input',()=>{try{if(input.value==='')throw new RangeError();draw(Number(input.value));}catch{input.setCustomValidity(c.invalid);q('[data-status]').textContent=c.invalid;}}));
  mode.addEventListener('change',()=>draw(count));reset.addEventListener('click',()=>{mode.value='unspecified';draw(1000);});
 }
 if(root.dataset.preset==='models'){const input=q<HTMLInputElement>('[data-transitivity]');const draw=()=>{output().innerHTML=modelsMarkup(locale,input.checked);};input.addEventListener('change',draw);reset.addEventListener('click',()=>{input.checked=false;draw();});}
 if(root.dataset.preset==='extensions'){const draw=(n:number)=>{output().innerHTML=extensionsMarkup(locale,n);root.querySelectorAll<HTMLButtonElement>('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===n)));};root.querySelectorAll<HTMLButtonElement>('[data-stage]').forEach(b=>b.addEventListener('click',()=>draw(Number(b.dataset.stage))));reset.addEventListener('click',()=>draw(0));}
 if(root.dataset.preset==='diagonal'){root.querySelectorAll<HTMLInputElement>('[data-prediction]').forEach(input=>input.addEventListener('change',()=>{output().innerHTML=diagonalMarkup(locale,input.value as Prediction);}));reset.addEventListener('click',()=>{root.querySelectorAll<HTMLInputElement>('[data-prediction]').forEach(e=>{e.checked=e.value==='halts';});output().innerHTML=diagonalMarkup(locale);});}
 if(root.dataset.preset==='classify'){root.querySelectorAll<HTMLInputElement>('[data-question]').forEach(input=>input.addEventListener('change',()=>{const i=Number(input.dataset.question),correct=classify(i,Number(input.value));q(`[data-feedback="${i}"]`).textContent=`${correct?c.correct:c.retry} ${c.questions[i].reason}`;}));reset.addEventListener('click',()=>{root.querySelectorAll<HTMLInputElement>('[data-question]').forEach(e=>{e.checked=false;});root.querySelectorAll<HTMLElement>('[data-feedback]').forEach(e=>{e.textContent=c.choose;});});}
 });}
