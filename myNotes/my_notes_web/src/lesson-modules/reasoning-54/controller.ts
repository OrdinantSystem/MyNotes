import {text,num} from './copy.ts';
import {percentageInput,weighted,diagnose} from './model.ts';
import {prioritiesMarkup} from './render.ts';
export function mountDisagreementLabs(){
 document.querySelectorAll<HTMLElement>('[data-p54-lab]').forEach(root=>{
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  const locale=root.dataset.locale||'en',c=text(locale);
  const q=<T extends HTMLElement>(selector:string)=>{const element=root.querySelector<T>(selector);if(!element)throw new Error(`Missing disagreement control: ${selector}`);return element;};
  if(root.dataset.preset==='priorities'){
   const draw=(tenths:number)=>{const state=weighted(tenths);q('[data-output]').innerHTML=prioritiesMarkup(locale,tenths);root.querySelectorAll<HTMLInputElement>('[data-weight]').forEach(input=>{input.value=String(tenths/10);input.setCustomValidity('');});q('[data-status]').textContent=`${c.preference}: ${state.preferred==='tie'?c.tie:c[state.preferred]}. ${num(locale,state.existing,2)} / ${num(locale,state.proposed,2)}.`;};
   root.querySelectorAll<HTMLInputElement>('[data-weight]').forEach(input=>input.addEventListener('input',()=>{try{if(input.value==='')throw new RangeError();draw(percentageInput(Number(input.value)));}catch{input.setCustomValidity(c.invalid);q('[data-status]').textContent=c.invalid;}}));
   q('[data-reset]').addEventListener('click',()=>draw(650));
  }
  if(root.dataset.preset==='workshop'){
   root.querySelectorAll<HTMLInputElement>('[data-question]').forEach(input=>input.addEventListener('change',()=>{const index=Number(input.dataset.question),choice=Number(input.value);diagnose(index,choice);q(`[data-feedback="${index}"]`).textContent=c.questions[index].feedback[choice];}));
   q('[data-reset]').addEventListener('click',()=>{root.querySelectorAll<HTMLInputElement>('[data-question]').forEach(input=>{input.checked=false;});root.querySelectorAll<HTMLElement>('[data-feedback]').forEach(element=>{element.textContent=c.choose;});});
  }
 });
}
