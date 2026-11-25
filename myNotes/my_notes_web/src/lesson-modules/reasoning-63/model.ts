export type Stage='square'|'rectangles'|'pairs';
export const stages:Stage[]=['square','rectangles','pairs'];
export const limits={explore:{min:-19,max:19,initial:9,step:2},consecutive:{min:-6,max:6,initial:3,step:1},geometry:{min:0,max:6,initial:3,step:1},layers:{min:0,max:6,initial:3,step:1}} as const;
export type NumericPreset=keyof typeof limits;
export function integer(n:number){if(!Number.isSafeInteger(n))throw new Error('Expected a safe integer');return n;}
export function validValue(p:NumericPreset,n:number){const b=limits[p];if(!b||!Number.isSafeInteger(n)||n<b.min||n>b.max||(n-b.min)%b.step!==0)throw new Error('Outside the activity domain');return n;}
export function normalize(p:NumericPreset,raw:number,previous:number){validValue(p,previous);if(!Number.isFinite(raw))return previous;const b=limits[p];return Math.max(b.min,Math.min(b.max,b.min+Math.round((raw-b.min)/b.step)*b.step));}
export function oddSquare(n:number){integer(n);if(Math.abs(n)>1000000||n%2===0)throw new Error('Expected an odd integer');const k=(n-1)/2,m=k*(k+1)/2||0;return {n,k,m,square:n*n,quotient:Math.floor(n*n/8),remainder:n*n%8};}
export function consecutive(k:number){integer(k);if(Math.abs(k)>1000000)throw new Error('Parameter too large');return {k,next:k+1,even:k%2===0?k:k+1,product:k*(k+1),m:k*(k+1)/2};}
export type Tile={id:string;r:number;c:number;region:number;ring:number};
export type Pair={tiles:[Tile,Tile];region:number;index:number};
export function geometry(k:number){validValue('geometry',k);const n=2*k+1,tiles:Tile[]=[],rectangles:Tile[][]=[[],[],[],[]];
 for(let r=0;r<n;r++)for(let c=0;c<n;c++){const region=r===k&&c===k?-1:r<k&&c<=k?0:c>k&&r<=k?1:r>k&&c>=k?2:3;const tile={id:`${r}-${c}`,r,c,region,ring:Math.max(Math.abs(r-k),Math.abs(c-k))};tiles.push(tile);if(region>=0)rectangles[region].push(tile);}
 const pairs:Pair[][]=rectangles.map((rectangle,region)=>{
  if(!rectangle.length)return [];const minR=Math.min(...rectangle.map(t=>t.r)),minC=Math.min(...rectangle.map(t=>t.c)),width=Math.max(...rectangle.map(t=>t.c))-minC+1,height=Math.max(...rectangle.map(t=>t.r))-minR+1,lookup=new Map(rectangle.map(t=>[t.id,t])),result:Pair[]=[];
  for(let r=0;r<height;r+=width%2===0?1:2)for(let c=0;c<width;c+=width%2===0?2:1){const first=lookup.get(`${minR+r}-${minC+c}`)!,second=lookup.get(`${minR+r+(width%2===0?0:1)}-${minC+c+(width%2===0?1:0)}`)!;result.push({tiles:[first,second],region,index:result.length});}return result;
 });
 const groups=pairs[0].map((_,i)=>pairs.flatMap(p=>p[i].tiles));return {k,n,tiles,rectangles,pairs,groups,center:tiles.find(t=>t.region===-1)!,m:k*(k+1)/2};
}
export function ringCounts(k:number){validValue('layers',k);return Array.from({length:k+1},(_,j)=>j===0?1:8*j);}
export const correctAssessments=[1,2,1,0] as const;
export function assessment(index:number,choice:number){if(!Number.isInteger(index)||index<0||index>3||!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Unknown assessment');return choice===correctAssessments[index];}
export const hintLimit=3,draftLimit=12000;
export function nextHint(n:number){if(!Number.isInteger(n)||n<0||n>hintLimit)throw new Error('Unknown hint');return Math.min(hintLimit,n+1);}
