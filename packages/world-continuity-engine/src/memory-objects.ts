import type { MemoryObjectDef } from './types';

export const MEMORY_OBJECT_CATALOG: MemoryObjectDef[] = [
  { id: 'bourbon-first-mission', world_slug: 'bourbon', title: 'Your First Tasting Logged', story: 'The pour where vocabulary started to stick.' },
  { id: 'bourbon-first-challenge', world_slug: 'bourbon', title: 'Your First Weekly Challenge', story: 'You turned world state into action.' },
  { id: 'bourbon-first-collection', world_slug: 'bourbon', title: 'Your First Collection Discovery', story: 'Evidence replaced guessing on the shelf.' },
  { id: 'bourbon-first-case', world_slug: 'bourbon', title: 'Your First Detective Case Closed', story: 'You chose investigation over hype.' },
  { id: 'ai-first-mission', world_slug: 'ai-builder', title: 'Your First Automation Shipped', story: 'Something ran without you in the loop.' },
  { id: 'ai-first-challenge', world_slug: 'ai-builder', title: 'Your First Builder Challenge', story: 'A boring task automated — proof of builder identity.' },
  { id: 'fi-first-mission', world_slug: 'financial-independence', title: 'Your First Money Decision Logged', story: 'Awareness before optimization.' },
  { id: 'ps-first-mission', world_slug: 'public-speaking', title: 'Your First Talk Recorded', story: 'The room exists even when you are nervous.' },
  { id: 'civic-first-mission', world_slug: 'civic-engagement', title: 'Your First Public Meeting', story: 'Participation beats opinion.' },
  { id: 'bbq-first-mission', world_slug: 'bbq', title: 'Your First Cook Logged', story: 'Fire, time, and notes — the pit remembers.' },
  { id: 'poker-first-mission', world_slug: 'poker', title: 'Your First Hand Reviewed', story: 'Discipline starts with evidence, not luck.' },
];

/** Conditions to auto-unlock memory objects from signals */
export function detectNewMemoryUnlocks(
  worldSlug: string,
  unlocked: string[],
  signals: {
    missions_completed: number;
    events_completed: number;
    collection_items_unlocked: number;
    detective_cases_closed: number;
  },
): string[] {
  const has = (id: string) => unlocked.includes(id);
  const ids: string[] = [];

  const rules: Record<string, () => boolean> = {
    'bourbon-first-mission': () => signals.missions_completed >= 1,
    'bourbon-first-challenge': () => signals.events_completed >= 1,
    'bourbon-first-collection': () => signals.collection_items_unlocked >= 1,
    'bourbon-first-case': () => signals.detective_cases_closed >= 1,
    'ai-first-mission': () => signals.missions_completed >= 1,
    'ai-first-challenge': () => signals.events_completed >= 1,
    'fi-first-mission': () => signals.missions_completed >= 1,
    'ps-first-mission': () => signals.missions_completed >= 1,
    'civic-first-mission': () => signals.missions_completed >= 1,
    'bbq-first-mission': () => signals.missions_completed >= 1,
    'poker-first-mission': () => signals.missions_completed >= 1,
  };

  for (const m of MEMORY_OBJECT_CATALOG) {
    if (m.world_slug !== worldSlug) continue;
    if (has(m.id)) continue;
    if (rules[m.id]?.()) ids.push(m.id);
  }
  return ids;
}

export function resolveMemoryObjects(
  worldSlug: string,
  unlockedIds: string[],
  unlockTimes: Record<string, string>,
): import('./types').UnlockedMemoryObject[] {
  return MEMORY_OBJECT_CATALOG.filter(
    (m) => m.world_slug === worldSlug && unlockedIds.includes(m.id),
  ).map((m) => ({
    ...m,
    unlocked_at: unlockTimes[m.id] ?? new Date().toISOString(),
  }));
}
