/** Lemma discovery separates a sufficient target from an independently established claim. */
import {remainder} from './equivalence-model.ts';
import {squareWitness,consecutive} from './cases-model.ts';
export const lemmaPresets=['parity','bridge','practice'] as const;
export type LemmaPreset=typeof lemmaPresets[number];
export const lemmaFigures=['lemma-chain','lemma-gap','lemma-multiples','lemma-assumptions','lemma-match','lemma-contrapositive','lemma-definition','lemma-order','lemma-criteria','lemma-counterexample','lemma-compare','lemma-consecutive','lemma-bridge','lemma-directions'] as const;
export type LemmaFigure=typeof lemmaFigures[number];
export const isLemmaFigure=(s:string):s is LemmaFigure=>(lemmaFigures as readonly string[]).includes(s);
export const lemmaChoices=[2,3,4,5,6] as const;
function integer(n:number){if(!Number.isSafeInteger(n))throw new Error('A safe finite integer is required');return n;}
function exact(n:bigint){const value=Number(n);integer(value);if(BigInt(value)!==n)throw new Error('Unsafe arithmetic');return value;}
export function divides(d:number,n:number){return remainder(n,d)===0;}
export function tripleParity(k:number){integer(k);const product=exact(3n*BigInt(k)),even=remainder(k,2)===0;return {k,product,even,productEven:remainder(product,2)===0,oddWitness:even?null:exact((3n*BigInt(k)-1n)/2n)};}
export function tripleCollection(k:number){if(!(lemmaChoices as readonly number[]).includes(k))throw new Error('Illustrated k must be 2–6');const s=tripleParity(k),pairs=Math.floor(k/2),leftover=remainder(k,2),pooled=3*leftover;return {...s,pairs,leftover,pooled,newPairs:Math.floor(pooled/2),remaining:pooled%2,totalPairs:3*pairs+Math.floor(pooled/2)};}
export function oddTriple(r:number){integer(r);const k=exact(2n*BigInt(r)+1n);return {...tripleParity(k),r};}
export function bridgeStep(step:number){if(!Number.isInteger(step)||step<0||step>5)throw new Error('Unknown lemma step');return {step,goalExpanded:step>=1,factorsExposed:step>=2,candidate:step<3?null:step===3?'unproved':'proved',lemmaEstablished:step>=4,goalEstablished:step===5};}
export function advanceBridge(step:number,direction:'next'|'back'|'reset'){bridgeStep(step);if(direction==='next')return Math.min(5,step+1);if(direction==='back')return Math.max(0,step-1);if(direction==='reset')return 0;throw new Error('Unknown bridge direction');}
export function practiceCheck(answer:number|null){if(answer===null)return null;if(!Number.isInteger(answer)||answer<0||answer>3)throw new Error('Unknown claim');return {universal:answer===2,sufficient:answer!==3,correct:answer===2,counterexample:answer===0?1:answer===1||answer===3?0:null};}
export function transferWitness(k:number){const square=squareWitness(k,true),pair=consecutive(k,2),m=pair.product/2,value=exact(BigInt(square.square)-1n);return {k,n:square.n,value,product:pair.product,m,eightM:exact(8n*BigInt(m))};}
export function divisibilityCase(n:number,a:number,b:number,target:number){integer(n);return {n,a,b,target,first:divides(a,n),second:divides(b,n),conclusion:divides(target,n)};}
export function multipleRows(a:number,b:number,target:number,limit:number){for(const d of [a,b,target])if(!Number.isInteger(d)||d<1||d>30)throw new Error('Positive divisor 1–30 required');if(!Number.isInteger(limit)||limit<1||limit>30)throw new Error('Display limit 1–30 required');return [a,b,target].map(d=>({divisor:d,values:Array.from({length:limit+1},(_,n)=>n).filter(n=>divides(d,n))}));}
export function initialLemmaState(){return {k:5,step:0,answer:null as number|null,checked:false};}
