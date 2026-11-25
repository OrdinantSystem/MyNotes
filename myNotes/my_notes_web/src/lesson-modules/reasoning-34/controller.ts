import {text} from './copy.ts';
import {duration,frame,initialDetails,addDetail,removeDetail,maxDetails,sourceFeedback,type MemoryDetail,type Origin} from './model.ts';
import {room,comparison,detailRows,worksheetText} from './render.ts';
export function mountMemoryLabs(){
 document.querySelectorAll<HTMLElement>('[data-memory-lab]').forEach(root=>{
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  const locale=root.dataset.locale||'en',c=text(locale),preset=root.dataset.preset;
  const q=<T extends HTMLElement>(s:string)=>{const e=root.querySelector<T>(s);if(!e)throw new Error(`Missing memory control: ${s}`);return e;};
  const status=(message:string)=>{const el=root.querySelector('[data-status]');if(el)el.textContent=message;};
  let stop=()=>{};
  if(preset==='scene'){
   let seconds=0,running=false,last=0,raf=0;
   const stage=q('[data-stage]'),play=q<HTMLButtonElement>('[data-play]'),pause=q<HTMLButtonElement>('[data-pause]');
   const paint=()=>{frame(seconds);q('[data-counter]').textContent=`${seconds.toFixed(1)} / ${duration} s`;stage.innerHTML=room(locale,seconds);};
   stop=()=>{cancelAnimationFrame(raf);running=false;pause.textContent=c.resume;};
   const finish=()=>{stop();seconds=duration;stage.replaceChildren();const p=document.createElement('p');p.textContent=c.finished;stage.append(p);q('[data-counter]').textContent=`12 / 12 s`;q('[data-answers]').hidden=false;play.disabled=false;play.textContent=c.replay;pause.disabled=true;status(c.finished);};
   const tick=(now:number)=>{if(!running)return;seconds=Math.min(duration,seconds+(now-last)/1000);last=now;if(seconds>=duration){finish();return;}paint();raf=requestAnimationFrame(tick);};
   const run=()=>{running=true;last=performance.now();pause.disabled=false;pause.textContent=c.pause;raf=requestAnimationFrame(tick);};
   play.addEventListener('click',()=>{stop();seconds=0;play.disabled=true;q('[data-answers]').hidden=true;status(c.sceneDescription);paint();run();});
   pause.addEventListener('click',()=>{if(running)stop();else run();});
   q('[data-reset]').addEventListener('click',()=>{stop();seconds=0;stage.innerHTML='';const p=document.createElement('p');p.textContent=c.ready;stage.append(p);q('[data-counter]').textContent='0 / 12 s';q('[data-answers]').hidden=true;root.querySelectorAll<HTMLTextAreaElement>('[data-answer]').forEach(e=>e.value='');play.disabled=false;play.textContent=c.play;pause.disabled=true;pause.textContent=c.pause;q<HTMLDetailsElement>('[data-untimed]').open=false;q<HTMLInputElement>('[data-time]').value='7';q('[data-inspect]').innerHTML=room(locale,7);status(c.ready);});
   q<HTMLInputElement>('[data-time]').addEventListener('input',event=>{const s=Number((event.target as HTMLInputElement).value);q('[data-inspect]').innerHTML=room(locale,s);q('[data-answers]').hidden=false;});
   q<HTMLDetailsElement>('[data-untimed]').addEventListener('toggle',event=>{if((event.target as HTMLDetailsElement).open){stop();if(seconds>0&&seconds<duration)pause.disabled=false;q('[data-answers]').hidden=false;}});
   document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop();});
  }
  if(preset==='reconstruction'){
   const draw=()=>{q('[data-scene-pair]').innerHTML=comparison(locale,q<HTMLInputElement>('[data-origins]').checked);};
   q('[data-reveal]').addEventListener('click',()=>{q('[data-comparison]').hidden=false;draw();});
   q('[data-origins]').addEventListener('change',draw);
   q('[data-reset]').addEventListener('click',()=>{q('[data-comparison]').hidden=true;q<HTMLInputElement>('[data-origins]').checked=false;q<HTMLInputElement>('[data-umbrella-answer]').value='';});
  }
  if(preset==='source-sorting'){
   root.querySelectorAll<HTMLSelectElement>('[data-sort]').forEach(select=>select.addEventListener('change',()=>{const key=sourceFeedback(select.dataset.sort!,select.value as Origin);q(`[data-feedback="${select.dataset.sort}"]`).textContent=c.feedback[key];}));
   q('[data-reset]').addEventListener('click',()=>{root.querySelectorAll<HTMLSelectElement>('[data-sort]').forEach(e=>e.value='unsure');root.querySelectorAll('[data-feedback]').forEach(e=>e.textContent=c.feedback.unsure);});
  }
  if(preset==='worksheet'){
   let rows=initialDetails(locale);
   const sync=()=>{rows=[...root.querySelectorAll<HTMLElement>('[data-detail]')].map(el=>({claim:el.querySelector<HTMLInputElement>('[data-field=claim]')!.value,source:el.querySelector<HTMLSelectElement>('[data-field=source]')!.value,confidence:el.querySelector<HTMLSelectElement>('[data-field=confidence]')!.value,evidence:el.querySelector<HTMLInputElement>('[data-field=evidence]')!.value} as MemoryDetail));};
   const paint=()=>{q('[data-rows]').innerHTML=detailRows(locale,rows);q<HTMLButtonElement>('[data-add]').disabled=rows.length>=maxDetails;q('[data-export-label]').hidden=true;status('');};
   q('[data-rows]').addEventListener('input',()=>{sync();q('[data-export-label]').hidden=true;status('');});
   q('[data-rows]').addEventListener('click',event=>{const target=(event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove]');if(!target)return;sync();const index=Number(target.dataset.remove);rows=removeDetail(rows,index);paint();const focus=root.querySelector<HTMLInputElement>(`[data-detail="${Math.min(index,rows.length-1)}"] input`);focus?.focus();});
   q('[data-add]').addEventListener('click',()=>{sync();rows=addDetail(rows);paint();root.querySelector<HTMLInputElement>(`[data-detail="${rows.length-1}"] input`)?.focus();});
   q('[data-reset]').addEventListener('click',()=>{rows=initialDetails(locale);paint();});
   q('[data-copy]').addEventListener('click',async()=>{sync();const output=worksheetText(c,rows);try{await navigator.clipboard.writeText(output);status(c.copied);}catch{q('[data-export-label]').hidden=false;const area=q<HTMLTextAreaElement>('[data-export]');area.value=output;area.focus();area.select();status(c.copyFailed);}});
  }
  window.addEventListener('pagehide',()=>stop(),{once:true});
 });
}
