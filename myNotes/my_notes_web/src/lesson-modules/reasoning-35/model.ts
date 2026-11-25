/** AoR 35's explicit fictional populations. No DOM, copy or shared mutable state. */
export const population=Array.from({length:100},(_,i)=>({id:i+1,blue:i<60}));
export const openingSample=[1,61,2,3,62,4,5,63,6,7];
export const illustrativeCounts=[7,5,8,6,4,6];
export const schematicSamples=[{n:10,counts:[3,4,4,5,5,5,6,6,6,6,7,7,7,8,9]},{n:50,counts:[22,24,26,27,28,29,30,30,31,32,33,34,36]},{n:80,counts:[43,45,46,47,48,48,49,50,51,52]}];
export const sampleSizes=[10,50,80] as const;
export const maxDraws=12;
export function integer(n:number,min:number,max:number){if(!Number.isSafeInteger(n)||n<min||n>max)throw new RangeError('Integer outside the model bounds');return n;}
export function rateInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=0&&n<=100?n:null;}
export function sampleSummary(ids:readonly number[]){if(!ids.length||ids.length>100||new Set(ids).size!==ids.length)throw new Error('A nonempty sample without repeated objects is required');ids.forEach(id=>integer(id,1,100));const blue=ids.filter(id=>id<=60).length;return {n:ids.length,blue,purple:ids.length-blue,proportion:blue/ids.length};}
export function uniformSample(n:number,random:()=>number){integer(n,1,100);const pool=population.map(x=>x.id);for(let i=0;i<n;i++){const u=random();if(!Number.isFinite(u)||u<0||u>=1)throw new RangeError('Random variate must lie in [0,1)');const j=i+Math.floor(u*(pool.length-i));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,n);}
export function poll(shortRate:number,longRate:number){integer(shortRate,0,100);integer(longRate,0,100);const short=600*shortRate,long=400*longRate,total=short+long;return {short,long,total,shortShare:total?short/total:null,longShare:total?long/total:null,error:total?100*(short/total-.6):null};}
export const probabilityCases=['equal','after-blue','after-purple','weighted'] as const;
export type ProbabilityCase=typeof probabilityCases[number];
export function probabilityModel(kind:ProbabilityCase){if(!(probabilityCases as readonly string[]).includes(kind))throw new Error('Unknown probability model');const removed=kind==='after-blue'?1:kind==='after-purple'?7:null;const outcomes=Array.from({length:10},(_,i)=>({id:i+1,blue:i<6,weight:kind==='weighted'&&i<6?2:1})).filter(o=>o.id!==removed);const blue=outcomes.filter(o=>o.blue),weight=outcomes.reduce((s,o)=>s+o.weight,0),blueWeight=blue.reduce((s,o)=>s+o.weight,0);return {outcomes,removed,blueCount:blue.length,purpleCount:outcomes.length-blue.length,totalWeight:weight,blueWeight,purpleWeight:weight-blueWeight,p:blueWeight/weight,complement:(weight-blueWeight)/weight,equal:kind!=='weighted'};}
export type Design='a'|'b'|'c';export type Target='all'|'math';
export function designState(design:Design,target:Target){if(!['a','b','c'].includes(design)||!['all','math'].includes(target))throw new Error('Unknown survey design/target');return {design,target,size:{a:8000,b:500,c:800}[design],probabilitySelection:design!=='a',stratified:design==='c',mathSubgroupKnown:false};}
export function initialState(){return {n:10,ids:[...openingSample],history:[] as number[],revealed:false,shortRate:10,longRate:60,probability:'equal' as ProbabilityCase,design:'a' as Design,target:'all' as Target,evaluated:false};}
/** Exact finite-population probabilities, used to verify the sampling implementation's model. */
export function choose(n:number,k:number){integer(n,0,100);if(!Number.isSafeInteger(k)||k<0||k>n)return 0n;let value=1n;for(let i=1;i<=Math.min(k,n-k);i++)value=value*BigInt(n-i+1)/BigInt(i);return value;}
export function countDistribution(n:number){integer(n,1,100);const denominator=choose(100,n);return Array.from({length:Math.min(60,n)-Math.max(0,n-40)+1},(_,i)=>{const k=Math.max(0,n-40)+i;return {k,mass:choose(60,k)*choose(40,n-k),denominator};});}
