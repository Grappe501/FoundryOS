#!/usr/bin/env npx tsx
/**
 * PASS-040D live verification — portable identity round-trip on Supabase
 * Usage: npm run verify:040d
 */
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { loadFoundryEnv } = require('./lib/load-env');
import {
  hydratePortableIdentity,
  migrateLocalBundleToCloud,
  getPortableIdentityStats,
} from '../packages/db/src/portable-identity';
import { emptyPortableMemoryState } from '../packages/personal-database/src';
import type { FoundryArtifact } from '../packages/artifact-engine';

const ROOT = join(__dirname, '..');

async function main() {
  loadFoundryEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error('Supabase env not configured');

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const testEmail = `040d-verify-${Date.now()}@foundryos.test`;
  const password = `Fo${Math.random().toString(36).slice(2, 14)}!9`;

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: testEmail,
    password,
    email_confirm: true,
  });
  if (createErr || !created.user) {
    console.error('Failed to create test user:', createErr?.message);
    process.exit(2);
  }

  const userId = created.user.id;
  console.log(`Test user: ${testEmail} (${userId.slice(0, 8)}…)`);

  const now = new Date().toISOString();
  const artifact: FoundryArtifact = {
    id: `art_040d_${Date.now()}`,
    type: 'comparison',
    user_id: userId,
    metadata: {
      world_slug: 'bourbon',
      title: 'Wild Turkey 101 vs Buffalo Trace',
      occurred_at: now,
      privacy: 'private',
      evidence: 'self_reported',
      payload: { slug_a: 'wild-turkey-101', slug_b: 'buffalo-trace' },
    },
    relations: [],
    created_at: now,
    updated_at: now,
  };

  const memory_state = {
    ...emptyPortableMemoryState(),
    graph_views: [
      { world_slug: 'bourbon', slug: 'bottled-in-bond', title: 'Bottled-in-Bond', at: now },
    ],
    saved_rabbit_holes: [
      { world_slug: 'bourbon', slug: 'bottled-in-bond', title: 'Bottled-in-Bond', at: now },
    ],
    comparisons: [
      {
        world_slug: 'bourbon',
        slug_a: 'wild-turkey-101',
        slug_b: 'buffalo-trace',
        label_a: 'Wild Turkey 101',
        label_b: 'Buffalo Trace',
        mode: 'bottles' as const,
        at: now,
      },
    ],
  };

  const migrate = await migrateLocalBundleToCloud(userId, {
    artifacts: [artifact],
    memory_state,
    collector_state: {
      collections: {},
      recent_events: [],
      unlocked_items: { 'wheated-explorer': ['first-wheated-pour'] },
    },
    graph_history: [
      {
        world_slug: 'bourbon',
        node_slug: 'bottled-in-bond',
        node_title: 'Bottled-in-Bond',
        node_type: 'graph',
        source: 'graph',
        entered_at: now,
      },
    ],
  });

  if (!migrate.ok) {
    console.error('migrateLocalBundleToCloud failed:', migrate.errors);
    await admin.auth.admin.deleteUser(userId);
    process.exit(2);
  }

  const bundle = await hydratePortableIdentity(userId);
  const stats = await getPortableIdentityStats();

  const checks: { name: string; pass: boolean }[] = [
    { name: 'artifact persisted', pass: bundle.artifacts.some((a) => a.id === artifact.id) },
    { name: 'graph view in memory', pass: bundle.memory_state.graph_views.length > 0 },
    { name: 'rabbit hole saved', pass: bundle.memory_state.saved_rabbit_holes.length > 0 },
    { name: 'comparison in memory', pass: bundle.memory_state.comparisons.length > 0 },
    { name: 'graph history recorded', pass: bundle.graph_history.length > 0 },
    { name: 'collector snapshot', pass: bundle.collector_state !== null },
  ];

  console.log('\n=== PASS-040D Live Round-Trip ===\n');
  for (const c of checks) {
    console.log(`${c.pass ? '✓' : '✗'} ${c.name}`);
  }
  console.log(`\nPlatform stats: ${stats.artifacts} artifacts · ${stats.memories} memories · ${stats.graph_events} graph events`);

  await admin.auth.admin.deleteUser(userId);

  const failed = checks.filter((c) => !c.pass);
  if (failed.length) {
    console.log(`\n✗ verify:040d FAILED (${failed.length})\n`);
    process.exit(2);
  }

  console.log('\n✓ verify:040d PASSED — portable identity round-trip on Supabase\n');
  console.log('Manual browser test: sign in on device A → leave evidence → sign in on device B → /my-journey + /passport\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
