#!/usr/bin/env node
/**
 * PASS-004: Database diagnostics
 * Usage: npm run db:diagnose [-- --verify-rls]
 */
const { loadFoundryEnv } = require('./lib/load-env');

loadFoundryEnv();

const PLACEHOLDERS = ['your-project.supabase.co', 'your-anon-key', 'your-service-role-key'];

function isConfigured(value) {
  return value && !PLACEHOLDERS.some((p) => value.includes(p));
}

function section(title) {
  console.log(`\n── ${title} ${'─'.repeat(Math.max(0, 50 - title.length))}`);
}

async function main() {
  const verifyRls = process.argv.includes('--verify-rls');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('FoundryOS — Database Diagnostics (PASS-004)');

  section('Environment');
  console.log(`  NEXT_PUBLIC_SUPABASE_URL:     ${isConfigured(url) ? '✓ set' : '✗ missing or placeholder'}`);
  console.log(`  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${isConfigured(anonKey) ? '✓ set' : '✗ missing or placeholder'}`);
  console.log(`  SUPABASE_SERVICE_ROLE_KEY:    ${isConfigured(serviceKey) ? '✓ set' : '✗ missing (required for seed/diagnostics)'}`);

  if (!isConfigured(url) || !isConfigured(anonKey)) {
    console.log('\n→ Copy .env.example to .env.local and add Supabase project keys.');
    console.log('→ See docs/SUPABASE_SETUP.md');
    process.exit(1);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const service = isConfigured(serviceKey)
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;
  const anon = createClient(url, anonKey, { auth: { persistSession: false } });

  section('Connectivity');
  const start = Date.now();
  const { error: pingError } = await (service ?? anon)
    .from('platform_metrics')
    .select('metric_key')
    .limit(1);

  if (pingError) {
    console.log(`  ✗ Connection failed: ${pingError.message}`);
    console.log('\n→ Run migrations: npm run db:migrate');
    process.exit(1);
  }

  console.log(`  ✓ Connected (${Date.now() - start}ms)`);
  console.log(`  Project: ${url}`);

  const client = service ?? anon;
  const tables = [
    'verticals',
    'topics',
    'vertical_sites',
    'entities',
    'entity_relationships',
    'user_entity_relationships',
    'collections',
    'user_profiles',
    'admin_users',
    'content_pages',
    'platform_metrics',
  ];

  section('Table Counts');
  for (const table of tables) {
    const { count, error } = await client.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`  ${table}: ✗ ${error.message}`);
    } else {
      console.log(`  ${table}: ${count ?? 0}`);
    }
  }

  if (service) {
    const { data: buckets } = await service.storage.listBuckets();
    section('Storage Buckets');
    if (!buckets?.length) {
      console.log('  ✗ No buckets — run migration 20260610500000');
    } else {
      for (const b of buckets) {
        console.log(`  ${b.name} (public: ${b.public})`);
      }
    }
  }

  if (verifyRls || true) {
    section('RLS Checks (anon key)');
    const checks = [
      { table: 'platform_metrics', expect: true, note: 'public metrics' },
      { table: 'verticals', expect: true, note: 'active verticals public' },
      { table: 'user_entity_relationships', expect: false, note: 'ownership graph protected' },
      { table: 'entities', expect: true, note: 'published entities readable' },
    ];

    for (const check of checks) {
      const { error } = await anon.from(check.table).select('*', { head: true, count: 'exact' });
      const readable = !error;
      const ok = readable === check.expect;
      console.log(
        `  ${check.table}: ${ok ? '✓' : '⚠'} anon ${readable ? 'can' : 'cannot'} read — ${check.note}`
      );
    }
  }

  section('Seed Status');
  const { count: topicCount } = await client.from('topics').select('*', { count: 'exact', head: true });
  const { count: entityCount } = await client.from('entities').select('*', { count: 'exact', head: true });

  if ((topicCount ?? 0) < 1961) {
    console.log(`  ⚠ Topics: ${topicCount ?? 0}/1961 — run: npm run db:seed`);
  } else {
    console.log(`  ✓ Topics: ${topicCount}`);
  }

  if ((entityCount ?? 0) < 3) {
    console.log(`  ⚠ Entities: ${entityCount ?? 0} — bourbon sample not seeded`);
  } else {
    console.log(`  ✓ Entities: ${entityCount}`);
  }

  console.log('\nDiagnostics complete.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
