export type Group='repair'|'assembly';
export type Stage='population'|'matches'|'filtered';
export type Choice='a'|'b'|'equal'|'insufficient';
export const stages:Stage[]=['population','matches','filtered'];
export const choices:Choice[]=['a','b','equal','insufficient'];
export const deliveries=Array.from({length:100},(_,i)=>({id:`delivery-${i+1}`,failed:i<10,published:i<8||i===10||i===11}));
export function selection(full:boolean){return deliveries.filter(d=>full||d.published);}
export function ratio(failures:number,attempts:number){if(!Number.isSafeInteger(failures)||!Number.isSafeInteger(attempts)||failures<0||attempts<1||attempts>1000||failures>attempts)throw new RangeError('Expected 0 ≤ failures ≤ attempts ≤ 1000.');return {failures,attempts,successes:attempts-failures,rate:failures/attempts};}
export function integer(raw:string,min:number,max:number,step=1){if(!/^\d+$/.test(raw.trim()))return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=min&&n<=max&&(n-min)%step===0?n:null;}
export function population(repair=20){if(!Number.isSafeInteger(repair)||repair<0||repair>100||repair%4!==0)throw new RangeError('Repair count must be a multiple of four from 0 to 100.');const assembly=100-repair;
 const employees=Array.from({length:100},(_,i)=>{const group:Group=i<repair?'repair':'assembly',index=group==='repair'?i:i-repair;return {id:`${group}-${index+1}`,group,matches:index<(group==='repair'?repair*3/4:assembly/4)};});
 const matchingRepair=repair*3/4,matchingAssembly=assembly/4,totalMatches=matchingRepair+matchingAssembly;
 return {repair,assembly,employees,matchingRepair,matchingAssembly,totalMatches,posterior:matchingRepair/totalMatches,prior:repair/100,likelihoodRepair:repair===0?null:matchingRepair/repair,likelihoodAssembly:assembly===0?null:matchingAssembly/assembly};
}
export function visibleEmployees(repair:number,stage:Stage){if(!stages.includes(stage))throw new RangeError('Unknown filtering stage');return population(repair).employees.filter(p=>stage!=='filtered'||p.matches);}
export function courseResult(choice:Choice,revealed:boolean){if(!choices.includes(choice))throw new RangeError('Unknown conclusion');return {choice,revealed,justified:choice==='insufficient'};}
