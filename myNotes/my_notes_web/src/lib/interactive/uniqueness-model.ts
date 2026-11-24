import {squarePreimages} from './equation-model.ts';
export const uniquenessPresets=['machine','convergence','inspection'] as const;
export type UniquenessPreset=typeof uniquenessPresets[number];
export const uniquenessFigures=['unique-keys','unique-worlds','unique-domain','unique-cardinalities','unique-bounds','unique-witness','unique-candidates','unique-convergence','unique-coincide','unique-architecture','unique-square-two','unique-square-none','unique-comparison','unique-rational','unique-hierarchy','unique-pigeonhole','unique-closing','unique-obligations'] as const;
export type UniquenessFigure=typeof uniquenessFigures[number];
export const isUniquenessFigure=(s:string):s is UniquenessFigure=>(uniquenessFigures as readonly string[]).includes(s);
export function claimsFromCount(count:number){if(!Number.isSafeInteger(count)||count<0)throw new Error('Nonnegative finite cardinality required');return {exists:count>=1,atMostOne:count<=1,exactlyOne:count===1};}
export const solutionEquations={linear:'2x+3=11',two:'x^2=4',none:'x^2=-1'} as const;
export function solutionSummary(kind:keyof typeof solutionEquations){if(!(kind in solutionEquations))throw new Error('Unknown solution case');const solutions=kind==='linear'?[4]:kind==='two'?squarePreimages(4):[];return {kind,equation:solutionEquations[kind],solutions,...claimsFromCount(solutions.length)};}
export function uniquenessInput(raw:string){if(!raw.trim())return null;const x=Number(raw);return Number.isFinite(x)&&x>=-5&&x<=10&&Number.isInteger(2*x)?x:null;}
export function machineState(x:number){if(uniquenessInput(String(x))===null)throw new Error('Use half-unit inputs from -5 to 10');return {x,doubled:2*x,output:2*x+3,target:11,works:2*x+3===11};}
export function convergenceStage(stage:number){if(!Number.isInteger(stage)||stage<0||stage>4)throw new Error('Unknown convergence stage');return stage;}
export const inspectionAnswers=[0,1,2,3] as const;
export function inspectionAnswer(row:number,choice:number|null){if(!Number.isInteger(row)||row<0||row>3)throw new Error('Unknown argument');if(choice===null)return null;if(!Number.isInteger(choice)||choice<0||choice>3)throw new Error('Unknown proof obligation');return choice===inspectionAnswers[row];}
export const keyWorlds=[[false,false,true,false,false],[false,false,true,false,true]] as const;
export const squarePlotX=(x:number)=>300+70*x;
export const squarePlotY=(y:number)=>330-30*y;
export function initialUniquenessState(){return {x:2,stage:0,answers:[null,null,null,null] as (number|null)[]};}
