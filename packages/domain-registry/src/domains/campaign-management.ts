import type { IdentityDomain } from '../types';

export const CAMPAIGN_MANAGEMENT_DOMAIN: IdentityDomain = {
  slug: 'campaign-management',
  display_name: 'Campaign Management',
  tagline: 'Leadership in the field — not just politics',
  category: 'careers',
  care_reason: 'Campaign management is leadership under pressure — organizing people, winning races, building lasting political infrastructure.',
  paths: [
    'road-to-volunteer',
    'road-to-precinct-captain',
    'road-to-field-director',
    'road-to-campaign-manager',
    'road-to-political-strategist',
  ],
  projects: [
    'run-first-canvass',
    'recruit-10-volunteers',
    'build-precinct-operation',
    'run-city-campaign',
    'run-statewide-operation',
  ],
  community_types: ['Campaign operators', 'Field organizers', 'Communications professionals'],
  legacy_signals: ['Campaigns run', 'Volunteers trained', 'Races won'],
  status: 'exemplar',
};
