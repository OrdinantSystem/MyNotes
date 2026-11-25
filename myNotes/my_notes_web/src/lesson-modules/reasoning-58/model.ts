export type VenueId='A'|'B'|'C';
export type Weather='dry'|'rain';
export const constraintModes=['none','budget','loss','both'] as const;
export type Constraint=typeof constraintModes[number];
export const venues=Object.freeze([
 Object.freeze({id:'A' as VenueId,cost:600,revenue:Object.freeze({dry:1200,rain:0}),role:'accent'}),
 Object.freeze({id:'B' as VenueId,cost:780,revenue:Object.freeze({dry:1200,rain:720}),role:'purple'}),
 Object.freeze({id:'C' as VenueId,cost:960,revenue:Object.freeze({dry:1200,rain:1200}),role:'blue'})
]);
export function probability(p:number){if(!Number.isFinite(p)||p<0||p>1)throw new RangeError('Probability must lie in [0,1]');return p;}
export function lossWeight(k:number){if(!Number.isFinite(k)||k<1||k>5)throw new RangeError('Loss weight must lie in [1,5]');return k;}
export function venue(id:VenueId){const v=venues.find(v=>v.id===id);if(!v)throw new RangeError('Unknown venue');return v;}
export function payoff(id:VenueId,w:Weather){if(w!=='dry'&&w!=='rain')throw new RangeError('Unknown weather');const v=venue(id);return v.revenue[w]-v.cost;}
export function utility(x:number,k=3){if(!Number.isFinite(x))throw new RangeError('Nonfinite outcome');lossWeight(k);return x>=0?x:k*x;}
export function evaluate(id:VenueId,p:number,k=1){probability(p);lossWeight(k);return (1-p)*utility(payoff(id,'dry'),k)+p*utility(payoff(id,'rain'),k);}
export function worstLoss(id:VenueId){return Math.max(0,-Math.min(payoff(id,'dry'),payoff(id,'rain')));}
export function feasible(id:VenueId,mode:Constraint){if(!constraintModes.includes(mode))throw new RangeError('Unknown constraint');return (!(mode==='budget'||mode==='both')||venue(id).cost<=800)&&(!(mode==='loss'||mode==='both')||worstLoss(id)<=100);}
export function results(p:number,mode:Constraint='none',k=1){probability(p);lossWeight(k);return venues.map(v=>({id:v.id,expected:evaluate(v.id,p),score:evaluate(v.id,p,k),feasible:feasible(v.id,mode),lossProbability:(payoff(v.id,'dry')<0?1-p:0)+(payoff(v.id,'rain')<0?p:0)}));}
export function winners(p:number,mode:Constraint='none',k=1){const rows=results(p,mode,k).filter(r=>r.feasible),best=Math.max(...rows.map(r=>r.score));return rows.filter(r=>Math.abs(r.score-best)<1e-8).map(r=>r.id);}
export function parseBounded(raw:string,min:number,max:number){if(!raw.trim())return null;const x=Number(raw);return Number.isFinite(x)&&x>=min&&x<=max?x:null;}
export const optimalBoundaries=Object.freeze([.25,.375]);
export function robustRange(low:number,high:number){probability(low);probability(high);if(low>high)throw new RangeError('Reversed interval');const probes=[low,high,...optimalBoundaries.filter(p=>p>=low&&p<=high)];return venues.filter(v=>probes.every(p=>winners(p).includes(v.id))).map(v=>v.id);}
