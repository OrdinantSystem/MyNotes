import {isPrime,factor} from './counterexample-model.ts';
export const inductionPresets=['tiles','chain','checkpoint'] as const;
export type InductionPreset=typeof inductionPresets[number];
export const inductionFigures=['induction-checked','induction-sums','induction-growth','induction-regions','induction-transitions','induction-domino-standing','induction-domino-started','induction-chain','induction-base','induction-hypothesis','induction-geometry','induction-circular','induction-propagation','induction-false-base','induction-prime-table','induction-prime-grid','induction-empirical','induction-compression','induction-architecture','induction-domains'] as const;
export type InductionFigure=typeof inductionFigures[number];
export const isInductionFigure=(s:string):s is InductionFigure=>(inductionFigures as readonly string[]).includes(s);
export function tileInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=1&&n<=8?n:null;}
export function squareGrowth(k:number){if(tileInput(String(k))===null)throw new Error('Integer tile size 1–8 required');return {k,existing:k*k,column:k,row:k,corner:1,added:2*k+1,next:k+1,total:(k+1)*(k+1)};}
export function layerCells(n:number){if(!Number.isInteger(n)||n<1||n>9)throw new Error('Square size 1–9 required');return Array.from({length:n*n},(_,i)=>{const x=i%n,y=Math.floor(i/n);return {x,y,layer:Math.max(x,y)+1};});}
export const chainModes=['unstarted','connected','broken'] as const;
export type ChainMode=typeof chainModes[number];
export function chainState(mode:ChainMode){if(!(chainModes as readonly string[]).includes(mode))throw new Error('Unknown chain mode');const base=mode!=='unstarted',links=[true,true,mode!=='broken',true,true],established=[base];for(const link of links)established.push(established.at(-1)!&&link);return {base,links,established};}
export function primePolynomial(n:number){if(!Number.isInteger(n)||n<0||n>40)throw new Error('Polynomial index 0–40 required');const value=n*n+n+41;return {n,value,prime:isPrime(value),divisor:factor(value)};}
export const checkpointAnswers=[1,0,2,1] as const;
export function checkpointAnswer(row:number,choice:number|null){if(!Number.isInteger(row)||row<0||row>3)throw new Error('Unknown question');if(choice===null)return null;if(!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Unknown choice');return choice===checkpointAnswers[row];}
export function initialInductionState(){return {k:4,revealed:false,mode:'unstarted' as ChainMode,answers:[null,null,null,null] as (number|null)[]};}
