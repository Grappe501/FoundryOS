import type { IdentityContext, LivingJourneySnapshot, SecretPath } from './types';

const HOST_RE = /\b(host|tasting|guest|friends|teach|event|organize)\b/i;
const BUILD_RE = /\b(built|automati|assistant|workflow|shipped|software|app)\b/i;
const CIVIC_RE = /\b(meeting|ballot|precinct|volunteer|campaign|town hall)\b/i;
const REVIEW_RE = /\b(review|journal|notes|wrote|photo)\b/i;

type PathRule = {
  id: string;
  title: string;
  tagline: string;
  sourceWorld: string;
  linksTo: { world: string; label: string }[];
  test: (s: LivingJourneySnapshot) => boolean;
};

const RULES: PathRule[] = [
  {
    id: 'event-host',
    title: 'Event Host',
    tagline: 'You gather people — tastings, tables, and teaching moments.',
    sourceWorld: 'bourbon',
    linksTo: [
      { world: 'public-speaking', label: 'Structure your hosting voice' },
      { world: 'entrepreneur', label: 'Monetize experiences' },
      { world: 'civic-engagement', label: 'Lead community gatherings' },
    ],
    test: (s) =>
      missionCount(s, 'bourbon') >= 1 &&
      (HOST_RE.test(s.all_reflection_text) || journalCount(s, 'bourbon') > 0),
  },
  {
    id: 'software-founder',
    title: 'Software Founder',
    tagline: 'You ship tools — the next step is products with customers.',
    sourceWorld: 'ai-builder',
    linksTo: [
      { world: 'entrepreneur', label: 'Validate and price' },
      { world: 'financial-independence', label: 'Model revenue' },
    ],
    test: (s) => missionCount(s, 'ai-builder') >= 2 && BUILD_RE.test(s.all_reflection_text),
  },
  {
    id: 'community-organizer',
    title: 'Community Organizer',
    tagline: 'You show up where decisions happen.',
    sourceWorld: 'civic-engagement',
    linksTo: [
      { world: 'public-speaking', label: 'Voice at meetings' },
      { world: 'grassroots-nonprofit', label: 'Build nonprofit muscle' },
    ],
    test: (s) => missionCount(s, 'civic-engagement') >= 1 && CIVIC_RE.test(s.all_reflection_text),
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    tagline: 'You document craft — reviews, journals, and stories.',
    sourceWorld: 'bourbon',
    linksTo: [
      { world: 'public-speaking', label: 'On-camera presence' },
      { world: 'ai-builder', label: 'Automate publishing' },
    ],
    test: (s) => REVIEW_RE.test(s.all_reflection_text) && (missionCount(s, 'bourbon') > 0 || missionCount(s, 'bbq') > 0),
  },
  {
    id: 'confident-presenter',
    title: 'Confident Presenter',
    tagline: 'You are putting reps in — influence is within reach.',
    sourceWorld: 'public-speaking',
    linksTo: [
      { world: 'civic-engagement', label: 'Speak where it counts' },
      { world: 'entrepreneur', label: 'Pitch what you build' },
    ],
    test: (s) => missionCount(s, 'public-speaking') >= 1 && !/\b(nervous|terrified)\b/i.test(s.all_reflection_text.slice(-500)),
  },
];

function missionCount(s: LivingJourneySnapshot, slug: string): number {
  return s.worlds.find((w) => w.world_slug === slug)?.completed_missions.length ?? 0;
}

function journalCount(s: LivingJourneySnapshot, slug: string): number {
  return s.worlds.find((w) => w.world_slug === slug)?.journal_items ?? 0;
}

export function discoverSecretPaths(snapshot: LivingJourneySnapshot, alreadyDiscovered: string[] = []): SecretPath[] {
  const paths: SecretPath[] = [];
  for (const rule of RULES) {
    if (!rule.test(snapshot)) continue;
    paths.push({
      id: rule.id,
      title: rule.title,
      tagline: rule.tagline,
      source_world: rule.sourceWorld,
      links_to: rule.linksTo,
      newly_discovered: !alreadyDiscovered.includes(rule.id),
      href: `/my-journey#secret-${rule.id}`,
    });
  }
  return paths;
}

export function ambitionFromSecretPaths(paths: SecretPath[]): string[] {
  return paths.map((p) => p.id);
}
