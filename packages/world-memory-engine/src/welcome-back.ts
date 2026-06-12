import {
  resolveAnticipation,
  resolveMemoryObjects,
  resolveWorldContinuity,
  type ContinuitySignalBundle,
} from '@foundry/world-continuity-engine';
import { resolveAtlasRabbitHoleResume } from './atlas-resume';
import { detectUnfinishedThreads, mergeMemoryIntoBundle } from './unfinished-threads';
import { resolveFirstMemoryObjects } from './memory-objects';
import type {
  JourneyWelcomeBackSnapshot,
  MemoryEnrichedBundle,
  WelcomeBackLine,
  WelcomeBackSnapshot,
  WorldMemorySignals,
} from './types';

function graphHref(worldSlug: string, slug: string): string {
  return worldSlug === 'bourbon' ? `/bourbon/graph/${slug}` : `/${worldSlug}/graph/${slug}`;
}

function compareHref(worldSlug: string, mode: string, a: string, b: string): string {
  if (worldSlug === 'bourbon') {
    return `/bourbon/compare?mode=${mode === 'producers' ? 'producers' : 'bottles'}&a=${a}&b=${b}`;
  }
  return `/${worldSlug}/compare?a=${a}&b=${b}`;
}

function formatGraphTitle(title: string): string {
  return title.replace(/\s+hallway$/i, '').trim();
}

/** Bullet lines — the world was waiting for you */
export function buildWelcomeBackLines(bundle: MemoryEnrichedBundle): WelcomeBackLine[] {
  const lines: WelcomeBackLine[] = [];
  const { memory, world_slug } = bundle;

  const lastGraph = memory.graph_views.find((g) => g.world_slug === world_slug);
  if (lastGraph) {
    lines.push({
      id: `graph-${lastGraph.slug}`,
      text: `You were exploring ${formatGraphTitle(lastGraph.title)}.`,
      href: graphHref(world_slug, lastGraph.slug),
      kind: 'exploration',
    });
  } else {
    const lastAtlas = bundle.atlas_views[0];
    if (lastAtlas) {
      lines.push({
        id: `atlas-${lastAtlas.term_slug}`,
        text: `You were exploring ${lastAtlas.title}.`,
        href: `/${world_slug}/atlas/${lastAtlas.term_slug}`,
        kind: 'exploration',
      });
    }
  }

  const saved = memory.saved_rabbit_holes.find((h) => h.world_slug === world_slug);
  if (saved) {
    lines.push({
      id: `saved-${saved.slug}`,
      text: 'You saved a rabbit hole.',
      href: graphHref(world_slug, saved.slug),
      kind: 'rabbit_hole',
    });
  }

  const comp = memory.comparisons.find((c) => c.world_slug === world_slug);
  if (comp) {
    const singleName =
      comp.label_b.toLowerCase().includes('wild turkey 101') || comp.label_a.toLowerCase().includes('wild turkey 101');
    lines.push({
      id: `compare-${comp.slug_a}-${comp.slug_b}`,
      text: singleName
        ? `You compared ${comp.label_a.toLowerCase().includes('wild turkey') ? comp.label_a : comp.label_b}.`
        : `You compared ${comp.label_a} and ${comp.label_b}.`,
      href: compareHref(world_slug, comp.mode, comp.slug_a, comp.slug_b),
      kind: 'comparison',
    });
  }

  const nearComplete = bundle.unfinished_collections.find((c) =>
    c.remaining_label.includes('1 discovery') || c.remaining_label.includes('1 '),
  );
  if (nearComplete) {
    lines.push({
      id: `near-${nearComplete.collection_id}`,
      text: `You were one step away from completing ${nearComplete.title}.`,
      href: nearComplete.href ?? `/${world_slug}/portfolio`,
      kind: 'collection',
    });
  }

  const openCase = bundle.open_detective_cases[0];
  if (openCase && !lines.some((l) => l.kind === 'detective')) {
    lines.push({
      id: `case-${openCase.slug}`,
      text: `You left ${openCase.title} open.`,
      href: openCase.href,
      kind: 'detective',
    });
  }

  if (bundle.world_changed_hint && bundle.last_visit_at) {
    lines.push({
      id: 'debate-new',
      text: 'A new debate opened since then.',
      href: `/${world_slug}/today`,
      kind: 'debate',
    });
  }

  return lines.slice(0, 6);
}

