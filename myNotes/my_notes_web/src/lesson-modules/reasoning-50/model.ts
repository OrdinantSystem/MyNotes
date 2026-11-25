export type Mode='chain'|'foundation'|'network';
export const modes:Mode[]=['chain','foundation','network'];
export const rainIds=['rain','street','vision','reliability','roofs','neighbor','station','soil','rule','past'] as const;
export type NodeId=typeof rainIds[number];
export type Edge=readonly [NodeId,NodeId];
export const rainChain:NodeId[]=['rain','street','vision','reliability'];
export function architecture(mode:Mode,depth=1):{nodes:NodeId[];edges:Edge[];open:boolean}{
 if(!modes.includes(mode)||!Number.isInteger(depth)||depth<1||depth>4)throw new Error('Invalid architecture');
 if(mode==='chain'){const nodes=rainChain.slice(0,depth);return {nodes,edges:nodes.slice(1).map((id,i)=>[id,nodes[i]] as const),open:true};}
 if(mode==='foundation')return {nodes:['rain','street','vision','rule','past'],edges:[['vision','street'],['street','rain'],['past','rule'],['rule','rain']],open:false};
 return {nodes:['rain','street','roofs','neighbor','station','soil'],edges:[['street','rain'],['roofs','rain'],['neighbor','rain'],['station','rain'],['soil','rain']],open:false};
}
export function sourceState(revealed:boolean){return {publications:5,knownOrigins:revealed?1:null,copiedFrom:revealed?[0,0,0,0,0]:null};}
export const shafts={x1:105,x2:495,ys:[70,190]} as const;
export function illusionGeometry(){return shafts.ys.map(y=>({x1:shafts.x1,x2:shafts.x2,y,length:shafts.x2-shafts.x1}));}
export type Role='observation'|'inference'|'testimony'|'assumption';
export const roles:Role[]=['observation','inference','testimony','assumption'];
export const expected:Role[]=['observation','inference','testimony','assumption'];
export function classify(index:number,role:Role):'fit'|'conditional'|'reconsider'{if(!Number.isInteger(index)||index<0||index>3||!roles.includes(role))throw new Error('Invalid classification');return index===3&&role==='observation'?'conditional':expected[index]===role?'fit':'reconsider';}
export function answers(){return [null,null,null,null] as (Role|null)[];}
export type Point=readonly [number,number];
// Poincaré disk, baseline y=0 and external point (0,q). Circles orthogonal to unit boundary.
export function hyperbolicArc(cx:number,q=.45){
 if(!Number.isFinite(cx)||Math.abs(cx)>1||!Number.isFinite(q)||q<=0||q>=1)throw new Error('Invalid geodesic');
 const cy=(1+q*q)/(2*q),norm2=cx*cx+cy*cy,r=Math.sqrt(norm2-1),a=1/norm2,b=Math.sqrt(norm2-1)/norm2;
 const endpoints:Point[]=[[cx*a-cy*b,cy*a+cx*b],[cx*a+cy*b,cy*a-cx*b]];
 const start=Math.atan2(endpoints[0][1]-cy,endpoints[0][0]-cx),end=Math.atan2(endpoints[1][1]-cy,endpoints[1][0]-cx);
 let delta=end-start;while(delta>Math.PI)delta-=2*Math.PI;while(delta< -Math.PI)delta+=2*Math.PI;
 const points:Point[]=Array.from({length:65},(_,i)=>{const t=start+delta*i/64;return [cx+r*Math.cos(t),cy+r*Math.sin(t)];});
 return {cx,cy,r,q,endpoints,points};
}
export function sphereCircle(phi:number):Point[]{if(!Number.isFinite(phi))throw new Error('Invalid great circle');return Array.from({length:97},(_,i)=>{const t=i*2*Math.PI/96;return [Math.sin(t)*Math.cos(phi),Math.cos(t)*Math.sqrt(.91)-Math.sin(t)*Math.sin(phi)*.3];});}

export const workshopEdges=[['observation','inference'],['inference','belief'],['testimony','belief'],['assumption','inference'],['assumption','testimony']] as const;
