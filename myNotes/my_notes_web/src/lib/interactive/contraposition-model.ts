import {evaluate} from './logic-model.ts';
import {squareWitness} from './cases-model.ts';
export const contraPresets=['truth','odd-square','strategy'] as const;
export type ContraPreset=typeof contraPresets[number];
export const contraFigures=['samples','workspace','animals','animal-routes','worlds','transform','before-after','tiles','columns','paired','regions','witness','wrong-route','forms','equivalence','product-cases','reformulate','decision'].map(s=>`contra-${s}`);
export type ContraFigure=`contra-${'samples'|'workspace'|'animals'|'animal-routes'|'worlds'|'transform'|'before-after'|'tiles'|'columns'|'paired'|'regions'|'witness'|'wrong-route'|'forms'|'equivalence'|'product-cases'|'reformulate'|'decision'}`;
export const isContraFigure=(s:string):s is ContraFigure=>contraFigures.includes(s);
export function truthPair(p:boolean,q:boolean){if(typeof p!=='boolean'||typeof q!=='boolean')throw new Error('Boolean propositions required');return {p,q,notP:!p,notQ:!q,original:evaluate('implication',p,q),contra:evaluate('contrapositive',p,q)};}
export function squareRegions(k:number){if(!Number.isInteger(k)||k<1||k>6)throw new Error('Illustrated k must be 1–6');const s=squareWitness(k,true);return {...s,center:4*k*k,strip:2*k,corner:1,pairs:s.witness};}
export function contraInput(raw:string){if(!raw.trim())return null;const k=Number(raw);return Number.isInteger(k)&&k>=1&&k<=6?k:null;}
export const strategyRoutes=['direct','contra','contra'] as const;
export function strategyAnswer(row:number,choice:number|null){if(!Number.isInteger(row)||row<0||row>2)throw new Error('Unknown problem');if(choice===null)return null;if(choice!==0&&choice!==1)throw new Error('Unknown route');return (choice===0?'direct':'contra')===strategyRoutes[row];}
export function initialContraState(){return {p:true,q:false,k:2,problem:0,answers:[null,null,null] as (number|null)[]};}
