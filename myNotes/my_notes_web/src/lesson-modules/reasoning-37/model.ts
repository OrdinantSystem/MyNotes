export type Stage='actual'|'result'|'flagged';
export interface Component {id:string;defective:boolean;flagged:boolean}
export const stages:Stage[]=['actual','result','flagged'];
export const figureKinds=['direction','detector','population','sensitivity','false-positives','counts','flagged','restriction','denominators','tree','curve','update','summary'] as const;
export function bayes(prior:number,sensitivity:number,falsePositive:number){
 for(const x of [prior,sensitivity,falsePositive])if(!Number.isFinite(x)||x<0||x>1)throw new Error('Probabilities must lie in [0,1]');
 const truePositive=prior*sensitivity,falseAlarm=(1-prior)*falsePositive,positive=truePositive+falseAlarm;
 return {truePositive,falseAlarm,positive,posterior:positive===0?null:truePositive/positive};
}
export function factory(rate:number){
 if(!Number.isSafeInteger(rate)||rate<1||rate>50)throw new Error('Factory base rate must be an integer percentage from 1 to 50');
 const defective=10*rate,healthy=1000-defective,tp=9*rate,fn=rate,fp=100-rate,tn=healthy-fp,totalFlagged=tp+fp;
 return {total:1000,rate,defective,healthy,tp,fn,fp,tn,totalFlagged,posterior:tp/totalFlagged};
}
export function population(rate=1):Component[]{const s=factory(rate);return Array.from({length:s.total},(_,i)=>{const rank=(i*37)%s.total,defective=rank<s.defective;return {id:`component-${i}`,defective,flagged:defective?rank<s.tp:rank-s.defective<s.fp};});}
export function grouped(items:Component[],stage:Stage){
 if(!stages.includes(stage))throw new Error('Unknown grouping');
 const flagged=items.filter(x=>x.flagged),notFlagged=items.filter(x=>!x.flagged);
 return stage==='actual'?{groups:[items.filter(x=>x.defective),items.filter(x=>!x.defective)],hidden:[]}:stage==='result'?{groups:[flagged,notFlagged],hidden:[]}:{groups:[flagged],hidden:notFlagged};
}
export function rateInput(raw:string){if(raw.trim()==='')return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=1&&n<=50?n:null;}
export function estimateInput(raw:string){if(raw.trim()==='')return null;const n=Number(raw);return Number.isFinite(n)&&n>=0&&n<=100?n:null;}
export const workshop={total:2000,defective:100,healthy:1900,tp:80,fn:20,fp:95,tn:1805,totalFlagged:175,posterior:80/175};
