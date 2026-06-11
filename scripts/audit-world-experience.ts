#!/usr/bin/env npx tsx
import { getWorldExperienceSnapshot } from '../apps/platform/lib/world-experience/audit';

const snapshot = getWorldExperienceSnapshot();

console.log('\nFoundry World Experience Audit (PASS-032B)\n');
console.log(`Average experience score: ${snapshot.avg_experience_score}% · Ready: ${snapshot.worlds_ready}/${snapshot.worlds}`);
console.log(`Target: each world ≥ ${snapshot.target_score}%\n`);

console.log('| World | Total | Hero | Mission 1 | Tools | Visual | Community | Copy | Status |');
console.log('|-------|-------|------|-----------|-------|--------|-----------|------|--------|');
for (const r of snapshot.rows) {
  console.log(
    `| ${r.displayName} | ${r.totalScore}% | ${r.heroQuality} | ${r.firstMissionQuality} | ${r.toolDepth} | ${r.visualRichness} | ${r.communityAtmosphere} | ${r.copyQuality} | ${r.status} |`,
  );
}

console.log('\nRun alongside: npm run audit:depth\n');

const pass = snapshot.rows.every((r) => r.totalScore >= snapshot.target_score);
process.exit(pass ? 0 : 2);
