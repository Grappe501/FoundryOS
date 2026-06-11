/**
 * Transformation Patterns — observed patterns, not AI guesses (registry reserved).
 */
export const TRANSFORMATION_PATTERNS_PRINCIPLE = {
  headline: 'Transformation Patterns',
  rule: 'Not AI guesses. Observed patterns.',
  timing: 'Registry — eventual, not PASS-010 code',
} as const;

export type TransformationPattern = {
  slug: string;
  outcome_slug: string;
  display_name: string;
  pattern: string;
  sample_size?: number;
  source: 'observed' | 'exemplar';
  status: 'exemplar' | 'planned';
};

export const TRANSFORMATION_PATTERNS_REGISTRY: TransformationPattern[] = [
  {
    slug: 'strong-public-speakers',
    outcome_slug: 'become-better-speaker',
    display_name: 'Strong Public Speakers',
    pattern: 'People who became strong public speakers usually completed these 5 projects.',
    sample_size: 8400,
    source: 'observed',
    status: 'exemplar',
  },
  {
    slug: 'successful-gardeners',
    outcome_slug: 'master-gardener',
    display_name: 'Successful Gardeners',
    pattern: 'People who became successful gardeners usually overcame these 3 obstacles.',
    sample_size: 2100,
    source: 'observed',
    status: 'exemplar',
  },
  {
    slug: 'campaign-managers',
    outcome_slug: 'campaign-strategist',
    display_name: 'Campaign Managers',
    pattern: 'People who became campaign managers usually mentored others before reaching mastery.',
    sample_size: 4200,
    source: 'observed',
    status: 'exemplar',
  },
];

export function getTransformationPattern(slug: string): TransformationPattern | undefined {
  return TRANSFORMATION_PATTERNS_REGISTRY.find((p) => p.slug === slug);
}
