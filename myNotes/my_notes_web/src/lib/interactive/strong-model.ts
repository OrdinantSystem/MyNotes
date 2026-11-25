/** Finite illustrations of strong induction; the universal proof lives in the article. */
import {isPrime,factor,integer} from './counterexample-model.ts';
export const strongPresets=['scope','tree','least'] as const;
export type StrongPreset=typeof strongPresets[number];
export const strongFigures=['strong-branch','strong-comparison','strong-scope','strong-examples','strong-combine','strong-statement','strong-base','strong-hypothesis','strong-factors','strong-product','strong-descent','strong-least','strong-contradiction','strong-reals','strong-methods','strong-cumulative','strong-uniqueness','strong-dependencies'] as const;
export type StrongFigure=typeof strongFigures[number];
export const isStrongFigure=(s:string):s is StrongFigure=>(strongFigures as readonly string[]).includes(s);
export function target(n:number){integer(n);if(n<2||n>100)throw new Error('Illustrated integer 2–100 required');return n;}
export function strongInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=2&&n<=100?n:null;}
export function divisors(n:number){target(n);return Array.from({length:n-2},(_,i)=>i+2).filter(a=>n%a===0);}
export function primeFactors(n:number):number[]{target(n);const d=factor(n);return d===null?[n]:[...primeFactors(d),...primeFactors(n/d)];}
export function factorScope(n:number,a:number|null){target(n);const prime=isPrime(n);if(prime){if(a!==null)throw new Error('Prime has no nontrivial factor pair');return {n,a:null,b:null,prime:true,base:n===2,hypothesisLast:n-1,dependencies:[] as number[]};}if(a===null||!divisors(n).includes(a))throw new Error('Nontrivial divisor required');const b=n/a;return {n,a,b,prime:false,base:false,hypothesisLast:n-1,dependencies:[a,b]};}
export const treeChoices=['72','60-six','60-four'] as const;
export type TreeChoice=typeof treeChoices[number];
export type FactorNode={id:string,value:number,children?:FactorNode[]};
const leaf=(id:string,value:number):FactorNode=>({id,value});
export function factorTree(choice:TreeChoice):FactorNode{
 if(choice==='72')return {id:'r',value:72,children:[{id:'a',value:8,children:[leaf('aa',2),{id:'ab',value:4,children:[leaf('aba',2),leaf('abb',2)]}]},{id:'b',value:9,children:[leaf('ba',3),leaf('bb',3)]}]};
 if(choice==='60-six')return {id:'r',value:60,children:[{id:'a',value:6,children:[leaf('aa',2),leaf('ab',3)]},{id:'b',value:10,children:[leaf('ba',2),leaf('bb',5)]}]};
 if(choice==='60-four')return {id:'r',value:60,children:[{id:'a',value:4,children:[leaf('aa',2),leaf('ab',2)]},{id:'b',value:15,children:[leaf('ba',3),leaf('bb',5)]}]};
 throw new Error('Unknown factor tree');
}
export function treeDepth(node:FactorNode):number{return node.children?1+Math.max(...node.children.map(treeDepth)):0;}
export function treeState(choice:TreeChoice,step:number){const root=factorTree(choice),max=treeDepth(root);if(!Number.isInteger(step)||step<0||step>max)throw new Error('Unknown split level');const frontier:FactorNode[]=[],nodes:{node:FactorNode,depth:number,x:number,parent:string|null}[]=[];
 function walk(node:FactorNode,depth:number,left:number,right:number,parent:string|null){nodes.push({node,depth,x:(left+right)/2,parent});if(node.children&&depth<step){const middle=(left+right)/2;walk(node.children[0],depth+1,left,middle,node.id);walk(node.children[1],depth+1,middle,right,node.id);}else frontier.push(node);}
 walk(root,0,0,640,null);return {root,step,max,nodes,frontier,complete:frontier.every(n=>isPrime(n.value)),product:frontier.reduce((p,n)=>p*n.value,1)};
}
export function treeAdvance(choice:TreeChoice,step:number,direction:'next'|'back'|'reset'){const s=treeState(choice,step);if(direction==='next')return Math.min(s.max,step+1);if(direction==='back')return Math.max(0,step-1);if(direction==='reset')return 0;throw new Error('Unknown direction');}
export function leastState(step:number){if(!Number.isInteger(step)||step<0||step>4)throw new Error('Unknown least-counterexample stage');return {step,leastChosen:step>=1,composite:step>=2,factorsCovered:step>=3,contradiction:step===4,assumptionDischarged:step===4};}
export function leastAdvance(step:number,direction:'next'|'back'|'reset'){leastState(step);if(direction==='next')return Math.min(4,step+1);if(direction==='back')return Math.max(0,step-1);if(direction==='reset')return 0;throw new Error('Unknown direction');}
export function initialStrongState(){return {n:60,a:6 as number|null,applied:false,tree:'72' as TreeChoice,step:0,least:0};}
