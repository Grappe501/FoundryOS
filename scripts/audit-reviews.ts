#!/usr/bin/env npx tsx
/**
 * PASS-040E — Review Engine audit
 */
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateReviewEngine } from '../packages/review-engine/src';

const ROOT = join(__dirname, '..');
const errors: { check: string; message: string }[] = [];
const passes: string[] = [];

function fail(check: string, message: string) {
  errors.push({ check, message });
}

function pass(check: string) {
  passes.push(check);
}

const validation = validateReviewEngine();
if (!validation.ok) {
  for (const e of validation.errors) fail('validateReviewEngine', e);
} else pass('validateReviewEngine');

if (!existsSync(join(ROOT, 'packages/review-engine/package.json'))) {
  fail('package', 'missing @foundry/review-engine');
} else pass('review-engine package');

const migrations = join(ROOT, 'supabase/migrations');
if (existsSync(migrations)) {
  const sqlFiles = readFileSync(join(ROOT, 'supabase/migrations/20260703000000_pass040d_personal_database.sql'), 'utf8');
  if (sqlFiles.includes('bourbon_reviews')) fail('schema', 'bourbon_reviews table must not exist');
  else pass('no bourbon_reviews table');
}

for (const route of ['route.ts', 'mine/route.ts']) {
  const p = join(ROOT, `apps/platform/app/api/reviews/${route}`);
  if (!existsSync(p)) fail('api', `missing /api/reviews/${route}`);
  else pass(`POST/GET /api/reviews (${route})`);
}

const bottleUi = join(ROOT, 'apps/platform/components/reviews/FoundryReviewsPanel.tsx');
if (!existsSync(bottleUi)) fail('ui', 'missing FoundryReviewsPanel');
else {
  const src = readFileSync(bottleUi, 'utf8');
  if (!src.includes('Foundry Reviews')) fail('ui', 'missing Foundry Reviews section');
  if (src.includes('fake') && src.includes('community')) fail('ui', 'possible fake reviews');
  else pass('bottle review UI');
}

const clientStore = readFileSync(join(ROOT, 'apps/platform/lib/artifacts/client-store.ts'), 'utf8');
if (!clientStore.includes('propagateAndApplyIdentityEvent')) fail('identity-sync', 'artifact_created not wired');
else pass('review creates artifact + identity-sync hook');

const rules = readFileSync(join(ROOT, 'packages/identity-sync-engine/src/rules.ts'), 'utf8');
if (!rules.includes("artifact.type === 'review'")) fail('identity-sync', 'review rules missing');
else pass('identity-sync review rules');

const passport = readFileSync(join(ROOT, 'apps/platform/app/passport/page.tsx'), 'utf8');
if (!passport.includes('summarizeReviewSignals') && !passport.includes('Latest review')) {
  fail('passport', 'passport review summary missing');
} else pass('passport review summary');

if (!existsSync(join(ROOT, 'apps/platform/app/operator/reviews/page.tsx'))) {
  fail('operator', 'missing /operator/reviews');
} else pass('operator review dashboard');

const audit = {
  pass: 'PASS-040E',
  timestamp: new Date().toISOString(),
  ok: errors.length === 0,
  passes,
  errors,
};

mkdirSync(join(ROOT, 'data/audits'), { recursive: true });
writeFileSync(join(ROOT, 'data/audits/reviews-audit.json'), JSON.stringify(audit, null, 2));

const md = `# Reviews Audit (PASS-040E)

Generated: ${audit.timestamp}

Status: **${audit.ok ? 'PASSED' : 'FAILED'}**

## Checks passed (${passes.length})

${passes.map((p) => `- ✓ ${p}`).join('\n')}

${errors.length ? `## Errors (${errors.length})\n\n${errors.map((e) => `- [${e.check}] ${e.message}`).join('\n')}` : ''}
`;

writeFileSync(join(ROOT, 'docs/REVIEWS_AUDIT.md'), md);

console.log('\n=== PASS-040E Review Engine Audit ===\n');
if (errors.length) {
  for (const e of errors) console.log(`  [${e.check}] ${e.message}`);
  console.log(`\n✗ audit:reviews FAILED (${errors.length})\n`);
  process.exit(2);
}
console.log('✓ All checks passed');
console.log('\n✓ audit:reviews PASSED\n');
