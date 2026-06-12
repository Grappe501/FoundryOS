#!/usr/bin/env npx tsx
/**
 * PASS-040D: Portable Identity audit
 * Usage: npm run audit:persistence
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { validatePersonalDatabase } from '../packages/personal-database/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const validation = validatePersonalDatabase();
if (!validation.ok) {
  for (const e of validation.errors) err('@foundry/personal-database', e);
}

const migration = join(ROOT, 'supabase/migrations/20260703000000_pass040d_personal_database.sql');
if (!existsSync(migration)) err('migration', 'missing pass040d migration');
else {
  const sql = readFileSync(migration, 'utf8');
  for (const table of ['user_artifacts', 'user_memories', 'user_graph_history']) {
    if (!sql.includes(table)) err('migration', `missing ${table}`);
  }
}

const dbModule = join(ROOT, 'packages/db/src/portable-identity.ts');
if (!existsSync(dbModule)) err('portable-identity', 'missing db module');
else {
  const src = readFileSync(dbModule, 'utf8');
  if (!src.includes('hydratePortableIdentity')) err('portable-identity', 'missing hydrate');
  if (!src.includes('migrateLocalBundleToCloud')) err('portable-identity', 'missing migrate');
}

for (const route of ['hydrate/route.ts', 'migrate/route.ts']) {
  const p = join(ROOT, `apps/platform/app/api/identity/${route}`);
  if (!existsSync(p)) err('api/identity', `missing ${route}`);
}

const syncClient = join(ROOT, 'apps/platform/lib/personal-database/sync-client.ts');
const syncSrc = readFileSync(syncClient, 'utf8');
if (!syncSrc.includes('hydrateIdentityFromCloud')) err('sync-client', 'missing hydrate');
if (!syncSrc.includes('migrateLocalIdentityToCloud')) err('sync-client', 'missing migrate');

const layout = readFileSync(join(ROOT, 'apps/platform/app/layout.tsx'), 'utf8');
if (!layout.includes('PortableIdentityHydrator')) err('layout', 'missing hydrator');

const artifactStore = readFileSync(join(ROOT, 'apps/platform/lib/artifacts/client-store.ts'), 'utf8');
if (!artifactStore.includes('persistArtifactToCloud')) err('artifacts', 'missing write-through');

const memoryStore = readFileSync(join(ROOT, 'apps/platform/lib/world-memory/memory-store.ts'), 'utf8');
if (!memoryStore.includes('scheduleMemoryStateSync')) err('memory-store', 'missing write-through');

console.log('\n=== PASS-040D Portable Identity Audit ===\n');

if (errors.length) {
  console.log('Errors:');
  for (const e of errors) console.log(`  [${e.page}] ${e.message}`);
  console.log(`\n✗ audit:persistence FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('✓ validatePersonalDatabase');
console.log('✓ Supabase migration (user_artifacts, user_memories, user_graph_history)');
console.log('✓ hydrate + migrate API + sync client');
console.log('\n✓ audit:persistence PASSED\n');
