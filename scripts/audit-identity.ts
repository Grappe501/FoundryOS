#!/usr/bin/env npx tsx
/**
 * PASS-034M: Identity Narrative audit
 * Usage: npm run audit:identity
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  LIVE_NARRATIVE_WORLDS,
  validateNarrativeConfigs,
  resolveWorldIdentityNarrative,
} from '../packages/identity-narrative-engine/src';

const ROOT = join(__dirname, '..');
const findings: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  findings.push({ page, message });
}

const validation = validateNarrativeConfigs();
if (!validation.ok) {
  for (const e of validation.errors) err('configs', e);
}

for (const world of LIVE_NARRATIVE_WORLDS) {
  const narrative = resolveWorldIdentityNarrative({
    world_slug: world,
    missions_completed: 0,
    mission_titles: [],
    reflections: [],
    consequence_node_ids: [],
    consequence_labels: [],
    active_collections: [],
    completed_collection_ids: [],
    events_voted: [],
    events_completed: [],
    events_saved: [],
    debate_topics: [],
    journal_entries: 0,
  });
  if (!narrative) err(world, 'resolveWorldIdentityNarrative returned null');
  else if (!narrative.mentor_notice || !narrative.origin) err(world, 'incomplete narrative');
}

const journey = join(ROOT, 'apps/platform/components/living-worlds/LivingWorldPanels.tsx');
if (!readFileSync(journey, 'utf8').includes('IdentityStoryPanel')) {
  err('/my-journey', 'must include IdentityStoryPanel');
}

const identityPage = join(ROOT, 'apps/platform/app/identity/page.tsx');
if (readFileSync(identityPage, 'utf8').includes('progress_pct')) {
  err('/identity', 'must not show progress_pct bars');
}

if (!existsSync(join(ROOT, 'apps/platform/app/passport/page.tsx'))) {
  err('/passport', 'route missing');
}

const panelSrc = readFileSync(join(ROOT, 'apps/platform/components/identity-narrative/IdentityStoryPanel.tsx'), 'utf8');
if (panelSrc.includes('InternalPhase') || panelSrc.includes('progress_pct') || panelSrc.includes('% Complete')) {
  err('IdentityStoryPanel', 'must not expose internal phases or percentages');
}

console.log('\n=== PASS-034M Identity Narrative Audit ===\n');
console.log(`Worlds: ${LIVE_NARRATIVE_WORLDS.length}`);
console.log(`Config validation: ${validation.ok ? 'OK' : 'FAIL'}`);

if (findings.length) {
  console.log('\nErrors:');
  for (const f of findings) console.log(`  [${f.page}] ${f.message}`);
  console.log(`\n✗ audit:identity FAILED (${findings.length})\n`);
  process.exit(2);
}

console.log('\n✓ audit:identity PASSED\n');
