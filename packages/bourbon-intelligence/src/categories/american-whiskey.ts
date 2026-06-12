import type { AmericanWhiskeyCategory } from '../types';
import { sv } from '../sources/citations';

export type WhiskeyCategoryRecord = {
  slug: AmericanWhiskeyCategory;
  label: string;
  legal_standard_slug?: string;
  summary: ReturnType<typeof sv<string>>;
  comparison_notes?: string;
};

export const AMERICAN_WHISKEY_CATEGORIES: WhiskeyCategoryRecord[] = [
  {
    slug: 'bourbon',
    label: 'Bourbon',
    legal_standard_slug: 'bourbon-standard-of-identity',
    summary: sv(
      'U.S. whiskey ≥51% corn, aged in charred new oak, distilled and barreled within federal proof limits, bottled ≥80 proof.',
      'verified',
      'verified',
    ),
  },
  {
    slug: 'rye_whiskey',
    label: 'Rye whiskey',
    legal_standard_slug: 'rye-whiskey-standard',
    summary: sv('U.S. whiskey ≥51% rye grain.', 'verified', 'verified'),
    comparison_notes: 'High-rye bourbon is not rye whiskey — bourbon requires ≥51% corn.',
  },
  {
    slug: 'tennessee_whiskey',
    label: 'Tennessee whiskey',
    legal_standard_slug: 'tennessee-whiskey-standard',
    summary: sv(
      'Bourbon-class whiskey made in Tennessee; charcoal mellowing is the traditional distinguishing step.',
      'commonly_reported',
      'editorial',
    ),
  },
  {
    slug: 'american_single_malt',
    label: 'American single malt',
    legal_standard_slug: 'american-single-malt-standard',
    summary: sv(
      'Single-distillery American whiskey from malted barley under TTB identity rules.',
      'commonly_reported',
      'editorial',
    ),
  },
  {
    slug: 'wheat_whiskey',
    label: 'Wheat whiskey',
    legal_standard_slug: 'wheat-whiskey-standard',
    summary: sv('U.S. whiskey ≥51% wheat — distinct from wheated bourbon (corn-primary mash with wheat substitute).', 'verified', 'verified'),
  },
  {
    slug: 'corn_whiskey',
    label: 'Corn whiskey',
    legal_standard_slug: 'corn-whiskey-standard',
    summary: sv('U.S. whiskey ≥80% corn with different barrel rules than bourbon.', 'verified', 'verified'),
  },
  {
    slug: 'blended_american_whiskey',
    label: 'Blended American whiskey',
    legal_standard_slug: 'blended-american-whiskey-standard',
    summary: sv('Blends under Part 5 — not straight bourbon.', 'verified', 'verified'),
  },
  {
    slug: 'canadian_whisky',
    label: 'Canadian whisky (comparison)',
    summary: sv(
      'Canadian regulatory category — useful comparison layer for Crown Royal vs bourbon conversations, not a Foundry production inventory category.',
      'commonly_reported',
      'editorial',
    ),
    comparison_notes: 'Labeling, blending, and additive rules differ from U.S. straight whiskey standards.',
  },
];
