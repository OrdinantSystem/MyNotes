import {withBuildLock} from './build-lock.mjs';
import {cp,mkdtemp,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const astro=path.join(root,'node_modules/astro/bin/astro.mjs');
const args=process.argv.slice(2);
const run=(script,options={})=>{
 const result=spawnSync(process.execPath,script,{cwd:root,stdio:'inherit',...options});
 if(result.error)throw result.error;
 if(result.status!==0)throw new Error(`Preview command exited with status ${result.status}`);
};

await withBuildLock(async()=>{
// Management commands retain Astro's background-server lifecycle.
if(['stop','status','logs'].includes(args[0])){
 run([astro,'preview',...args]);
}else{
 const snapshot=await mkdtemp(path.join(root,'.preview-dist-'));
 try{
  await cp(path.join(root,'dist'),snapshot,{recursive:true});
  // Validate the copy, not the live build directory. An incomplete or prefixed
  // build must never replace the owner's currently working preview.
  run(['scripts/verify.mjs'],{env:{...process.env,MYNOTES_VERIFY_DIR:snapshot}});
 }catch(error){
  await rm(snapshot,{recursive:true,force:true});
  throw new Error('The preview was kept unchanged. Finish npm run build, then run npm run preview again.',{cause:error});
 }
 try{
  run([astro,'preview','stop']);
  run([astro,'preview','--host','127.0.0.1','--port','4321','--outDir',snapshot,...args]);
 }catch(error){
  // Preserve the snapshot in case Astro has already started in the background.
  throw new Error(`Could not start the preview from ${path.basename(snapshot)}.`,{cause:error});
 }
}

});
