export type Locale='en'|'de';
export const forecast=[28,30,32,29,24,25,27,26] as const;
export const actual=[12,20,25,22,26,23,29,25] as const;
export function errors(f:readonly number[],y:readonly number[]){if(!f.length||f.length!==y.length||![...f,...y].every(Number.isFinite))throw new Error('Finite paired observations required');const e=y.map((v,i)=>v-f[i]);return {e,mae:e.reduce((s,v)=>s+Math.abs(v),0)/e.length,me:e.reduce((s,v)=>s+v,0)/e.length};}
export function revision(registrations:number,disruption:boolean){if(!Number.isInteger(registrations)||registrations<0||registrations>60)throw new Error('Registrations 0–60');return registrations<15||disruption;}
export function review(attendance=12,passed=10,cost=100){if(![attendance,passed,cost].every(Number.isFinite)||!Number.isInteger(attendance)||!Number.isInteger(passed)||attendance<0||attendance>60||passed<0||passed>attendance||cost<0||cost>200)throw new Error('Invalid observation');return {attendance,passed,cost,rate:attendance?100*passed/attendance:null,error:attendance-28,attendanceMet:attendance>=20,learningMet:attendance>0&&4*passed>=3*attendance,budgetMet:cost<=120};}
export function exportRecord(labels:readonly string[],values:readonly string[]){if(labels.length!==7||values.length!==7)throw new Error('Seven fields required');return labels.map((l,i)=>`${l}\n${values[i].slice(0,1500).trim()||'—'}`).join('\n\n');}
