/** Assemble continuity signal bundles from all client engines */

import type { ContinuitySignalBundle } from '@foundry/world-continuity-engine';
import { ALL_CONSEQUENCE_CHAINS } from '@foundry/consequence-engine';
import { getEventById } from '@foundry/world-events-engine';
import { ACTIVE_WORLDS } from '../living-worlds/active-worlds';
import { getWorldCollections, getCollectorStore } from '../collector/client-state';
import { getWorldEventsState } from '../world-events/client-state';
import {
  getAtlasViewsForWorld,
  getLatestContext,
  getLatestIntent,
  getLastVisit,
  getMemoryObjectIds,
  getMemorySignalsForWorld,
  syncMemoryObjects,
} from './client-state';

const CONSEQUENCE_KEY = 'foundry-consequence-state';

const BOURBON_DETECTIVE_CASES: { slug: string; title: string }[] = [
  { slug: 'weller-ghost', title: 'Weller Allocation Mystery' },
  { slug: 'bib-guarantee', title: 'BiB Guarantee Case' },
  { slug: 'dsp-numbers', title: 'DSP Numbers Case' },
  { slug: 'eagle-rare-price', title: 'Eagle Rare Price Case' },
  { slug: 'allocated-worth', title: 'Allocated Worth Case' },
  { slug: 'barrel-floor', title: 'Barrel Floor Case' },
  { slug: 'store-pick-magic', title: 'Store Pick Magic Case' },
];

function readConsequenceState() {
  if (typeof window === 'undefined') return { appliedNodes: {} as Record<string, string>, triggers: [] as string[] };
  try {
    return JSON.parse(localStorage.getItem(CONSEQUENCE_KEY) ?? 'null') ?? { appliedNodes: {}, triggers: [] };
  } catch {
    return { appliedNodes: {}, triggers: [] };
  }
}

function wasDetectiveClosed(slug: string): boolean {
  const s = readConsequenceState();
  return s.triggers.includes(`bourbon:detective_case_closed:${slug}`);
}

function detectiveClosedAt(slug: string): string | undefined {
  const s = readConsequenceState();
  const key = `bourbon:detective_case_closed:${slug}`;
  if (!s.triggers.includes(key)) return undefined;
  for (const chain of ALL_CONSEQUENCE_CHAINS) {
    for (const node of chain.nodes) {
      if (node.id.includes(slug) || node.label.toLowerCase().includes(slug.replace(/-/g, ' '))) {
        const at = s.appliedNodes[node.id];
        if (at) return at;
      }
    }
  }
  return new Date().toISOString();
}

function latestUnlockForWorld(worldSlug: string): { label?: string; at?: string } {
  const state = readConsequenceState();
  let latest: { label?: string; at?: string } = {};
  let latestTime = 0;
  for (const chain of ALL_CONSEQUENCE_CHAINS) {
    if (chain.trigger.world_slug !== worldSlug) continue;
    for (const node of chain.nodes) {
      const at = state.appliedNodes[node.id];
      if (!at) continue;
      const t = new Date(at).getTime();
      if (t > latestTime && node.kind !== 'action') {
        latestTime = t;
        latest = { label: node.label, at };
      }
    }
  }
  return latest;
}

