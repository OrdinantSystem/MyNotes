export const people=['A','B','C','D','E'] as const;
export const edges=[['A','B'],['A','C'],['A','D'],['B','C'],['D','E']] as const;
export const auditRows={A:['AB','AC','AD'],B:['BC','BD'],C:['AC','CD'],D:['AD','BD','CD']};
export const incidences=edges.flatMap(([a,b])=>[{id:`${a}${b}-${a}`,person:a,edge:`${a}${b}`},{id:`${a}${b}-${b}`,person:b,edge:`${a}${b}`}]);
export const degrees=people.map(p=>incidences.filter(i=>i.person===p).length);
export function integer(raw:unknown,min:number,max:number){if(typeof raw!=='string'||!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=min&&n<=max?n:null;}
export function distribution(n:number,k:number){if(!Number.isSafeInteger(n)||!Number.isSafeInteger(k)||n<0||n>60||k<1||k>12)throw new Error('Invalid distribution');const counts=Array.from({length:k},(_,i)=>Math.floor(n/k)+(i<n%k?1:0));return {counts,bound:Math.ceil(n/k)};}
export function months(placed:number){if(!Number.isInteger(placed)||placed<0||placed>13)throw new Error('Invalid placement');return {counts:Array.from({length:12},(_,i)=>Number(placed>i)+Number(i===0&&placed===13)),placed,collision:placed===13};}
export function tokenGroups(group:string){if(group==='edge')return edges.map(([a,b])=>({label:`${a}${b}`,tokens:incidences.filter(i=>i.edge===`${a}${b}`)}));if(group==='person')return people.map(p=>({label:p,tokens:incidences.filter(i=>i.person===p)}));throw new Error('Invalid grouping');}
export function multiplicities(){return ['AB','AC','AD','BC','BD','CD'].map(edge=>({edge,count:Object.values(auditRows).flat().filter(e=>e===edge).length}));}
export function completeGraph(n:number){if(!Number.isInteger(n)||n<1||n>10)throw new Error('Invalid graph size');return Array.from({length:n},(_,a)=>Array.from({length:n-a-1},(_,b)=>[a,a+b+1] as const)).flat();}
