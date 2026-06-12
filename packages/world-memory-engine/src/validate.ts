import { LIVE_CONTINUITY_WORLDS } from '@foundry/world-continuity-engine';
import { buildWelcomeBackLines, resolveJourneyWelcomeBack, resolveWelcomeBack } from './welcome-back';
import { detectUnfinishedThreads, mergeMemoryIntoBundle } from './unfinished-threads';
import { resolveAtlasRabbitHoleResume } from './atlas-resume';
import { FIRST_MEMORY_CATALOG, detectGraphFirstUnlocks } from './memory-objects';
import { resolveExtendedMemoryTimeline } from './timeline';
import type { ContinuitySignalBundle } from '@foundry/world-continuity-engine';
import type { WorldMemorySignals } from './types';

const FORBIDDEN_COPY = ['Recent activity', 'Continue lesson', 'Last login', 'progress_pct'];

export function validateWorldMemoryEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (FIRST_MEMORY_CATALOG.length < 4) {
    errors.push('FIRST_MEMORY_CATALOG must include graph-era firsts');
  }

  const emptyBundle = (world: string): ContinuitySignalBundle => ({
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
    world_changed_hint: 'Fresh debate.',
    last_visit_at: new Date(Date.now() - 86400000).toISOString(),
  });

  const richMemory: WorldMemorySignals = {
    graph_views: [{ world_slug: 'bourbon', slug: 'bottled-in-bond', title: 'Bottled-in-Bond', at: new Date().toISOString() }],
    saved_rabbit_holes: [{ world_slug: 'bourbon', slug: 'bottled-in-bond', title: 'Bottled-in-Bond', at: new Date().toISOString() }],
    comparisons: [{
      world_slug: 'bourbon',
      slug_a: 'wild-turkey-101',
      slug_b: 'buffalo-trace',
      label_a: 'Wild Turkey 101',
      label_b: 'Buffalo Trace',
      mode: 'bottles',
      at: new Date().toISOString(),
    }],
    first_unlock_times: {},
  };

  const bourbonBundle = {
    ...emptyBundle('bourbon'),
    world_name: 'Bourbon',
    unfinished_collections: [{
      collection_id: 'wheated-explorer',
      title: 'Wheated Explorer',
      remaining_label: '1 discovery away',
      href: '/bourbon/portfolio',
    }],
  };

  const snap = resolveWelcomeBack(bourbonBundle, richMemory);
  if (snap.headline !== 'Last time you were here…') errors.push('headline must be "Last time you were here…"');
  if (snap.continue.label !== 'Pick the thread back up' && !snap.continue.label.includes('See what')) {
    errors.push('continue must offer pick-up thread or alive today');
  }
  if (snap.lines.length < 3) errors.push('welcome-back must produce at least 3 lines for rich memory');

  const lineTexts = snap.lines.map((l) => l.text).join(' ');
  if (!lineTexts.includes('Bottled-in-Bond') && !lineTexts.includes('exploring')) {
    errors.push('welcome-back must mention last exploration');
  }
  if (!lineTexts.includes('rabbit hole')) errors.push('welcome-back must mention saved rabbit hole');
  if (!lineTexts.includes('Wild Turkey 101') && !lineTexts.includes('compared')) {
    errors.push('welcome-back must mention comparison');
  }
  if (!lineTexts.includes('Wheated Explorer')) errors.push('welcome-back must mention near-complete collection');

  const threads = detectUnfinishedThreads(mergeMemoryIntoBundle(bourbonBundle, richMemory));
  if (threads.length === 0) errors.push('unfinished-thread detector must find threads');

  const resume = resolveAtlasRabbitHoleResume('bourbon', richMemory);
  if (!resume?.href.includes('bottled-in-bond')) errors.push('atlas-rabbit-hole resume must prefer saved hole');

  const journey = resolveJourneyWelcomeBack(
    LIVE_CONTINUITY_WORLDS.map((w) => emptyBundle(w)),
    LIVE_CONTINUITY_WORLDS.map(() => ({ graph_views: [], saved_rabbit_holes: [], comparisons: [], first_unlock_times: {} })),
  );
  if (journey.continue_label !== 'Pick the thread back up') errors.push('journey continue_label wrong');

  const firstIds = detectGraphFirstUnlocks('bourbon', {}, { graph_views: 1, comparisons: 1, saved_rabbit_holes: 1, missions_completed: 0 });
  if (firstIds.length < 3) errors.push('detectGraphFirstUnlocks must unlock graph-era firsts');

  const timeline = resolveExtendedMemoryTimeline([bourbonBundle], [richMemory]);
  if (!Array.isArray(timeline)) errors.push('extended timeline failed');

  const lines = buildWelcomeBackLines(mergeMemoryIntoBundle(bourbonBundle, richMemory));
  for (const forbidden of FORBIDDEN_COPY) {
    if (JSON.stringify(lines).includes(forbidden)) errors.push(`forbidden copy: ${forbidden}`);
  }

  return { ok: errors.length === 0, errors };
}