function pickContinue(
  bundle: MemoryEnrichedBundle,
  threads: ReturnType<typeof detectUnfinishedThreads>,
  anticipation?: ReturnType<typeof resolveAnticipation>,
): WelcomeBackSnapshot['continue'] {
  const resume = resolveAtlasRabbitHoleResume(bundle.world_slug, bundle.memory);
  if (resume) {
    return {
      label: 'Pick the thread back up',
      href: resume.href,
      reason: `${resume.title} is still here.`,
    };
  }

  if (anticipation) {
    return {
      label: anticipation.label,
      href: anticipation.href,
      reason: anticipation.suggestion,
    };
  }

  if (threads.length > 0) {
    const t = threads[0]!;
    return {
      label: 'Pick the thread back up',
      href: t.href,
      reason: t.reason,
    };
  }

  return {
    label: 'See what is alive today',
    href: `/${bundle.world_slug}/today`,
    reason: 'The world moved while you were away.',
  };
}

export function resolveWelcomeBack(
  bundle: ContinuitySignalBundle,
  memory: WorldMemorySignals,
): WelcomeBackSnapshot {
  const enriched = mergeMemoryIntoBundle(bundle, memory);
  const base = resolveWorldContinuity(bundle);
  const threads = detectUnfinishedThreads(enriched);
  const lines = buildWelcomeBackLines(enriched);
  const anticipation = resolveAnticipation(bundle);

  const continuityStory = resolveMemoryObjects(
    bundle.world_slug,
    bundle.unlocked_memory_ids,
    bundle.memory_unlock_times,
  );
  const firstStory = resolveFirstMemoryObjects(bundle.world_slug, memory.first_unlock_times);
  const storyIds = new Set(continuityStory.map((s) => s.id));
  const story_memory = [
    ...continuityStory,
    ...firstStory.filter((s) => !storyIds.has(s.id)),
  ];

  const since_then = [...base.since_then];
  if (anticipation && !since_then.includes(anticipation.suggestion)) {
    since_then.unshift(anticipation.suggestion);
  }

  return {
    world_slug: bundle.world_slug,
    world_name: bundle.world_name,
    headline: 'Last time you were here…',
    lines,
    active_memory: threads.map(({ priority: _p, reason: _r, ...t }) => t),
    story_memory,
    anticipation,
    since_then: Array.from(new Set(since_then)).slice(0, 4),
    continue: pickContinue(enriched, threads, anticipation),
  };
}

export function resolveJourneyWelcomeBack(
  bundles: ContinuitySignalBundle[],
  memories: WorldMemorySignals[],
): JourneyWelcomeBackSnapshot {
  const active = bundles.filter(
    (b, i) => {
      const m = memories[i] ?? memories[0];
      if (!m) return false;
      return (
        b.missions_completed > 0 ||
        b.atlas_views.length > 0 ||
        b.events_saved.length > 0 ||
        b.latest_unlock_label ||
        b.open_detective_cases.length > 0 ||
        b.unfinished_collections.length > 0 ||
        m.graph_views.some((g) => g.world_slug === b.world_slug) ||
        m.saved_rabbit_holes.some((h) => h.world_slug === b.world_slug) ||
        m.comparisons.some((c) => c.world_slug === b.world_slug)
      );
    },
  );

  const snapshots = active.map((b, i) => {
    const mem = memories.find((_, idx) => bundles[idx]?.world_slug === b.world_slug) ??
      memories[bundles.indexOf(b)] ??
      { graph_views: [], saved_rabbit_holes: [], comparisons: [], first_unlock_times: {} };
    return resolveWelcomeBack(b, mem);
  });

  const lines = snapshots.flatMap((s) => s.lines).slice(0, 8);
  const allActive = snapshots.flatMap((s) => s.active_memory).slice(0, 8);
  const story_memory = snapshots.flatMap((s) => s.story_memory).slice(0, 6);
  const topAnticipation = snapshots.find((s) => s.anticipation)?.anticipation;
  const since_then = Array.from(new Set(snapshots.flatMap((s) => s.since_then))).slice(0, 5);
  const topContinue = snapshots.find((s) => s.lines.length > 0)?.continue ?? snapshots[0]?.continue;

  return {
    headline: 'Last time you were here…',
    intro:
      active.length === 0
        ? 'Continuity starts when you leave evidence — a graph hallway, a saved rabbit hole, or a collection almost done. The world will remember your place.'
        : 'The worlds kept your threads open — not a resume of clicks, but stories waiting for you.',
    lines,
    active_memory: allActive,
    story_memory,
    anticipation: topAnticipation,
    since_then,
    continue_label: 'Pick the thread back up',
    continue_href: topContinue?.href ?? '/my-journey',
  };
}
