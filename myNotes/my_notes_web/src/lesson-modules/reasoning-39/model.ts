export type Frame='positive'|'negative'|'neutral';
export const frames:Frame[]=['positive','negative','neutral'];
export const outcomes=Array.from({length:100},(_,id)=>({id,success:id<90,x:25+(id%10)*34,y:25+Math.floor(id/10)*30}));
// Seeded, jittered lattice: exact stable identities, irregular positions, no occluded dots.
export const dots=Array.from({length:137},(_,id)=>{const cell=(id*59)%144;return {id,x:30+(cell%16)*37+7*Math.sin(id*4.31),y:25+Math.floor(cell/16)*36+7*Math.cos(id*3.17)};});
export const anchors=[60,210] as const;
export const distribution={A:[{probability:1,saved:60,lost:40}],B:[{probability:.6,saved:100,lost:0},{probability:.4,saved:0,lost:100}]};
export function expected(which:'A'|'B'){return distribution[which].reduce((s,r)=>s+r.probability*r.saved,0);}
export function variance(which:'A'|'B'){const mean=expected(which);return distribution[which].reduce((s,r)=>s+r.probability*(r.saved-mean)**2,0);}
export function posterior(prior:number,likelihoodH:number,likelihoodNotH:number){
 for(const p of [prior,likelihoodH,likelihoodNotH])if(!Number.isFinite(p)||p<0||p>1)throw new Error('Probabilities must be in [0,1]');
 const denominator=prior*likelihoodH+(1-prior)*likelihoodNotH;if(denominator===0)throw new Error('Positive evidence probability required');
 return prior*likelihoodH/denominator;
}
export function delta(actual:number,reference:number){if(!Number.isFinite(actual)||!Number.isFinite(reference))throw new Error('Finite values required');return actual-reference;}
export function readEstimate(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=0&&n<=1000?n:null;}
export function frame(value:string):Frame{if(!frames.includes(value as Frame))throw new Error('Unknown frame');return value as Frame;}
export const answers=[1,2,0,1] as const;
export function checkAnswers(values:(number|null)[]){if(values.length!==4||values.some(v=>v!==null&&(!Number.isInteger(v)||v<0||v>2)))throw new Error('Four bounded choices required');return values.map((v,i)=>({answered:v!==null,correct:v===answers[i]}));}
export function initialState(){return {opening:0,estimate:null as number|null,revised:null as number|null,estimateStage:0,frame:'positive' as Frame,riskStage:0,gain:null as 'A'|'B'|null,loss:null as 'A'|'B'|null};}
