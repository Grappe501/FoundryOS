import type { ContinuitySignalBundle, MemoryTimelineEntry } from './types';
import { MEMORY_OBJECT_CATALOG } from './memory-objects';

function monthLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/** Story memory timeline — identity accumulation, not activity log */
export function resolveMemoryTimeline(bundles: ContinuitySignalBundle[]): MemoryTimelineEntry[] {
  const entries: MemoryTimelineEntry[] = [];

  for (const bundle of bundles) {
    for (const id of bundle.unlocked_memory_ids) {
      const def = MEMORY_OBJECT_CATALOG.find((m) => m.id === id);
      if (!def) continue;
      const at = bundle.memory_unlock_times[id] ?? new Date().toISOString();
      entries.push({
        id: `memory-${id}`,
        at,
        month_label: monthLabel(at),
        title: def.title,
        story: def.story,
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        kind: 'story',
      });
    }

    for (const c of bundle.completed_collections) {
      entries.push({
        id: `collection-${c.collection_id}`,
        at: c.completed_at,
        month_label: monthLabel(c.completed_at),
        title: `Completed ${c.title}`,
        story: 'Evidence replaced guessing — a collection closed.',
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        href: c.href,
        kind: 'story',
      });
    }

    for (const c of bundle.closed_detective_cases) {
      entries.push({
        id: `detective-${c.slug}`,
        at: c.closed_at,
        month_label: monthLabel(c.closed_at),
        title: `Solved ${c.title}`,
        story: 'You chose investigation over hype.',
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        href: c.href,
        kind: 'story',
      });
    }

    for (const m of bundle.story_moments) {
      entries.push({
        id: m.id,
        at: m.at,
        month_label: monthLabel(m.at),
        title: m.title,
        story: m.story,
        world_slug: bundle.world_slug,
        world_name: bundle.world_name,
        href: m.href,
        kind: 'story',
      });
    }
  }

  return entries.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}
