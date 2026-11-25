import {withBuildLock} from './build-lock.mjs';
import {buildPipeline} from './build-pipeline.mjs';
await withBuildLock(buildPipeline);
