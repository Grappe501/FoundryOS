#!/usr/bin/env npx tsx
import { auditWorld, BUILD_WORLD_TARGET_OUTPUT, getWorldBlueprint } from '../src/index.js';

const slug = process.argv[2];

if (!slug || slug === '--help') {
  console.log('Usage: npm run build:world -- <slug>');
  console.log('Example: npm run build:world -- poker');
  console.log('\nPASS-024 will generate files. Today: audit + scaffold checklist.\n');
  console.log('Target output per world:');
  BUILD_WORLD_TARGET_OUTPUT.forEach((item) => console.log(`  · ${item}`));
  process.exit(slug ? 0 : 1);
}

const blueprint = getWorldBlueprint(slug);
if (!blueprint) {
  console.error(`Unknown world slug: ${slug}`);
  process.exit(1);
}

const audit = auditWorld(slug)!;

console.log(`\nFoundry World Factory — ${blueprint.displayName} (${blueprint.trinity})`);
console.log(`Frame: ${blueprint.frame}`);
console.log(`Automation: ${audit.automationPct}% (target 80% at PASS-024)\n`);

console.log('Layer status:');
for (const [layer, status] of Object.entries(audit.layers)) {
  console.log(`  ${status.padEnd(14)} ${layer}`);
}

if (audit.blockers.length) {
  console.log('\nBlockers:');
  audit.blockers.forEach((b) => console.log(`  ⚠ ${b}`));
}

console.log('\n--- PASS-024 generation checklist ---');
BUILD_WORLD_TARGET_OUTPUT.forEach((item) => console.log(`  [ ] ${item}`));

console.log(`\nRegistry: apps/platform/lib/${slug}-world.ts (passion) or existing consumer world`);
console.log('Next: PASS-024 Factory Automation Pass implements file generation.\n');

process.exit(audit.automationPct >= 80 ? 0 : 2);
