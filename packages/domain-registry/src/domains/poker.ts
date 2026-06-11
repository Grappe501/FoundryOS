import type { IdentityDomain } from '../types';

export const POKER_DOMAIN: IdentityDomain = {
  slug: 'poker',
  display_name: 'Poker',
  tagline: 'Most sites teach strategy. Foundry builds players.',
  category: 'hobbies',
  care_reason: 'Poker is a lifelong identity — discipline, reads, bankroll, community, and mentorship over thousands of hours.',
  paths: [
    'road-to-recreational-player',
    'road-to-winning-cash-player',
    'road-to-tournament-grinder',
    'road-to-local-champion',
    'road-to-poker-mentor',
  ],
  projects: [
    'first-tournament',
    'first-final-table',
    'bankroll-challenge',
    'host-home-game',
    'teach-beginner',
  ],
  community_types: ['Local poker circles', 'Study groups', 'Tournament teams'],
  legacy_signals: ['Tournaments won', 'Students mentored', 'Strategy guides created'],
  collection_types: ['Session log', 'Hand history', 'Study library'],
  status: 'exemplar',
};
