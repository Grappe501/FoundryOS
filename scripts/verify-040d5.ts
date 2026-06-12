#!/usr/bin/env npx tsx
/**
 * PASS-040D.5 — compound loop verification
 */
import { propagateIdentityEvent } from '../packages/identity-sync-engine/src';
import { collectorEventsFromAction, applyCollectorEvents, emptyStore } from '../packages/collector-engine/src';
import { resolveWorldIdentityNarrative } from '../packages/identity-narrative-engine/src';
import { mergeMemoryIntoBundle, buildWelcomeBackLines } from '../packages/world-memory-engine/src';
import type { ContinuitySignalBundle } from '../packages/world-continuity-engine';

const now = new Date().toISOString();
const errors: string[] = [];

function check(name: string, pass: boolean) {
  console.log(`${pass ? '✓' : '✗'} ${name}`);
  if (!pass) errors.push(name);
}

// 1. WT101 tasting artifact → collection
const tasting = propagateIdentityEvent({
  type: 'artifact_created',
  world_slug: 'bourbon',
  at: now,
  artifact: {
    id: 'art_wt101',
    type: 'journal',
    user_id: 'test',
    metadata: {
      world_slug: 'bourbon',
      title: 'Wild Turkey 101 tasting notes',
      occurred_at: now,
      privacy: 'private',
      evidence: 'self_reported',
      payload: { bottle_slug: 'wild-turkey-101' },
      entities: [{ world_slug: 'bourbon', entity_type: 'bottle', slug: 'wild-turkey-101', title: 'Wild Turkey 101' }],
    },
    relations: [],
    created_at: now,
    updated_at: now,
  },
});

check('artifact advances collection', tasting.collection_updates.length > 0);

const store = emptyStore();
for (const u of tasting.collection_updates) {
  const events = collectorEventsFromAction(u.world_slug, u.action_type, u.action_id);
  applyCollectorEvents(store, events);
}
check('collection store updated', Object.keys(store.collections).length > 0);

// 2. Identity narrative reflects artifact
const narrative = resolveWorldIdentityNarrative({
  world_slug: 'bourbon',
  missions_completed: 0,
  mission_titles: [],
  reflections: [],
  consequence_node_ids: [],
  consequence_labels: [],
  active_collections: [{ id: 'blind-tasting-detective', title: 'Blind Tasting Detective', unlocked: 1, total: 4 }],
  completed_collection_ids: [],
  events_voted: [],
  events_completed: [],
  events_saved: [],
  debate_topics: [],
  journal_entries: 0,
  artifact_count: 1,
  recent_artifact_titles: ['Wild Turkey 101 tasting notes'],
  recent_artifact_types: ['journal'],
});
check('identity narrative generated', Boolean(narrative?.recent_pattern));

// 3. Memory + welcome-back
const bundle: ContinuitySignalBundle = {
  world_slug: 'bourbon',
  world_name: 'Bourbon',
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
};

const memory = {
  graph_views: [],
  saved_rabbit_holes: [],
  comparisons: [],
  first_unlock_times: {},
  sync_threads: tasting.welcome_back_threads.map((t) => ({
    id: t.id,
    text: t.text,
    href: t.href,
    at: now,
    world_slug: 'bourbon',
  })),
};

const lines = buildWelcomeBackLines(mergeMemoryIntoBundle(bundle, memory));
check('welcome-back references artifact thread', lines.some((l) => l.text.includes('Wild Turkey') || l.text.includes('created')));

check('passport update from artifact', tasting.passport_updates.some((p) => p.kind === 'artifact_highlight'));

console.log('\n=== PASS-040D.5 Compound Loop ===\n');

if (errors.length) {
  console.log(`✗ verify:040d5 FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('✓ verify:040d5 PASSED\n');
