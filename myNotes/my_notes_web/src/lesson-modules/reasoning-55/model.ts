export type Mode='same'|'different';
export type Atom='c'|'s'|'ua'|'ub';
export interface State {mode:Mode;c:boolean;s:boolean;ua:boolean;ub:boolean;bridge:boolean}
export const atoms=['c','s','ua','ub'] as const;
export function initialState():State{return {mode:'same',c:true,s:false,ua:true,ub:true,bridge:false};}
export function validate(state:State){if(!['same','different'].includes(state.mode)||[state.c,state.s,state.ua,state.ub,state.bridge].some(x=>typeof x!=='boolean')||(state.mode==='same'&&(state.ua!==state.ub||state.bridge)))throw new Error('Invalid interpretation state');return state;}
export function evaluate(state:State){validate(state);const first=!state.c||state.ub,second=state.s||!state.ua,bridge=!state.ub||state.ua,conclusion=state.s||!state.c;const premises=first&&second&&(!state.bridge||bridge);return {first,second,bridge,conclusion,premises,countermodel:premises&&!conclusion};}
export function setAtom(state:State,atom:Atom,value:boolean):State{validate(state);if(!atoms.includes(atom)||typeof value!=='boolean')throw new Error('Invalid atom');const next={...state,[atom]:value};if(state.mode==='same'&&(atom==='ua'||atom==='ub'))next.ua=next.ub=value;return validate(next);}
export function setMode(state:State,mode:Mode):State{validate(state);return validate({...state,mode,bridge:false,ub:mode==='same'?state.ua:state.ub});}
export function addBridge(state:State,bridge:boolean):State{return validate({...state,bridge});}
export function countermodel():State{return {mode:'different',c:true,s:false,ua:false,ub:true,bridge:false};}
export function loadCountermodel(state:State):State{validate(state);return {...countermodel(),bridge:state.mode==='different'&&state.bridge};}
export function rows(mode:Mode,bridge=false){const values:State[]=[];for(let mask=0;mask<16;mask++){const c=!!(mask&1),s=!!(mask&2),ua=!!(mask&4),ub=!!(mask&8);if(mode==='same'&&ua!==ub)continue;values.push(validate({mode,c,s,ua,ub,bridge}));}return values;}
export const lastStep=5;
export function moveStep(step:number,delta:number){if(!Number.isInteger(step)||step<0||step>lastStep||![-1,1].includes(delta))throw new Error('Invalid proof step');return Math.max(0,Math.min(lastStep,step+delta));}
export function transferResult(responsible:boolean,control:boolean,involuntary:boolean){if([responsible,control,involuntary].some(v=>typeof v!=='boolean'))throw new Error('Invalid transfer');return {first:!responsible||control,second:!involuntary||!control,conclusion:!involuntary||!responsible};}
export const choices=['unconditional','conditional','premises','subjective'] as const;
export type Choice=typeof choices[number];
export function correctChoice(choice:Choice){if(!choices.includes(choice))throw new Error('Invalid choice');return choice==='conditional';}
// Four explicit toy worlds, each containing one pair. This is a modal boundary
// illustration, not a model of Spinoza's metaphysics.
export function truthAndNecessity(worlds:readonly boolean[],actual:number){if(!worlds.length||worlds.some(x=>typeof x!=='boolean')||!Number.isInteger(actual)||actual<0||actual>=worlds.length)throw new Error('Invalid worlds');return {actual:worlds[actual],necessary:worlds.every(Boolean)};}
