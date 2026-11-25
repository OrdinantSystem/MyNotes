export const systems=[{id:'A',efficiency:100,access:95},{id:'B',efficiency:130,access:80}] as const;
export const rules=['efficiency','access','constraint'] as const;export type Rule=typeof rules[number];
export function threshold(raw:string){if(!raw.trim())return null;const n=Number(raw);return Number.isInteger(n)&&n>=60&&n<=100?n:null;}
export function decide(rule:Rule,c:number){if(!rules.includes(rule)||threshold(String(c))===null)throw new Error('Invalid decision state');const available=systems.filter(s=>rule!=='constraint'||s.access>=c);const objective=rule==='access'?'access':'efficiency';const best=available.length?Math.max(...available.map(s=>s[objective])):null;return {available:available.map(s=>s.id),recommended:available.filter(s=>s[objective]===best).map(s=>s.id)};}
export function valuations(bridge:boolean){return [true,false].flatMap(e=>[true,false].map(o=>{const conditional=!e||o;const premises=e&&(!bridge||conditional);return {e,o,conditional,premises,counter:premises&&!o};}));}
export function plotPoint(e:number,r:number){return {x:45+e/150*330,y:220-r/100*190};}
export const categories=['descriptive','evaluative','prescriptive'] as const;
export function classification(q:number,choice:number){if(!Number.isInteger(q)||q<0||q>3||!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Unknown classification');return {supported:q===1?choice===1||choice===2:choice===[0,1,2,0][q]};}
export function initialState(){return {rule:'constraint' as Rule,minimum:90,bridge:false,answers:Array<number|null>(4).fill(null),shown:Array(4).fill(false) as boolean[]};}
