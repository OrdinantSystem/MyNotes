import {isPrime,integer} from './counterexample-model.ts';
export {isPrime};
export const contradictionPresets=['prime-builder','euclid','smallest'] as const;
export type ContradictionPreset=typeof contradictionPresets[number];
export const contradictionFigures=['contradiction-largest','contradiction-successor','contradiction-integer-conflict','contradiction-eliminate','contradiction-architecture','contradiction-operations','contradiction-equal-operations','contradiction-comparison','contradiction-prime-grid','contradiction-prime-gaps','contradiction-search-limit','contradiction-groups','contradiction-plus-one','contradiction-factorization','contradiction-established','contradiction-prime-divisor','contradiction-all-primes','contradiction-none-divide','contradiction-outside','contradiction-prime-conflict','contradiction-methods','contradiction-smallest','contradiction-extremes','contradiction-synthesis'] as const;
export type ContradictionFigure=typeof contradictionFigures[number];
export const isContradictionFigure=(s:string):s is ContradictionFigure=>(contradictionFigures as readonly string[]).includes(s);
export const firstPrimes=[2,3,5,7,11,13,17] as const;
export function primeFactors(n:number){integer(n);if(n<2||n>1_000_000)throw new Error('Factorization illustration requires 2–1,000,000');let rest=n;const factors:number[]=[];for(let d=2;d<=rest/d;d++){while(rest%d===0){factors.push(d);rest/=d;}}if(rest>1)factors.push(rest);return factors;}
export function primeCollection(count:number){if(!Number.isInteger(count)||count<1||count>7)throw new Error('Use 1–7 consecutive primes');const primes=firstPrimes.slice(0,count),product=primes.reduce<number>((a,b)=>a*b,1),n=product+1,factors=primeFactors(n);return {count,primes,product,n,factors,prime:isPrime(n),remainders:primes.map(p=>({p,quotient:product/p,remainder:n%p})),outside:factors.every(q=>!primes.some(p=>p===q))};}
export function primeCountInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=1&&n<=7?n:null;}
export function smallestAnswer(choice:number|null){if(choice===null)return null;if(!Number.isInteger(choice)||choice<0||choice>3)throw new Error('Unknown expression');return choice===2;}
export function euclidStage(stage:number){if(!Number.isInteger(stage)||stage<0||stage>5)throw new Error('Unknown proof stage');return stage;}
export const smallestExpressions=['r+1','r-r',String.raw`\frac r2`,'2r'] as const;
export function initialContradictionState(){return {count:3,stage:0,answer:null as number|null};}
