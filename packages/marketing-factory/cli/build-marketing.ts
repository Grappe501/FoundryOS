#!/usr/bin/env node
/**
 * PASS-031 — Marketing Factory CLI
 * Usage: npm run build:marketing -- ai-builder
 *        npm run build:marketing -- --all
 *        npm run build:marketing -- --primary
 */
import {
  ensureMarketingScaffold,
  getMarketingBlueprint,
  listMarketingBlueprints,
  listPrimaryBlueprints,
  manufactureMarketingPack,
  writeRevenueMilestones,
} from '../src/index';

function parseArgs(argv: string[]): { slugs: string[]; all: boolean; primary: boolean; force: boolean } {
  const args = argv.slice(2);
  const all = args.includes('--all');
  const primary = args.includes('--primary');
  const force = args.includes('--force');
  const slugs = args.filter((a) => !a.startsWith('--'));
  return { slugs, all, primary, force };
}

async function main() {
  const { slugs, all, primary, force } = parseArgs(process.argv);
  const written: string[] = [];
  const skipped: string[] = [];

  ensureMarketingScaffold(written, skipped);
  writeRevenueMilestones(written, skipped);

  let targets = slugs.map((s) => getMarketingBlueprint(s));
  if (primary) targets = listPrimaryBlueprints();
  if (all) targets = listMarketingBlueprints();

  if (targets.length === 0) {
    console.error('Usage: npm run build:marketing -- <slug> | --primary | --all');
    console.error('Primary: ai-builder, financial-independence, public-speaking');
    process.exit(1);
  }

  console.log(`\n🏭 Marketing Factory (PASS-031) — ${targets.length} world(s)\n`);

  for (const bp of targets) {
    const result = manufactureMarketingPack(bp, { force });
    written.push(...result.written);
    skipped.push(...result.skipped);
    console.log(`  ✓ ${bp.display_name} (${bp.slug}) — tier: ${bp.priority_tier}`);
    console.log(`    written: ${result.written.length} · skipped: ${result.skipped.length}`);
  }

  console.log(`\n✅ Done — ${written.length} files written, ${skipped.length} skipped (existing)`);
  console.log(`   Output: marketing/worlds/{slug}/`);
  console.log(`   Milestones: marketing/milestones/revenue-milestones.json\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
