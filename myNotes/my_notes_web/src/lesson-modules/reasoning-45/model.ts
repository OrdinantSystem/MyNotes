export type Method='A'|'B';
export type Difficulty='easy'|'difficult';
export type World='confounder'|'mediator';
export const groups=[
 {method:'A',difficulty:'easy',n:10,success:9},
 {method:'A',difficulty:'difficult',n:100,success:30},
 {method:'B',difficulty:'easy',n:100,success:80},
 {method:'B',difficulty:'difficult',n:10,success:2},
] as const;
export const observations=groups.flatMap(g=>Array.from({length:g.n},(_,i)=>({id:`${g.method}-${g.difficulty}-${i}`,method:g.method,difficulty:g.difficulty,success:i<g.success})));
export const rates={A:{easy:.9,difficult:.3},B:{easy:.8,difficult:.2}} as const;
export const hospital={X:{low:{n:10,success:8},high:{n:100,success:20}},Y:{low:{n:100,success:70},high:{n:10,success:1}}} as const;
export function weightedMean(values:number[],weights:number[]){
 if(!values.length||values.length!==weights.length||values.some(x=>!Number.isFinite(x))||weights.some(x=>!Number.isFinite(x)||x<0))throw new Error('Finite values and nonnegative matching weights required');
 const total=weights.reduce((a,b)=>a+b,0);if(!Number.isFinite(total)||total<=0)throw new Error('Positive finite weight required');
 return values.reduce((a,v,i)=>a+v*(weights[i]/total),0);
}
export function pooled(method:Method){const os=observations.filter(o=>o.method===method);return os.filter(o=>o.success).length/os.length;}
export function rate(method:Method,easyShare:number){if(!Number.isFinite(easyShare)||easyShare<0||easyShare>1)throw new Error('Share in [0,1] required');return weightedMean([rates[method].easy,rates[method].difficult],[easyShare,1-easyShare]);}
export function reweight(a:number,b:number){return {A:rate('A',a/110),B:rate('B',b/110)};}
export function readInteger(raw:string,min:number,max:number){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=min&&n<=max?n:null;}
export function peopleMean(a:number,b:number){if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<1||b<1||a>20||b>20)throw new Error('Group sizes 1..20 required');return weightedMean([90,50],[a,b]);}
export function recovery(program:'X'|'Y'){const g=hospital[program];return (g.low.success+g.high.success)/(g.low.n+g.high.n);}
export function standardizedRecovery(program:'X'|'Y',lowShare=.5){if(!Number.isFinite(lowShare)||lowShare<0||lowShare>1)throw new Error('Share in [0,1] required');const g=hospital[program];return weightedMean([g.low.success/g.low.n,g.high.success/g.high.n],[lowShare,1-lowShare]);}
export function edges(world:World){if(world!=='confounder'&&world!=='mediator')throw new Error('Unknown world');return world==='confounder'?[['Z','X'],['Z','Y'],['X','Y']]:[['X','Z'],['Z','Y'],['X','Y']];}
export function initialState(){return {a:10,b:100,n1:2,n2:8,revealed:false,world:'confounder' as World,compressed:false};}
