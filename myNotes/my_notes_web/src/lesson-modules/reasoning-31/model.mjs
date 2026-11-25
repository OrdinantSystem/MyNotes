export const names = ['Anna','Ben','Clara','David','Eva'];
export const figures = ['opening','assignment','function-rule','properties','sizes','collision-proof','codomain','subset-pairs','inverse','possibilities','process'];
export function assignment(values, targets=4) {
 if (!Number.isSafeInteger(targets)||targets<0||!Array.isArray(values)||values.some(x=>!Number.isSafeInteger(x)||x<0||x>=targets)) throw new Error('Invalid finite assignment');
 const counts=Array.from({length:targets},(_,i)=>values.filter(x=>x===i).length);
 const injective=counts.every(n=>n<=1),surjective=counts.every(n=>n>0);
 return {counts,injective,surjective,bijective:injective&&surjective,unused:counts.filter(n=>n===0).length,collisions:counts.filter(n=>n>1).length};
}
export function initialAssignment(count=4) {
 if (![3,4,5].includes(count))throw new Error('Unsupported student count');
 return count===3?[0,1,2]:count===4?[0,2,2,3]:[0,1,2,3,3];
}
export function integerInput(raw) {if(String(raw).trim()==='')return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=-12&&n<=12?n:null;}
export const affine=n=>2*n+1;
export function preimage(y,oddOnly=false) {
 if (!Number.isSafeInteger(y))throw new Error('Integer target required');
 const n=(y-1)/2,designated=!oddOnly||Math.abs(y%2)===1;
 return {y,n,designated,reached:designated&&Number.isInteger(n)};
}
export function addSquare(mask) {if(!Number.isSafeInteger(mask)||mask<0||mask>3)throw new Error('Subset without square required');return mask|4;}
export function removeSquare(mask) {if(!Number.isSafeInteger(mask)||mask<4||mask>7)throw new Error('Subset with square required');return mask&3;}
