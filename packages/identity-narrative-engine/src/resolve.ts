import type { IdentityNarrative, IdentitySignalBundle } from './types';
import { LIVE_NARRATIVE_WORLDS } from './types';
import { scoreInternalPhase } from './phases';
import { detectTopics, topicsToPhrase } from './topics';
import { getWorldNarrativeConfig, type WorldNarrativeConfig } from './worlds';

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]!;
}

function hasActivity(signals: IdentitySignalBundle): boolean {
  return (
    signals.missions_completed > 0 ||
    signals.consequence_node_ids.length > 0 ||
    signals.events_completed.length > 0 ||
    signals.active_collections.some((c) => c.unlocked > 0)
  );
}

function pickNextStep(
  signals: IdentitySignalBundle,
  config: WorldNarrativeConfig,
  topics: string[],
): IdentityNarrative['suggested_next'] {
  for (const topic of topics) {
    const next = config.topic_next[topic];
    if (next) return next;
  }
  if (signals.events_saved.length > 0 && !signals.events_completed.length) {
    return {
      label: 'Finish what you bookmarked',
      href: config.default_next.href,
      reason: 'You saved a rabbit hole — close the loop.',
    };
  }
  return config.default_next;
}

export function resolveWorldIdentityNarrative(
  signals: IdentitySignalBundle,
  mentorName?: string,
): IdentityNarrative | null {
  const config = getWorldNarrativeConfig(signals.world_slug);
  if (!config) return null;

  const phase = scoreInternalPhase(signals);
  const topics = detectTopics(signals, config);
  const seed = signals.missions_completed + signals.consequence_node_ids.length;

  const origin = pick(config.origins[phase], seed);
  let recent_pattern: string;

  if (!hasActivity(signals)) {
    recent_pattern =
      'You have not left much evidence yet — one mission, one case, or one weekly challenge will give your mentor something to notice.';
  } else if (topics.length > 0) {
    recent_pattern = `Recently you have shown a strong interest in ${topicsToPhrase(topics, config)}.`;
  } else if (signals.mission_titles.length > 0) {
    recent_pattern = `Recently your work has centered on ${signals.mission_titles.slice(0, 2).join(' and ')}.`;
  } else {
    recent_pattern = 'Recently you have been showing up — collections, events, and curiosity are compounding.';
  }

  const mentor_notice = pick(config.mentor_notices[phase], seed + 1);
  const recognition =
    phase === 'guiding'
      ? pick(config.recognitions.guiding, seed)
      : phase === 'shaping'
        ? pick(config.recognitions.shaping, seed)
        : undefined;

  return {
    world_slug: signals.world_slug,
    world_name: config.world_name,
    mentor_name: mentorName ?? config.mentor_name,
    origin,
    recent_pattern,
    mentor_notice,
    recognition,
    suggested_next: pickNextStep(signals, config, topics),
  };
}

export function resolveFoundryIdentityStory(
  bundles: IdentitySignalBundle[],
  displayName: string,
): { story: import('./types').FoundryIdentityStory; activeCount: number } {
  const worlds = bundles
    .map((b) => resolveWorldIdentityNarrative(b))
    .filter((n): n is IdentityNarrative => n !== null);

  const active = bundles.filter(
    (b) =>
      b.missions_completed > 0 ||
      b.consequence_node_ids.length > 0 ||
      b.events_completed.length > 0 ||
      b.active_collections.some((c) => c.unlocked > 0),
  );

  const primary = worlds.find((w) =>
    active.some((a) => a.world_slug === w.world_slug),
  );

  let opening: string;
  if (active.length === 0) {
    opening =
      'Your story is still opening — pick one world, complete one challenge, and Foundry will start noticing who you are becoming.';
  } else if (active.length === 1 && primary) {
    opening = `${originSummary(primary)}`;
  } else {
    opening = `You are building identity across ${active.length} worlds — not as a student, as someone with taste, judgment, and habits.`;
  }

  return {
    activeCount: active.length,
    story: {
      display_name: displayName,
      headline: 'Your Story So Far',
      opening,
      worlds,
      primary_world: primary,
    },
  };
}

function originSummary(n: IdentityNarrative): string {
  return `${n.origin} ${n.recent_pattern}`;
}

export function validateNarrativeConfigs(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const world of LIVE_NARRATIVE_WORLDS) {
    if (!getWorldNarrativeConfig(world)) errors.push(`missing config: ${world}`);
  }
  return { ok: errors.length === 0, errors };
}
