export const timetables={existing:{learning:60,accessibility:90},proposed:{learning:85,accessibility:55}} as const;
// Integer numerators preserve the exact indifference condition 60n = 35d.
export function weighted(numerator:number,denominator=1000){
 if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator)||denominator<1||denominator>1000000||numerator<0||numerator>denominator)throw new RangeError('Invalid weight.');
 const existingNumerator=60*numerator+90*(denominator-numerator),proposedNumerator=85*numerator+55*(denominator-numerator);
 const difference=proposedNumerator-existingNumerator;
 return {weight:numerator/denominator,existing:existingNumerator/denominator,proposed:proposedNumerator/denominator,difference:difference/denominator,preferred:difference>0?'proposed':difference<0?'existing':'tie'} as const;
}
export function percentageInput(value:number){if(!Number.isFinite(value)||value<0||value>100||Math.abs(value*10-Math.round(value*10))>1e-8)throw new RangeError('Use 0–100 by tenths.');return Math.round(value*10);}
export function sleepMinutes(bed:number,wake:number){if(!Number.isInteger(bed)||!Number.isInteger(wake)||bed<0||bed>=1440||wake<0||wake>=1440)throw new RangeError('Invalid clock minute.');return (wake-bed+1440)%1440;}
export const sleepSchedules=[{bed:23*60,wake:6*60},{bed:23*60,wake:7*60},{bed:0,wake:7*60}] as const;
export const workshopAnswers=[1,1,1,2] as const;
export function diagnose(question:number,choice:number){if(!Number.isInteger(question)||question<0||question>=4||!Number.isInteger(choice)||choice<0||choice>2)throw new RangeError('Unknown workshop choice.');return choice===workshopAnswers[question];}
export function compatibleClaims(p:boolean,q:boolean){return {p,q,conjunction:p&&q,contradiction:p&&!p};}
export const widerOptions=['later','half-hour','flexible','transport','trial','other'] as const;
