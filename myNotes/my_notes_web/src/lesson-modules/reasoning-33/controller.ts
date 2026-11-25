import {copy} from './copy';
import {duration,time,countInput,classify} from './model';
import {sceneMarkup,worksheetMarkup,inspectionNote,revealCopy} from './render';
for(const root of document.querySelectorAll<HTMLElement>('[data-aor33-lab]')){
 if(root.dataset.ready)continue;root.dataset.ready='true';
 const locale=root.dataset.locale||'en',c=copy(locale),preset=root.dataset.aor33Lab;
 const el=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
 const status=(value:string)=>{el('[data-status]').textContent=value;};
 let t=0,raf=0,running=false,last=0,replayed=false,mode=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const stop=()=>{running=false;cancelAnimationFrame(raf);};
 const frame=(syncNumber=true)=>{el('[data-scene]').innerHTML=sceneMarkup(locale,t);el<HTMLOutputElement>('[data-time]').value=t.toFixed(1);el<HTMLInputElement>('[data-frame]').value=String(t);if(syncNumber)el<HTMLInputElement>('[data-frame-number]').value=t.toFixed(1);el('[data-frame-note]').textContent=t>=8&&t<=13?c.diamond:c.noDiamond;};
 const reveal=()=>{el('[data-reveal]').hidden=false;el('[data-reveal]').textContent=revealCopy(locale);};
 const finish=()=>{stop();el<HTMLButtonElement>('[data-pause]').disabled=true;if(!replayed)el('[data-count]').hidden=false;status(replayed?revealCopy(locale):c.finished);};
 const tick=(now:number)=>{if(!running)return;t=time(t+(now-last)/1000);last=now;frame();if(t>=duration)finish();else raf=requestAnimationFrame(tick);};
 const play=()=>{if(reduced.matches){status(c.reduced);return;}if(t>=duration)t=0;running=true;last=performance.now();el<HTMLButtonElement>('[data-pause]').disabled=false;el('[data-pause]').textContent=c.pause;el<HTMLButtonElement>('[data-start]').disabled=true;status(c.running);raf=requestAnimationFrame(tick);};
 if(preset==='experiment'){
  if(reduced.matches){el<HTMLButtonElement>('[data-start]').disabled=true;status(c.reduced);}
  reduced.addEventListener('change',()=>{if(reduced.matches){stop();el<HTMLButtonElement>('[data-start]').disabled=true;el<HTMLButtonElement>('[data-pause]').disabled=true;status(c.reduced);}else{el<HTMLButtonElement>('[data-start]').disabled=false;status(c.ready);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){stop();el('[data-pause]').textContent=c.resume;status(c.paused);}});
  el('[data-start]').addEventListener('click',play);
  el('[data-pause]').addEventListener('click',()=>{if(running){stop();el('[data-pause]').textContent=c.resume;status(c.paused);}else play();});
  el('[data-commit]').addEventListener('click',()=>{const input=el<HTMLInputElement>('[data-count-input]');if(countInput(input.value)===null){status(c.invalid);input.focus();return;}el('[data-question]').hidden=false;status(c.committed);});
  el('[data-replay]').addEventListener('click',()=>{stop();replayed=true;t=0;reveal();frame();play();});
  const inspect=(raw:string,editing=false)=>{stop();el<HTMLButtonElement>('[data-pause]').disabled=true;el<HTMLButtonElement>('[data-start]').disabled=true;if(!raw.trim()||!Number.isFinite(Number(raw))){if(!editing){frame();status(c.untimed);}return;}t=time(Number(raw));frame(!editing);reveal();status(c.untimed);};
  el<HTMLInputElement>('[data-frame]').addEventListener('input',e=>inspect((e.target as HTMLInputElement).value));
  el<HTMLInputElement>('[data-frame-number]').addEventListener('input',e=>inspect((e.target as HTMLInputElement).value,true));
  el<HTMLInputElement>('[data-frame-number]').addEventListener('change',e=>inspect((e.target as HTMLInputElement).value));
  el<HTMLInputElement>('[data-frame-number]').addEventListener('blur',e=>inspect((e.target as HTMLInputElement).value));
 }
 root.addEventListener('click',e=>{
  const button=(e.target as HTMLElement).closest<HTMLButtonElement>('button');if(!button)return;
  if(button.dataset.attention!==undefined){mode=Number(button.dataset.attention);el('[data-scene]').innerHTML=sceneMarkup(locale,10,mode);root.querySelectorAll('[data-attention]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));el('[data-note]').textContent=c.attentionNotes[mode];}
  if(button.dataset.inspection!==undefined){mode=Number(button.dataset.inspection);el('[data-worksheet]').innerHTML=worksheetMarkup(locale,mode);root.querySelectorAll('[data-inspection]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));el('[data-note]').textContent=inspectionNote(locale,mode);status('');}
  if(button.hasAttribute('data-check')){const values=Array.from({length:6},(_,i)=>{const value=root.querySelector<HTMLInputElement>(`[data-claim="${i}"]:checked`);return value?Number(value.value):null;}),results=classify(values);results.forEach((r,i)=>{const out=el(`[data-reason="${i}"]`);out.hidden=false;out.textContent=(r.answered?(r.correct?c.matches:c.tryAgain):c.remaining)+' '+c.reasons[i];});status(results.every(r=>r.answered)?c.checked:c.remaining);}
  if(button.hasAttribute('data-reset')){
   stop();mode=0;
   if(preset==='experiment'){t=0;replayed=false;frame();el('[data-count]').hidden=true;el('[data-question]').hidden=true;el('[data-reveal]').hidden=true;el<HTMLInputElement>('[data-count-input]').value='';el<HTMLTextAreaElement>('textarea').value='';el<HTMLDetailsElement>('[data-inspector]').open=false;el<HTMLButtonElement>('[data-start]').disabled=reduced.matches;el<HTMLButtonElement>('[data-pause]').disabled=true;el('[data-pause]').textContent=c.pause;status(reduced.matches?c.reduced:c.ready);}
   if(preset==='attention'){el('[data-scene]').innerHTML=sceneMarkup(locale,10);root.querySelectorAll<HTMLElement>('[data-attention]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.attention==='0')));el('[data-note]').textContent=c.attentionNotes[0];}
   if(preset==='inspection'){el('[data-worksheet]').innerHTML=worksheetMarkup(locale);root.querySelectorAll<HTMLElement>('[data-inspection]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.inspection==='0')));el('[data-note]').textContent=inspectionNote(locale,0);status('');}
   if(preset==='claims'){root.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(x=>x.checked=false);root.querySelectorAll<HTMLElement>('[data-reason]').forEach(x=>x.hidden=true);status(c.remaining);}
  }
 });
}
