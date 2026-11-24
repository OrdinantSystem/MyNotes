import {squarePreimages} from './equation-model.ts';
export const auditPresets=['faulty','cancellation','cases'] as const;
export type AuditPreset=typeof auditPresets[number];
export const auditFigures=['audit-opening','audit-opening-chain','audit-bridge-intact','audit-bridge-broken','audit-rectangle','audit-checkpoints','audit-target','audit-rule','audit-direction-missing','audit-direction-complete','audit-coverage','audit-quadratic','audit-integer-domain','audit-square-root','audit-circular','audit-repaired','audit-challenge-direction','audit-odd-product','audit-inverse','audit-outcomes','audit-inspect','audit-architecture'] as const;
export type AuditFigure=typeof auditFigures[number];
export const isAuditFigure=(s:string):s is AuditFigure=>(auditFigures as readonly string[]).includes(s);
export const faultyLines=['a=b','a^2=ab','a^2-b^2=ab-b^2','(a-b)(a+b)=b(a-b)','a+b=b','2b=b','2=1'] as const;
export function faultyChoice(choice:number|null){if(choice===null)return null;if(!Number.isInteger(choice)||choice<0||choice>6)throw new Error('Unknown proof line');return choice===4;}
export const cancellationFactors=[3,1,0] as const;
export function cancellationState(c:number){if(!(cancellationFactors as readonly number[]).includes(c))throw new Error('Unknown factor');return {c,x:4,y:9,left:c*4,right:c*9,outputsEqual:c*4===c*9,canCancel:c!==0};}
export function auditInput(raw:string){if(!raw.trim())return null;const x=Number(raw);return Number.isFinite(x)&&x>=-2&&x<=3&&Number.isInteger(4*x)?x:null;}
export function caseState(x:number){if(auditInput(String(x))===null)throw new Error('Use quarter units from -2 to 3');return {x,squared:x*x,holds:x*x>=x,covered:x<=0||x>=1,region:x<=0?'left':x>=1?'right':'gap'};}
export const auditRootInputs=squarePreimages(9);
// Both curves and their highlighted points share this actual coordinate system.
export const auditPlotX=(x:number)=>100+145*x;
export const auditPlotY=(y:number)=>300-130*y;
export function initialAuditState(){return {choice:null as number|null,factor:3,x:.5};}
