import type { SourcedValue } from '../types';
import { ECFR_BOURBON_STANDARD, sv } from '../sources/citations';

export type LegalStandardRecord = {
  slug: string;
  category: 'bourbon' | 'rye_whiskey' | 'tennessee_whiskey' | 'american_single_malt' | 'wheat_whiskey' | 'corn_whiskey' | 'blended_american_whiskey';
  title: string;
  requirements: SourcedValue<string>[];
  distinguishes_from: string[];
};

/** Federal standards of identity — legal spine for bourbon vs other American whiskey categories */
export const LEGAL_STANDARDS: LegalStandardRecord[] = [
  {
    slug: 'bourbon-standard-of-identity',
    category: 'bourbon',
    title: 'Bourbon whiskey (U.S. standard of identity)',
    requirements: [
      sv(
        'Must be a U.S. whiskey produced from a mash of at least 51% corn.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
      sv(
        'Stored in charred new oak containers (barrel aging in new charred oak).',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
      sv(
        'Distilled to no more than 160 proof (80% ABV) and entered into the barrel at no more than 125 proof.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
      sv(
        'Bottled at no less than 80 proof (40% ABV).',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
      sv(
        'No added coloring, flavoring, or spirits other than water (straight bourbon has additional aging rules).',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
    ],
    distinguishes_from: [
      'rye_whiskey',
      'tennessee_whiskey',
      'american_single_malt',
      'wheat_whiskey',
      'corn_whiskey',
      'blended_american_whiskey',
      'canadian_whisky',
    ],
  },
  {
    slug: 'rye-whiskey-standard',
    category: 'rye_whiskey',
    title: 'Rye whiskey (U.S. standard of identity)',
    requirements: [
      sv(
        'Must be a U.S. whiskey produced from a mash of at least 51% rye grain.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
      sv(
        'Same general aging, proof, and bottling constraints as other straight U.S. whiskeys under Part 5.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
    ],
    distinguishes_from: ['bourbon', 'tennessee_whiskey', 'canadian_whisky'],
  },
  {
    slug: 'tennessee-whiskey-standard',
    category: 'tennessee_whiskey',
    title: 'Tennessee whiskey',
    requirements: [
      sv(
        'Meets bourbon requirements and is produced in Tennessee; Lincoln County Process (charcoal mellowing) is the distinguishing production step in Tennessee whiskey tradition.',
        'commonly_reported',
        'editorial',
        [ECFR_BOURBON_STANDARD],
        'State-specific production requirements also apply; verify against Tennessee law and producer disclosures.',
      ),
    ],
    distinguishes_from: ['bourbon', 'wheat_whiskey'],
  },
  {
    slug: 'american-single-malt-standard',
    category: 'american_single_malt',
    title: 'American single malt whiskey',
    requirements: [
      sv(
        'U.S. standards for American single malt were adopted in the TTB rulemaking era (2020s); must be malted barley whiskey from a single U.S. distillery.',
        'commonly_reported',
        'editorial',
        [ECFR_BOURBON_STANDARD],
        'Confirm current Part 5 text for exact malted barley percentage and production rules.',
      ),
    ],
    distinguishes_from: ['bourbon', 'rye_whiskey'],
  },
  {
    slug: 'wheat-whiskey-standard',
    category: 'wheat_whiskey',
    title: 'Wheat whiskey (U.S. standard of identity)',
    requirements: [
      sv(
        'Must be a U.S. whiskey produced from a mash of at least 51% wheat.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
    ],
    distinguishes_from: ['bourbon', 'corn_whiskey'],
  },
  {
    slug: 'corn-whiskey-standard',
    category: 'corn_whiskey',
    title: 'Corn whiskey (U.S. standard of identity)',
    requirements: [
      sv(
        'Must be a U.S. whiskey produced from a mash of at least 80% corn; if aged, must use used or uncharred new oak containers (differs from bourbon new-char requirement).',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
    ],
    distinguishes_from: ['bourbon'],
  },
  {
    slug: 'blended-american-whiskey-standard',
    category: 'blended_american_whiskey',
    title: 'Blended American whiskey',
    requirements: [
      sv(
        'Blend of straight whiskey(s) with neutral spirits or other whiskeys per Part 5 identity standards.',
        'verified',
        'verified',
        [ECFR_BOURBON_STANDARD],
      ),
    ],
    distinguishes_from: ['bourbon', 'rye_whiskey'],
  },
];

export const CANADIAN_WHISKY_COMPARISON = {
  slug: 'canadian-whisky-comparison',
  title: 'Canadian whisky (comparison layer — not U.S. standard of identity)',
  notes: sv(
    'Canadian whisky is governed by Canadian regulations, not 27 CFR Part 5. Often blended, may include flavoring spirits, and uses different labeling conventions than U.S. bourbon.',
    'commonly_reported',
    'editorial',
    [ECFR_BOURBON_STANDARD],
    'Foundry comparison layer only — not a production category for Kentucky inventory.',
  ),
};
