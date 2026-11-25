export type Level=0|1|2;
export interface Student{id:number;level:Level}
export const students:readonly Student[]=Array.from({length:60},(_,id)=>({id,level:Math.floor(id/20) as Level}));
export function selfSelection():[Student[],Student[]]{return [students.slice(0,30),students.slice(30)];}
/** Fisher–Yates with an independent uniform draw at each step; no balancing or rejection. */
export function assign(random:()=>number=Math.random):[Student[],Student[]]{
 const pool=[...students];
 for(let i=pool.length-1;i>0;i--){const u=random();if(!Number.isFinite(u)||u<0||u>=1)throw new RangeError('Uniform draw must be in [0,1)');const j=Math.floor(u*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 return [pool.slice(0,30),pool.slice(30)];
}
export function composition(group:readonly Student[]):number[]{return [0,1,2].map(level=>group.filter(s=>s.level===level).length);}
export function seeded(seed:number):()=>number{let a=seed>>>0;return ()=>{a=(Math.imul(a,1664525)+1013904223)>>>0;return a/4294967296;};}
/** Added known-score illustration: first four heights approximate the supplied visual. */
export const scores:readonly number[]=[40,48,55,62,70,75,80,85,90,95];
export function attrition(remove:boolean){const observed=remove?scores.slice(4):[...scores];return {observed,missing:remove?4:0,mean:observed.reduce((a,b)=>a+b,0)/observed.length};}
export function adherence(switchers:number){if(!Number.isInteger(switchers)||switchers<0||switchers>50)throw new RangeError('Switchers must be 0–50');return {assigned:[50,50],received:[50+switchers,50-switchers],followed:50-switchers,switchers};}
export function readSwitchers(raw:string):number|null{if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=0&&n<=50?n:null;}
export interface Repairs{time:boolean;support:boolean}
export const initialRepairs:Repairs={time:false,support:false};
export function protocol(state:Repairs){return {minutes:[30,state.time?30:60],supportEqual:state.support,isolatesMethod:state.time&&state.support};}
export const originalScores=[68,84] as const;
export const intervals=[{estimate:4,low:-4,high:12},{estimate:4,low:2,high:6}] as const;
