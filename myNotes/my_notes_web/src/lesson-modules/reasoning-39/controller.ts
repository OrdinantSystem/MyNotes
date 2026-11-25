import {initialState,readEstimate,frame,checkAnswers,dots} from './model';
import {riskMarkup} from './render';
import {copy} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-aor39-lab]')){
 if(root.dataset.ready)continue;root.dataset.ready='true';
 const locale=root.dataset.locale||'en',c=copy(locale),preset=root.dataset.aor39Lab;
 const el=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
 const status=(text:string)=>el('[data-status]').textContent=text;
 let s=initialState();
 const riskChoice=()=>s.riskStage===0?s.gain:s.loss;
 root.addEventListener('click',e=>{
  const b=(e.target as HTMLElement).closest<HTMLButtonElement>('button');if(!b)return;
  if(b.hasAttribute('data-opening-next')){
   s.opening=Math.min(2,s.opening+1);el('[data-headline]').textContent=s.opening===1?c.failureRate:c.record;root.dataset.frame=s.opening===1?'negative':'neutral';el('[data-second]').hidden=false;el('[data-grid]').hidden=s.opening<2;el('[data-machine]').hidden=s.opening===2;b.textContent=c.reveal;b.disabled=s.opening===2;status(c.openingNotes[s.opening]);
  }
  if(b.hasAttribute('data-estimate-commit')){
   const input=el<HTMLInputElement>('[data-estimate]'),value=readEstimate(input.value);if(value===null){status(c.invalid);input.focus();return;}
   s.estimate=value;s.estimateStage=1;input.disabled=true;b.disabled=true;el('[data-estimate-second]').hidden=false;status(c.noRevision);
  }
  if(b.hasAttribute('data-count-reveal')){
   const input=el<HTMLInputElement>('[data-revision]'),value=readEstimate(input.value);if(input.value.trim()&&value===null){status(c.invalid);input.focus();return;}
   s.revised=value??s.estimate;s.estimateStage=2;el('[data-actual]').hidden=false;el('[data-actual]').textContent=c.actual.replace('{n}',String(dots.length));input.disabled=true;b.disabled=true;status(c.estimateFeedback.replace('{first}',String(s.estimate)).replace('{second}',String(s.revised)));
  }
  if(b.dataset.frameChoice){s.frame=frame(b.dataset.frameChoice);root.dataset.frame=s.frame;root.querySelectorAll<HTMLButtonElement>('[data-frame-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button===b)));el('[data-headline]').textContent=s.frame==='positive'?c.successRate:s.frame==='negative'?c.failureRate:c.neutral;status(c.fixed);}
  if(b.dataset.procedure){const value=b.dataset.procedure as 'A'|'B';if(s.riskStage===0)s.gain=value;else if(s.riskStage===1)s.loss=value;root.querySelectorAll<HTMLButtonElement>('[data-procedure]').forEach(button=>button.setAttribute('aria-pressed',String(button===b)));status((s.riskStage===0?c.gainChoice:c.lossChoice)+': '+value);}
  if(b.hasAttribute('data-risk-next')){
   if(!riskChoice()){status(c.chooseFirst);return;}s.riskStage=Math.min(2,s.riskStage+1);root.dataset.frame=s.riskStage===1?'negative':'neutral';el('[data-risk-output]').innerHTML=riskMarkup(locale,s.riskStage);root.querySelectorAll('[data-procedure]').forEach(button=>button.setAttribute('aria-pressed','false'));b.textContent=c.showNeutral;
   if(s.riskStage===2){el('[data-risk-choices]').hidden=true;b.disabled=true;el('[data-choice-history]').hidden=false;el('[data-choice-history]').textContent=c.choices.replace('{gain}',String(s.gain)).replace('{loss}',String(s.loss));status(s.gain===s.loss?c.sameChoice:c.changedChoice);}else status(c.lossPrompt);
  }
  if(b.hasAttribute('data-check')){
   const values=Array.from({length:4},(_,i)=>{const selected=root.querySelector<HTMLInputElement>(`[data-answer="${i}"]:checked`);return selected?Number(selected.value):null;});
   checkAnswers(values).forEach((result,i)=>{const out=el(`[data-explanation="${i}"]`);out.hidden=false;out.textContent=(result.answered?(result.correct?c.correct:c.incorrect):c.unanswered)+' '+c.explanations[i];});status(c.quizDone);
  }
  if(b.hasAttribute('data-reset')){
   s=initialState();root.dataset.frame='positive';root.querySelectorAll<HTMLInputElement>('input[type=number]').forEach(x=>{x.value='';x.disabled=false;});root.querySelectorAll<HTMLTextAreaElement>('textarea').forEach(x=>x.value='');root.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(x=>x.checked=false);root.querySelectorAll<HTMLButtonElement>('button').forEach(x=>x.disabled=false);
   if(preset==='opening'){el('[data-headline]').textContent=c.successRate;el('[data-second]').hidden=true;el('[data-grid]').hidden=true;el('[data-machine]').hidden=false;el('[data-opening-next]').textContent=c.next;status(c.openingNotes[0]);}
   if(preset==='estimate'){el('[data-estimate-second]').hidden=true;el('[data-actual]').hidden=true;status('');}
   if(preset==='frames'){el('[data-headline]').textContent=c.successRate;root.querySelectorAll<HTMLElement>('[data-frame-choice]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.frameChoice==='positive')));status('');}
   if(preset==='risk'){el('[data-risk-output]').innerHTML=riskMarkup(locale,0);el('[data-risk-choices]').hidden=false;el('[data-risk-next]').textContent=c.continue;el('[data-choice-history]').hidden=true;root.querySelectorAll('[data-procedure]').forEach(x=>x.setAttribute('aria-pressed','false'));status('');}
   if(preset==='quiz'){root.querySelectorAll<HTMLElement>('[data-explanation]').forEach(x=>x.hidden=true);status(c.quizReady);}
  }
 });
}
