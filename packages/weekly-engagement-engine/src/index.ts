/** Weekly engagement push — schedule + message slot types */

export type WeeklyPushChannel = 'web_push' | 'native_push' | 'email_fallback';

export type WeeklyPushMessageKind =
  | 'graph_rabbit_hole'
  | 'artifact_nudge'
  | 'mission_reminder'
  | 'atlas_term_weekend'
  | 'collection_path';

export type WeeklyPushSchedule = {
  /** ISO week key e.g. 2026-W24 */
  week_key: string;
  /** User-local delivery window */
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  hour: number;
  minute: number;
  timezone: string;
};

export type WeeklyPushPayload = {
  user_id: string;
  world_slug: string;
  kind: WeeklyPushMessageKind;
  title: string;
  body: string;
  deep_link: string;
  schedule: WeeklyPushSchedule;
};

/** Deterministic pseudo-random from user + week — same user gets new slot each week */
function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isoWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/**
 * Compute delivery window for one user for one week.
 * Day and time change week-to-week; stays stable within the week.
 */
export function computeWeeklyPushSchedule(
  userId: string,
  timezone: string,
  referenceDate: Date = new Date(),
): WeeklyPushSchedule {
  const weekKey = isoWeekKey(referenceDate);
  const seed = hashSeed(`${userId}:${weekKey}`);

  const day_of_week = (seed % 7) as WeeklyPushSchedule['day_of_week'];
  const hour = 8 + (Math.floor(seed / 7) % 12);
  const minute = (Math.floor(seed / 91) % 4) * 15;

  return { week_key: weekKey, day_of_week, hour, minute, timezone };
}

/** Placeholder message factory — PASS-041W wires graph + artifact context */
export function buildWeeklyDrawInMessage(input: {
  userId: string;
  worldSlug: string;
  graphSlug?: string;
  graphTitle?: string;
  schedule: WeeklyPushSchedule;
}): WeeklyPushPayload {
  const title = input.graphTitle
    ? `This week: ${input.graphTitle}`
    : 'Your hallway is waiting';
  const body = input.graphSlug
    ? `One rabbit hole, one session — open ${input.graphTitle ?? input.graphSlug} and log what you find.`
    : 'Foundry saved a doorway for you. Explore, taste, collect evidence.';

  return {
    user_id: input.userId,
    world_slug: input.worldSlug,
    kind: 'graph_rabbit_hole',
    title,
    body,
    deep_link: input.graphSlug ? `/bourbon/graph/${input.graphSlug}` : '/bourbon',
    schedule: input.schedule,
  };
}

export function validateWeeklyEngagementEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const a = computeWeeklyPushSchedule('user-a', 'America/New_York', new Date('2026-06-01'));
  const b = computeWeeklyPushSchedule('user-a', 'America/New_York', new Date('2026-06-08'));
  if (a.week_key === b.week_key) errors.push('week keys should differ across dates');
  if (a.day_of_week === b.day_of_week && a.hour === b.hour && a.minute === b.minute) {
    errors.push('schedule should vary week-to-week for same user');
  }
  const msg = buildWeeklyDrawInMessage({
    userId: 'user-a',
    worldSlug: 'bourbon',
    graphSlug: 'bottled-in-bond',
    graphTitle: 'Bottled in Bond',
    schedule: a,
  });
  if (!msg.deep_link.includes('bottled-in-bond')) errors.push('deep link missing graph slug');
  return { ok: errors.length === 0, errors };
}
