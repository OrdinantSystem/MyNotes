export type Metric='completion'|'quiz'|'recall'|'transfer';
export const metrics:Metric[]=['completion','quiz','recall','transfer'];
export const learners=[{id:'A',completion:100,quiz:100,recall:40,transfer:20},{id:'B',completion:80,quiz:70,recall:80,transfer:90},{id:'C',completion:100,quiz:90,recall:90,transfer:50}] as const;
export function rankings(metric:Metric){if(!metrics.includes(metric))throw new Error('Unknown metric');return [...learners].sort((a,b)=>b[metric]-a[metric]||a.id.localeCompare(b.id)).map(row=>({...row,rank:1+learners.filter(x=>x[metric]>row[metric]).length}));}
export const passingTests=[[[3,1,2],[1,2,3]],[[5,2,8],[2,5,8]],[[4,1,9],[1,4,9]],[[7,3,6],[3,6,7]]] as const;
export const sortCases=[{input:[3,3,1],output:[3,1,3]},{input:[3,3,1],output:[1,3,3]},{input:[3,3,1],output:[1,3]}] as const;
export function inspect(input:readonly number[],output:readonly number[]){if([...input,...output].some(x=>!Number.isFinite(x)))throw new Error('Finite numbers required');const ordered=output.every((x,i)=>i===0||output[i-1]<=x);const counts=new Map<number,number>();for(const x of input)counts.set(x,(counts.get(x)||0)+1);for(const x of output)counts.set(x,(counts.get(x)||0)-1);const preserved=input.length===output.length&&[...counts.values()].every(x=>x===0);return {ordered,preserved,passes:ordered&&preserved};}
export type Context='repair'|'support';export type Indicator='hours'|'tasks'|'quality'|'outcomes';
export const indicators:Indicator[]=['hours','tasks','quality','outcomes'];
export function plan(context:Context,selected:readonly Indicator[]){if(!['repair','support'].includes(context)||selected.some(x=>!indicators.includes(x))||new Set(selected).size!==selected.length)throw new Error('Invalid plan');return {context,selected:[...selected],missing:indicators.filter(x=>!selected.includes(x)),hasQuality:selected.includes('quality'),hasOutcome:selected.includes('outcomes'),onlyInputs:selected.length>0&&selected.every(x=>x==='hours'||x==='tasks')};}
export const targetPoints=[[[0,0],[-6,-5],[6,5],[-5,6],[5,-6]],[[49,-43],[43,-48],[55,-38],[44,-37],[54,-49]],[[-53,-42],[53,42],[-60,42],[60,-42],[0,0]],[[25,-10],[75,5],[5,-65],[55,-90],[85,-50]]] as const;
export const trends={quiz:[12,24,43,58,73,89,100],transfer:[8,21,39,54,45,32,22]};
