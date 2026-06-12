#!/usr/bin/env npx tsx
/**
 * PASS-040D.5 — Identity Sync Compound Loop audit
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { validateIdentitySyncEngine } from '../packages/identity-sync-engine/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const validation = validateIdentitySyncEngine();
if (!validation.ok) {
  for (const e of validation.errors) err('identity-sync-engine', e);
}

if (!existsSync(join(ROOT, 'packages/identity-sync-engine/package.json'))) {
  err('package', 'missing @foundry/identity-sync-engine');
}

const apply = join(ROOT, 'apps/platform/lib/identity-sync/apply.ts');
if (!existsSync(apply)) err('apply', 'missing identity-sync apply');
else {
  const src = readFileSync(apply, 'utf8');
  if (!src.includes('propagateAndApplyIdentityEvent')) err('apply', 'missing propagateAndApplyIdentityEvent');
}

const artifact = readFileSync(join(ROOT, 'apps/platform/lib/artifacts/client-store.ts'), 'utf8');
if (!artifact.includes('propagateAndApplyIdentityEvent')) err('artifacts', 'artifact not wired to sync');

const memory = readFileSync(join(ROOT, 'apps/platform/lib/world-memory/memory-store.ts'), 'utf8');
if (!memory.includes('sync_threads')) err('memory', 'missing sync_threads');
if (!memory.includes('propagateAndApplyIdentityEvent')) err('memory', 'graph/compare not wired');

console.log('\n=== PASS-040D.5 Identity Sync Audit ===\n');

if (errors.length) {
  for (const e of errors) console.log(`  [${e.page}] ${e.message}`);
  console.log(`\n✗ audit:identity-sync FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('✓ validateIdentitySyncEngine');
console.log('✓ compound loop wired');
console.log('\n✓ audit:identity-sync PASSED\n');
