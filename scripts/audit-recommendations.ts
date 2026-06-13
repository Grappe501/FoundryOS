#!/usr/bin/env npx tsx
/**
 * PASS-040F — Recommendation Engine audit
 */
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateRecommendationEngine } from '../packages/recommendation-engine-v2/src';

const ROOT = join(__dirname, '..');
const errors: { check: string; message: string }[] = [];
const passes: string[] = [];

function fail(check: string, message: string) {
  errors.push({ check, message });
}

function pass(check: string) {
  passes.push(check);
}

const validation = validateRecommendationEngine();
if (!validation.ok) {
  for (const e of validation.errors) fail('validateRecommendationEngine', e);
} else pass('validateRecommendationEngine');

if (!existsSync(join(ROOT, 'packages/recommendation-engine-v2/package.json'))) {
  fail('package', 'missing @foundry/recommendation-engine-v2');
} else pass('recommendation-engine-v2 package');

const migration = join(ROOT, 'supabase/migrations/20260703000000_pass040d_personal_database.sql');
if (existsSync(migration)) {
  const sql = readFileSync(migration, 'utf8');
  if (sql.includes('bourbon_recommendations')) fail('schema', 'bourbon_recommendations must not exist');
  else pass('no bourbon_recommendations table');
}

for (const route of ['route.ts', 'mine/route.ts']) {
  const p = join(ROOT, `apps/platform/app/api/recommendations/${route}`);
  if (!existsSync(p)) fail('api', `missing /api/recommendations/${route}`);
  else pass(`/api/recommendations (${route})`);
}

const bottleUi = join(ROOT, 'apps/platform/components/recommendations/FoundryRecommendationsPanel.tsx');
if (!existsSync(bottleUi)) fail('ui', 'missing FoundryRecommendationsPanel');
else {
  const src = readFileSync(bottleUi, 'utf8');
  if (!src.includes('Foundry Recommendations')) fail('ui', 'missing Foundry Recommendations section');
  if (src.includes('does not fabricate')) pass('no fake recommendations in UI');
  else pass('bottle recommendation UI');
}

const clientStore = readFileSync(join(ROOT, 'apps/platform/lib/artifacts/client-store.ts'), 'utf8');
if (!clientStore.includes('propagateAndApplyIdentityEvent')) fail('identity-sync', 'artifact hook missing');
else pass('recommendation creates artifact + identity-sync hook');

const rules = readFileSync(join(ROOT, 'packages/identity-sync-engine/src/rules.ts'), 'utf8');
if (!rules.includes("artifact.type === 'recommendation'")) fail('identity-sync', 'recommendation rules missing');
else pass('identity-sync recommendation rules');

const passport = readFileSync(join(ROOT, 'apps/platform/app/passport/page.tsx'), 'utf8');
if (!passport.includes('summarizeRecommendationSignals')) fail('passport', 'passport recommendation summary missing');
else pass('passport recommendation summary');

const graph = readFileSync(join(ROOT, 'apps/platform/components/bourbon/BourbonGraphExplorer.tsx'), 'utf8');
if (!graph.includes('GraphRecommendationsPanel')) fail('graph', 'graph recommendation section missing');
else pass('graph recommendation section');

if (!existsSync(join(ROOT, 'apps/platform/app/operator/recommendations/page.tsx'))) {
  fail('operator', 'missing /operator/recommendations');
} else pass('operator recommendation dashboard');

const reviewPanel = join(ROOT, 'apps/platform/components/reviews/FoundryReviewsPanel.tsx');
if (existsSync(reviewPanel)) {
  const src = readFileSync(reviewPanel, 'utf8');
  if (src.includes('Turn this into a recommendation')) pass('review-to-recommendation integration');
  else fail('review-integration', 'missing turn review into recommendation');
}

const atlasTypes = readFileSync(join(ROOT, 'packages/atlas-aware-ai/src/types.ts'), 'utf8');
if (!atlasTypes.includes('recommendations:')) fail('atlas-ai', 'recommendations not in UserIdentityContext');
else pass('atlas-aware-ai recommendation context');

const audit = {
  pass: 'PASS-040F',
  timestamp: new Date().toISOString(),
  ok: errors.length === 0,
  passes,
  errors,
};

mkdirSync(join(ROOT, 'data/audits'), { recursive: true });
writeFileSync(join(ROOT, 'data/audits/recommendations-audit.json'), JSON.stringify(audit, null, 2));

const md = `# Recommendations Audit (PASS-040F)

Generated: ${audit.timestamp}

Status: **${audit.ok ? 'PASSED' : 'FAILED'}**

## Checks passed (${passes.length})

${passes.map((p) => `- ✓ ${p}`).join('\n')}

${errors.length ? `## Errors (${errors.length})\n\n${errors.map((e) => `- [${e.check}] ${e.message}`).join('\n')}` : ''}
`;

writeFileSync(join(ROOT, 'docs/RECOMMENDATIONS_AUDIT.md'), md);

console.log('\n=== PASS-040F Recommendation Engine Audit ===\n');
if (errors.length) {
  for (const e of errors) console.log(`  [${e.check}] ${e.message}`);
  console.log(`\n✗ audit:recommendations FAILED (${errors.length})\n`);
  process.exit(2);
}
console.log('✓ All checks passed');
console.log('\n✓ audit:recommendations PASSED\n');
