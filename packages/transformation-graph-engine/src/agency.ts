/**
 * Agency Principle — Foundry optimizes for agency, not knowledge, mastery, or completion.
 * The bridge between knowing and doing.
 */
export const AGENCY_PRINCIPLE = {
  optimizes_for: 'Agency',
  not: ['Knowledge', 'Mastery', 'Completion'],
  question: 'Can this person take meaningful action?',
  bridge: 'Agency is the bridge between knowing and doing. Without it, people consume. With it, people transform.',
} as const;

export const KNOWLEDGE_NOT_TRANSFORMATION =
  'Knowledge ≠ Transformation. Some actions matter enormously. Some barely matter.';

export const WEIGHTING_EVOLUTION =
  'Relationship weighting evolves toward Transformation Impact — not Content Consumption.';

export type AgencyMetricExample = {
  domain: string;
  bad_metric: string;
  good_metric: string;
};

export const AGENCY_METRIC_EXAMPLES: AgencyMetricExample[] = [
  {
    domain: 'Public Speaking',
    bad_metric: 'Read 20 articles',
    good_metric: 'Delivered first speech',
  },
  {
    domain: 'Gardening',
    bad_metric: 'Completed 10 lessons',
    good_metric: 'Harvested first tomatoes',
  },
  {
    domain: 'Programming',
    bad_metric: 'Watched 50 videos',
    good_metric: 'Built first application',
  },
  {
    domain: 'Campaign Management',
    bad_metric: 'Finished training',
    good_metric: 'Organized first canvass',
  },
];
