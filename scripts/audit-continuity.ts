#!/usr/bin/env npx tsx
/**
 * PASS-034P: World Continuity audit
 * Usage: npm run audit:continuity
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  LIVE_CONTINUITY_WORLDS,
  resolveWorldContinuity,
  resolveJourneyContinuity,
  resolveMemoryTimeline,
} from '../packages/world-continuity-engine/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const emptyBundle = (world: string) => ({
  world_slug: world,
  world_name: world,
  mentor_name: 'Mentor',
  open_thread_ids: [],
  atlas_views: [],
  recent_discoveries: [],
  unfinished_collections: [],
  completed_collections: [],
  closed_detective_cases: [],
  story_moments: [],
  unlocked_memory_ids: [],
  memory_unlock_times: {},
  open_detective_cases: [],
  missions_completed: 0,
  events_saved: [],
  events_completed: [],
  event_titles: {},
});

for (const world of LIVE_CONTINUITY_WORLDS) {
  const snap = resolveWorldContinuity(emptyBundle(world));
  if (!snap.context || !snap.continue.href) err(world, 'resolveWorldContinuity incomplete');
  if (!snap.narrative || snap.narrative.includes('Last visited')) err(world, 'narrative must be story-based');
  if (!Array.isArray(snap.active_memory)) err(world, 'missing active_memory tier');
  if (!Array.isArray(snap.story_memory)) err(world, 'missing story_memory tier');
}

const journey = resolveJourneyContinuity(LIVE_CONTINUITY_WORLDS.map(emptyBundle));
if (!journey.headline) err('journey', 'resolveJourneyContinuity failed');

const timeline = resolveMemoryTimeline([]);
if (!Array.isArray(timeline)) err('timeline', 'resolveMemoryTimeline failed');

const journeyPage = join(ROOT, 'apps/platform/components/living-worlds/LivingWorldPanels.tsx');
if (!readFileSync(journeyPage, 'utf8').includes('JourneyContinuityPanel')) {
  err('/my-journey', 'missing JourneyContinuityPanel');
}

const hub = join(ROOT, 'apps/platform/components/world-experience/WorldPremiumHub.tsx');
if (!readFileSync(hub, 'utf8').includes('WorldContinuityReturnPanel')) {
  err('world hub', 'missing WorldContinuityReturnPanel');
}

const timelinePage = join(ROOT, 'apps/platform/app/passport/timeline/page.tsx');
if (!existsSync(timelinePage)) err('/passport/timeline', 'missing page');

const clientState = join(ROOT, 'apps/platform/lib/world-continuity/client-state.ts');
if (!existsSync(clientState)) err('client-state', 'missing');

const atlasGraph = join(ROOT, 'apps/platform/lib/bourbon-atlas/graph.ts');
if (!existsSync(atlasGraph)) err('atlas-graph', 'missing Phase 2 graph');

const relSeeds = join(ROOT, 'apps/platform/lib/bourbon-atlas/relationship-seeds.ts');
if (!existsSync(relSeeds)) err('atlas-relationships', 'missing Phase 2 seeds');

const panel = join(ROOT, 'apps/platform/components/world-continuity/ContinuityPanels.tsx');
const panelSrc = readFileSync(panel, 'utf8');
if (panelSrc.includes('Last login') || panelSrc.includes('Recent activity') || panelSrc.includes('progress_pct')) {
  err('ContinuityPanels', 'must not show login/activity/progress UI');
}
if (!panelSrc.includes('Anticipation') && !panelSrc.includes('anticipation')) {
  err('ContinuityPanels', 'missing anticipation memory UI');
}

console.log('\n=== PASS-034P World Continuity Audit ===\n');
console.log(`Worlds: ${LIVE_CONTINUITY_WORLDS.length}`);

if (errors.length) {
  console.log('\nErrors:');
  for (const e of errors) console.log(`  [${e.page}] ${e.message}`);
  console.log(`\n✗ audit:continuity FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('\n✓ audit:continuity PASSED\n');
