import {spawnSync} from 'node:child_process';
import {lessonModules} from '../src/lib/lesson-modules.mjs';
for(const m of lessonModules){
 const result=spawnSync(process.execPath,[`src/lesson-modules/${m.id}/verify.mjs`],{stdio:'inherit'});
 if(result.error)throw result.error;if(result.status!==0)throw new Error(`Module verification failed: ${m.id}`);
}
console.log(`Verified ${lessonModules.length} registered lesson modules.`);
