/** Passion Trinity — Identity Domains (PASS-023 foundation) */

export type PassionWorldSlug = 'bourbon' | 'bbq' | 'poker' | 'cigars';

export type PassionWorldStatus = 'foundation' | 'in_build' | 'live';

export type PassionWorld = {
  slug: PassionWorldSlug;
  name: string;
  frame: string;
  identityType: 'Identity Domain';
  href: string;
  plannedHref: string;
  portfolioLabel: string;
  portfolioKey: string;
  communityName: string;
  missionCount: number;
  status: PassionWorldStatus;
  optional?: boolean;
  nextWorld: PassionWorldSlug;
};

export const PASSION_TRINITY_TAGLINE = 'People spend decades in these domains.';

export const PASSION_WORLDS: PassionWorld[] = [
  {
    slug: 'bourbon',
    name: 'Bourbon',
    frame: 'Appreciate Craft',
    identityType: 'Identity Domain',
    href: '/bourbon',
    plannedHref: '/bourbon',
    portfolioLabel: 'My Bourbon Journey',
    portfolioKey: 'foundry-bourbon-portfolio',
    communityName: 'Bourbon Circle',
    missionCount: 5,
    status: 'foundation',
    nextWorld: 'bbq',
  },
  {
    slug: 'bbq',
    name: 'BBQ',
    frame: 'Create Experiences',
    identityType: 'Identity Domain',
    href: '/bbq',
    plannedHref: '/bbq',
    portfolioLabel: 'My BBQ Journal',
    portfolioKey: 'foundry-bbq-portfolio',
    communityName: 'Pitmasters Circle',
    missionCount: 5,
    status: 'foundation',
    nextWorld: 'poker',
  },
  {
    slug: 'poker',
    name: 'Poker',
    frame: 'Strategic Thinking',
    identityType: 'Identity Domain',
    href: '/poker',
    plannedHref: '/poker',
    portfolioLabel: 'My Poker Journey',
    portfolioKey: 'foundry-poker-portfolio',
    communityName: 'Poker Study Circle',
    missionCount: 5,
    status: 'foundation',
    nextWorld: 'bourbon',
  },
  {
    slug: 'cigars',
    name: 'Cigars',
    frame: 'Ritual & Conversation',
    identityType: 'Identity Domain',
    href: '/cigars',
    plannedHref: '/cigars',
    portfolioLabel: 'My Cigar Journal',
    portfolioKey: 'foundry-cigar-portfolio',
    communityName: 'Lounge Circle',
    missionCount: 5,
    status: 'foundation',
    optional: true,
    nextWorld: 'bourbon',
  },
];

export const PASSION_BY_SLUG = Object.fromEntries(
  PASSION_WORLDS.filter((w) => !w.optional).map((w) => [w.slug, w]),
) as Record<'bourbon' | 'bbq' | 'poker', PassionWorld>;

export const PASSION_TRINITY_CORE = PASSION_WORLDS.filter((w) => !w.optional);

/** Shared world layers — same structure as Life Leverage Trinity */
export const PASSION_WORLD_LAYERS = [
  'Academy',
  'Missions',
  'Portfolio',
  'Community',
  'Mastery',
  'Mentorship',
] as const;

export function getPassionWorld(slug: string): PassionWorld | undefined {
  return PASSION_WORLDS.find((w) => w.slug === slug);
}

export function getNextPassionWorld(slug: PassionWorldSlug): PassionWorld {
  const world = PASSION_WORLDS.find((w) => w.slug === slug)!;
  return PASSION_WORLDS.find((w) => w.slug === world.nextWorld)!;
}
