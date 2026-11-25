/** One immutable local preview per session, without Astro's shared server lifecycle. */
import {createServer} from 'node:http';
import {cp,mkdtemp,readFile,stat,rm} from 'node:fs/promises';
import {resolve,join,extname,sep} from 'node:path';
import {withBuildLock} from './build-lock.mjs';
import {command} from './build-pipeline.mjs';
const port=Number(process.argv[2]),base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
if(!Number.isSafeInteger(port)||port<1024||port>65535||port===4321)throw new Error('Use npm run preview:isolated -- PORT, with a reserved port other than 4321.');
const snapshot=await withBuildLock(async()=>{
 const folder=await mkdtemp(resolve('.preview-dist-'));
 try{await cp(resolve('dist'),folder,{recursive:true});await command(process.execPath,['scripts/verify.mjs'],{env:{...process.env,MYNOTES_VERIFY_DIR:folder}});return folder;}
 catch(error){await rm(folder,{recursive:true,force:true});throw error;}
});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff':'font/woff','.woff2':'font/woff2','.wasm':'application/wasm'};
const server=createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(base&&pathname!==base&&!pathname.startsWith(base+'/')){res.writeHead(404);res.end();return;}
  let file=resolve(snapshot,'.'+(pathname.slice(base.length)||'/'));
  if(file!==snapshot&&!file.startsWith(snapshot+sep)){res.writeHead(404);res.end();return;}
  if((await stat(file)).isDirectory())file=join(file,'index.html');
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404);res.end();}
});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Isolated preview: http://127.0.0.1:${port}${base}/ · ${snapshot}`));
for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>server.close(()=>process.exit()));
