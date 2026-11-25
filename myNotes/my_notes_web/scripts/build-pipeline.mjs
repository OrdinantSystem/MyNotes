import {spawn} from 'node:child_process';
export function command(program,args,options={}){
 return new Promise((resolve,reject)=>{
  const child=spawn(program,args,{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},...options});
  const stop=()=>child.kill('SIGTERM');process.once('SIGINT',stop);process.once('SIGTERM',stop);
  child.once('error',reject);child.once('close',(code,signal)=>{process.removeListener('SIGINT',stop);process.removeListener('SIGTERM',stop);code===0?resolve():reject(new Error(`${program} ${args.join(' ')} failed (${signal??code})`));});
 });
}
export async function buildPipeline(){
 for(const name of ['check','verify:library','verify:content'])await command('npm',['run',name]);
 await command(process.execPath,['node_modules/astro/bin/astro.mjs','build']);
 await command(process.execPath,['node_modules/pagefind/lib/runner/bin.cjs','--site','dist']);
 for(const file of ['verify.mjs','verify-math.mjs'])await command(process.execPath,[`scripts/${file}`]);
}
