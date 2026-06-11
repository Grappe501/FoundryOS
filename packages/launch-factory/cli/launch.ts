#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import { manufactureLaunch } from '../src/manufacture';
import { getLaunchDefinition, listLaunchDefinitions } from '../src/definitions/ai-builder';
import { PASS_015B_COMMAND } from '../src/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');
const slug = process.argv[2];

if (!slug || slug === '--help' || slug === '-h') {
  console.log(`\nLaunch Factory — ${PASS_015B_COMMAND}\n`);
  console.log('Available domains:');
  for (const d of listLaunchDefinitions()) {
    console.log(`  ${d.slug}  (${d.display_name}, priority #${d.launch_priority})`);
  }
  console.log('\nExample: npm run launch:domain -- ai-builder\n');
  process.exit(0);
}

if (!getLaunchDefinition(slug)) {
  console.error(`Unknown domain: ${slug}`);
  process.exit(1);
}

const result = manufactureLaunch(root, slug);
console.log(`\n✓ Launch Factory — ${result.manifest.display_name}\n`);
console.log(`  Status: ${result.manifest.status}`);
console.log(`  Marketing: ${result.manifest.marketing_path}`);
console.log(`  Blueprint: ${result.manifest.blueprint_path}`);
console.log(`\n  Created (${result.files_created.length}):`);
result.files_created.forEach((f) => console.log(`    + ${f}`));
if (result.files_skipped.length) {
  console.log(`\n  Skipped (exists):`);
  result.files_skipped.forEach((f) => console.log(`    · ${f}`));
}
console.log('\n  Next: wire domain proof → deploy → real users.');
console.log('  Pass gate: Users · Revenue · Retention — not another system.\n');
