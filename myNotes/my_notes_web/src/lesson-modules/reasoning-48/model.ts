export type Locale='en'|'de';
export const conditions=[
 {key:'once',n:20,score:27,segments:[{kind:'read',minutes:5}]},
 {key:'repeated',n:20,score:49,segments:[{kind:'read',minutes:5},{kind:'read',minutes:5},{kind:'read',minutes:5},{kind:'read',minutes:5}]},
 {key:'mapping',n:20,score:45,segments:[{kind:'read',minutes:5},{kind:'map',minutes:25}]},
 {key:'retrieval',n:20,score:67,segments:[{kind:'read',minutes:5},{kind:'recall',minutes:10},{kind:'read',minutes:5},{kind:'recall',minutes:10}]}
] as const;
export function duration(index:number){if(!Number.isInteger(index)||index<0||index>3)throw new Error('Invalid condition');return conditions[index].segments.reduce((s,x)=>s+x.minutes,0);}
export function comparison(mode:'matched'|'once'){if(!['matched','once'].includes(mode))throw new Error('Invalid comparison');const a=mode==='matched'?2:0;return {a:conditions[a],b:conditions[3],timeA:duration(a),timeB:duration(3),difference:conditions[3].score-conditions[a].score,matched:duration(a)===duration(3)};}
export function framing(mode:'absolute'|'relative'){if(!['absolute','relative'].includes(mode))throw new Error('Invalid framing');const difference=conditions[3].score-conditions[2].score;return {baseline:45,retrieval:67,difference,relative:100*difference/45,mode};}
export const reported={f:21.63,df:38,d:1.50,experimentTwoEffects:[1.07,1.01],paired:{retrieval:101,equal:6,mapping:13}} as const;
export function reconstructedInterval(){const difference=22,standardError=difference/Math.sqrt(reported.f),critical=2.02439416391197;return {difference,standardError,critical,low:difference-critical*standardError,high:difference+critical*standardError};}
export const categories=['descriptive','associative','causal','application'] as const;
export type Category=typeof categories[number];
export function classify(answers:readonly (Category|null)[]){if(answers.length!==4||answers.some(a=>a!==null&&!categories.includes(a)))throw new Error('Invalid answers');return answers.map((answer,i)=>({answer,expected:categories[i],correct:answer===categories[i]}));}
export function initialAnswers():(Category|null)[]{return [null,null,null,null];}
export function checklistCount(values:readonly boolean[]){if(values.length!==8||values.some(x=>typeof x!=='boolean'))throw new Error('Invalid checklist');return values.filter(Boolean).length;}
export function pairedOutcomes(){return (['retrieval','equal','mapping'] as const).flatMap(key=>Array.from({length:reported.paired[key]},(_,i)=>({id:`${key}-${i}`,key})));}
