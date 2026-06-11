import type { HumanOutcome } from '../types';

export const OUTCOME_MASTER_GARDENER: HumanOutcome = {
  slug: 'become-master-gardener',
  display_name: 'Become a Master Gardener',
  goal_statement: 'I want to grow food, steward land, and teach others to garden.',
  linked_domains: [
    'botany',
    'soil-science',
    'composting',
    'vegetable-production',
    'irrigation',
    'master-gardener',
  ],
  linked_paths: ['road-to-home-gardener', 'road-to-master-gardener'],
  linked_projects: ['first-raised-bed', 'first-harvest', 'teach-gardening-class'],
  category: 'craft',
  status: 'exemplar',
};
