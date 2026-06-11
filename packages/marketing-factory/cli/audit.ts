#!/usr/bin/env node
/** Audit marketing/worlds/{slug} for PASS-031 artifact completeness */
import fs from 'fs';
import path from 'path';
import { MARKETING_ARTIFACTS } from '../src/types';
import { listMarketingBlueprints } from '../src/definitions/index';
import { worldMarketingDir, repoRoot } from '../src/paths';

function auditSlug(slug: string): { ok: boolean; missing: string[] } {
  const dir = worldMarketingDir(slug);
  const missing = MARKETING_ARTIFACTS.filter((a) => !fs.existsSync(path.join(dir, a)));
  return { ok: missing.length === 0, missing };
}

async function main() {
  const slugs = process.argv.slice(2);
  const targets = slugs.length > 0 ? slugs : listMarketingBlueprints().map((b) => b.slug);

  console.log('\n📋 Marketing Factory Audit (PASS-031)\n');
  let pass = 0;
  let fail = 0;

  for (const slug of targets) {
    const { ok, missing } = auditSlug(slug);
    if (ok) {
      console.log(`  ✓ ${slug} — ${MARKETING_ARTIFACTS.length}/${MARKETING_ARTIFACTS.length} artifacts`);
      pass++;
    } else {
      console.log(`  ✗ ${slug} — missing: ${missing.join(', ')}`);
      fail++;
    }
  }

  const milestones = path.join(repoRoot(), 'marketing/milestones/revenue-milestones.json');
  if (fs.existsSync(milestones)) {
    console.log(`  ✓ revenue-milestones.json`);
  } else {
    console.log(`  ✗ revenue-milestones.json missing`);
    fail++;
  }

  console.log(`\n${pass} passed, ${fail} failed\n`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