function readPortfolio(key: string) {
  if (typeof window === 'undefined') return [] as { missionTitle: string; reflection: string; completedAt: string }[];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

function eventMetaForWorld(worldSlug: string, eventIds: string[]) {
  const titles: Record<string, { title: string; href: string }> = {};
  for (const id of eventIds) {
    const ev = getEventById(id);
    if (ev && ev.world_slug === worldSlug) {
      titles[id] = { title: ev.title, href: ev.primary_action.href };
    }
  }
  return titles;
}

export function assembleContinuityBundle(worldSlug: string): ContinuitySignalBundle {
  const world = ACTIVE_WORLDS.find((w) => w.slug === worldSlug);
  const portfolio = world ? readPortfolio(world.portfolioKey) : [];
  const collections = getWorldCollections(worldSlug);
  const store = getCollectorStore();
  const events = getWorldEventsState();
  const worldEventFilter = (id: string) => id.startsWith(worldSlug) || id.includes(worldSlug.split('-')[0] ?? '');

  const allEventIds = [...new Set([...events.viewed, ...events.saved, ...events.completed, ...Object.keys(events.votes)])];
  const event_titles = eventMetaForWorld(worldSlug, allEventIds.filter(worldEventFilter));

  const collectionItems = collections.reduce((n, c) => n + c.unlocked_count, 0);
  const detectiveClosed = worldSlug === 'bourbon' ? BOURBON_DETECTIVE_CASES.filter((c) => wasDetectiveClosed(c.slug)).length : 0;

  syncMemoryObjects(worldSlug, {
    missions_completed: portfolio.length,
    events_completed: events.completed.filter(worldEventFilter).length,
    collection_items_unlocked: collectionItems,
    detective_cases_closed: detectiveClosed,
  });

  const memory = getMemoryObjectIds(worldSlug);
  const unlock = latestUnlockForWorld(worldSlug);

  const unfinished_collections = collections
    .filter((c) => !c.completed && c.unlocked_count > 0)
    .map((c) => ({
      collection_id: c.definition.id,
      title: c.definition.title,
      remaining_label: c.progress_label.replace(/^(\d+) of (\d+)/, (_, a, b) => {
        const rem = Number(b) - Number(a);
        return rem === 1 ? '1 discovery away' : `${rem} discoveries away`;
      }),
      href: c.definition.href,
    }));

  const completed_collections = collections
    .filter((c) => c.completed)
    .map((c) => ({
      collection_id: c.definition.id,
      title: c.definition.title,
      completed_at: store.collections[c.definition.id]?.completed_at ?? new Date().toISOString(),
      href: c.definition.href,
    }));

  const closed_detective_cases =
    worldSlug === 'bourbon'
      ? BOURBON_DETECTIVE_CASES.filter((c) => wasDetectiveClosed(c.slug)).map((c) => ({
          slug: c.slug,
          title: c.title,
          closed_at: detectiveClosedAt(c.slug) ?? new Date().toISOString(),
          href: `/bourbon/detective/${c.slug}`,
        }))
      : [];

  const open_detective_cases =
    worldSlug === 'bourbon'
      ? BOURBON_DETECTIVE_CASES.filter((c) => !wasDetectiveClosed(c.slug)).map((c) => ({
          slug: c.slug,
          title: c.title,
          href: `/bourbon/detective/${c.slug}`,
        }))
      : [];

  const saved = events.saved.filter(worldEventFilter);
  const recent_discoveries = saved.map((id) => event_titles[id]?.title).filter(Boolean) as string[];

  const story_moments = portfolio.slice(0, 5).map((p: { missionTitle: string; reflection: string; completedAt: string }, i: number) => ({
    id: `mission-${worldSlug}-${i}`,
    title: p.missionTitle,
    story: p.reflection || 'You did the work — not just read about it.',
    at: p.completedAt,
    href: `/${worldSlug}/portfolio`,
  }));

  return {
    world_slug: worldSlug,
    world_name: world?.name ?? worldSlug,
    mentor_name: world?.mentorName ?? 'Mentor',
    last_visit_at: getLastVisit(worldSlug),
    last_context: getLatestContext(worldSlug) ?? undefined,
    intent: getLatestIntent(worldSlug),
    open_thread_ids: [],
    atlas_views: getAtlasViewsForWorld(worldSlug),
    recent_discoveries,
    unfinished_collections,
    completed_collections,
    closed_detective_cases,
    story_moments,
    unlocked_memory_ids: memory.map((m) => m.id),
    memory_unlock_times: Object.fromEntries(memory.map((m) => [m.id, m.unlocked_at])),
    open_detective_cases,
    latest_unlock_label: unlock.label,
    latest_unlock_at: unlock.at,
    missions_completed: portfolio.length,
    last_mission_title: portfolio[0]?.missionTitle,
    events_saved: saved,
    events_completed: events.completed.filter(worldEventFilter),
    event_titles,
    world_changed_hint:
      worldSlug === 'bourbon' ? 'The Bourbon world has a new daily mystery and weekly rivalry.' : `The ${world?.name ?? worldSlug} world has fresh events this week.`,
  };
}

export function assembleAllContinuityBundles(): ContinuitySignalBundle[] {
  return ACTIVE_WORLDS.map((w) => assembleContinuityBundle(w.slug));
}

export function assembleMemorySignalsForWorld(worldSlug: string) {
  return getMemorySignalsForWorld(worldSlug);
}

export function assembleAllMemorySignals() {
  return ACTIVE_WORLDS.map((w) => getMemorySignalsForWorld(w.slug));
}
