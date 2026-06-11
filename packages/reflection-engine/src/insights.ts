import type { TransformationInsight } from './types';

export const INSIGHTS_METRIC = {
  key: 'transformation_insights_captured',
  label: 'Transformation Insights Captured',
  rationale: '100M insights may be more valuable than 100M articles.',
} as const;

/** Illustrative graph-learned insights — not AI guessed */
export const EXAMPLE_GRAPH_INSIGHTS: TransformationInsight[] = [
  {
    slug: 'campaign-manager-volunteer-recruitment',
    path_slug: 'road-to-campaign-strategist',
    insight:
      'People who successfully became campaign managers often struggled with volunteer recruitment. The project that helped most was: Recruit and manage your first team of five volunteers.',
    source: 'graph',
    sample_size: 4200,
    status: 'exemplar',
  },
];
