import type { MasteryPath } from '../types';

function domainPaths(
  verticalSlug: string,
  verticalId: string,
  paths: Array<{ slug: string; display_name: string; tagline: string; tier: MasteryPath['tier'] }>
): MasteryPath[] {
  return paths.map((p) => ({
    slug: p.slug,
    display_name: p.display_name,
    tagline: p.tagline,
    vertical_id: verticalId,
    vertical_slug: verticalSlug,
    tier: p.tier,
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'projects', 'community'],
    status: 'draft' as const,
    milestones: [
      {
        slug: `${p.slug}-start`,
        category: 'learn',
        title: `Begin ${p.display_name.replace('Road to ', '')}`,
        description: 'Start the path',
        requirement: 'Academy Level 1',
        sort_order: 1,
      },
    ],
  }));
}

export const POKER_PATHS = domainPaths('poker', 'gaming', [
  { slug: 'road-to-recreational-player', display_name: 'Road to Recreational Player', tagline: 'Play confidently for fun', tier: 'enthusiast' },
  { slug: 'road-to-winning-cash-player', display_name: 'Road to Winning Cash Player', tagline: 'Profitable sessions', tier: 'expert' },
  { slug: 'road-to-tournament-grinder', display_name: 'Road to Tournament Grinder', tagline: 'Volume and variance mastery', tier: 'expert' },
  { slug: 'road-to-local-champion', display_name: 'Road to Local Champion', tagline: 'Win your scene', tier: 'master' },
  { slug: 'road-to-poker-mentor', display_name: 'Road to Poker Mentor', tagline: 'Teach the next generation', tier: 'steward' },
]);

export const PUBLIC_SPEAKING_PATHS = domainPaths('public-speaking', 'professional-specialty', [
  { slug: 'road-to-confident-speaker', display_name: 'Road to Confident Speaker', tagline: 'Overcome fear', tier: 'enthusiast' },
  { slug: 'road-to-club-speaker', display_name: 'Road to Club Speaker', tagline: 'Regular practice', tier: 'expert' },
  { slug: 'road-to-keynote-speaker', display_name: 'Road to Keynote Speaker', tagline: 'Stages and stages', tier: 'master' },
  { slug: 'road-to-trainer', display_name: 'Road to Trainer', tagline: 'Teach speaking skills', tier: 'steward' },
  { slug: 'road-to-master-communicator', display_name: 'Road to Master Communicator', tagline: 'Lifetime craft', tier: 'master' },
]);

export const CAMPAIGN_PATHS = domainPaths('campaign-management', 'professional-specialty', [
  { slug: 'road-to-volunteer', display_name: 'Road to Volunteer', tagline: 'First canvass', tier: 'enthusiast' },
  { slug: 'road-to-precinct-captain', display_name: 'Road to Precinct Captain', tagline: 'Neighborhood leadership', tier: 'expert' },
  { slug: 'road-to-field-director', display_name: 'Road to Field Director', tagline: 'Run the ground game', tier: 'steward' },
  { slug: 'road-to-campaign-manager', display_name: 'Road to Campaign Manager', tagline: 'Full campaign ops', tier: 'master' },
  { slug: 'road-to-political-strategist', display_name: 'Road to Political Strategist', tagline: 'Win races', tier: 'master' },
]);

export const GARDENER_PATHS = domainPaths('master-gardener', 'home-garden', [
  { slug: 'road-to-home-gardener', display_name: 'Road to Home Gardener', tagline: 'First plot', tier: 'enthusiast' },
  { slug: 'road-to-vegetable-grower', display_name: 'Road to Vegetable Grower', tagline: 'Feed your table', tier: 'expert' },
  { slug: 'road-to-orchard-steward', display_name: 'Road to Orchard Steward', tagline: 'Trees and seasons', tier: 'historian' },
  { slug: 'road-to-community-garden-leader', display_name: 'Road to Community Garden Leader', tagline: 'Lead shared plots', tier: 'steward' },
  { slug: 'road-to-master-gardener', display_name: 'Road to Master Gardener', tagline: 'Certified expertise', tier: 'master' },
]);

export const MAGIC_PATHS = domainPaths('magic-the-gathering', 'gaming', [
  { slug: 'road-to-new-player', display_name: 'Road to New Player', tagline: 'Learn the rules', tier: 'enthusiast' },
  { slug: 'road-to-competitive-player', display_name: 'Road to Competitive Player', tagline: 'FNM ready', tier: 'expert' },
  { slug: 'road-to-deck-builder', display_name: 'Road to Deck Builder', tagline: 'Archetypes and meta', tier: 'expert' },
  { slug: 'road-to-tournament-champion', display_name: 'Road to Tournament Champion', tagline: 'Win events', tier: 'master' },
  { slug: 'road-to-community-mentor', display_name: 'Road to Community Mentor', tagline: 'Grow the player base', tier: 'steward' },
]);

export const IDENTITY_DOMAIN_PATHS: MasteryPath[] = [
  ...POKER_PATHS,
  ...PUBLIC_SPEAKING_PATHS,
  ...CAMPAIGN_PATHS,
  ...GARDENER_PATHS,
  ...MAGIC_PATHS,
];
