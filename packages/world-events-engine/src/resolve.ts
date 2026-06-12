import type { WorldEvent, WorldEventDefinition, WorldEventsSnapshot } from './types';
import { WORLD_EVENT_TYPES, LIVE_EVENT_WORLDS } from './types';
import { dateKey, weekKey, pick, dayWindow, weekWindow, rivalrySplit } from './rotate';
import { getEventPool, allEventDefinitions } from './worlds';

const HERO_HOOKS: Record<string, string> = {
  bourbon: 'Something is happening in bourbon today — allocation whispers, rickhouse physics, and a weekly rivalry between houses.',
  'ai-builder': 'Builders are voting on no-code vs code while someone ships their first automation this week.',
  'public-speaking': 'Nerves, slides, and a three-minute talk — the stage is live this week.',
  'civic-engagement': 'A board meeting spotlight and a debate about public comment — democracy as verb.',
  bbq: 'Brisket stalls, smoke ring myths, and offset vs pellet — the pit is active.',
  poker: 'GTO vs exploitative, ten-hand reviews, and position under the spotlight.',
  'financial-independence': 'Budgets, index funds, and seven days of tracking — money as state.',
};

function resolveEvent(def: WorldEventDefinition, d: Date): WorldEvent {
  const isWeekly = def.event_type === 'weekly_rivalry' || def.event_type === 'challenge';
  const window = isWeekly ? weekWindow(d) : dayWindow(d);
  const event: WorldEvent = {
    ...def,
    ...window,
    status: 'active',
  };
  if (def.event_type === 'weekly_rivalry' && def.rivalry_options?.length) {
    event.rivalry_split = rivalrySplit(
      def.rivalry_options.map((o) => o.id),
      `${def.event_id}:${weekKey(d)}`,
    );
  }
  return event;
}

function activeForType(worldSlug: string, type: (typeof WORLD_EVENT_TYPES)[number], d: Date): WorldEvent | null {
  const pool = getEventPool(worldSlug);
  if (!pool) return null;
  const candidates = pool[type];
  if (candidates.length === 0) return null;
  const seed = `${worldSlug}:${type}:${type === 'weekly_rivalry' || type === 'challenge' ? weekKey(d) : dateKey(d)}`;
  const def = pick(candidates, seed);
  return resolveEvent(def, d);
}

export function getActiveWorldEvents(worldSlug: string, d = new Date()): WorldEventsSnapshot | null {
  const pool = getEventPool(worldSlug);
  if (!pool) return null;

  const events = WORLD_EVENT_TYPES.map((t) => activeForType(worldSlug, t, d)).filter(Boolean) as WorldEvent[];
  const mystery = events.find((e) => e.event_type === 'daily_mystery');

  return {
    world_slug: worldSlug,
    date_key: dateKey(d),
    week_key: weekKey(d),
    hero_title: mystery?.title ?? `What's alive in ${worldSlug.replace(/-/g, ' ')}`,
    hero_hook: mystery?.short_hook ?? HERO_HOOKS[worldSlug] ?? 'Something is happening here today.',
    events,
  };
}

export function getEventById(eventId: string, d = new Date()): WorldEvent | null {
  const def = allEventDefinitions().find((e) => e.event_id === eventId);
  if (!def) return null;
  return resolveEvent(def, d);
}

export type CrossWorldHighlight = {
  world_slug: string;
  href: string;
  hero_title: string;
  hero_hook: string;
  challenge_title?: string;
};

export function getCrossWorldEventHighlights(d = new Date(), limit = 7): CrossWorldHighlight[] {
  return LIVE_EVENT_WORLDS.map((w) => getActiveWorldEvents(w, d))
    .filter((snap): snap is WorldEventsSnapshot => snap !== null)
    .slice(0, limit)
    .map((snap) => ({
      world_slug: snap.world_slug,
      href: `/${snap.world_slug}/today`,
      hero_title: snap.hero_title,
      hero_hook: snap.hero_hook,
      challenge_title: snap.events.find((e) => e.event_type === 'challenge')?.title,
    }));
}

export { EVENT_TYPE_LABELS } from './types';
