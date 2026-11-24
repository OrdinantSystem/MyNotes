import {oddSum} from './parity-model.ts';
import {remainder} from './equivalence-model.ts';
export const transferPresets=['reconstruct','apply','calibration'] as const;
export type TransferPreset=typeof transferPresets[number];
export const transferFigures=['transfer-complete','transfer-withheld','transfer-route','transfer-abilities','transfer-evidence','transfer-pairs','transfer-form','transfer-decisions','transfer-search','transfer-cognition','transfer-remainder','transfer-comparison','transfer-structure','transfer-calibration','transfer-practice','transfer-questions','transfer-fading','transfer-course'] as const;
export type TransferFigure=typeof transferFigures[number];
export const isTransferFigure=(s:string):s is TransferFigure=>(transferFigures as readonly string[]).includes(s);
export type Outcome='independent'|'supported'|'not-yet';
export function probability(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=0&&n<=100?n:null;}
export function initialExperiment(){return {draft:null as number|null,prediction:null as number|null,started:false,solutionSeen:false,outcome:null as Outcome|null};}
export type ExperimentState=ReturnType<typeof initialExperiment>;
export function recordPrediction(s:ExperimentState){return s.started||s.solutionSeen||s.prediction!==null||s.draft===null||probability(String(s.draft))!==s.draft?{...s}:{...s,prediction:s.draft};}
export function beginAttempt(s:ExperimentState){return {...s,started:true};}
export function viewReference(s:ExperimentState){return {...s,solutionSeen:true};}
export const illustrativePredictions=[100,90,90,80,60] as const;
export const illustrativeResults=[true,true,false,false,true] as const;
export type RecordRow={prediction:number|null;success:boolean|null};
export function initialRecord():RecordRow[]{return illustrativePredictions.map((prediction,i)=>({prediction,success:illustrativeResults[i]}));}
export function recordSummary(rows:RecordRow[]){
 for(const r of rows)if((r.prediction!==null&&probability(String(r.prediction))!==r.prediction)||(r.success!==null&&typeof r.success!=='boolean'))throw new Error('Invalid observation');
 const pairs=rows.filter((r):r is {prediction:number;success:boolean}=>r.prediction!==null&&r.success!==null),n=pairs.length;
 return {n,predicted:n?pairs.reduce((a,r)=>a+r.prediction,0)/n:null,observed:n?100*pairs.filter(r=>r.success).length/n:null};
}
export const calibrationX=(p:number)=>60+3.2*p;
export const calibrationY=(p:number)=>350-3.2*p;
export const oddExample=oddSum(2,3);
export function sameRemainder(a:number,b:number,d:number,r:number){if(![a,b,d,r].every(Number.isSafeInteger)||d<=0||r<0||r>=d)throw new Error('Integer quotients and valid positive-divisor remainder required');const x=d*a+r,y=d*b+r,difference=x-y;if(![x,y,difference].every(Number.isSafeInteger))throw new Error('Unsafe example');return {a,b,d,r,x,y,difference,witness:a-b,rx:remainder(x,d),ry:remainder(y,d)};}
