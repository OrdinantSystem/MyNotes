import assert from 'node:assert/strict';
import {mkdtemp,readFile,appendFile,rm,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {validateModules,readModules} from '../src/lib/lesson-modules.mjs';
import {withBuildLock} from './build-lock.mjs';
const fixture=n=>({id:`reasoning-${n}`,order:n,course:'reasoning',chapter:'reasoning-part-four',sourceId:`reasoning-episode-${n}`,sourceTitle:'Fixture',key:`fixture-${n}`,title:'Fixture',figures:[],presets:[]});
assert.deepEqual(validateModules([fixture(31),fixture(30)]).map(m=>m.order),[30,31]);assert.throws(()=>validateModules([fixture(30),fixture(30)]));assert.throws(()=>validateModules([fixture(30),{...fixture(31),key:'fixture-30'}]));assert.throws(()=>validateModules([{...fixture(30),sourceId:'reasoning-episode-31'}]));assert.throws(()=>validateModules([{...fixture(30),id:'../outside'}]));assert.throws(()=>validateModules([{...fixture(30),presets:['x','x']}]));
const temp=await mkdtemp(join(tmpdir(),'mynotes-module-lock-')),events=join(temp,'events.txt'),lockModule=new URL('./build-lock.mjs',import.meta.url).href;
const child=(name,delay=40)=>new Promise((resolve,reject)=>{const code=`import {withBuildLock} from ${JSON.stringify(lockModule)};import {appendFile} from 'node:fs/promises';await withBuildLock(async()=>{await appendFile(${JSON.stringify(events)},${JSON.stringify(name+' start\n')});await new Promise(r=>setTimeout(r,${delay}));await appendFile(${JSON.stringify(events)},${JSON.stringify(name+' end\n')});},{root:${JSON.stringify(temp)}});`;const p=spawn(process.execPath,['--input-type=module','-e',code],{stdio:'pipe'});let error='';p.stderr.on('data',s=>error+=s);p.on('error',reject);p.on('close',code=>code===0?resolve(p.pid):reject(new Error(error)));});
try{
 await Promise.all([child('A'),child('B')]);const lines=(await readFile(events,'utf8')).trim().split('\n');assert.equal(lines.length,4);assert.equal(lines[0].split(' ')[0],lines[1].split(' ')[0]);assert.equal(lines[2].split(' ')[0],lines[3].split(' ')[0]);assert.notEqual(lines[0][0],lines[2][0]);
 await assert.rejects(withBuildLock(async()=>{throw new Error('Intentional failed candidate');},{root:temp}),/Intentional/);await withBuildLock(()=>appendFile(events,'recovered\n'),{root:temp});
 await withBuildLock(async()=>{await assert.rejects(withBuildLock(()=>{}, {root:temp,timeout:1}),/still held/);const owner=JSON.parse(await readFile(join(temp,'.lesson-build.lock/owner.json'),'utf8'));assert.equal(owner.pid,process.pid);},{root:temp});
 const dead=await child('finished',0);await mkdir(join(temp,'.lesson-build.lock'));await writeFile(join(temp,'.lesson-build.lock/owner.json'),JSON.stringify({pid:dead,token:'stale-test'}));await assert.rejects(withBuildLock(()=>{}, {root:temp}),/recorded build process has exited/);assert.equal(JSON.parse(await readFile(join(temp,'.lesson-build.lock/owner.json'),'utf8')).token,'stale-test');
 // An unfinished module outside the active tree is invisible to registration.
 const stage=join(temp,'lesson-work/reasoning-32');await mkdir(stage,{recursive:true});await writeFile(join(stage,'manifest.json'),'{unfinished');assert.deepEqual(readModules(join(temp,'src/lesson-modules')),[]);
}finally{await rm(temp,{recursive:true,force:true});}
console.log('Module workflow: out-of-order registration, duplicate/path rejection, isolated staging, simultaneous build serialization, failure recovery, live-lock protection and explicit stale-lock recovery.');
