/** Proof witnesses are signed; finite controls bound only the illustrations. */
import {remainder} from './equivalence-model.ts';
import {evaluate} from './logic-model.ts';
export const casesPresets=['consecutive','odd-square','inspection','triples','factors','coverage-practice'] as const;
export type CasesPreset=typeof casesPresets[number];
export const casesFigures=['cases-parity','cases-possibilities','cases-routes','cases-workspace','cases-even-pairs','cases-even-match','cases-odd-successor','cases-completed','cases-missing-zero','cases-coverage','cases-logic','cases-square-samples','cases-properties','cases-forward','cases-reverse','cases-square-workspace','cases-even-square','cases-reverse-workspace','cases-eliminate-before','cases-eliminate-after','cases-equivalence','cases-three-branches','cases-architecture','cases-divisibility','cases-absolute'] as const;
export type CasesFigure=typeof casesFigures[number];
export const isCasesFigure=(kind:string):kind is CasesFigure=>(casesFigures as readonly string[]).includes(kind);
export const caseBounds={min:-12,max:12,oddMin:3,oddMax:11} as const;
function integer(n:number){if(!Number.isSafeInteger(n))throw new Error('A safe integer is required');return n;}
function exact(n:bigint){return integer(Number(n));}
export function consecutive(n:number,width:2|3){
 integer(n);if(width!==2&&width!==3)throw new Error('Two or three factors required');
 const values=Array.from({length:width},(_,i)=>integer(n+i));
 const remainders=values.map(v=>remainder(v,width)),factorIndex=remainders.indexOf(0);
 const product=exact(values.reduce((p,v)=>p*BigInt(v),1n));
 return {n,width,values,remainders,factorIndex,factor:values[factorIndex],product,quotient:product/width};
}
export function productCase(k:number,odd:boolean){
 integer(k);if(typeof odd!=='boolean')throw new Error('A parity case is required');
 const n=exact(2n*BigInt(k)+(odd?1n:0n));
 const m=odd?exact((2n*BigInt(k)+1n)*(BigInt(k)+1n)):exact(BigInt(k)*(2n*BigInt(k)+1n));
 return {...consecutive(n,2),k,m};
}
export function squareWitness(k:number,odd:boolean){
 integer(k);if(typeof odd!=='boolean')throw new Error('A parity case is required');
 const b=BigInt(k),n=exact(2n*b+(odd?1n:0n)),square=exact(BigInt(n)**2n);
 const witness=exact(2n*b*b+(odd?2n*b:0n));
 return {k,n,square,witness,odd};
}
export function oddSquare(n:number){
 if(!Number.isInteger(n)||n<3||n>11||remainder(n,2)!==1)throw new Error('Odd side 3–11 required');
 const k=(n-1)/2,center=4*k*k,strips=4*k,corner=1;
 return {n,k,center,strips,corner,total:n*n};
}
export function casesInput(raw:string,odd=false){
 if(!raw.trim())return null;const n=Number(raw),min=odd?3:-12,max=odd?11:12;
 return Number.isSafeInteger(n)&&n>=min&&n<=max&&(!odd||remainder(n,2)===1)?n:null;
}
export function coverage(row:number,n:number){
 integer(n);switch(row){case 0:return [n<0,n>0];case 1:return [n<=0,n>=0];case 2:return [n<=3,n>=4];case 3:return [n<3,n>4];default:throw new Error('Unknown coverage row');}
}
export const coverageAnswers=[false,true,true,false] as const;
export const factorAnswers=[0,2,1] as const;
export function choiceAnswer(preset:'inspection'|'factors'|'coverage-practice',row:number,answer:number|null){
 const answers=preset==='inspection'?[2]:preset==='factors'?factorAnswers:preset==='coverage-practice'?coverageAnswers.map(b=>b?0:1):null;
 if(!answers||!Number.isInteger(row)||row<0||row>=answers.length)throw new Error('Invalid question');
 if(answer===null)return null;
 const count=preset==='inspection'?4:preset==='factors'?3:2;
 if(!Number.isInteger(answer)||answer<0||answer>=count)throw new Error('Invalid answer');
 return answer===answers[row];
}
export function casesPrinciple(p:boolean,q:boolean,r:boolean){return evaluate('implication',(p||q)&&evaluate('implication',p,r)&&evaluate('implication',q,r),r);}
export function multipleOffset(n:number,m:number){integer(n);integer(m);if(m<1)throw new Error('Positive divisor required');const r=remainder(n,m);return {r,j:r===0?0:m-r};}
export function initialCasesState(){return {consecutive:7,triples:6,side:7,answers:[null,null,null,null] as (number|null)[]};}
