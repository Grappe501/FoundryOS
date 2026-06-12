#!/usr/bin/env npx tsx
/** PASS-040A: Artifact Engine audit — npm run audit:artifacts */
import { validateArtifactEngine, ARTIFACT_TYPES, getArtifactEngineStats } from '../packages/artifact-engine/src';

const validation = validateArtifactEngine();
const stats = getArtifactEngineStats();

console.log('PASS-040A Artifact Engine Audit');
console.log('─'.repeat(40));
console.log(`Types defined: ${ARTIFACT_TYPES.length}`);
console.log(`User artifacts: ${stats.user_artifacts}`);
console.log(`Engine ready: ${stats.engine_ready}`);

if (!validation.ok) {
  console.error('\nFAIL');
  for (const e of validation.errors) console.error(`  · ${e}`);
  process.exit(1);
}

console.log('\nPASS — artifact primitive ready');
