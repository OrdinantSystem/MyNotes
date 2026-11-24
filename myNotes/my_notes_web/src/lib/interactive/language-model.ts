/** Bounded fictional data; no inference about a real intervention. */
export const languagePresets=['interpretations','scores','median','tests','threshold','free','tall','rewrite'] as const;
export type LanguagePreset=typeof languagePresets[number];
export const languageFigures=['language-summary','language-independence','language-shift','language-contrast','language-uses','language-evidence','language-fairness','language-possible','language-problems','language-question'] as const;
export type LanguageFigure=typeof languageFigures[number];
export function isLanguageFigure(value:string):value is LanguageFigure{return (languageFigures as readonly string[]).includes(value);}
export type Interpretation='mean'|'majority'|'typical';
export type Arrangement='gain'|'loss';
export function boundedInteger(value:number,min:number,max:number){if(!Number.isInteger(value)||value<min||value>max)throw new RangeError('Outside the activity domain');return value;}
export function scoreData(magnitude=30,arrangement:Arrangement='gain'){
 boundedInteger(magnitude,0,40);if(arrangement!=='gain'&&arrangement!=='loss')throw new RangeError('Unknown arrangement');
 return [arrangement==='gain'?magnitude:-magnitude,...Array<number>(9).fill(arrangement==='gain'?-2:2)];
}
export function statistics(values:readonly number[]){
 if(!values.length||values.some(x=>!Number.isFinite(x)))throw new RangeError('Finite, nonempty data required');
 const sorted=[...values].sort((a,b)=>a-b),n=values.length,sum=values.reduce((a,b)=>a+b,0);
 return {sorted,sum,mean:sum/n,median:(sorted[Math.floor((n-1)/2)]+sorted[Math.floor(n/2)])/2,improved:values.filter(x=>x>0).length,n};
}
export function interpretationHolds(interpretation:Interpretation,values:readonly number[]){
 const s=statistics(values);if(interpretation==='mean')return s.mean>0;if(interpretation==='majority')return s.improved>s.n/2;if(interpretation==='typical')return s.median>0;throw new RangeError('Unknown interpretation');
}
export function threshold(gain:number){return statistics(scoreData(gain,'gain'));}
export function tallAt(cutoff:number){boundedInteger(cutoff,155,205);return 180>=cutoff;}
export function freeInference(meaning:'price'|'freedom'){if(meaning!=='price'&&meaning!=='freedom')throw new RangeError('Unknown meaning');return meaning==='price';}
export function rewriteVerdict(answer:number|null){if(answer===null)return 'unanswered';boundedInteger(answer,0,2);return answer===1?'correct':answer===0?'individuals':'causal';}
export interface LanguageState{interpretation:Interpretation;arrangement:Arrangement;magnitude:number;gain:number;cutoff:number;meaning:'price'|'freedom';answer:number|null}
export function initialLanguageState():LanguageState{return {interpretation:'mean',arrangement:'gain',magnitude:30,gain:30,cutoff:180,meaning:'freedom',answer:null};}
