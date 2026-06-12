import type { CrossWorldDiscovery, LivingJourneySnapshot } from './types';

const WORLD_NAMES: Record<string, string> = {
  'ai-builder': 'AI Builder',
  'financial-independence': 'Financial Independence',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic Engagement',
  entrepreneur: 'Entrepreneur / Business Builder',
  'government-systems': 'Government Systems',
  'grassroots-nonprofit': 'Grassroots & Nonprofits',
  bourbon: 'Bourbon',
  bbq: 'BBQ',
  poker: 'Poker',
  'event-planning': 'Event Planning',
  'content-creator': 'Content Creator',
};

type Signal = {
  test: (s: LivingJourneySnapshot) => boolean;
  to: string;
  reason: string;
  because: string[];
  weight: number;
  adultOnly?: boolean;
};

const SIGNALS: Signal[] = [
  {
    test: (s) => missionCount(s, 'ai-builder') >= 2 && /\b(built|automati|assistant|shipped)\b/i.test(s.all_reflection_text),
    to: 'entrepreneur',
    reason: 'Productize what you build',
    because: ['You already ship tools', 'Entrepreneur world teaches validation and pricing'],
    weight: 92,
  },
  {
    test: (s) => /\b(host|tasting|guest|friends|teach|present)\b/i.test(s.all_reflection_text),
    to: 'public-speaking',
    reason: 'Structure what you host',
    because: ['You already gather people', 'Hosts who narrate pours or cooks become memorable'],
    weight: 88,
  },
  {
    test: (s) => missionCount(s, 'bourbon') >= 1 || journalCount(s, 'bourbon') > 0,
    to: 'public-speaking',
    reason: 'Host tastings with a narrative arc',
    because: ['Bourbon stewards teach out loud', 'Speaking world sharpens your hosting'],
    weight: 85,
    adultOnly: true,
  },
  {
    test: (s) => missionCount(s, 'bourbon') >= 1,
    to: 'bbq',
    reason: 'Pair smoke with pour',
    because: ['Passion worlds compound', 'BBQ pairing nights are a natural second act'],
    weight: 78,
    adultOnly: true,
  },
  {
    test: (s) => missionCount(s, 'public-speaking') >= 1,
    to: 'civic-engagement',
    reason: 'Speak up where it counts',
    because: ['You can deliver a message', 'Civic world applies voice to meetings and ballots'],
    weight: 82,
  },
  {
    test: (s) => missionCount(s, 'civic-engagement') >= 1,
    to: 'government-systems',
    reason: 'Understand how power actually works',
    because: ['You engage civically', 'Government Systems explains agencies and rulemaking'],
    weight: 80,
  },
  {
    test: (s) => missionCount(s, 'financial-independence') >= 2,
    to: 'entrepreneur',
    reason: 'Turn money discipline into a business',
    because: ['You track money carefully', 'Founders need the budget muscle you are building'],
    weight: 75,
  },
  {
    test: (s) => HOST_AND_CREATE(s),
    to: 'content-creator',
    reason: 'Document the craft publicly',
    because: ['You create experiences for others', 'Reviews and hosts often become creators'],
    weight: 70,
  },
];

function HOST_AND_CREATE(s: LivingJourneySnapshot): boolean {
  return (
    /\b(review|photo|journal|notes|wrote)\b/i.test(s.all_reflection_text) &&
    (missionCount(s, 'bourbon') > 0 || missionCount(s, 'bbq') > 0)
  );
}

function missionCount(s: LivingJourneySnapshot, slug: string): number {
  return s.worlds.find((w) => w.world_slug === slug)?.completed_missions.length ?? 0;
}

function journalCount(s: LivingJourneySnapshot, slug: string): number {
  return s.worlds.find((w) => w.world_slug === slug)?.journal_items ?? 0;
}

const ADULT_WORLDS = new Set(['bourbon', 'poker', 'bbq', 'cigars', 'medical-cannabis-literacy']);

export function discoverCrossWorldPaths(snapshot: LivingJourneySnapshot): CrossWorldDiscovery[] {
  const alreadyActive = new Set(snapshot.active_world_slugs);
  const recs: CrossWorldDiscovery[] = [];

  for (const signal of SIGNALS) {
    if (alreadyActive.has(signal.to)) continue;
    if (signal.adultOnly && snapshot.user_segment === 'student') continue;
    if (signal.adultOnly && snapshot.user_segment === 'teen' && ADULT_WORLDS.has(signal.to)) continue;
    if (!signal.test(snapshot)) continue;

    recs.push({
      world_slug: signal.to,
      world_name: WORLD_NAMES[signal.to] ?? signal.to,
      reason: signal.reason,
      href: liveHref(signal.to),
      because: signal.because,
      score: signal.weight,
    });
  }

  return recs.sort((a, b) => b.score - a.score).slice(0, 4);
}

function liveHref(slug: string): string {
  const live: Record<string, string> = {
    'ai-builder': '/ai-builder',
    'financial-independence': '/financial-independence',
    'public-speaking': '/public-speaking',
    'civic-engagement': '/civic-engagement',
    bourbon: '/bourbon',
    bbq: '/bbq',
    poker: '/poker',
  };
  return live[slug] ?? `/explore/${slug}`;
}
