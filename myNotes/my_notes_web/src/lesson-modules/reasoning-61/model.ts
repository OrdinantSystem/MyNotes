import {relationSummary} from '../../lib/interactive/analysis-model.ts';
export const letters=['A','B','C'] as const;
export const masks={shared:146,cycle:98,empty:0,identity:273,full:511} as const;
export const tex={P:String.raw`\forall x\exists y\,K(x,y)`,Q:String.raw`\exists y\forall x\,K(x,y)`};
export function matrix(mask:number,rows=3,columns=rows){
 if(!Number.isInteger(rows)||!Number.isInteger(columns)||rows<0||columns<0||rows>4||columns>4||!Number.isSafeInteger(mask)||mask<0||mask>=2**(rows*columns))throw new Error('Finite bounded matrix required');
 return Array.from({length:rows},(_,r)=>Array.from({length:columns},(_,c)=>Boolean(mask&(1<<(r*columns+c)))));
}
export function evaluate(mask:number,n=3){if(n<1)throw new Error('Nonempty domain required');const cells=matrix(mask,n),s=relationSummary(cells,n);return {cells,P:s.separate,Q:s.common,rowWitnesses:cells.map(row=>row.flatMap((on,c)=>on?[c]:[])),commonWitnesses:s.shared.flatMap((on,c)=>on?[c]:[]),failingRows:s.failingRows,countermodel:s.separate&&!s.common};}
export function toggle(mask:number,row:number,column:number,n=3){evaluate(mask,n);if(!Number.isInteger(row)||!Number.isInteger(column)||row<0||column<0||row>=n||column>=n)throw new Error('Bounded row and column required');return mask^(1<<(row*n+column));}
export type Premise='none'|'P'|'Q'|'contradiction';
export type Conclusion='P'|'Q'|'notQ';
export function filterModels(n:number,premise:Premise,conclusion:Conclusion){
 if(!Number.isInteger(n)||n<1||n>3||!['none','P','Q','contradiction'].includes(premise)||!['P','Q','notQ'].includes(conclusion))throw new Error('Known bounded filter required');
 const worlds=Array.from({length:2**(n*n)},(_,mask)=>{const s=evaluate(mask,n),included=premise==='none'||(premise==='P'?s.P:premise==='Q'?s.Q:false),holds=conclusion==='P'?s.P:conclusion==='Q'?s.Q:!s.Q;return {mask,included,holds,counter:included&&!holds};});
 return {worlds,total:worlds.length,included:worlds.filter(w=>w.included).length,countermodels:worlds.filter(w=>w.counter).length,firstCounter:worlds.find(w=>w.counter)?.mask??null};
}
export const proofLines=[
 {tex:tex.Q,rule:'premise',scope:0},
 {tex:String.raw`\forall x\,K(x,b)`,rule:'witness',scope:1},
 {tex:String.raw`K(a,b)`,rule:'allE',scope:1},
 {tex:String.raw`\exists y\,K(a,y)`,rule:'someI',scope:1},
 {tex:tex.P,rule:'allI',scope:1},
 {tex:tex.P,rule:'someE',scope:0},
] as const;
export function proofStage(n:number){if(!Number.isInteger(n)||n<0||n>5)throw new Error('Proof stage0..5 required');return n;}
export function readerState(mask:number,students=3,books=3){const cells=matrix(mask,students,books);return {cells,premise:cells.some(row=>row.every(Boolean)),conclusion:Array.from({length:books},(_,b)=>cells.some(row=>row[b])).every(Boolean),witnesses:cells.flatMap((row,i)=>row.every(Boolean)?[i]:[])};}
export function readMask(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=0&&n<=511?n:null;}
export function initialState(){return {world:masks.shared as number,mask:0,stage:0,domain:3,premise:'P' as Premise,conclusion:'Q' as Conclusion,transfer:null as number|null,readerMask:56};}
