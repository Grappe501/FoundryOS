import type { LifeJourney } from '../types';
import { JOURNEY_COMMUNITY_LEADER } from './community-leader';

const JOURNEY_TEMPLATES: LifeJourney[] = [
  {
    slug: 'become-great-parent',
    display_name: 'Become a Great Parent',
    journey_statement: 'Raise capable, connected children.',
    linked_outcome_slugs: [],
    equation_phase: 'legacy',
    market: 'life',
    status: 'planned',
  },
  {
    slug: 'become-successful-entrepreneur',
    display_name: 'Become a Successful Entrepreneur',
    journey_statement: 'Build ventures that create value.',
    linked_outcome_slugs: ['become-ai-builder', 'become-financially-independent'],
    equation_phase: 'contribution',
    market: 'career',
    status: 'planned',
  },
  JOURNEY_COMMUNITY_LEADER,
  {
    slug: 'become-skilled-craftsman',
    display_name: 'Become a Skilled Craftsman',
    journey_statement: 'Master a craft through practice and teaching.',
    linked_outcome_slugs: ['become-master-gardener'],
    equation_phase: 'capability',
    market: 'hobby',
    status: 'planned',
  },
  {
    slug: 'become-lifelong-learner',
    display_name: 'Become a Lifelong Learner',
    journey_statement: 'Never stop growing across domains.',
    linked_outcome_slugs: [],
    equation_phase: 'potential',
    market: 'education',
    status: 'planned',
  },
  {
    slug: 'become-public-servant',
    display_name: 'Become a Public Servant',
    journey_statement: 'Serve communities through civic leadership.',
    linked_outcome_slugs: ['become-better-leader'],
    equation_phase: 'contribution',
    market: 'career',
    status: 'planned',
  },
  {
    slug: 'become-research-scientist',
    display_name: 'Become a Research Scientist',
    journey_statement: 'Advance human knowledge through rigorous inquiry.',
    linked_outcome_slugs: ['become-doctor'],
    equation_phase: 'capability',
    market: 'education',
    status: 'planned',
  },
];

export const LIFE_JOURNEYS_REGISTRY: LifeJourney[] = JOURNEY_TEMPLATES;

export function getLifeJourney(slug: string): LifeJourney | undefined {
  return LIFE_JOURNEYS_REGISTRY.find((j) => j.slug === slug);
}

export function getJourneysForOutcome(outcomeSlug: string): LifeJourney[] {
  return LIFE_JOURNEYS_REGISTRY.filter((j) => j.linked_outcome_slugs.includes(outcomeSlug));
}
