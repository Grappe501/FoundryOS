/**
 * Transformation Data — Foundry's most valuable future asset.
 * Not personal data. Patterns of what actually works.
 */
export type TransformationInsight = {
  path_slug: string;
  display_name: string;
  sample_size: number;
  top_predictors: Array<{ rank: number; project_or_milestone: string; impact: string }>;
  average_time_to_mastery_years?: number;
  completion_multiplier?: string;
};

export const TRANSFORMATION_DATA_PRINCIPLE = {
  headline: 'Transformation Data',
  not: ['Content', 'AI', 'Courses', 'Knowledge graph alone'],
  is: 'Aggregated patterns of what predicts success on paths — anonymized, ethical, extraordinarily valuable',
} as const;

/** Example insights — illustrative until live data accumulates */
export const EXAMPLE_TRANSFORMATION_INSIGHTS: TransformationInsight[] = [
  {
    path_slug: 'road-to-confident-speaker',
    display_name: 'Road to Public Speaker',
    sample_size: 10000,
    top_predictors: [
      { rank: 1, project_or_milestone: 'Toastmasters-style practice', impact: 'highest completion correlation' },
      { rank: 2, project_or_milestone: 'Community presentations', impact: 'strong mastery predictor' },
      { rank: 3, project_or_milestone: 'Teaching others', impact: 'accelerates mentor tier' },
    ],
    average_time_to_mastery_years: 2.4,
  },
  {
    path_slug: 'road-to-ai-builder',
    display_name: 'Road to AI Builder',
    sample_size: 5000,
    top_predictors: [
      { rank: 1, project_or_milestone: 'Build CRM project', impact: '3x more likely to finish path' },
      { rank: 2, project_or_milestone: 'API integration exercise', impact: '2x completion boost' },
      { rank: 3, project_or_milestone: 'Mentor new builders', impact: 'legacy tier unlock' },
    ],
    completion_multiplier: '3x with CRM project',
  },
];
