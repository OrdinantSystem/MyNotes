export interface Attendance {groups:number;size:number;capacity:number}
export type Improvement = 'original'|'distance'|'speed';
export const reference=():Attendance=>({groups:90,size:2.8,capacity:260});
export const groupBounds=[80,100] as const;
export const sizeBounds=[2.5,3] as const;
export function attendance(input:Attendance){
 const {groups,size,capacity}=input,units=Math.round(size*100);
 if(!Number.isInteger(groups)||groups<80||groups>100||!Number.isFinite(size)||units<250||units>300||Math.abs(units-size*100)>1e-8||!Number.isInteger(capacity)||capacity<0||capacity>400)throw new RangeError('Invalid attendance scenario.');
 // Integer hundredths avoid adding a chair at exact boundaries through floating-point error.
 const product=groups*units,chairs=Math.floor((product+99)/100);
 return {...input,projected:product/100,chairs,spare:Math.max(0,capacity-chairs),shortage:Math.max(0,chairs-capacity),enough:product<=capacity*100};
}
export function capacityStatus(capacity:number):'shortage'|'mixed'|'enough'{
 if(!Number.isInteger(capacity)||capacity<0||capacity>400)throw new RangeError('Invalid capacity.');
 return capacity<200?'shortage':capacity<300?'mixed':'enough';
}
export function boundary(capacity:number){
 capacityStatus(capacity);
 const start=Math.max(80,capacity/3),end=Math.min(100,capacity/2.5);
 if(start>end)return [];
 return Array.from({length:81},(_,i)=>{const g=start+(end-start)*i/80;return [g,capacity/g] as const;});
}
export const sensitivityGroups=[80,90,100] as const;
export const sensitivitySizes=[2.5,2.8,3] as const;
export function positiveProduct(a:readonly[number,number],b:readonly[number,number]){
 if([...a,...b].some(x=>!Number.isFinite(x)||x<=0)||a[0]>a[1]||b[0]>b[1])throw new RangeError('Ordered positive intervals required.');
 return [a[0]*b[0],a[1]*b[1]] as const;
}
export function quotient(d:readonly[number,number],v:readonly[number,number]){
 positiveProduct(d,v);
 return [d[0]/v[1],d[1]/v[0]] as const;
}
export function journey(mode:Improvement){
 if(!['original','distance','speed'].includes(mode))throw new RangeError('Unknown information scenario.');
 const d:readonly[number,number]=mode==='distance'?[195,195]:[180,210];
 const v:readonly[number,number]=mode==='speed'?[80,80]:[70,90];
 const hours=quotient(d,v);
 return {d,v,hours,widthMinutes:60*(hours[1]-hours[0])};
}
export const targetPoints:readonly(readonly[number,number])[][]=[
 [[-4,-2],[3,-3],[-3,3],[2,4],[2,-2]],
 [[47,-48],[54,-46],[51,-54],[46,-52],[52,-50]],
 [[-55,-30],[55,30],[-30,55],[30,-55],[0,0]],
 [[10,-65],[58,-22],[27,-40],[63,10],[44,35]]
];
// Deliberately schematic: 9 of these 10 intervals cover zero. This is not a 95% simulation.
export const schematicIntervals:readonly(readonly[number,number])[]=[[-1.2,.8],[-.8,1.3],[-1.7,.2],[-.4,1.7],[-1.3,.6],[.2,1.9],[-.9,1],[-.6,1.4],[-1.5,.4],[-1.1,1.1]];
export const containsZero=(interval:readonly[number,number])=>interval[0]<=0&&interval[1]>=0;
