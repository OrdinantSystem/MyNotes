import {cp,rename,rm,readFile,lstat,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve,join,relative,sep} from 'node:path';
import {randomUUID} from 'node:crypto';
import {validateModules,readModules} from '../src/lib/lesson-modules.mjs';
import {withBuildLock} from './build-lock.mjs';
import {buildPipeline} from './build-pipeline.mjs';
const update=process.argv[2]==='--update',candidate=process.argv[update?3:2];
const staging=resolve(candidate??''),stagingRoot=resolve('lesson-work');
if(!candidate||!staging.startsWith(stagingRoot+sep)||relative(stagingRoot,staging).includes(sep))throw new Error('Use npm run lesson:integrate -- lesson-work/reasoning-N (one complete new module).');
const manifest=JSON.parse(await readFile(join(staging,'manifest.json'),'utf8'));
if(staging!==join(stagingRoot,manifest.id))throw new Error('Staging folder and manifest id must match.');
validateModules([manifest]);
for(const file of ['Figure.astro','Lab.astro','Thumbnail.astro','verify.mjs','README.md',`content/en/reasoning/${manifest.key}.mdx`,`content/de/reasoning/${manifest.key}.mdx`])if(!(await lstat(join(staging,file))).isFile())throw new Error(`Incomplete candidate: ${file}`);
async function noLinks(dir){for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Module bundles must contain ordinary source files, not symlinks.');if(e.isDirectory())await noLinks(join(dir,e.name));}}
await noLinks(staging);
await withBuildLock(async()=>{
 const existing=readModules(),previous=existing.find(m=>m.id===manifest.id);
 if(update&&!previous)throw new Error('Cannot update a module that has not been integrated.');
 if(update&&['id','order','course','chapter','key','sourceId'].some(key=>previous[key]!==manifest[key]))throw new Error('An update must retain the integrated module identity.');
 validateModules([...existing.filter(m=>!update||m.id!==manifest.id),manifest]);
 const active=resolve('src/lesson-modules',manifest.id),incoming=resolve('src/lesson-modules',`.${manifest.id}-${randomUUID()}`);
 if(existsSync(active)&&!update)throw new Error(`Already integrated: ${manifest.id}. This command never overwrites an existing lesson.`);
 const backup=resolve('src/lesson-modules',`.${manifest.id}-previous-${randomUUID()}`);
 let activated=false,saved=false;
 try{
  await cp(staging,incoming,{recursive:true});
  if(update){await rename(active,backup);saved=true;}
  await rename(incoming,active);activated=true;
  await buildPipeline();
  if(saved)await rm(backup,{recursive:true});
  console.log(`${update?'Updated':'Integrated'} ${manifest.id}: both languages, navigation, source, gallery and production checks passed. Use an isolated preview for browser review; refresh the shared preview only after coordination.`);
 }catch(error){
  await rm(activated?active:incoming,{recursive:true,force:true});
  if(saved)await rename(backup,active);
  if(activated||saved){console.error('Candidate removed; restoring the preceding production build. The immutable preview was kept live.');await buildPipeline();}
  throw error;
 }
});
