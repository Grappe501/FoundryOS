/**
 * Staff / operating facts. Never render these on the public door.
 * Cohort 01 is a human-selected hiring cohort, not a workshop achievement.
 */
export const COHORT_01 = {
  id: 'foundry-cohort-01',
  name: 'FOUNDry Cohort 01',
  capacityMin: 3,
  capacityMax: 5,
  /** First day of paid / placed work. Not a public CTA. */
  workStartsOn: '2026-11-15',
} as const;

export const FORBIDDEN_INFERENCE_KEYS = [
  'score',
  'trait',
  'fit',
  'rank',
  'personality',
  'seriousness',
  'serious',
  'skimmed',
  'engagement',
  'grit',
] as const;
