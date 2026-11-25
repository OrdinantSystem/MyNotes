export const coincidence=990,firstMinute=985,lastMinute=995;
export const timeChoices=Array.from({length:11},(_,i)=>firstMinute+i);
export function minute(value:number,min=0,max=1439){if(!Number.isInteger(value)||value<min||value>max)throw new Error('Minute outside the stated model');return value;}
export function formatTime(value:number){minute(value);return `${Math.floor(value/60).toString().padStart(2,'0')}:${(value%60).toString().padStart(2,'0')}`;}
export function offsetInput(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=0&&n<=10?n:null;}
export function clockReading(actual:number,working:boolean){minute(actual);return working?actual:coincidence;}
export function handPoints(value:number){minute(value);const point=(angle:number,length:number)=>({x:80+Math.sin(angle)*length,y:80-Math.cos(angle)*length});return {hour:point((value%720)/720*2*Math.PI,32),minute:point((value%60)/60*2*Math.PI,49)};}
export function layers(actual:number,belief:number){minute(actual,firstMinute,lastMinute);minute(belief,firstMinute,lastMinute);return {actual,belief,proposition:coincidence,truthOfP:actual===coincidence,believesP:belief===coincidence,beliefCorrect:actual===belief};}
export function tracking(actual:number){minute(actual,firstMinute,lastMinute);return {actual,functioning:clockReading(actual,true),stopped:clockReading(actual,false),functioningMatches:true,stoppedMatches:actual===coincidence};}
export const cases=['stopped','repaired','discovered','phone-used','phone-unused','copies'] as const;
export type EvidenceCase=typeof cases[number];
export function evidenceState(kind:EvidenceCase,actual:number){
 if(!cases.includes(kind))throw new Error('Unknown conceptual experiment');if(![coincidence,coincidence+1].includes(actual))throw new Error('Use the stated comparison times');
 const working=kind==='repaired',aware=!['stopped','repaired'].includes(kind),independentAvailable=kind==='phone-used'||kind==='phone-unused',independentUsed=kind==='phone-used',clock=clockReading(actual,working),copies=kind==='copies'?10:0;
 const belief=independentUsed?actual:clock;
 return {kind,actual,clock,working,aware,independentAvailable,independentUsed,phone:independentAvailable?actual:null,copies,belief,beliefCorrect:belief===actual,basis:independentUsed?'phone':copies?'copies':'clock',grounds:independentUsed?'independent':aware?'undermined':'plausible'} as const;
}
export function trialDivisors(n:number){if(!Number.isSafeInteger(n)||n<2||n>10000)throw new Error('Integer 2…10000 required');return Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2);}
export function isPrime(n:number){if(!Number.isSafeInteger(n)||n<2)return false;if(n>10000)throw new Error('Verification bound exceeded');return trialDivisors(n).every(d=>n%d!==0);}
export function primeExample(n:7|9){if(n!==7&&n!==9)throw new Error('Only source examples');return {n,odd:n%2===1,prime:isPrime(n),candidateDivisors:trialDivisors(n),divisors:trialDivisors(n).filter(d=>n%d===0),reversedConclusion:true};}
export const correctChoices=[1,0,1,2] as const;
export function practiceAnswer(question:number,choice:number){if(!Number.isInteger(question)||question<0||question>3||!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Unknown practice choice');return {matchesReasoning:correctChoices[question]===choice};}
export function initialState(){return {actual:coincidence,belief:coincidence,comparisonTime:coincidence,evidenceCase:'stopped' as EvidenceCase,answers:Array<number|null>(4).fill(null),revealed:Array<boolean>(4).fill(false)};}
