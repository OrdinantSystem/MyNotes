/** Exact integer relations; sample displays never stand in for a general proof. */
import {finiteSets} from '../reasoning/examples.ts';
export const equivalencePresets=['sorting','comparison','checkpoint'] as const;
export type EquivalencePreset=typeof equivalencePresets[number];
export const equivalenceFigures=['equivalence-opening','equivalence-machine','equivalence-tests','equivalence-chain','equivalence-partition','equivalence-shared','equivalence-classes','equivalence-neighborhoods','equivalence-parity','equivalence-files','equivalence-quotient'] as const;
export type EquivalenceFigure=typeof equivalenceFigures[number];
export const isEquivalenceFigure=(kind:string):kind is EquivalenceFigure=>(equivalenceFigures as readonly string[]).includes(kind);
export const sortingChoices=[4,7,8] as const;
export type RelationRule='remainder'|'distance'|'even-sum';
function integer(n:number){if(!Number.isSafeInteger(n))throw new Error('Expected a safe integer');}
export function remainder(n:number,modulus=3){integer(n);integer(modulus);if(modulus<1)throw new Error('Positive modulus required');return Number(((BigInt(n)%BigInt(modulus))+BigInt(modulus))%BigInt(modulus));}
export function related(a:number,b:number,rule:RelationRule){integer(a);integer(b);if(rule==='remainder')return remainder(a)===remainder(b);if(rule==='distance'){const d=BigInt(a)-BigInt(b);return d>=-1n&&d<=1n;}if(rule==='even-sum')return remainder(a,2)===remainder(b,2);throw new Error('Unknown relation');}
export const integerSamples=Array.from({length:18},(_,i)=>i-6);
export function remainderClasses(){return [0,1,2].map(r=>integerSamples.filter(n=>remainder(n)===r));}
export function relationExample(rule:'remainder'|'distance'){
 if(rule!=='remainder'&&rule!=='distance')throw new Error('Unknown comparison');
 const values=rule==='remainder'?[4,7,10]:[1,2,3];
 return {values,pairs:[[0,1],[1,2],[0,2]].map(([i,j])=>({a:values[i],b:values[j],holds:related(values[i],values[j],rule)}))};
}
export function neighborhoods(){return finiteSets([0,1,2],[1,2,3]);}
export function checkpointAnswer(answer:number|null){if(answer===null)return null;if(!Number.isInteger(answer)||answer<0||answer>3)throw new Error('Invalid answer');return answer===2;}
export function initialEquivalenceState(){return {selected:4 as number,rule:'remainder' as 'remainder'|'distance',answer:null as number|null};}
