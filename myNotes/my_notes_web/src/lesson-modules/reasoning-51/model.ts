export type Locale='en'|'de';
export const claimIds=['C','P5','C2','P2','P3','P4','C1','I','O','R'] as const;
export type ClaimId=typeof claimIds[number];
export const sourceIndex:Record<ClaimId,number|null>={C:0,P5:1,C2:1,P2:2,P3:3,P4:3,C1:null,I:null,O:4,R:4};
export const distortions=['C','P5','C2','C1','R'] as const;
export function removal(first:boolean,second:boolean){if(typeof first!=='boolean'||typeof second!=='boolean')throw new Error('Boolean premises required');return {independent:Number(first)+Number(second),linked:first&&second};}
export function trace(id:string,distorted=false){if(!claimIds.includes(id as ClaimId))throw new Error('Unknown claim');const key=id as ClaimId;return {id:key,source:sourceIndex[key],reconstructed:sourceIndex[key]===null,distorted:distorted&&(distortions as readonly string[]).includes(key)};}
export function objection(grant:boolean,scope:'trial'|'permanent'){if(typeof grant!=='boolean'||!['trial','permanent'].includes(scope))throw new Error('Invalid objection state');return {wages:1200,covered:grant&&scope==='trial',permanentAffordable:null};}
export const libraryRelations=[
 {id:'demand',from:['P5'],to:'C2',kind:'support'},
 {id:'demand-policy',from:['C2','I'],to:'C',kind:'joint'},
 {id:'access',from:['P2'],to:'C',kind:'support'},
 {id:'staff',from:['P3','P4'],to:'C1',kind:'joint'},
 {id:'feasible',from:['C1'],to:'C',kind:'support'},
 {id:'cost',from:['O'],to:'C',kind:'objection'},
 {id:'mitigation',from:['R'],to:'cost',kind:'mitigation'}
] as const;
