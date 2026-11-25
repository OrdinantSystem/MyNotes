/** Finite states for AoR 29. No DOM, layout, copy, or global mutable state. */
export type Counts=[number,number,number];
export const transfers=[[0,1],[1,0],[1,2],[2,1]] as const;
export function integer(n:number,min:number,max:number){if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error('Integer outside model bounds');return n;}
export function containers(values:readonly number[]):Counts{if(values.length!==3)throw new Error('Three containers required');values.forEach(n=>integer(n,0,12));if(values.reduce((a,b)=>a+b,0)!==12)throw new Error('Exactly twelve objects required');return [...values] as Counts;}
export function transfer(values:Counts,from:number,to:number):Counts{const next=containers(values);if(!transfers.some(([a,b])=>a===from&&b===to)||!next[from])throw new Error('Illegal transfer');next[from]--;next[to]++;return next;}
export function boardCounts(k:number){integer(k,0,30);return {placed:k,light:32-k,dark:30-k,difference:2};}
export function remove(history:readonly number[],amount:number){if(!history.length||history[0]!==12)throw new Error('Removal starts at twelve');history.forEach((n,i)=>{integer(n,0,12);if(i&&![1,2].includes(history[i-1]-n))throw new Error('Illegal removal history');});if(![1,2].includes(amount)||history.at(-1)!<amount)throw new Error('Illegal removal');return [...history,history.at(-1)!-amount];}
export type Face='H'|'T';
export function coinState(coins:readonly Face[]){if(coins.length!==5||coins.some(c=>c!=='H'&&c!=='T'))throw new Error('Five coin faces required');const tails=coins.filter(c=>c==='T').length;return {heads:5-tails,tails,parity:tails%2};}
export function flip(coins:readonly Face[],selected:readonly number[],rule:number):Face[]{coinState(coins);if(![2,3].includes(rule)||selected.length!==rule||new Set(selected).size!==rule)throw new Error('Select exactly the permitted number of distinct coins');selected.forEach(i=>integer(i,0,4));return coins.map((c,i)=>selected.includes(i)?c==='H'?'T':'H':c);}
export function initialState(){return {containers:[5,3,4] as Counts,moves:0,placed:0,history:[12],coins:['H','H','H','H','H'] as Face[],selected:[] as number[],coinMoves:0,rule:2,start:0};}
export const obstruction=[[1,0],[0,1],[1,1],[2,1],[3,1],[2,2]] as const;
export const isDark=(x:number,y:number)=>(x+y)%2===0;
export function neighbors(cell:readonly number[],cells:readonly (readonly number[])[]){return cells.filter(c=>Math.abs(c[0]-cell[0])+Math.abs(c[1]-cell[1])===1);}
export function inversionCount(values:readonly number[]){return values.reduce((sum,x,i)=>sum+values.slice(i+1).filter(y=>x>y).length,0);}
export function gcd(a:number,b:number):number{integer(a,0,10000);integer(b,0,10000);while(b){[a,b]=[b,a%b];}return a;}
