import type { FoundryProject } from '../types';

function project(
  slug: string,
  display_name: string,
  vertical_slug: string,
  category: FoundryProject['category'],
  path_slug?: string
): FoundryProject {
  return {
    slug,
    display_name,
    tagline: display_name,
    vertical_slug,
    category,
    description: display_name,
    path_slug,
    status: 'draft',
    steps: [
      { slug: `${slug}-plan`, title: 'Plan', description: 'Define scope', sort_order: 1 },
      { slug: `${slug}-do`, title: 'Execute', description: 'Complete the project', sort_order: 2 },
      { slug: `${slug}-share`, title: 'Share', description: 'Document for community', sort_order: 3 },
    ],
  };
}

export const POKER_PROJECTS = [
  project('first-tournament', 'First Tournament', 'poker', 'experience', 'road-to-recreational-player'),
  project('first-final-table', 'First Final Table', 'poker', 'compete', 'road-to-tournament-grinder'),
  project('bankroll-challenge', 'Bankroll Challenge', 'poker', 'experience', 'road-to-winning-cash-player'),
  project('host-home-game', 'Host Home Game', 'poker', 'host', 'road-to-poker-mentor'),
  project('teach-beginner', 'Teach a Beginner', 'poker', 'document', 'road-to-poker-mentor'),
];

export const PUBLIC_SPEAKING_PROJECTS = [
  project('first-speech', 'First Speech', 'public-speaking', 'experience', 'road-to-confident-speaker'),
  project('wedding-toast', 'Wedding Toast', 'public-speaking', 'experience'),
  project('community-presentation', 'Community Presentation', 'public-speaking', 'host'),
  project('conference-presentation', 'Conference Presentation', 'public-speaking', 'host', 'road-to-keynote-speaker'),
  project('ted-style-talk', 'TED-Style Talk', 'public-speaking', 'host', 'road-to-master-communicator'),
];

export const CAMPAIGN_PROJECTS = [
  project('run-first-canvass', 'Run First Canvass', 'campaign-management', 'organize', 'road-to-volunteer'),
  project('recruit-10-volunteers', 'Recruit 10 Volunteers', 'campaign-management', 'organize'),
  project('build-precinct-operation', 'Build Precinct Operation', 'campaign-management', 'build', 'road-to-precinct-captain'),
  project('run-city-campaign', 'Run City Campaign', 'campaign-management', 'organize', 'road-to-campaign-manager'),
  project('run-statewide-operation', 'Run Statewide Operation', 'campaign-management', 'organize', 'road-to-political-strategist'),
];

export const GARDENER_PROJECTS = [
  project('first-raised-bed', 'First Raised Bed', 'master-gardener', 'build', 'road-to-home-gardener'),
  project('first-harvest', 'First Harvest', 'master-gardener', 'experience'),
  project('grow-summer-vegetables', 'Grow All Summer Vegetables', 'master-gardener', 'experience', 'road-to-vegetable-grower'),
  project('build-pollinator-garden', 'Build Pollinator Garden', 'master-gardener', 'build'),
  project('teach-gardening-class', 'Teach a Gardening Class', 'master-gardener', 'host', 'road-to-master-gardener'),
];

export const MAGIC_PROJECTS = [
  project('build-first-deck', 'Build First Deck', 'magic-the-gathering', 'build', 'road-to-new-player'),
  project('attend-first-fnm', 'Attend First FNM', 'magic-the-gathering', 'experience', 'road-to-competitive-player'),
  project('win-local-event', 'Win Local Event', 'magic-the-gathering', 'compete', 'road-to-tournament-champion'),
  project('create-tournament-guide', 'Create Tournament Guide', 'magic-the-gathering', 'document'),
  project('mentor-new-players', 'Mentor New Players', 'magic-the-gathering', 'host', 'road-to-community-mentor'),
];

export const IDENTITY_DOMAIN_PROJECTS: FoundryProject[] = [
  ...POKER_PROJECTS,
  ...PUBLIC_SPEAKING_PROJECTS,
  ...CAMPAIGN_PROJECTS,
  ...GARDENER_PROJECTS,
  ...MAGIC_PROJECTS,
];
