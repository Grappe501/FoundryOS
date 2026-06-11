#!/usr/bin/env node
/**
 * PASS-029A: Revenue & Analytics Verification
 * Usage: npm run verify:revenue
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { loadFoundryEnv } = require('./lib/load-env');

loadFoundryEnv();

async function main() {
  const { runFullRevenueVerification, isSupabaseConfigured } = await import('@foundry/db');

  if (!isSupabaseConfigured()) {
    console.error('✗ Supabase not configured');
    process.exit(1);
  }

  console.log('PASS-029A: Seeding test personas and running verification…\n');

  const result = await runFullRevenueVerification();

  for (const check of result.checks) {
    console.log(`${check.passed ? '✓' : '✗'} ${check.label}`);
    console.log(`  ${check.detail}`);
  }

  console.log('');
  if (result.passed) {
    console.log('PASS-029A verification PASSED — safe to proceed toward PASS-030.');
    process.exit(0);
  }

  console.error('PASS-029A verification FAILED — fix metrics before inviting testers.');
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
