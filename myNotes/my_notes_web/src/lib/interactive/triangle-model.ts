export const trianglePresets=['puzzle','side','challenge'] as const;
export type TrianglePreset=typeof trianglePresets[number];
export const triangleFigures=['triangle-empty','triangle-initial','triangle-exchange','triangle-diagnosis','triangle-polya','triangle-roles','triangle-representation','triangle-one-side','triangle-dependence','triangle-relax','triangle-counting','triangle-invariant','triangle-corner-nine','triangle-partial','triangle-solution','triangle-learning','triangle-challenge','triangle-impossible','triangle-next','triangle-progress'] as const;
export type TriangleFigure=typeof triangleFigures[number];
export const isTriangleFigure=(s:string):s is TriangleFigure=>(triangleFigures as readonly string[]).includes(s);
export type Piece=number|null;
export const slotNames=['a','b','c','x','y','z'] as const;
export const trianglePoints=[[250,55],[70,375],[430,375],[160,215],[340,215],[250,375]] as const;
export const sideSlots=[[0,3,1],[0,4,2],[1,5,2]] as const;
export const incidence=[2,2,2,1,1,1] as const;
export const firstAttempt=[1,2,3,4,5,6] as const;
export const balancedAttempt=[1,2,3,6,5,4] as const;
export const solvedAttempt=[1,3,5,6,4,2] as const;
function corner(n:number){if(!Number.isInteger(n)||n<1||n>6)throw new Error('Corner must be 1–6');}
function piece(n:Piece){if(n!==null)corner(n);}
function slots(v:readonly Piece[]){if(v.length!==6)throw new Error('Six slots required');v.forEach(piece);}
function target(n:number){if(!Number.isInteger(n)||n<1||n>18)throw new Error('Use a positive side sum up to 18');}
export function triangleState(v:readonly Piece[],sum=10){slots(v);target(sum);const complete=v.every((n):n is number=>n!==null),sums=sideSlots.map(ids=>ids.some(i=>v[i]===null)?null:ids.reduce<number>((a,i)=>a+v[i]!,0)),unique=new Set(v.filter(n=>n!==null)).size===v.filter(n=>n!==null).length,equal=complete&&sums[0]===sums[1]&&sums[1]===sums[2],corners=v.slice(0,3).some(n=>n===null)?null:v[0]!+v[1]!+v[2]!,total=complete?v.reduce<number>((a,n)=>a+n!,0):null;return {values:[...v],sum,complete,unique,sums,equal,corners,total,solved:complete&&unique&&sums.every(n=>n===sum),remaining:[1,2,3,4,5,6].filter(n=>!v.includes(n))};}
export function assignPiece(v:readonly Piece[],index:number,next:Piece){slots(v);piece(next);if(!Number.isInteger(index)||index<0||index>5)throw new Error('Unknown position');if(!triangleState(v).unique)throw new Error('Placement starts with distinct pieces');const result=[...v],previous=result[index];if(next!==null){const occupied=result.indexOf(next);if(occupied>=0&&occupied!==index)result[occupied]=previous;}result[index]=next;return result;}
export function sideRequirement(a:number,b:number,sum=10){corner(a);corner(b);target(sum);if(a===b)throw new Error('Distinct corners required');const middle=sum-a-b;return {a,b,sum,middle,available:Number.isInteger(middle)&&middle>=1&&middle<=6&&middle!==a&&middle!==b};}
export function cornerCompletion(a:number,b:number,c:number,sum=10){[a,b,c].forEach(corner);target(sum);if(new Set([a,b,c]).size!==3)throw new Error('Distinct corners required');const values=[a,b,c,sum-a-b,sum-a-c,sum-b-c],inRange=values.every(n=>n>=1&&n<=6),unique=new Set(values).size===6;return {values,cornerSum:a+b+c,requiredCornerSum:3*sum-21,necessary:a+b+c===3*sum-21,valid:inRange&&unique};}
export function strategyChoice(n:number|null){if(n!==null&&(!Number.isInteger(n)||n<0||n>2))throw new Error('Unknown strategy');return n;}
export const initialTriangleState=()=>({values:Array<Piece>(6).fill(null),side:2,choice:null as number|null});
