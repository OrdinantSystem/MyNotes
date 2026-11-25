export const observedScore=85;
export function potential(alternative:number){
 if(!Number.isInteger(alternative)||alternative<0||alternative>100)throw new RangeError('Alternative must be an integer from 0 to 100.');
 const effect=observedScore-alternative;
 return {observed:observedScore,alternative,effect,kind:effect>0?'benefit':effect<0?'harm':'zero'} as const;
}
export type Trend='growth'|'stable'|'decline';
export function trajectory(trend:Trend){
 const ends={growth:80,stable:60,decline:40};
 if(!Object.hasOwn(ends,trend))throw new RangeError('Unknown trend.');
 return {before:60,after:observedScore,change:observedScore-60,...potential(ends[trend])};
}
// Table I: fatal attacks by onset date, not deaths by date of death or all illnesses.
export const outbreak=[{day:1,attacks:143},{day:2,attacks:116},{day:3,attacks:54},{day:8,attacks:12},{day:9,attacks:11},{day:10,attacks:5},{day:11,attacks:5},{day:12,attacks:1}] as const;
// Split at genuinely omitted dates: never interpolate 3–8 September.
export function outbreakSegments(){return [outbreak.slice(0,3),outbreak.slice(3)];}
export const mortality=[{key:'southwark',houses:40046,deaths:1263,reported:315},{key:'lambeth',houses:26107,deaths:98,reported:37},{key:'rest',houses:256423,deaths:1422,reported:59}] as const;
export const rate=(deaths:number,houses:number)=>{if(!Number.isFinite(deaths)||!Number.isFinite(houses)||deaths<0||houses<=0)throw new RangeError('Invalid rate.');return deaths/houses*10000;};
export const rateRatio=()=>rate(mortality[0].deaths,mortality[0].houses)/rate(mortality[1].deaths,mortality[1].houses);
export const households=[{x:100,y:90,pump:'A'},{x:350,y:90,pump:'A'},{x:650,y:90,pump:'B'},{x:100,y:280,pump:'A'},{x:350,y:280,pump:'A'},{x:650,y:280,pump:'B'},{x:100,y:470,pump:'A'},{x:350,y:470,pump:'B'},{x:650,y:470,pump:'A'}] as const;
export type ExposureView='geography'|'consumption';
export function exposure(view:ExposureView){if(!['geography','consumption'].includes(view))throw new RangeError('Unknown exposure view.');return {view,links:view==='consumption'?households:[]};}
export function schoolChoice(choice:number){if(!Number.isInteger(choice)||choice<0||choice>3)throw new RangeError('Unknown comparison.');return choice===2;}
