import {initialState,offsetInput,practiceAnswer,type EvidenceCase} from './model';
import {layersMarkup,trackingMarkup,evidenceMarkup} from './render';
import {text,type Locale} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-k49-lab]')){
 const locale=root.dataset.locale as Locale,c=text(locale),preset=root.dataset.k49Lab,status=root.querySelector<HTMLElement>('[data-k49-status]')!,output=root.querySelector<HTMLElement>('[data-k49-output]');let state=initialState();
 const controls=<T extends Element>(sel:string)=>root.querySelectorAll<T>(sel);
 function draw(){
  if(preset==='layers'){output!.innerHTML=layersMarkup(locale,state.actual,state.belief);for(const e of controls<HTMLSelectElement>('[data-k49-layer]'))e.value=String(state[e.dataset.k49Layer as 'actual'|'belief']);}
  if(preset==='tracking'){output!.innerHTML=trackingMarkup(locale,state.actual);root.querySelector<HTMLInputElement>('[data-k49-range]')!.value=String(state.actual);root.querySelector<HTMLInputElement>('[data-k49-number]')!.value=String(state.actual-985);}
  if(preset==='evidence'){output!.innerHTML=evidenceMarkup(locale,state.evidenceCase,state.comparisonTime);root.querySelector<HTMLSelectElement>('[data-k49-case]')!.value=state.evidenceCase;root.querySelector<HTMLSelectElement>('[data-k49-comparison]')!.value=String(state.comparisonTime);}
  if(preset==='practice')for(let i=0;i<4;i++){for(const e of controls<HTMLInputElement>(`[data-k49-answer="${i}"]`))e.checked=Number(e.value)===state.answers[i];const b=root.querySelector<HTMLButtonElement>(`[data-k49-reveal="${i}"]`)!,f=root.querySelector<HTMLElement>(`[data-k49-feedback="${i}"]`)!;b.disabled=state.answers[i]===null;b.setAttribute('aria-expanded',String(state.revealed[i]));f.hidden=!state.revealed[i];f.textContent=state.revealed[i]?c.feedback[i][state.answers[i]!]:'';}
 }
 for(const e of controls<HTMLSelectElement>('[data-k49-layer]'))e.addEventListener('change',()=>{state[e.dataset.k49Layer as 'actual'|'belief']=Number(e.value);draw();});
 root.querySelector<HTMLInputElement>('[data-k49-range]')?.addEventListener('input',event=>{state.actual=Number((event.currentTarget as HTMLInputElement).value);draw();});
 root.querySelector<HTMLInputElement>('[data-k49-number]')?.addEventListener('change',event=>{const value=offsetInput((event.currentTarget as HTMLInputElement).value);if(value===null){draw();status.textContent=c.invalid;return;}state.actual=985+value;draw();status.textContent='';});
 root.querySelector<HTMLSelectElement>('[data-k49-case]')?.addEventListener('change',event=>{state.evidenceCase=(event.currentTarget as HTMLSelectElement).value as EvidenceCase;draw();});
 root.querySelector<HTMLSelectElement>('[data-k49-comparison]')?.addEventListener('change',event=>{state.comparisonTime=Number((event.currentTarget as HTMLSelectElement).value);draw();});
 for(const e of controls<HTMLInputElement>('[data-k49-answer]'))e.addEventListener('change',()=>{const q=Number(e.dataset.k49Answer),v=Number(e.value);practiceAnswer(q,v);state.answers[q]=v;state.revealed[q]=false;draw();status.textContent=c.changed;});
 for(const e of controls<HTMLButtonElement>('[data-k49-reveal]'))e.addEventListener('click',()=>{const q=Number(e.dataset.k49Reveal);if(state.answers[q]===null)return;state.revealed[q]=true;draw();status.textContent=c.opened;});
 root.querySelector('[data-k49-reset]')!.addEventListener('click',()=>{state=initialState();draw();status.textContent=c.resetDone;});
}
