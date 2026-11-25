/** Exact finite search supplies positive witnesses only. A failed search is not a lesson proof. */
export function representations(n:number):number[][] {
 if(!Number.isSafeInteger(n)||n<1||n>10000)throw new RangeError('Expected an integer from 1 to 10000');
 const found:number[][]=[];
 for(let r=2;r*(r+1)/2<=n;r++){
  const a=(n-r*(r-1)/2)/r;
  if(Number.isInteger(a)&&a>=1)found.push(Array.from({length:r},(_,i)=>a+i));
 }
 return found;
}
export const oddStatement={en:'Every odd integer greater than one is the sum of two consecutive positive integers.',de:'Jede ungerade ganze Zahl größer als eins ist die Summe zweier aufeinanderfolgender positiver ganzer Zahlen.'};
export type EvidenceStatus='found'|'excluded'|'unknown';
export function evidence(n:number):EvidenceStatus {
 if(n<1||n>20||!Number.isInteger(n))throw new RangeError('Evidence board: 1–20');
 if(n<=2)return 'excluded';
 return representations(n).length?'found':'unknown';
}
export function oddParts(k:number){
 if(!Number.isInteger(k)||k<1||k>10)throw new RangeError('Expected k from 1 to 10');
 return {left:k,right:k+1,total:2*k+1};
}
export function readK(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=1&&n<=10?n:null;}
export function step(current:number,direction:number){return Math.max(0,Math.min(3,current+direction));}
export function caseBound(n:number){if(!Number.isSafeInteger(n)||n<1||n>10000)throw new RangeError('Invalid target');let r=1;while((r+1)*(r+2)/2<=n)r++;return r;}
