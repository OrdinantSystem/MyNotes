export const relevanceKinds=['relevant','insufficient','irrelevant'] as const;
export type Relevance=typeof relevanceKinds[number];
export const authorityConditions=[['met','met','met'],['met','missing','met'],['met','outdated','met'],['missing','missing','missing']] as const;
export const criticismTargets=['person','connection','scrutiny','evidence'] as const;
export const workshopKeys=['relevant','irrelevant','irrelevant','relevant'] as const;
export type Answer='relevant'|'irrelevant'|'false';
export function index(value:number,length:number){if(!Number.isInteger(value)||!Number.isInteger(length)||length<1)throw new RangeError('Use finite integer indices');return Math.max(0,Math.min(length-1,value));}
export function implication(p:boolean,q:boolean){return !p||q;}
export function isPrime(n:number){if(!Number.isInteger(n)||n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;}
export function feedbackKind(question:number,answer:Answer|null){const i=index(question,workshopKeys.length);if(answer===null)return 'unanswered';if(!['relevant','irrelevant','false'].includes(answer))throw new RangeError('Unknown answer');return answer==='false'?'truth-confusion':answer===workshopKeys[i]?'matches':'reconsider';}
/** Independent schematic dimensions, not estimated psychological data or probability. */
export function presentation(vivid:boolean,inspection:boolean){return {vivid,inspection,emotionalStyle:vivid?'vivid':'plain',technicalSupport:inspection?'present':'absent'} as const;}
