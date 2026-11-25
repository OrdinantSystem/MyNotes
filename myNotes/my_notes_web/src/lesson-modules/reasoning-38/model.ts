/** Percent inputs are exact bounded teaching parameters, not measured industrial data. */
export function percent(n:number){if(!Number.isInteger(n)||n<0||n>100)throw new RangeError('Expected an integer percentage from 0 to 100');return n;}
export function readPercent(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=0&&n<=100?n:null;}
export function update(priorA:number,likelihoodA:number,likelihoodB:number){
 percent(priorA);percent(likelihoodA);percent(likelihoodB);
 const weightA=priorA*likelihoodA,weightB=(100-priorA)*likelihoodB,total=weightA+weightB;
 return {priorA,priorB:100-priorA,likelihoodA,likelihoodB,massA:weightA/100,massB:weightB/100,total:total/100,postA:total===0?null:100*weightA/total,postB:total===0?null:100*weightB/total};
}
export function multiplierUpdate(priorB:number,multiplier:number){
 percent(priorB);if(!Number.isFinite(multiplier)||multiplier<0)throw new RangeError('Expected a finite nonnegative multiplier');
 const prior=priorB/100,numerator=prior*multiplier,denominator=1-prior+numerator;
 return denominator===0?null:100*(numerator/denominator);
}
export const initial={priorA:75,likelihoodA:10,likelihoodB:60};
export const steps=[{a:75,b:25},{a:60,b:20},{a:6,b:12}] as const;
export function investigationStep(raw:number){if(!Number.isInteger(raw))throw new RangeError('Invalid stage');return Math.max(0,Math.min(2,raw));}
export function reports(count:number,kind:'copies'|'independent'){
 if(!Number.isInteger(count)||count<1||count>3||!['copies','independent'].includes(kind))throw new RangeError('Invalid report model');
 const validCount=kind==='copies'?1:count;
 return {valid:multiplierUpdate(25,6**validCount)!,naive:multiplierUpdate(25,6**count)!,count,kind};
}
export const sensitivityPriors=[5,10,25,50,75];
