/** Bounded proof discovery states; existing signed parity arithmetic supplies the witnesses. */
import {evenSum} from './parity-model.ts';
export const discoveryPresets=['parity','workspace','practice'] as const;
export type DiscoveryPreset=typeof discoveryPresets[number];
export const discoveryFigures=['discovery-have-goal','discovery-backward','discovery-match','discovery-directions','discovery-circular','discovery-branches','discovery-rules','discovery-dependence','discovery-counterexample','discovery-abilities'] as const;
export type DiscoveryFigure=typeof discoveryFigures[number];
export const isDiscoveryFigure=(kind:string):kind is DiscoveryFigure=>(discoveryFigures as readonly string[]).includes(kind);
export const evenChoices=[2,4,6,8] as const,oddChoices=[1,3,5,7] as const;
function integer(n:number){if(!Number.isSafeInteger(n))throw new Error('A safe integer is required');return n;}
export function evenOddWitness(a:number,b:number){const base=evenSum(a,b);return {a,b,e:base.x,o:integer(base.y+1),k:base.pairs,sum:integer(base.sum+1)};}
export function evenOddSelection(e:number,o:number){if(!(evenChoices as readonly number[]).includes(e)||!(oddChoices as readonly number[]).includes(o))throw new Error('Invalid illustrated selection');return evenOddWitness(e/2,(o-1)/2);}
export function workspaceStep(n:number){if(!Number.isInteger(n)||n<0||n>4)throw new Error('Invalid proof step');return {step:n,goalExpanded:n>=1,assumptionsExpanded:n>=2,connected:n>=3,established:n===4};}
export function advanceWorkspace(n:number,direction:'next'|'back'|'reset'){workspaceStep(n);if(direction==='reset')return 0;if(direction==='next')return n===4?0:n+1;if(direction==='back')return Math.max(0,n-1);throw new Error('Invalid navigation');}
export const openingAnswers=[1,1,0,2] as const;
export function openingAnswer(question:number,answer:number|null){if(!Number.isInteger(question)||question<0||question>3)throw new Error('Invalid question');if(answer===null)return null;if(!Number.isInteger(answer)||answer<0||answer>2)throw new Error('Invalid answer');return answer===openingAnswers[question];}
export function initialDiscoveryState(){return {even:4,odd:5,step:0,question:0,answers:[null,null,null,null] as (number|null)[]};}
export function evenConsequences(r:number){integer(r);const n=integer(2*r),squareWitness=integer(2*r*r),nextWitness=integer(r+1);return {r,n,square:integer(n*n),squareWitness,next:integer(n+2),nextWitness};}
export function nextInteger(n:number){return integer(integer(n)+1);}
export const dependentInputs=[-2,3,100] as const;
