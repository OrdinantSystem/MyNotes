import {finiteSets} from '../reasoning/examples.ts';
import {evaluate} from './logic-model.ts';
export const worldPresets=['operations','countermodel','checkpoint'] as const;
export type WorldPreset=typeof worldPresets[number];
export const worldFigures=['world-inventory','world-membership','world-empty','world-drawings'] as const;
export type WorldFigure=typeof worldFigures[number];
export const isWorldFigure=(s:string):s is WorldFigure=>(worldFigures as readonly string[]).includes(s);
export interface WorldObject{id:string;color:'red'|'blue';sides:3|4}
export const eightObjects:readonly WorldObject[]=[{id:'a',color:'red',sides:3},{id:'b',color:'blue',sides:3},{id:'c',color:'red',sides:4},{id:'d',color:'blue',sides:4},{id:'e',color:'red',sides:3},{id:'f',color:'blue',sides:4},{id:'g',color:'red',sides:4},{id:'h',color:'blue',sides:3}];
export const worldSets={U:eightObjects.map(o=>o.id),R:eightObjects.filter(o=>o.color==='red').map(o=>o.id),T:eightObjects.filter(o=>o.sides===3).map(o=>o.id),S:eightObjects.filter(o=>o.sides===4).map(o=>o.id)};
export const worldOperations=['red','triangles','intersection','union','complement'] as const;
export type WorldOperation=typeof worldOperations[number];
export const worldTex:Record<WorldOperation,string>={red:'R',triangles:'T',intersection:String.raw`R\cap T`,union:String.raw`R\cup T`,complement:String.raw`U\setminus R`};
export function worldSelection(operation:WorldOperation){
 if(!(worldOperations as readonly string[]).includes(operation))throw new RangeError('Unknown set operation');
 const sets=finiteSets(worldSets.R,worldSets.T),selected=operation==='red'?sets.left:operation==='triangles'?sets.right:operation==='intersection'?sets.intersection:operation==='union'?sets.union:worldSets.U.filter(id=>!sets.left.includes(id));
 return worldSets.U.filter(id=>selected.includes(id));
}
export const setTex=(ids:readonly string[])=>ids.length?String.raw`\{${ids.join(',')}\}`:String.raw`\varnothing`;
export function counterWorld(includeRedSquare:boolean){
 if(typeof includeRedSquare!=='boolean')throw new TypeError('Boolean world choice required');
 const objects:WorldObject[]=[{id:'p',color:'red',sides:3},{id:'q',color:'red',sides:3},{id:'s',color:'blue',sides:4},...(includeRedSquare?[{id:'r',color:'red',sides:4} as const]:[])];
 return {objects,...worldClaims(objects)};
}
export function worldClaims(objects:readonly WorldObject[]){
 if(new Set(objects.map(o=>o.id)).size!==objects.length||objects.some(o=>!['red','blue'].includes(o.color)||![3,4].includes(o.sides)))throw new Error('Invalid world objects');
 const red=objects.filter(o=>o.color==='red').map(o=>o.id),squares=objects.filter(o=>o.sides===4).map(o=>o.id),intersection=finiteSets(red,squares).intersection;
 return {premise:objects.every(o=>evaluate('implication',o.sides===3,o.color==='red')),conclusion:intersection.length===0,counterexamples:intersection};
}
export const worldAnswers=[1,0,1] as const;
export function worldAnswer(question:number,answer:number|null){
 if(!Number.isInteger(question)||question<0||question>2)throw new RangeError('Unknown question');
 if(answer===null)return null;
 if(!Number.isInteger(answer)||answer<0||answer>=(question===2?2:3))throw new RangeError('Unknown answer');
 return answer===worldAnswers[question];
}
export interface WorldState{operation:WorldOperation;includeRedSquare:boolean;answers:[number|null,number|null,number|null]}
export const initialWorldState=():WorldState=>({operation:'intersection',includeRedSquare:false,answers:[null,null,null]});
