import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {study,composition,subgroupRows,finance,assumption,share,initialRecord,record,checklist} from './model.ts';
import {figureMarkup,compositionMarkup,decisionTable,exportRecord,workspace} from './render.ts';
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
assert.deepEqual(study('observational').failure,[28,52]);assert.deepEqual(study('pilot').failure,[24,27]);
close(study('observational').gap,24);close(study('observational').relative,50);close(study('pilot').gap,5);
// Independently reconstruct observed totals from the motivation appendix.
assert.deepEqual([subgroupRows[0][0]+subgroupRows[1][0],subgroupRows[0][2]+subgroupRows[1][2]],[72,48]);
for(const r of subgroupRows)close(r[0]/r[1],r[2]/r[3]);
let states=0;for(let u=0;u<=100;u++)for(let n=0;n<=100;n++){const s=composition(u,n);close(s.rates[0],.8*u+.4*(100-u));close(s.rates[1],.8*n+.4*(100-n));close(s.gap,.4*(u-n));assert(s.rates.every(x=>x>=40&&x<=80));if(u===n)close(s.gap,0);states++;}
close(composition(80,20).gap,24);close(composition(20,80).gap,-24);
assert.deepEqual(finance().map(x=>x.remaining),[1200,5400,3000,6000]);assert.equal(finance(true)[0].cost,6600);assert.equal(finance(true)[0].remaining,-600);assert(!finance(true)[0].feasible);assert.equal(finance(true)[1].cost,600);
for(const bad of [NaN,Infinity,-1,101,.5]){assert.throws(()=>share(bad));assert.throws(()=>composition(bad,20));assert.throws(()=>composition(80,bad));}
for(const bad of [-1,4,1.5,NaN])assert.throws(()=>assumption(bad));assert.deepEqual(assumption(1).dependent,[1,4]);assert.deepEqual(assumption(0).dependent,[]);
const r=initialRecord();r.reason='changed';assert.equal(initialRecord().reason,'');assert.notEqual(record(r),r);for(const confidence of [-1,101,1.5,NaN])assert.throws(()=>record({...r,confidence}));assert.throws(()=>record({...r,option:6}));assert.throws(()=>record({...r,reason:'x'.repeat(3001)}));
for(let mask=0;mask<128;mask++){const checks=Array.from({length:7},(_,i)=>!!(mask>>i&1));assert.equal(checklist(checks),checks.reduce((a,b)=>a+Number(b),0));}assert.throws(()=>checklist([true]));assert.throws(()=>checklist(Array(7).fill('yes')));
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url)));
for(const l of ['en','de']){for(const f of manifest.figures){const html=figureMarkup(l,f);assert(html.length>100);assert(!/undefined|NaN|\bid=|katex-error/.test(html),`${l}/${f}`);}for(const focus of [0,1,2,3])for(const rev of [false,true])assert(!/undefined|NaN/.test(decisionTable(l,rev,focus)));assert.equal((compositionMarkup(l).match(/is-higher/g)||[]).length,100);assert(workspace(l,true).includes('36'));assert(workspace(l,true).includes('72'));const exported=exportRecord(l,{...initialRecord(),reason:'<script>& literal'},r);assert(exported.includes('<script>& literal'));assert(exported.includes('70%'));assert(exported.includes('changed'));const mdx=readFileSync(new URL(`./content/${l}/reasoning/${manifest.key}.mdx`,import.meta.url),'utf8');for(const preset of manifest.presets)assert(mdx.includes(`preset="${preset}"`));for(const f of manifest.figures)assert(mdx.includes(`figure="${f}"`));assert(mdx.includes('reviewStatus: unreviewed'));assert(!/\/Users\/|references\/source|utm_source|favicons/.test(mdx));}
assert.throws(()=>figureMarkup('en','unknown'));assert.throws(()=>study('other'));assert.throws(()=>decisionTable('en',false,4));
console.log(`AoR 64: ${states} composition pairs, 128 reflection states, subgroup reconstruction, both study denominators, relative/absolute differences, budget and revised feasibility, record bounds, fresh state, and all sixteen EN/DE figures checked.`);
