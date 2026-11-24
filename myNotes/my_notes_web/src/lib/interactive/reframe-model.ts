/** Discrete object identities and exact counting, independent of SVG/controller code. */
export const reframePresets=['construction','rows','handshakes'] as const;
export type ReframePreset=typeof reframePresets[number];
export const reframeFigures=['reframe-expression','reframe-objects','reframe-forms','reframe-growth','reframe-compare','reframe-challenge','reframe-copy','reframe-rotate','reframe-rectangle','reframe-half','reframe-row','reframe-accounting','reframe-overlap','reframe-methods','reframe-radial','reframe-network','reframe-table','reframe-synthesis','reframe-process'] as const;
export type ReframeFigure=typeof reframeFigures[number];
export const isReframeFigure=(s:string):s is ReframeFigure=>(reframeFigures as readonly string[]).includes(s);
function whole(n:number,min:number,max:number){if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(`Integer ${min}–${max} required`);return n;}
export function size(n:number){return whole(n,1,10);}
export function reframeInput(raw:string,max=10){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=1&&n<=max?n:null;}
export function sumTo(n:number){whole(n,0,1000000);return n*(n+1)/2;}
export function handshakeCount(n:number){whole(n,1,1000000);return n*(n-1)/2;}
export function triangleCells(n:number){size(n);return Array.from({length:n},(_,r)=>Array.from({length:r+1},(_,c)=>({r,c,id:`${r}-${c}`}))).flat();}
export function transformedCells(n:number,stage:number){size(n);whole(stage,0,3);const cells=triangleCells(n),original=cells.map(p=>({...p,group:'original' as const,id:'original-'+p.id}));if(stage===0)return original;
 const copy=cells.map(p=>({id:'copy-'+p.id,group:'copy' as const,r:stage>=2?n-1-p.r:p.r,c:(stage>=2?n-p.c:p.c)+(stage<3?n+3:0)}));return [...original,...copy];}
export function rowState(n:number,k:number){size(n);whole(k,1,n);return {n,k,original:k,copy:n+1-k,total:n+1,triangle:sumTo(n),rectangle:n*(n+1)};}
export function overlapCells(n:number){size(n);const original=triangleCells(n).map(p=>({...p,group:'original',id:'original-'+p.id})),copy=triangleCells(n).map(p=>({r:n-1-p.r,c:n-1-p.c,id:'copy-'+p.id,group:'copy'}));return [...original,...copy];}
export function handshakeCells(n:number){size(n);return Array.from({length:n*n},(_,q)=>{const r=Math.floor(q/n),c=q%n;return {r,c,kind:(r===c?'diagonal':r>c?'representative':'mirror') as 'diagonal'|'representative'|'mirror',pair:r===c?null:[Math.min(r,c),Math.max(r,c)]};});}
export function handshakePairs(n:number){return handshakeCells(n).filter(p=>p.kind==='representative').map(p=>[p.c,p.r] as const);}
export function person(raw:string,n:number){size(n);if(raw==='')return null;const p=Number(raw);return Number.isInteger(p)&&p>=0&&p<n?p:null;}
export function pairState(n:number,a:number|null,b:number|null){size(n);for(const p of [a,b])if(p!==null)whole(p,0,n-1);return {n,a,b,selected:a!==null&&b!==null,excluded:a!==null&&a===b,cells:n*n,diagonal:n,ordered:n*(n-1),pairs:handshakeCount(n)};}
export function initialReframeState(preset:ReframePreset){if(!(reframePresets as readonly string[]).includes(preset))throw new Error('Unknown reframe preset');return {n:preset==='rows'?6:5,k:1,stage:0,a:null as number|null,b:null as number|null};}
