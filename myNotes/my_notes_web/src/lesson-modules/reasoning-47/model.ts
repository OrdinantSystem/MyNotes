export const results=[48,45,55,50,49,54,54,54,45,54,56,45,53,48,45,51,50,53,41,61] as const;
export const rates=[.01,.05,.10] as const;
export function integer(n:number,min:number,max:number){if(!Number.isInteger(n)||n<min||n>max)throw new Error('Out of bounds');return n;}
export function fairDistribution(n=100):number[]{integer(n,0,100);const p=[2**(-n)];for(let k=1;k<=n;k++)p.push(p[k-1]*(n-k+1)/k);return p;}
export function twoSided(heads:number,n=100){integer(n,0,100);integer(heads,0,n);const distance=Math.abs(heads-n/2);return Math.min(1,fairDistribution(n).reduce((sum,p,k)=>sum+(Math.abs(k-n/2)>=distance?p:0),0));}
export function familyProbability(count:number,rate:number){integer(count,0,100);if(!Number.isFinite(rate)||rate<0||rate>1)throw new Error('Invalid probability');if(count===0||rate===0)return 0;if(rate===1)return 1;return -Math.expm1(count*Math.log1p(-rate));}
export const coinProbability=twoSided(61);
export function thresholds(heads:number){integer(heads,0,100);const low=Math.min(heads,100-heads);return {low,high:100-low};}
export const questions=['comparisons','plan','other-results','favorite','replication','effect'] as const;
export type Question=typeof questions[number];
export function relevant(q:Question){if(!questions.includes(q))throw new Error('Unknown question');return q!=='favorite';}
export function initialState(){return {heads:61,count:20,rate:.05,selected:[] as Question[],revealed:false};}
