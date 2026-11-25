export type Locale='en'|'de';
export const budget=6000;
export const studies={observational:{success:[72,48],total:[100,100]},pilot:{success:[36,33],total:[60,60]}} as const;
export type Study=keyof typeof studies;
export function study(which:Study){const s=studies[which];if(!s)throw new Error('Unknown study');const rates=s.success.map((n,i)=>100*n/s.total[i]);return {success:[...s.success],failure:s.success.map((n,i)=>s.total[i]-n),total:[...s.total],rates,gap:rates[0]-rates[1],relative:100*(rates[0]-rates[1])/rates[1]};}
export function share(n:number){if(!Number.isFinite(n)||!Number.isInteger(n)||n<0||n>100)throw new Error('Use a whole percentage 0–100');return n;}
export function composition(users:number,others:number){share(users);share(others);const rates=[40+.4*users,40+.4*others];return {shares:[users,others],rates,gap:rates[0]-rates[1]};}
export const subgroupRows=[[64,80,16,20],[8,20,32,80]] as const;
export const costs=[4800,600,3000,0] as const;
export function finance(revised=false){return costs.map((cost,i)=>{const amount=revised&&i===0?cost+1800:cost;return {cost:amount,remaining:budget-amount,share:100*amount/budget,feasible:amount<=budget};});}
export function assumption(index:number){if(!Number.isInteger(index)||index<0||index>3)throw new Error('Unknown assumption');return {selected:index,dependent:index>0?[index,4]:[]};}
export type DecisionRecord={option:number;confidence:number;reason:string;unknown:string;reconsider:string};
export function initialRecord():DecisionRecord{return {option:0,confidence:70,reason:'',unknown:'',reconsider:''};}
export function record(value:DecisionRecord):DecisionRecord{if(!Number.isInteger(value.option)||value.option<0||value.option>5)throw new Error('Unknown choice');share(value.confidence);for(const key of ['reason','unknown','reconsider'] as const)if(typeof value[key]!=='string'||value[key].length>3000)throw new Error('Record field exceeds limit');return {...value};}
export function checklist(items:readonly boolean[]){if(items.length!==7||items.some(v=>typeof v!=='boolean'))throw new Error('Seven reflections required');return items.filter(Boolean).length;}
