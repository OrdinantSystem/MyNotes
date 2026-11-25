import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicationNetwork,traceOrigins,validateNetwork,investigationNetwork,workshop,detection,negativeUpdate,profile,sources,questions,integer,initialState} from './model.ts';
import {figureMarkup,publicationMarkup,searchMarkup,posteriorMarkup,workshopMarkup} from './render.ts';
import {copy} from './copy.ts';
const root=dirname(fileURLToPath(import.meta.url)),manifest=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
assert.equal(manifest.order,53);assert.equal(manifest.chapter,'reasoning-part-seven');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
for(let n=1;n<=10;n++){const network=publicationNetwork(n);assert.equal(network.filter(x=>/^P\d+$/.test(x.id)).length,n);assert.deepEqual(traceOrigins(network,Array.from({length:n},(_,i)=>`P${i+1}`)),['M']);}
assert.deepEqual(traceOrigins(investigationNetwork('separate'),['gauge','survey','sensor']),['gauge','sensor','survey']);assert.equal(traceOrigins(investigationNetwork('calibration'),['gauge','survey','sensor']).length,3);assert.deepEqual(traceOrigins(investigationNetwork('copied'),['gauge','survey','sensor']),['gauge','sensor']);
const reports=['A','B','C','D','E','F','G'],oracle=[1,1,1,2,2,3,4];
for(let mask=0;mask<128;mask++){let union=0;const selected=reports.filter((_,i)=>mask&(1<<i));for(let i=0;i<7;i++)if(mask&(1<<i))union|=oracle[i];assert.deepEqual(traceOrigins(workshop,selected),['M','S','U'].filter(id=>union&({M:1,U:2,S:4}[id])));}
// Independent transitive-closure oracle for every forward four-node graph and report/origin typing.
for(let graph=0;graph<64;graph++)for(let types=0;types<16;types++){
 const reach=Array.from({length:4},()=>Array(4).fill(false)),nodes=Array.from({length:4},(_,i)=>({id:String(i),kind:types&(1<<i)?'origin':'report',relies:[]}));let bit=0;
 for(let i=0;i<4;i++)for(let j=i+1;j<4;j++,bit++)if(graph&(1<<bit)){reach[i][j]=true;nodes[i].relies.push(String(j));}
 for(let k=0;k<4;k++)for(let i=0;i<4;i++)for(let j=0;j<4;j++)reach[i][j] ||=reach[i][k]&&reach[k][j];
 for(let i=0;i<4;i++)assert.deepEqual(traceOrigins(nodes,[String(i)]),nodes.filter((n,j)=>(i===j||reach[i][j])&&n.kind==='origin').map(n=>n.id));
}
assert.throws(()=>validateNetwork([{id:'A',kind:'report',relies:['B']}]));assert.throws(()=>validateNetwork([{id:'A',kind:'report',relies:['A']}]));assert.throws(()=>validateNetwork([{id:'A',kind:'report',relies:[]},{id:'A',kind:'origin',relies:[]}]));assert.throws(()=>traceOrigins(workshop,['Z']));
for(let s=0;s<=100;s++){assert.deepEqual(detection(s),{found:s,missed:100-s});for(let p=0;p<=100;p++){const r=negativeUpdate(p/100,s/100,1),presentMiss=p*(100-s),absentMiss=(100-p)*100,total=presentMiss+absentMiss;if(total===0)assert.equal(r.posterior,null);else close(r.posterior,presentMiss/total);}}
close(negativeUpdate(.5,.9,1).posterior,1/11);assert.equal(negativeUpdate(1,1,1).posterior,null);assert.equal(negativeUpdate(0,1,1).posterior,0);close(negativeUpdate(.5,0,1).posterior,.5);assert.equal(negativeUpdate(.5,.9,0).posterior,1);assert.equal(negativeUpdate(.5,.9,0).ratio,null);assert.equal(negativeUpdate(.5,1,0).posterior,null);
for(const n of [-1,101,90.5,NaN,Infinity])assert.throws(()=>detection(n));for(const n of [-1,1.1,NaN,Infinity])assert.throws(()=>negativeUpdate(n,.9,1));
for(const raw of ['', ' ', '-1','101','2.5','NaN','Infinity','abc'])assert.equal(integer(raw,0,100),null);for(const n of [0,1,50,90,100])assert.equal(integer(String(n),0,100),n);
for(const source of sources)for(const question of questions){const p=profile(source,question);assert.ok(['established','uncertain','concerning'].includes(p.expertise));assert.equal(p.incentives==='concerning',source==='company');assert.equal(p.record==='established',source==='technician');}
assert.throws(()=>profile('unknown','measurement'));assert.throws(()=>publicationNetwork(0));assert.throws(()=>investigationNetwork('unknown'));
const a=initialState();a.stage=3;a.count=10;a.prior=100;assert.equal(initialState().stage,0);assert.equal(initialState().count,5);assert.equal(initialState().prior,50);
for(const locale of ['en','de']){const c=copy(locale),page=readFileSync(join(root,`content/${locale}/reasoning/${manifest.key}.mdx`),'utf8');assert.equal(c.dimensions.length,4);assert.equal(c.steps.length,6);assert.equal(c.options.length,4);
 for(const fig of manifest.figures){assert.ok(page.includes(`figure="${fig}"`));assert.ok(figureMarkup(locale,fig).length>100);}
 for(const preset of manifest.presets)assert.ok(page.includes(`preset="${preset}"`));
 for(let n=1;n<=10;n++)for(let stage=0;stage<=3;stage++){const html=publicationMarkup(locale,n,stage);assert.equal((html.match(/data-publication=/g)||[]).length,n);assert.ok(html.includes(c.layers[stage]));if(stage===0)assert.ok(!html.includes('→ M'));}
 for(let s=0;s<=100;s++){const html=searchMarkup(locale,s);assert.equal((html.match(/data-search-case=/g)||[]).length,100);assert.equal((html.match(/data-found="true"/g)||[]).length,s);}
 assert.ok(posteriorMarkup(locale,100,100).includes(c.impossible));assert.ok(workshopMarkup(locale,'F').includes('F → M, U'));assert.ok(page.includes('reviewStatus: unreviewed'));assert.ok(page.includes('P(A)>0'));assert.ok(page.includes('1-ps>0'));assert.ok(page.includes('P(N\\mid H)\\not\\equiv P(H\\mid N)'));assert.ok(!/utm_source|references\/source|images.openai.com|google.com\/s2/.test(page));
}
console.log('Episode53: 4,096 independent graph-reachability checks, all128 report subsets, exact origin/dependence cases,10,201 negative-search updates,101 conditional frequency grids, credible-profile boundaries, reset and bilingual coverage passed.');
