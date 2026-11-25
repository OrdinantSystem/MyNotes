import {initialState,transfer,remove,flip,coinState} from './model';
import {containerMarkup,countsMarkup,removalMarkup,coinsMarkup} from './render';
import {text,type Locale} from './copy';
for(const root of document.querySelectorAll<HTMLElement>('[data-invariant-lab]')){
 const c=text(root.dataset.locale as Locale),locale=root.dataset.locale as Locale,preset=root.dataset.invariantLab;let state=initialState();
 const output=root.querySelector<HTMLElement>('[data-inv-output]')!,status=root.querySelector<HTMLElement>('[data-inv-status]')!,reset=root.querySelector<HTMLButtonElement>('[data-inv-reset]')!;
 function draw(){
  if(preset==='containers'){output.innerHTML=containerMarkup(locale,state.containers,state.moves);root.querySelectorAll<HTMLButtonElement>('[data-inv-from]').forEach(b=>b.disabled=state.containers[Number(b.dataset.invFrom)]===0);}
  if(preset==='counts'){output.innerHTML=countsMarkup(locale,state.placed);root.querySelector<HTMLInputElement>('[data-inv-range]')!.value=String(state.placed);root.querySelector<HTMLOutputElement>('[data-inv-placed]')!.value=String(state.placed);}
  if(preset==='removal'){output.innerHTML=removalMarkup(locale,state.history);root.querySelectorAll<HTMLButtonElement>('[data-inv-remove]').forEach(b=>b.disabled=state.history.at(-1)!<Number(b.dataset.invRemove));}
  if(preset==='coins'){
   root.querySelector('[data-inv-instruction]')!.textContent=state.rule===2?c.select:c.selectThree;
   output.innerHTML=coinsMarkup(locale,state.coins,state.coinMoves,state.rule);
   root.querySelectorAll<HTMLButtonElement>('[data-inv-coin]').forEach((b,i)=>{const face=state.coins[i],selected=state.selected.includes(i);b.dataset.face=face;b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-label',`${c.coin} ${i+1}: ${face==='H'?c.heads:c.tails}${selected?`, ${c.selected}`:''}`);b.querySelector('span')!.textContent=locale==='de'?(face==='H'?'K':'Z'):face;});
   root.querySelector('[data-inv-selection]')!.textContent=`${state.selected.length}/${state.rule}`;root.querySelector<HTMLButtonElement>('[data-inv-flip]')!.disabled=state.selected.length!==state.rule;
   root.querySelector<HTMLSelectElement>('[data-inv-rule]')!.value=String(state.rule);root.querySelector<HTMLSelectElement>('[data-inv-start]')!.value=String(state.start);
  }
 }
 root.querySelectorAll<HTMLButtonElement>('[data-inv-from]').forEach(b=>b.addEventListener('click',()=>{const from=Number(b.dataset.invFrom),to=Number(b.dataset.invTo);state.containers=transfer(state.containers,from,to);state.moves++;draw();status.textContent=c.moved('ABC'[from],'ABC'[to]);}));
 root.querySelector<HTMLInputElement>('[data-inv-range]')?.addEventListener('input',event=>{state.placed=Number((event.currentTarget as HTMLInputElement).value);draw();status.textContent=`${c.placed}: ${state.placed}. ${c.difference}: 2.`;});
 root.querySelectorAll<HTMLButtonElement>('[data-inv-remove]').forEach(b=>b.addEventListener('click',()=>{state.history=remove(state.history,Number(b.dataset.invRemove));draw();status.textContent=state.history.at(-1)!?c.further(state.history.at(-1)!):c.terminal;}));
 root.querySelectorAll<HTMLButtonElement>('[data-inv-coin]').forEach((b,i)=>b.addEventListener('click',()=>{if(state.selected.includes(i))state.selected=state.selected.filter(n=>n!==i);else if(state.selected.length<state.rule)state.selected.push(i);draw();status.textContent=c.selection(state.selected.length,state.rule);}));
 root.querySelector('[data-inv-flip]')?.addEventListener('click',()=>{state.coins=flip(state.coins,state.selected,state.rule);state.coinMoves++;state.selected=[];draw();const s=coinState(state.coins);status.textContent=c.flipped(s.tails,s.parity?c.odd:c.even);});
 for(const kind of ['rule','start'] as const)root.querySelector<HTMLSelectElement>(`[data-inv-${kind}]`)?.addEventListener('change',event=>{const value=Number((event.currentTarget as HTMLSelectElement).value),rule=kind==='rule'?value:state.rule,start=kind==='start'?value:state.start;state=initialState();state.rule=rule;state.start=start;if(start===1)state.coins[0]='T';draw();status.textContent=rule===2?c.twoNote:c.threeNote;});
 reset.addEventListener('click',()=>{state=initialState();draw();status.textContent=c.reset;});
}
