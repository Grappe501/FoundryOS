import type { LifeJourney } from '../types';
import { COMMUNITY_LEADER_OUTCOME_SLUGS } from '../outcomes/community-leader-outcomes';

export const JOURNEY_COMMUNITY_LEADER: LifeJourney = {
  slug: 'become-community-leader',
  display_name: 'Become a Community Leader',
  journey_statement: 'Lead organizations and help communities thrive.',
  linked_outcome_slugs: [...COMMUNITY_LEADER_OUTCOME_SLUGS],
  equation_phase: 'contribution',
  market: 'community',
  status: 'exemplar',
};

/** Display labels for Community Leader exemplar graph */
export const COMMUNITY_LEADER_OUTCOMES = [
  'Become a better speaker',
  'Become a better organizer',
  'Become a better writer',
  'Become a better negotiator',
  'Become a better mentor',
];
