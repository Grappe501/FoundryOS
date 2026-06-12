import type { BuildUserIdentityInput, UserIdentityContext } from './types';

const TOPIC_LABELS: Record<string, string> = {
  'value-bourbon': 'value bourbon',
  'bottled-in-bond': 'government-trust standards',
  wheated: 'wheated/allocation questions',
  'mash-bill': 'mash bill structure',
  proof: 'proof and strength',
  distillery: 'distillery campuses',
};

function labelForTopic(topic: string): string {
  return TOPIC_LABELS[topic] ?? topic.replace(/-/g, ' ');
}

export function buildCuriositySummary(topics: { topic: string; weight: number }[]): string {
  if (topics.length === 0) return 'You are still building a curiosity profile — graph walks and artifacts will sharpen it.';
  const top = topics.slice(0, 3).map((t) => labelForTopic(t.topic));
  if (top.length === 1) return `You seem drawn to ${top[0]}.`;
  if (top.length === 2) return `You seem drawn to ${top[0]} and ${top[1]}.`;
  return `You seem drawn to ${top[0]}, ${top[1]}, and ${top[2]}.`;
}

export function buildUserIdentityContext(input: BuildUserIdentityInput): UserIdentityContext {
  const { world_slug, memory_state, artifacts = [], collections = [], narrative } = input;
  const worldArtifacts = artifacts.filter((a) => a.metadata.world_slug === world_slug);

  const curiosity_topics = Object.entries(memory_state.curiosity_weights ?? {})
    .filter(([k]) => k.startsWith(`${world_slug}:`) || !k.includes(':'))
    .map(([key, weight]) => {
      const topic = key.includes(':') ? key.split(':').slice(1).join(':') : key;
      return { topic, weight, label: labelForTopic(topic) };
    })
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8);

  const graph_views = (memory_state.graph_views ?? [])
    .filter((g) => g.world_slug === world_slug)
    .slice(-12);

  const saved_rabbit_holes = (memory_state.saved_rabbit_holes ?? [])
    .filter((h) => h.world_slug === world_slug)
    .slice(-8);

  const comparisons = (memory_state.comparisons ?? [])
    .filter((c) => c.world_slug === world_slug)
    .slice(-6)
    .map((c) => ({ label_a: c.label_a, label_b: c.label_b }));

  const sync_threads = (memory_state.sync_threads ?? [])
    .filter((t) => t.world_slug === world_slug)
    .slice(-6)
    .map((t) => ({ text: t.text, href: t.href }));

  return {
    world_slug,
    artifacts: worldArtifacts.slice(-8).map((a) => ({
      title: a.metadata.title,
      type: a.type,
      at: a.metadata.occurred_at ?? a.created_at,
    })),
    graph_views: graph_views.map((g) => ({ slug: g.slug, title: g.title, at: g.at })),
    saved_rabbit_holes: saved_rabbit_holes.map((h) => ({ slug: h.slug, title: h.title })),
    comparisons,
    collections,
    curiosity_topics,
    sync_threads,
    narrative,
    curiosity_summary: buildCuriositySummary(curiosity_topics),
  };
}

/** PASS-040C proof scenario — WT101 + BiB + wheated + Weller rabbit hole */
export function exampleProofUserContext(): UserIdentityContext {
  return {
    world_slug: 'bourbon',
    artifacts: [{ title: 'Wild Turkey 101 tasting notes', type: 'journal', at: '2026-06-10T12:00:00Z' }],
    graph_views: [
      { slug: 'bottled-in-bond', title: 'Bottled-in-Bond', at: '2026-06-09T18:00:00Z' },
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', at: '2026-06-10T11:00:00Z' },
    ],
    saved_rabbit_holes: [{ slug: 'weller', title: 'Weller allocation rabbit hole' }],
    comparisons: [],
    collections: [
      { id: 'blind-tasting-detective', title: 'Blind Tasting Detective', unlocked: 1, total: 4 },
      { id: 'wheated-explorer', title: 'Wheated Explorer', unlocked: 1, total: 5 },
      { id: 'bottled-in-bond-collection', title: 'Bottled-in-Bond Collection', unlocked: 1, total: 4 },
    ],
    curiosity_topics: [
      { topic: 'value-bourbon', weight: 4, label: 'value bourbon' },
      { topic: 'bottled-in-bond', weight: 3, label: 'government-trust standards' },
      { topic: 'wheated', weight: 3, label: 'wheated/allocation questions' },
    ],
    sync_threads: [{ text: 'You created Wild Turkey 101 tasting notes.', href: '/bourbon/portfolio' }],
    curiosity_summary:
      'You seem drawn to value bourbon, government-trust standards, and wheated/allocation questions.',
    narrative: {
      recent_pattern:
        'Recently you have shown a strong interest in value pours, bonded labels, and wheated shelves.',
      mentor_notice: 'Your WT101 tasting is evidence — not hype.',
      suggested_next: {
        label: 'Walk the BiB hallway',
        href: '/bourbon/graph/bottled-in-bond',
        reason: 'Government-trust standards connect to your shelf economics.',
      },
    },
  };
}
