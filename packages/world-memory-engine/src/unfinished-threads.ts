import type { ContinuitySignalBundle } from '@foundry/world-continuity-engine';
import type { MemoryEnrichedBundle, UnfinishedThread, WorldMemorySignals } from './types';

function compareHref(worldSlug: string, mode: string, a: string, b: string): string {
  if (worldSlug === 'bourbon') {
    return `/bourbon/compare?mode=${mode === 'producers' ? 'producers' : 'bottles'}&a=${a}&b=${b}`;
  }
  return `/${worldSlug}/compare?a=${a}&b=${b}`;
}

function graphHref(worldSlug: string, slug: string): string {
  return worldSlug === 'bourbon' ? `/bourbon/graph/${slug}` : `/${worldSlug}/graph/${slug}`;
}

/** Unfinished missions, open cases, saved rabbit holes — ranked by pull */
export function detectUnfinishedThreads(bundle: MemoryEnrichedBundle): UnfinishedThread[] {
  const { memory } = bundle;
  const threads: UnfinishedThread[] = [];

  const nearComplete = bundle.unfinished_collections.find((c) =>
    c.remaining_label.includes('1 discovery') || c.remaining_label.includes('1 '),
  );
  if (nearComplete) {
    threads.push({
      id: `col-near-${nearComplete.collection_id}`,
      kind: 'collection',
      label: nearComplete.title,
      href: nearComplete.href ?? `/${bundle.world_slug}/portfolio`,
      priority: 100,
      reason: `One step away from completing ${nearComplete.title}.`,
    });
  }

  for (const hole of memory.saved_rabbit_holes.filter((h) => h.world_slug === bundle.world_slug).slice(0, 3)) {
    threads.push({
      id: `rabbit-${hole.slug}`,
      kind: 'atlas',
      label: hole.title,
      href: graphHref(bundle.world_slug, hole.slug),
      priority: 90,
      reason: 'Saved rabbit hole still open.',
    });
  }

  for (const c of bundle.open_detective_cases) {
    threads.push({
      id: c.slug,
      kind: 'detective',
      label: c.title,
      href: c.href,
      priority: 85,
      reason: 'Case still waiting for a verdict.',
    });
  }

  for (const col of bundle.unfinished_collections.filter((c) => c !== nearComplete)) {
    threads.push({
      id: `col-${col.collection_id}`,
      kind: 'collection',
      label: `${col.title} — ${col.remaining_label}`,
      href: col.href ?? `/${bundle.world_slug}/portfolio`,
      priority: 70,
      reason: 'Collection in progress.',
    });
  }

  for (const comp of memory.comparisons.filter((c) => c.world_slug === bundle.world_slug).slice(0, 2)) {
    threads.push({
      id: `compare-${comp.slug_a}-${comp.slug_b}`,
      kind: 'debate',
      label: `${comp.label_a} vs ${comp.label_b}`,
      href: compareHref(bundle.world_slug, comp.mode, comp.slug_a, comp.slug_b),
      priority: 75,
      reason: 'Comparison left without a conclusion.',
    });
  }

  for (const id of bundle.events_saved) {
    if (bundle.events_completed.includes(id)) continue;
    const meta = bundle.event_titles[id];
    if (meta) {
      threads.push({
        id,
        kind: 'bookmark',
        label: meta.title,
        href: meta.href,
        priority: 60,
        reason: 'Bookmarked but not finished.',
      });
    }
  }

  return threads.sort((a, b) => b.priority - a.priority).slice(0, 8);
}

export function mergeMemoryIntoBundle(
  bundle: ContinuitySignalBundle,
  memory: WorldMemorySignals,
): MemoryEnrichedBundle {
  return { ...bundle, memory };
}

export function emptyMemorySignals(): WorldMemorySignals {
  return { graph_views: [], saved_rabbit_holes: [], comparisons: [], first_unlock_times: {} };
}
