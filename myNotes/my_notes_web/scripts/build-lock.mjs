import {mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {randomUUID} from 'node:crypto';
/** Cooperative, process-owned lock. Never remove another live process's lock. */
export async function withBuildLock(work,{root=process.cwd(),timeout=600_000}={}){
 const dir=resolve(root,'.lesson-build.lock'),token=randomUUID(),started=Date.now();
 let announced=false;
 while(true){
  try{await mkdir(dir);break;}catch(error){if(error.code!=='EEXIST')throw error;}
  try{
   const owner=JSON.parse(await readFile(join(dir,'owner.json'),'utf8'));
   let alive=true;try{process.kill(owner.pid,0);}catch(error){if(error.code==='ESRCH')alive=false;else if(error.code!=='EPERM')throw error;}
   if(!alive)throw new Error('The recorded build process has exited. Inspect .lesson-build.lock/owner.json and remove only that confirmed stale lock before retrying.');
  }catch(error){if(error.code!=='ENOENT')throw error;/* Owner may be between mkdir and its write. */}
  if(Date.now()-started>timeout)throw new Error('Build lock is still held; the active build was left untouched.');
  if(!announced){console.log('Waiting for the active myNotes build/integration…');announced=true;}
  await new Promise(resolve=>setTimeout(resolve,250));
 }
 await writeFile(join(dir,'owner.json'),JSON.stringify({pid:process.pid,token,started:new Date().toISOString()}));
 try{return await work();}finally{
  const owner=JSON.parse(await readFile(join(dir,'owner.json'),'utf8'));
  if(owner.token===token)await rm(dir,{recursive:true});
 }
}
