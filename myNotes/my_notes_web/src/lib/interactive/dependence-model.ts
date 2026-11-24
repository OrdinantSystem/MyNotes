import {relationSummary,quantify} from './analysis-model.ts';
export const dependencePresets=['network','students'] as const;
export type DependencePreset=typeof dependencePresets[number];
export const dependenceFigures=['quantifier-symbols','dependent-choices','quantifier-orders','real-choices','quantifier-negation','existence-counts','citation-witnesses'] as const;
export type DependenceFigure=typeof dependenceFigures[number];
export const isDependenceFigure=(value:string):value is DependenceFigure=>(dependenceFigures as readonly string[]).includes(value);
export const people=['Alice','Ben','Clara'] as const;
export const letters=['A','B','C'] as const;
export const networkModes=['cycle','shared'] as const;
export type NetworkMode=typeof networkModes[number];
export function personIndex(value:number){if(!Number.isInteger(value)||value<0||value>2)throw new RangeError('Person index must be 0, 1 or 2');return value;}
export function networkRelation(mode:NetworkMode):boolean[][]{
 if(!(networkModes as readonly string[]).includes(mode))throw new RangeError('Unknown acquaintance network');
 return [0,1,2].map(x=>[0,1,2].map(y=>y===(mode==='cycle'?(x+1)%3:1)));
}
export function networkState(mode:NetworkMode,selected:number){
 personIndex(selected);const cells=networkRelation(mode),summary=relationSummary(cells,3),witness=cells[selected].findIndex(Boolean);
 return {cells,selected,witness,...summary};
}
export function studentState(includeLea:boolean){
 if(typeof includeLea!=='boolean')throw new TypeError('Boolean student selection required');
 const cells=[[true,false,false],[false,true,false],...(includeLea?[[false,false,false]]:[])];
 return {cells,names:['Maria','Noah',...(includeLea?['Lea']:[])],...relationSummary(cells,3)};
}
export const citationRelation=[[true,false,false],[false,true,false],[false,false,true]];
export const citationSummary=relationSummary(citationRelation,3);
export const acquaintanceCounts=[0,1,2].map(n=>({n,...quantify(Array.from({length:n},()=>true))}));
export const dependenceTex={separate:String.raw`\forall x\;\exists y\;K(x,y)`,common:String.raw`\exists y\;\forall x\;K(x,y)`,students:String.raw`\forall s\;\exists p\;S(s,p)`,negatedStudents:String.raw`\exists s\;\forall p\;\neg S(s,p)`,books:String.raw`\forall b\;\exists s\;C(b,s)`,sharedSource:String.raw`\exists s\;\forall b\;C(b,s)`};
export const initialDependenceState=()=>({mode:'cycle' as NetworkMode,selected:2,includeLea:false});
