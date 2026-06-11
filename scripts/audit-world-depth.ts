#!/usr/bin/env npx tsx
import { getWorldDepthSnapshot } from '../apps/platform/lib/world-depth/audit';

const snapshot = getWorldDepthSnapshot();

console.log('\nFoundry World Depth Audit (PASS-025)\n');
console.log(`Average depth: ${snapshot.avg_depth_score}% · Consumer readiness: ${snapshot.avg_consumer_readiness_pct}%`);
console.log(`Academy lessons: ${snapshot.total_academy_lessons} · Glossary terms: ${snapshot.total_glossary_terms}\n`);

console.log('| World | Depth | Consumer | Lessons | Glossary | SEO | Status |');
console.log('|-------|-------|----------|---------|----------|-----|--------|');
for (const r of snapshot.rows) {
  console.log(
    `| ${r.displayName} | ${r.depthScore}% | ${r.consumerReadinessPct}% | ${r.academyLessons} | ${r.glossaryTerms} | ${r.seoGuides} | ${r.status} |`,
  );
}

console.log('\nTarget: depth ≥ 85% · glossary ≥ 50 · lessons ≥ 35 per world\n');

const pass = snapshot.rows.every((r) => r.depthScore >= 85 && r.glossaryTerms >= 50 && r.academyLessons >= 35);
process.exit(pass ? 0 : 2);
