#!/usr/bin/env npx tsx
import { auditWorldFs } from '../src/audit-fs.js';
import { generateWorld, loadManifest } from '../src/generate-world.js';
import { getFullBlueprint } from '../src/blueprints/index.js';

const slug = process.argv[2];

if (!slug || slug === '--help') {
  console.log('Usage: npm run build:world -- <slug>');
  console.log('Example: npm run build:world -- poker');
  console.log('\nGenerates consumer world routes, components, marketing pack, and registry.\n');
  process.exit(slug ? 0 : 1);
}

const blueprint = getFullBlueprint(slug);
if (!blueprint) {
  console.error(`Unknown world slug: ${slug}`);
  process.exit(1);
}

const result = generateWorld(slug);
const audit = auditWorldFs(slug)!;
const manifest = loadManifest();

console.log(`\nFoundry World Factory — ${blueprint.displayName} (${blueprint.kind})`);
console.log(`Frame: ${blueprint.frame}`);
console.log(`Automation: ${audit.automationPct}% (target 80%)\n`);

console.log(`Files written: ${result.filesWritten.length}`);
result.filesWritten.forEach((f) => console.log(`  + ${f}`));
if (result.filesSkipped.length) {
  console.log(`\nUnchanged: ${result.filesSkipped.length}`);
}

if (result.worldLibCreated) console.log('\n✓ Created world lib (missions stub)');
if (result.corePromiseAppended) console.log('✓ Appended CORE_PROMISE to world lib');

console.log('\nLayer status:');
for (const [layer, status] of Object.entries(audit.layers)) {
  console.log(`  ${status.padEnd(14)} ${layer}`);
}

if (audit.missing.length) {
  console.log('\nMissing:');
  audit.missing.forEach((m) => console.log(`  ⚠ ${m}`));
}

console.log(`\nManifest domains: ${manifest.domains.join(', ')}`);
console.log(`Next: verify sandbox · explore /${slug}\n`);

process.exit(audit.automationPct >= 80 ? 0 : 2);
