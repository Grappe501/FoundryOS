#!/usr/bin/env node
/**
 * PASS-028A: Seed community atmosphere — discussions, showcases, 12-week challenges, mentors
 * Usage: npm run seed:community [-- --force]
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { loadFoundryEnv } = require('./lib/load-env');

loadFoundryEnv();

async function main() {
  const force = process.argv.includes('--force');
  const { seedAllCommunities } = await import('@foundry/db');
  const { ALL_COMMUNITY_SEEDS } = await import('../apps/platform/lib/community-seed/index.ts');

  console.log(`PASS-028A: Seeding ${ALL_COMMUNITY_SEEDS.length} communities${force ? ' (force)' : ''}…`);

  const result = await seedAllCommunities(ALL_COMMUNITY_SEEDS, { force });

  if (result.seeded.length) console.log(`  ✓ seeded: ${result.seeded.join(', ')}`);
  if (result.skipped.length) console.log(`  · skipped (already seeded): ${result.skipped.join(', ')}`);
  if (result.errors.length) {
    console.error('  ✗ errors:');
    for (const e of result.errors) console.error(`    ${e}`);
    process.exit(1);
  }

  console.log('PASS-028A community seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
