/** Reuse the existing signed parity witnesses; counters model positive odd integers only. */
import {oddSum,parityInput,parityBounds} from './parity-model.ts';
export const justificationPresets=['opening','representations','challenge'] as const;
export type JustificationPreset=typeof justificationPresets[number];
export const justificationFigures=['justification-examples','justification-repair','justification-dependencies','justification-foundations','justification-lemmas','justification-roles','justification-counterexample'] as const;
export type JustificationFigure=typeof justificationFigures[number];
export const isJustificationFigure=(kind:string):kind is JustificationFigure=>(justificationFigures as readonly string[]).includes(kind);
export const representationViews=['objects','symbols','structure'] as const;
export type RepresentationView=typeof representationViews[number];
export const pairBounds={min:parityBounds.min,max:parityBounds.max};
export const pairInput=parityInput;
export function oddPairState(k:number,m:number){if(pairInput(String(k))!==k||pairInput(String(m))!==m)throw new Error('Invalid illustrated pair count');return oddSum(k,m);}
export function initialJustificationState(){return {k:1,m:2,view:'objects' as RepresentationView,opening:null as number|null,answer:null as number|null,checked:false};}
export function justificationAnswer(preset:'opening'|'challenge',answer:number|null){if(preset!=='opening'&&preset!=='challenge')throw new Error('Invalid question');if(answer===null)return null;if(!Number.isInteger(answer)||answer<0||answer>=(preset==='opening'?2:4))throw new Error('Invalid answer');return answer===1;}
export const oddExamples=[[3,5],[7,9],[11,17]] as const;
export function sameWitness(k:number){const value=oddSum(k,k);return {...value,covered:value.x===value.y};}
export function divisibleByFour(k:number,m:number){const state=oddSum(k,m);return {...state,divisible:state.sum%4===0};}
export const proofDependencies=[['assumption','representation'],['odd-definition','representation'],['representation','algebra'],['representation','closure'],['algebra','conclusion'],['closure','conclusion'],['even-definition','conclusion']] as const;
