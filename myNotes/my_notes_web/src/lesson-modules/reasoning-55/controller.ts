import {initialState,setAtom,setMode,addBridge,loadCountermodel,evaluate,moveStep,lastStep,type Atom,type Mode,type Choice} from './model';
import {truthMarkup,proofMarkup,transferMarkup} from './render';
import {text,type Locale} from './copy';
import {renderMathText} from '../../lib/math-text';
for(const root of document.querySelectorAll<HTMLElement>('[data-a55-lab]')){
 const locale=root.dataset.locale as Locale,c=text(locale),preset=root.dataset.a55Lab,output=root.querySelector<HTMLElement>('[data-a55-output]')!,status=root.querySelector<HTMLElement>('[data-a55-status]')!;let state=initialState(),step=0,choice:Choice|null=null,revealed=false;
 function draw(){
  if(preset==='countermodel'){
   const same=state.mode==='same';output.innerHTML=truthMarkup(locale,state);
   for(const button of root.querySelectorAll<HTMLButtonElement>('[data-a55-mode]'))button.setAttribute('aria-pressed',String(button.dataset.a55Mode===state.mode));
   root.querySelector<HTMLElement>('[data-a55-mode-note]')!.innerHTML=renderMathText(same?c.sameNote:c.differentNote);
   root.querySelector<HTMLElement>('[data-a55-row="ub"]')!.hidden=same;root.querySelector<HTMLElement>('[data-a55-bridge-row]')!.hidden=same;
   for(const select of root.querySelectorAll<HTMLSelectElement>('[data-a55-atom]'))select.value=String(state[select.dataset.a55Atom as Atom]);
   root.querySelector<HTMLElement>('[data-a55-label="ua"]')!.innerHTML=renderMathText(`${same?c.singleU:c.atomLabels.ua} $U${same?'':'_A'}(y,x)$`);
   root.querySelector<HTMLInputElement>('[data-a55-bridge]')!.checked=state.bridge;
  }
  if(preset==='proof'){output.innerHTML=proofMarkup(locale,step);root.querySelector<HTMLButtonElement>('[data-a55-previous]')!.disabled=step===0;root.querySelector<HTMLButtonElement>('[data-a55-next]')!.disabled=step===lastStep;}
  if(preset==='transfer'){output.innerHTML=transferMarkup(locale,choice,revealed);for(const input of root.querySelectorAll<HTMLInputElement>('[data-a55-choice]'))input.checked=input.value===choice;const button=root.querySelector<HTMLButtonElement>('[data-a55-reveal]')!;button.disabled=choice===null;button.setAttribute('aria-expanded',String(revealed));}
 }
 function announce(){const r=evaluate(state);status.textContent=preset==='countermodel'?(r.countermodel?c.counterText:c.changed):preset==='proof'?`${c.step} ${step+1} ${c.of} 6. ${c.stepLabels[step]}`:c.transferPrompt;}
 for(const button of root.querySelectorAll<HTMLButtonElement>('[data-a55-mode]'))button.addEventListener('click',()=>{state=setMode(state,button.dataset.a55Mode as Mode);draw();announce();});
 for(const select of root.querySelectorAll<HTMLSelectElement>('[data-a55-atom]'))select.addEventListener('change',()=>{state=setAtom(state,select.dataset.a55Atom as Atom,select.value==='true');draw();announce();});
 root.querySelector<HTMLInputElement>('[data-a55-bridge]')?.addEventListener('change',event=>{state=addBridge(state,(event.currentTarget as HTMLInputElement).checked);draw();announce();});
 root.querySelector('[data-a55-load]')?.addEventListener('click',()=>{state=loadCountermodel(state);draw();announce();});
 for(const [name,delta] of [['previous',-1],['next',1]] as const)root.querySelector(`[data-a55-${name}]`)?.addEventListener('click',()=>{step=moveStep(step,delta);draw();announce();});
 for(const input of root.querySelectorAll<HTMLInputElement>('[data-a55-choice]'))input.addEventListener('change',()=>{choice=input.value as Choice;revealed=false;draw();status.textContent=c.chooseFirst;});
 root.querySelector('[data-a55-reveal]')?.addEventListener('click',()=>{if(choice===null)return;revealed=true;draw();status.textContent=c.feedback[['unconditional','conditional','premises','subjective'].indexOf(choice)];});
 root.querySelector('[data-a55-reset]')!.addEventListener('click',()=>{state=initialState();step=0;choice=null;revealed=false;draw();status.textContent=c.reset;});
}
