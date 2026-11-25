export type NodeKind='report'|'origin'|'method';
export interface EvidenceNode {id:string;kind:NodeKind;relies:string[]}
export type Scenario='separate'|'calibration'|'copied';
export type Source='hydrologist'|'fisher'|'company'|'technician';
export type Question='measurement'|'mechanism'|'noise';
export const sources:Source[]=['hydrologist','fisher','company','technician'];
export const questions:Question[]=['measurement','mechanism','noise'];
export function integer(raw:string,min:number,max:number){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=min&&n<=max?n:null;}
export function publicationNetwork(count=10):EvidenceNode[]{
 if(!Number.isInteger(count)||count<1||count>10)throw new Error('1..10 publications required');
 return [...Array.from({length:count},(_,i)=>({id:`P${i+1}`,kind:'report' as const,relies:[i%2===0?'L':'N']})),{id:'L',kind:'report',relies:['R']},{id:'N',kind:'report',relies:['R']},{id:'R',kind:'report',relies:['M']},{id:'M',kind:'origin',relies:[]}];
}
export const workshop:EvidenceNode[]=[
 {id:'A',kind:'report',relies:['M']},{id:'B',kind:'report',relies:['A']},{id:'C',kind:'report',relies:['B']},
 {id:'D',kind:'report',relies:['U']},{id:'E',kind:'report',relies:['D']},{id:'F',kind:'report',relies:['A','D']},{id:'G',kind:'report',relies:['S']},
 {id:'M',kind:'origin',relies:[]},{id:'U',kind:'origin',relies:[]},{id:'S',kind:'origin',relies:[]},
];
export function validateNetwork(nodes:EvidenceNode[]){
 const map=new Map(nodes.map(n=>[n.id,n]));if(map.size!==nodes.length)throw new Error('Unique node identities required');
 for(const n of nodes)if(!n.id||!['report','origin','method'].includes(n.kind)||new Set(n.relies).size!==n.relies.length||n.relies.some(id=>!map.has(id)))throw new Error('Valid typed nodes and dependencies required');
 const active=new Set<string>(),done=new Set<string>();
 function visit(id:string){if(active.has(id))throw new Error('Cyclic provenance is not an established origin');if(done.has(id))return;active.add(id);for(const next of map.get(id)!.relies)visit(next);active.delete(id);done.add(id);}
 nodes.forEach(n=>visit(n.id));return map;
}
export function traceOrigins(nodes:EvidenceNode[],ids:string[]){
 const map=validateNetwork(nodes),seen=new Set<string>(),origins=new Set<string>();
 function visit(id:string){const node=map.get(id);if(!node)throw new Error('Unknown source');if(seen.has(id))return;seen.add(id);if(node.kind==='origin')origins.add(id);node.relies.forEach(visit);}
 ids.forEach(visit);return [...origins].sort();
}
export function investigationNetwork(scenario:Scenario):EvidenceNode[]{
 if(!['separate','calibration','copied'].includes(scenario))throw new Error('Unknown investigation scenario');
 const shared=scenario==='calibration';return [
  {id:'gauge',kind:'origin',relies:shared?['reference']:[]},
  {id:'survey',kind:scenario==='copied'?'report':'origin',relies:scenario==='copied'?['gauge']:shared?['reference']:[]},
  {id:'sensor',kind:'origin',relies:shared?['reference']:[]},
  ...(shared?[{id:'reference',kind:'method' as const,relies:[]}]:[]),
 ];
}
export function detection(sensitivity:number){if(!Number.isInteger(sensitivity)||sensitivity<0||sensitivity>100)throw new Error('Integer sensitivity 0..100 required');return {found:sensitivity,missed:100-sensitivity};}
// Explicit optional extension: H is ball present; q=P(no detection | not H).
export function negativeUpdate(prior:number,sensitivity:number,q:number){
 for(const p of [prior,sensitivity,q])if(!Number.isFinite(p)||p<0||p>1)throw new Error('Probabilities in [0,1] required');
 const a=prior*(1-sensitivity),b=(1-prior)*q,total=a+b;return {likelihood:1-sensitivity,ratio:q===0?null:(1-sensitivity)/q,posterior:total===0?null:a/total};
}
export function profile(source:Source,question:Question){
 if(!sources.includes(source)||!questions.includes(question))throw new Error('Known source and claim required');
 const expertise=source==='hydrologist'||source==='technician'?'established':'uncertain';
 const access=source==='hydrologist'?'uncertain':'established';
 return {expertise,access,incentives:source==='company'?'concerning':'uncertain',record:source==='technician'?'established':'uncertain',source,question};
}
export function initialState(){return {count:5,stage:0,scenario:'separate' as Scenario,source:'hydrologist' as Source,question:'measurement' as Question,sensitivity:90,prior:50,posterior:false,workshopAnswer:null as number|null,revealed:false};}
