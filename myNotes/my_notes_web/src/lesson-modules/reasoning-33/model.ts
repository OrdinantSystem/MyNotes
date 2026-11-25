export const duration=20;
export const blueTracks=[{cross:1.5,period:8},{cross:3,period:8},{cross:4.5,period:10},{cross:6,period:10},{cross:7.5,period:10}] as const;
export function time(value:number){if(!Number.isFinite(value))throw new Error('Finite time required');return Math.max(0,Math.min(duration,value));}
export function scene(value:number){
 const t=time(value);
 const circles=Array.from({length:12},(_,i)=>{
  const blue=i<5,track=blueTracks[i];
  const phase=blue?2*Math.PI*(t-track.cross)/track.period:2*Math.PI*t/(9+i)+i;
  return {id:i,blue,x:500+340*Math.sin(phase),y:75+i*39+28*Math.sin(t*.65+i*1.7)};
 });
 return {t,circles,diamond:t>=8&&t<=13?{x:-50+1100*(t-8)/5,y:480-400*(t-8)/5}:null};
}
export function crossings(value=duration){const t=time(value);return blueTracks.flatMap((b,i)=>{const out=[];for(let at=b.cross;at<=t;at+=b.period)out.push({id:i,at});return out;}).sort((a,b)=>a.at-b.at);}
export function countInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=0&&n<=100?n:null;}
export const transactions=[{id:'001',a:3,b:4,total:7},{id:'002',a:6,b:2,total:9},{id:'003',a:5,b:3,total:8},{id:'004',a:4,b:5,total:9}] as const;
export const consecutiveIds=()=>transactions.every((r,i)=>Number(r.id)===i+1);
export const arithmeticErrors=()=>transactions.filter(r=>r.a+r.b!==r.total);
export const answers=[0,0,1,2,0,2] as const;
export function classify(values:(number|null)[]){if(values.length!==6||values.some(x=>x!==null&&(!Number.isInteger(x)||x<0||x>2)))throw new Error('Six bounded classifications required');return values.map((value,i)=>({answered:value!==null,correct:value===answers[i]}));}
export function nonDetectionModels(){return [{exists:false,detected:false},{exists:true,detected:false}];}
