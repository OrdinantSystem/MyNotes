export const searchMaximum=1_000_000_000;
export type SearchMode='unspecified'|'witness';
export function searchState(count:number,mode:SearchMode){
 if(!Number.isSafeInteger(count)||count<0||count>searchMaximum||!['unspecified','witness'].includes(mode))throw new RangeError('Invalid search state');
 return {count,found:mode==='witness'&&count>=5,witness:mode==='witness'&&count>=5?5:null,unprovableEstablished:false} as const;
}
export type Edge=readonly[number,number];
export function relationState(mask:number){
 if(!Number.isInteger(mask)||mask<0||mask>511)throw new RangeError('Invalid three-object relation');
 const has=(a:number,b:number)=>Boolean(mask&(1<<(3*a+b)));
 let transitive=true;
 for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)if(has(a,b)&&has(b,c)&&!has(a,c))transitive=false;
 return {axioms:has(0,1)&&has(1,2),direct:has(0,2),transitive};
}
export const baseMask=(1<<1)|(1<<5);
export const exampleModels=[baseMask|(1<<2),baseMask] as const;
export function modelComparison(addTransitivity:boolean){if(typeof addTransitivity!=='boolean')throw new RangeError('Invalid axiom');return exampleModels.map(mask=>{const r=relationState(mask);return {...r,allowed:r.axioms&&(!addTransitivity||r.transitive)};});}
export function extensionState(stage:number){if(!Number.isInteger(stage)||stage<0||stage>3)throw new RangeError('Invalid extension stage');return {stage,added:Array.from({length:stage},(_,i)=>i),next:stage};}
export type Prediction='halts'|'loops';
export function diagonalState(prediction:Prediction){if(!['halts','loops'].includes(prediction))throw new RangeError('Invalid prediction');return {prediction,actual:prediction==='halts'?'loops':'halts',contradiction:true} as const;}
export const symbolCodes={'0':1,'=':2,'+':3,'S':4,'(':5,')':6} as const;
export function encodeToy(symbols:string){if(symbols.length<1||symbols.length>6)throw new RangeError('Use one to six toy symbols');const primes=[2n,3n,5n,7n,11n,13n];return Array.from(symbols).reduce((n,s,i)=>{if(!(s in symbolCodes))throw new RangeError('Unknown toy symbol');return n*primes[i]**BigInt(symbolCodes[s as keyof typeof symbolCodes]);},1n);}
export const answers=[0,1,2,0,1] as const;
export function classify(question:number,choice:number){if(!Number.isInteger(question)||question<0||question>=answers.length||!Number.isInteger(choice)||choice<0||choice>2)throw new RangeError('Invalid classification');return choice===answers[question];}
