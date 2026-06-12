import type { LivingJourneySnapshot, SomeoneLikeMePattern } from './types';

type Pattern = {
  after_mission: string;
  world_slug: string;
  message: string;
  next_world: string;
  next_label: string;
  href: string;
};

const PATTERNS: Pattern[] = [
  {
    after_mission: 'homework-assistant',
    world_slug: 'ai-builder',
    message: 'People who complete Homework Assistant often explore Entrepreneurship next.',
    next_world: 'entrepreneur',
    next_label: 'Entrepreneur',
    href: '/explore',
  },
  {
    after_mission: 'homework-assistant',
    world_slug: 'ai-builder',
    message: 'Many AI Builders eventually demo on stage — Public Speaking pairs naturally.',
    next_world: 'public-speaking',
    next_label: 'Public Speaking',
    href: '/public-speaking',
  },
  {
    after_mission: 'first-budget',
    world_slug: 'financial-independence',
    message: 'Wealth Builders who finish First Budget usually research index funds within two weeks.',
    next_world: 'financial-independence',
    next_label: 'FI missions',
    href: '/financial-independence/missions',
  },
  {
    after_mission: 'first-talk',
    world_slug: 'public-speaking',
    message: 'Speakers who log First Talk often host a tasting or dinner — event skills compound.',
    next_world: 'bourbon',
    next_label: 'Bourbon hosting',
    href: '/bourbon/missions/first-tasting',
  },
  {
    after_mission: 'first-tasting',
    world_slug: 'bourbon',
    message: 'Bourbon hosts who teach friends frequently sharpen narrative in Public Speaking.',
    next_world: 'public-speaking',
    next_label: 'Public Speaking',
    href: '/public-speaking',
  },
  {
    after_mission: 'first-pork-butt',
    world_slug: 'bbq',
    message: 'Pitmasters who finish their first long cook often explore bourbon pairings.',
    next_world: 'bourbon',
    next_label: 'Bourbon pairings',
    href: '/bourbon/pairings',
  },
];

export function getSomeoneLikeMePatterns(snapshot: LivingJourneySnapshot, worldSlug?: string): SomeoneLikeMePattern[] {
  const completed = new Set(
    snapshot.worlds.flatMap((w) => w.completed_missions.map((m) => `${w.world_slug}:${m.missionSlug}`)),
  );

  const matches = PATTERNS.filter((p) => {
    if (worldSlug && p.world_slug !== worldSlug) return false;
    return completed.has(`${p.world_slug}:${p.after_mission}`);
  });

  const generic: SomeoneLikeMePattern[] = [];
  if (matches.length === 0 && worldSlug === 'ai-builder') {
    generic.push({
      message: 'Many AI Builders eventually explore Entrepreneurship after their third shipped project.',
      href: '/explore',
      next_label: 'Explore paths',
    });
  }
  if (matches.length === 0 && worldSlug === 'financial-independence') {
    generic.push({
      message: 'People who stick with budgeting for 30 days often say financial freedom became real when investing clicked.',
      href: '/financial-independence/glossary',
      next_label: 'FI glossary',
    });
  }

  return [
    ...matches.map((m) => ({
      message: m.message,
      href: m.href,
      next_label: m.next_label,
    })),
    ...generic,
  ].slice(0, 2);
}
