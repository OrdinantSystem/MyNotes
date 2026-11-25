export const counts = [12,48,120] as const;
export function natural(n:number,max=6){if(!Number.isSafeInteger(n)||n<0||n>max)throw new RangeError('Outside the natural-number control domain');return n;}
export function index(n:number,length:number){if(!Number.isInteger(n))throw new RangeError('Invalid index');return Math.max(0,Math.min(length-1,n));}
export function pairs(count:number){natural(count,120);return Array.from({length:count},(_,i)=>{const m=2*(i%12),n=2*Math.floor(i/12);return {m,n,sum:m+n,even:(m+n)%2===0};});}
export const finiteSet=[0,2,4,6] as const;
export const finitePairs=finiteSet.flatMap(n=>finiteSet.map(m=>({m,n,sum:m+n})));
export function witness(a:number,b:number,product=false){natural(a);natural(b);const m=2*a,n=2*b,k=product?a*b:a+b;return {a,b,m,n,k,sum:m+n,double:2*k,works:m+n===2*k};}
export const answers=[1,0,2,0,1] as const;
export const proofSteps=[
{command:'theorem even_sum (m n : Nat)\n    (hm : EvenN m) (hn : EvenN n) :\n    EvenN (m + n) := by',context:'m n : Nat\nhm : EvenN m\nhn : EvenN n',goal:'⊢ EvenN (m + n)'},
{command:'obtain ⟨a, ha⟩ := hm\nobtain ⟨b, hb⟩ := hn',context:'m n a b : Nat\nha : m = 2 * a\nhb : n = 2 * b',goal:'⊢ EvenN (m + n)'},
{command:'refine ⟨a + b, ?_⟩',context:'m n a b : Nat\nha : m = 2 * a\nhb : n = 2 * b',goal:'⊢ m + n = 2 * (a + b)'},
{command:'calc\n  m + n = 2 * a + 2 * b := by rw [ha, hb]',context:'ha : m = 2 * a\nhb : n = 2 * b',goal:'⊢ 2 * a + 2 * b = 2 * (a + b)'},
{command:'  _ = 2 * (a + b) := (Nat.mul_add 2 a b).symm',context:'Nat.mul_add 2 a b :\n  2 * (a + b) = 2 * a + 2 * b',goal:'No goals to be solved'}
] as const;
export const completeProof=`def EvenN (n : Nat) : Prop :=
  ∃ k : Nat, n = 2 * k

theorem even_sum (m n : Nat)
    (hm : EvenN m)
    (hn : EvenN n) :
    EvenN (m + n) := by
  obtain ⟨a, ha⟩ := hm
  obtain ⟨b, hb⟩ := hn
  refine ⟨a + b, ?_⟩
  calc
    m + n = 2 * a + 2 * b := by rw [ha, hb]
    _ = 2 * (a + b) := (Nat.mul_add 2 a b).symm

#print axioms even_sum
`;
