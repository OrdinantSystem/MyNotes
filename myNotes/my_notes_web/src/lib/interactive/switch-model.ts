import {evaluate,assignments} from './logic-model.ts';
export const switchPresets=['access','override','scope','demorgan','routes','simplify','checkpoint'] as const;
export type SwitchPreset=typeof switchPresets[number];
export const switchFigures=['switch-and-table','switch-xor','switch-not-table','switch-demorgan-table','switch-laws','switch-proof','switch-notation'] as const;
export type SwitchFigure=typeof switchFigures[number];
export const isSwitchFigure=(s:string):s is SwitchFigure=>(switchFigures as readonly string[]).includes(s);
export const and=(p:boolean,q:boolean)=>evaluate('and',p,q);
export const or=(p:boolean,q:boolean)=>evaluate('or',p,q);
export const not=(p:boolean)=>evaluate('not',p,false);
export function switchValues(p:boolean,q:boolean,r=false){
 if([p,q,r].some(v=>typeof v!=='boolean'))throw new TypeError('Boolean inputs required');
 const ordinary=and(p,q),alternate=and(p,not(q));
 return {ordinary,alternate,override:or(ordinary,r),inclusive:or(p,q),xor:and(or(p,q),not(ordinary)),scope:and(not(p),q),locked:not(ordinary),failure:or(not(p),not(q)),neither:not(or(p,q)),bothFail:and(not(p),not(q)),simplified:or(ordinary,alternate),factored:and(p,or(q,not(q))),tautology:or(q,not(q)),implication:evaluate('implication',p,q),notOr:or(not(p),q)};
}
export const switchRows=[...assignments].reverse().map(([p,q])=>({p,q,...switchValues(p,q)}));
export const switchTex={access:String.raw`P\land Q`,override:String.raw`(P\land Q)\lor R`,scope:String.raw`\neg P\land Q`,locked:String.raw`\neg(P\land Q)`,failure:String.raw`\neg P\lor\neg Q`,neither:String.raw`\neg(P\lor Q)`,bothFail:String.raw`\neg P\land\neg Q`,simplify:String.raw`(P\land Q)\lor(P\land\neg Q)`,route2:String.raw`P\land\neg Q`};
export const checkpointAnswers=[1,0,1] as const;
export function checkpointCorrect(question:number,answer:number|null){
 if(!Number.isInteger(question)||question<0||question>2)throw new RangeError('Unknown checkpoint question');
 if(answer===null)return null;if(!Number.isInteger(answer)||answer<0||answer>2)throw new RangeError('Unknown answer');return checkpointAnswers[question]===answer;
}
export interface SwitchState{p:boolean;q:boolean;r:boolean;answers:[number|null,number|null,number|null]}
export const initialSwitchState=():SwitchState=>({p:true,q:false,r:false,answers:[null,null,null]});
