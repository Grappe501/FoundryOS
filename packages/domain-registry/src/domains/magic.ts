import type { IdentityDomain } from '../types';

export const MAGIC_DOMAIN: IdentityDomain = {
  slug: 'magic-the-gathering',
  display_name: 'Magic: The Gathering',
  tagline: 'Most sites focus on cards. Foundry focuses on becoming.',
  category: 'hobbies',
  care_reason: 'MTG is identity through decks, tournaments, and community — cards are means, mastery is the outcome.',
  paths: [
    'road-to-new-player',
    'road-to-competitive-player',
    'road-to-deck-builder',
    'road-to-tournament-champion',
    'road-to-community-mentor',
  ],
  projects: [
    'build-first-deck',
    'attend-first-fnm',
    'win-local-event',
    'create-tournament-guide',
    'mentor-new-players',
  ],
  community_types: ['Local game stores', 'FNM groups', 'Tournament teams'],
  legacy_signals: ['Events won', 'Players mentored', 'Guides published'],
  collection_types: ['Card collection', 'Deck library', 'Tournament history'],
  status: 'exemplar',
};
