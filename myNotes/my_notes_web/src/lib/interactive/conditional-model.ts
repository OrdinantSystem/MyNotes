import {evaluate,assignments} from './logic-model.ts';
/** Reuse the existing truth-functional engine; predicates have the integer domain. */
export const conditionalChoices=[4,6,7] as const;
export type ConditionalChoice=typeof conditionalChoices[number];
export const conditionalPresets=['numbers'] as const;
export type ConditionalPreset=typeof conditionalPresets[number];
export const conditionalFigures=['conditional-roles','conditional-cases','conditional-forms','conditional-table','conditional-admission','conditional-kinds'] as const;
export type ConditionalFigure=typeof conditionalFigures[number];
export const isConditionalFigure=(s:string):s is ConditionalFigure=>(conditionalFigures as readonly string[]).includes(s);
export const conditionalForms=['implication','converse','inverse','contrapositive'] as const;
export const conditionalTex={implication:String.raw`P\to Q`,converse:String.raw`Q\to P`,inverse:String.raw`\neg P\to\neg Q`,contrapositive:String.raw`\neg Q\to\neg P`};
export const conditionalRows=assignments.map(([p,q])=>({p,q,...Object.fromEntries(conditionalForms.map(form=>[form,evaluate(form,p,q)]))})) as {p:boolean;q:boolean;implication:boolean;converse:boolean;inverse:boolean;contrapositive:boolean}[];
export function integerPredicates(n:number){
 if(!Number.isSafeInteger(n))throw new RangeError('An integer in the safe arithmetic domain is required');
 const p=n%4===0,q=n%2===0;
 return {n,p,q,original:evaluate('implication',p,q),converse:evaluate('converse',p,q),inverse:evaluate('inverse',p,q),contrapositive:evaluate('contrapositive',p,q)};
}
export function conditionalChoice(n:number):ConditionalChoice{if(!(conditionalChoices as readonly number[]).includes(n))throw new RangeError('Choose 4, 6 or 7');return n as ConditionalChoice;}
/** A is admitted, T ticket, I identification. The rule imposes requirements only. */
export function admissionAllows(a:boolean,t:boolean,i:boolean){return evaluate('implication',a,t&&i);}
