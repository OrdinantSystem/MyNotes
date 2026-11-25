import {copy,type Lang} from './copy';
import {architectureMarkup,illusionMarkup,sourcesMarkup,classificationMarkup} from './render';
import {modes,roles,answers,type Mode,type Role} from './model';
for(const root of document.querySelectorAll<HTMLElement>('[data-r50-lab]')){
 const l=root.dataset.locale as Lang,c=copy(l),preset=root.dataset.r50Lab,output=root.querySelector<HTMLElement>('[data-output]')!,status=root.querySelector<HTMLElement>('[data-status]')!;
 const modeControl=root.querySelector<HTMLSelectElement>('[data-mode]'),back=root.querySelector<HTMLButtonElement>('[data-back]'),why=root.querySelector<HTMLButtonElement>('[data-why]'),toggle=root.querySelector<HTMLButtonElement>('[data-toggle]'),review=root.querySelector<HTMLButtonElement>('[data-review]');
 const roleControls=[...root.querySelectorAll<HTMLSelectElement>('[data-role]')];let mode:Mode='chain',depth=1,revealed=false,selected=answers();
 function draw(){
  if(preset==='architecture'){output.innerHTML=architectureMarkup(l,mode,depth);why!.disabled=mode!=='chain'||depth===4;back!.disabled=mode!=='chain'||depth===1;}
  if(preset==='illusion'||preset==='sources'){output.innerHTML=preset==='illusion'?illusionMarkup(l,revealed):sourcesMarkup(l,revealed);toggle!.setAttribute('aria-expanded',String(revealed));toggle!.textContent=preset==='illusion'?(revealed?c.hideComparison:c.showComparison):(revealed?c.hideSources:c.investigate);}
  if(preset==='classification'){const count=selected.filter(Boolean).length;root.querySelector('[data-count]')!.textContent=l==='de'?`${count} von 4 ${c.answered}`:`${count} of 4 ${c.answered}`;review!.disabled=count!==4;review!.setAttribute('aria-expanded',String(revealed));review!.textContent=revealed?c.hideReview:c.review;output.innerHTML=classificationMarkup(l,selected,revealed);}
 }
 modeControl?.addEventListener('change',()=>{if(!modes.includes(modeControl.value as Mode))return;mode=modeControl.value as Mode;draw();status.textContent=c.architectureNotes[modes.indexOf(mode)];});
 why?.addEventListener('click',()=>{if(mode!=='chain'||depth>=4)return;depth++;draw();status.textContent=depth===4?c.limit:c.graph;});
 back?.addEventListener('click',()=>{if(mode!=='chain'||depth<=1)return;depth--;draw();status.textContent=c.graph;});
 toggle?.addEventListener('click',()=>{revealed=!revealed;draw();status.textContent=preset==='illusion'?(revealed?c.equal:c.illusionQuestion):(revealed?c.sourceAfter:c.sourceBefore);});
 for(const control of roleControls)control.addEventListener('change',()=>{const i=Number(control.dataset.role),value=control.value;selected[i]=roles.includes(value as Role)?value as Role:null;revealed=false;draw();status.textContent=c.workshopPrompt;});
 review?.addEventListener('click',()=>{if(selected.some(x=>x===null))return;revealed=!revealed;draw();status.textContent=revealed?c.diagramLimit:c.workshopPrompt;});
 root.querySelector('[data-reset]')!.addEventListener('click',()=>{mode='chain';depth=1;revealed=false;selected=answers();if(modeControl)modeControl.value=mode;for(const control of roleControls)control.value='';draw();status.textContent=c.resetDone;});
}
