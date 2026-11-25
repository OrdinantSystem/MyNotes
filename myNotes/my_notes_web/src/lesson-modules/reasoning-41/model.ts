export const originalHypotheses=['power','motor','pause'] as const;
export type Hypothesis=typeof originalHypotheses[number]|'interlock';
export const observations=['conveyor','display','authorization','mode','guard'] as const;
export type Observation=typeof observations[number];
export type Outcome='stopped'|'running'|'off'|'on'|'unavailable'|'yes'|'no'|'run'|'pause'|'open'|'closed';
export const predictions:Record<Hypothesis,Record<Observation,Outcome|null>>={
 power:{conveyor:'stopped',display:'off',authorization:'unavailable',mode:'unavailable',guard:null},
 motor:{conveyor:'stopped',display:'on',authorization:'yes',mode:'run',guard:null},
 pause:{conveyor:'stopped',display:'on',authorization:'no',mode:'pause',guard:null},
 interlock:{conveyor:'stopped',display:'on',authorization:'no',mode:'run',guard:'open'}
};
export const findings:Record<Observation,Outcome>={conveyor:'stopped',display:'on',authorization:'no',mode:'run',guard:'open'};
export const lastStage=5;
export const tests=['conveyor','display','authorization','mode'] as const;
export type Test=typeof tests[number];
export const plantChoices=['wilting','soil','leaves','familiar'] as const;
export type PlantChoice=typeof plantChoices[number];
export function stageNumber(n:number){if(!Number.isInteger(n)||n<0||n>lastStage)throw new Error('Unknown investigation step');return n;}
export function evidence(stage:number){stageNumber(stage);return observations.slice(0,Math.min(stage+1,5)).map(key=>({key,value:findings[key]}));}
export function compare(h:Hypothesis,items:readonly {key:Observation,value:Outcome}[]){if(!Object.hasOwn(predictions,h))throw new Error('Unknown hypothesis');const conflicts=items.filter(({key,value})=>{if(!Object.hasOwn(predictions[h],key))throw new Error('Unknown observation');return predictions[h][key]!==null&&predictions[h][key]!==value;}).map(x=>x.key);return {compatible:conflicts.length===0,conflicts};}
export function investigation(stage:number){const data=evidence(stage),candidates:Hypothesis[]=stage>=4?[...originalHypotheses,'interlock']:[...originalHypotheses];return {stage,observed:data,candidates,survivors:candidates.filter(h=>compare(h,data).compatible),restored:stage===5};}
export function moveStage(stage:number,delta:-1|1){stageNumber(stage);if(delta!==-1&&delta!==1)throw new Error('Invalid step');return Math.min(lastStage,Math.max(0,stage+delta));}
export function partition(test:Test){if(!tests.includes(test))throw new Error('Unknown test');const groups=new Map<Outcome,Hypothesis[]>();for(const h of originalHypotheses){const result=predictions[h][test]!;const list=groups.get(result)??[];list.push(h);groups.set(result,list);}return [...groups].map(([outcome,hypotheses])=>({outcome,hypotheses}));}
export function plantAnswer(choice:PlantChoice){if(!plantChoices.includes(choice))throw new Error('Unknown plant choice');return {discriminatesWater:choice==='soil',diagnosisEstablished:false};}
export function relativeOdds(prior:number,l1:number,l2:number){if(!Number.isFinite(prior)||prior<=0||![l1,l2].every(x=>Number.isFinite(x)&&x>0&&x<=1))throw new Error('Positive finite odds and likelihoods required');const posterior=prior*l1/l2;if(!Number.isFinite(posterior)||posterior<=0)throw new Error('Unrepresentable odds');return posterior;}
export function initialState(){return {stage:0,test:null as Test|null,testRevealed:false,plant:null as PlantChoice|null,plantRevealed:false};}
