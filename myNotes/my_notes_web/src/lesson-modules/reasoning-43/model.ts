export type Preparation='well'|'poor';
export type Group='all'|Preparation;
export const cells=[{prep:'well',study:1,n:8,mean:80},{prep:'well',study:3,n:2,mean:90},{prep:'poor',study:1,n:2,mean:50},{prep:'poor',study:3,n:8,mean:60}] as const;
export function students(){return cells.flatMap((c,i)=>Array.from({length:c.n},(_,j)=>({id:`student-${i}-${j}`,prep:c.prep,study:c.study,cellMean:c.mean})));}
export function comparison(group:Group){if(!['all','well','poor'].includes(group))throw new Error('Unknown preparation group');const rows=students().filter(s=>group==='all'||s.prep===group);const groups=[1,3].map(study=>{const items=rows.filter(s=>s.study===study);return {study,n:items.length,mean:items.reduce((sum,s)=>sum+s.cellMean,0)/items.length,items};});return {groups,difference:groups[1].mean-groups[0].mean};}
export type Edge=readonly [string,string];
export function validateDAG(nodes:string[],edges:readonly Edge[]){if(new Set(nodes).size!==nodes.length)throw new Error('Duplicate node');const seen=new Set<string>();for(const [a,b] of edges){if(!nodes.includes(a)||!nodes.includes(b)||a===b||seen.has(`${a}:${b}`))throw new Error('Invalid edge');seen.add(`${a}:${b}`);}const active=new Set<string>(),done=new Set<string>();function visit(n:string){if(active.has(n))throw new Error('Directed cycle');if(done.has(n))return;active.add(n);for(const [a,b] of edges)if(a===n)visit(b);active.delete(n);done.add(n);}nodes.forEach(visit);return true;}
export function intervened(edges:readonly Edge[],variable:string){return edges.filter(([,b])=>b!==variable);}
export const causalEdges:Edge[]=[['P','S'],['P','Y'],['S','Y']];
export function selection(selected=false){const all=[0,1].flatMap(x=>[0,1].map(y=>({x,y,z:Number(Boolean(x||y))}))),rows=all.filter(r=>!selected||r.z===1);const probability=(x:number)=>{const denominator=rows.filter(r=>r.x===x);return denominator.filter(r=>r.y===1).length/denominator.length;};return {all,rows,p0:probability(0),p1:probability(1)};}
export const firePoints=Array.from({length:18},(_,i)=>({firefighters:i+2,damage:10+4*i+[0,2,-4,3,-2,5,0,-3,4,-2,3,5,-1,4,-3,3,6,0][i]}));
