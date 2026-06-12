import { resolveMemoryTimeline, type ContinuitySignalBundle } from '@foundry/world-continuity-engine';
import { FIRST_MEMORY_CATALOG } from './memory-objects';
import type { MemoryTimelineStoryEntry, WorldMemorySignals } from './types';

function monthLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/** Story + graph milestones for passport timeline */
export function resolveExtendedMemoryTimeline(
  bundles: ContinuitySignalBundle[],
  memories: WorldMemorySignals[],
): MemoryTimelineStoryEntry[] {
  const base = resolveMemoryTimeline(bundles) as MemoryTimelineStoryEntry[];

  for (let i = 0; i < bundles.length; i++) {
    const bundle = bundles[i]!;
    const memory = memories[i] ?? memories.find((_, idx) => bundles[idx]?.world_slug === bundle.world_slug);
    if (!memory) continue;

    for (const [id, at] of Object.entries(memory.first_unlock_times)) {
      const def = FIRST_MEMORY_CATALOG.find((m) => m.id === id);
      if (!def || def.world_slug !== bundle.world_slug) continue;
      base.push({
        id: `first-${id}`,
        at,
        month_label: monthLabel(at),
        title: def.timeline_title,
        story: def.story,
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        kind: 'story',
      });
    }

    for (const g of memory.graph_views.filter((v) => v.world_slug === bundle.world_slug).slice(0, 3)) {
      base.push({
        id: `graph-visit-${g.slug}-${g.at}`,
        at: g.at,
        month_label: monthLabel(g.at),
        title: `Explored ${g.title}`,
        story: 'A hallway in the graph — connections over lists.',
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        href: bundle.world_slug === 'bourbon' ? `/bourbon/graph/${g.slug}` : `/${bundle.world_slug}/graph/${g.slug}`,
        kind: 'active',
      });
    }

    for (const c of memory.comparisons.filter((v) => v.world_slug === bundle.world_slug).slice(0, 2)) {
      base.push({
        id: `compare-${c.slug_a}-${c.slug_b}-${c.at}`,
        at: c.at,
        month_label: monthLabel(c.at),
        title: `Compared ${c.label_a} and ${c.label_b}`,
        story: 'Side by side — differences that ratings hide.',
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        href:
          bundle.world_slug === 'bourbon'
            ? `/bourbon/compare?mode=${c.mode}&a=${c.slug_a}&b=${c.slug_b}`
            : `/${bundle.world_slug}/compare?a=${c.slug_a}&b=${c.slug_b}`,
        kind: 'active',
      });
    }
  }

  return base.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}
