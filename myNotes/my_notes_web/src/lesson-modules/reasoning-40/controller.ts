import {text,chairFeedback} from './copy.ts';
import {reference,attendance,type Attendance,type Improvement} from './model.ts';
import {attendanceMarkup,boundaryMarkup,journeyMarkup} from './render.ts';
export function mountPrecisionLabs(){
 document.querySelectorAll<HTMLElement>('[data-p40-lab]').forEach(root=>{
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  const locale=root.dataset.locale||'en',c=text(locale);
  const q=<T extends HTMLElement>(selector:string)=>{const el=root.querySelector<T>(selector);if(!el)throw new Error(`Missing precision control: ${selector}`);return el;};
  if(root.dataset.preset==='opening'){
   q('[data-reveal]').addEventListener('click',()=>{q('[data-evidence]').hidden=false;});
   q('[data-reset]').addEventListener('click',()=>{q('[data-evidence]').hidden=true;});
  }
  if(root.dataset.preset==='attendance'){
   let state=reference();
   const draw=()=>{const result=attendance(state);q('[data-output]').innerHTML=attendanceMarkup(locale,state);q('[data-boundary]').innerHTML=boundaryMarkup(locale,state);root.querySelectorAll<HTMLInputElement>('[data-control]').forEach(input=>{input.value=String(state[input.dataset.control as keyof Attendance]);});q('[data-status]').textContent=`${c.needed}: ${result.chairs}; ${chairFeedback(locale,result.shortage,result.spare)}.`;};
   root.querySelectorAll<HTMLInputElement>('[data-control]').forEach(input=>input.addEventListener('input',()=>{
    const candidate={...state,[input.dataset.control!]:Number(input.value)};
    try{if(input.value==='')throw new RangeError();attendance(candidate);state=candidate;draw();}catch{q('[data-status]').textContent=c.invalid;}
   }));
   q('[data-reset]').addEventListener('click',()=>{state=reference();draw();});
  }
  if(root.dataset.preset==='journey'){
   const select=q<HTMLSelectElement>('[data-information]');
   select.addEventListener('change',()=>{q('[data-journey-output]').innerHTML=journeyMarkup(locale,select.value as Improvement);});
   q('[data-reset]').addEventListener('click',()=>{select.value='original';q('[data-journey-output]').innerHTML=journeyMarkup(locale,'original');});
  }
 });
}
