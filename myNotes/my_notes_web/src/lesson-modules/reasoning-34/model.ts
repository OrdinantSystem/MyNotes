export type Origin = 'seen' | 'inferred' | 'later' | 'unsure';
export type Confidence = 'low' | 'medium' | 'high';
export interface MemoryDetail {claim:string; source:Origin; confidence:Confidence; evidence:string}
export const duration = 12;
export const maxDetails = 12;
export const origins:Origin[] = ['seen','inferred','later','unsure'];
export const confidences:Confidence[] = ['low','medium','high'];
export function frame(seconds:number) {
  if(!Number.isFinite(seconds)||seconds<0||seconds>duration)throw new RangeError('Scene time must be between 0 and 12 seconds.');
  const x=seconds<4?120+seconds*55:seconds<8?340:340-(seconds-8)*65;
  return {seconds,x,personVisible:seconds<11.5,bagOnTable:seconds>=4,cupX:seconds<6?600:650,clockHour:8,clockMinute:20,umbrella:false};
}
export const study = [
  {word:'Contacted',mean:31.8}, {word:'Hit',mean:34.0}, {word:'Bumped',mean:38.1},
  {word:'Collided',mean:39.3}, {word:'Smashed',mean:40.8}
] as const;
export const claims = [
  {id:'bag',source:'seen'}, {id:'cup',source:'seen'}, {id:'book',source:'seen'},
  {id:'owner',source:'inferred'}, {id:'hurry',source:'inferred'}, {id:'umbrella',source:'later'}
] as const;
export function sourceFeedback(id:string,origin:Origin) {
  const claim=claims.find(c=>c.id===id);
  if(!claim||!origins.includes(origin))throw new RangeError('Unknown claim or source.');
  return origin==='unsure'?'unsure':origin===claim.source?'supported':claim.source;
}
export function initialDetails(locale:string):MemoryDetail[] {
  const de=locale==='de';
  return [
    {claim:de?'Ich war im Supermarkt.':'I went to the supermarket.',source:'seen',confidence:'high',evidence:de?'Kassenbon':'Receipt'},
    {claim:de?'Ich kam ungefähr um 17:00 an.':'I arrived at approximately 17:00.',source:'unsure',confidence:'medium',evidence:de?'Zahlungszeitpunkt':'Payment timestamp'},
    {claim:de?'Das Geschäft war ungewöhnlich voll.':'The shop was unusually busy.',source:'seen',confidence:'medium',evidence:''},
    {claim:de?'Mein Freund arbeitete dort.':'My friend was working.',source:'later',confidence:'medium',evidence:de?'Nachrichten':'Messages'}
  ];
}
export function validateDetail(row:MemoryDetail):MemoryDetail {
  if(!row||typeof row.claim!=='string'||typeof row.evidence!=='string'||row.claim.length>600||row.evidence.length>600||!origins.includes(row.source)||!confidences.includes(row.confidence))throw new RangeError('Invalid memory detail.');
  return {...row};
}
export function addDetail(rows:MemoryDetail[]):MemoryDetail[] {
  if(rows.length>=maxDetails)throw new RangeError('Detail limit reached.');
  return [...rows.map(validateDetail),{claim:'',source:'unsure',confidence:'medium',evidence:''}];
}
export function removeDetail(rows:MemoryDetail[],index:number):MemoryDetail[] {
  if(rows.length<=1||!Number.isInteger(index)||index<0||index>=rows.length)throw new RangeError('Cannot remove this detail.');
  return rows.filter((_,i)=>i!==index).map(validateDetail);
}
