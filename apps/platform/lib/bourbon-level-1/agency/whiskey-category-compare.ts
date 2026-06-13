/**
 * American & international whiskey category comparison — Level 1 compare layer.
 * Uses @foundry/bourbon-intelligence categories + editorial contrast fields.
 */
import { AMERICAN_WHISKEY_CATEGORIES } from '@foundry/bourbon-intelligence';

export type WhiskeyCategoryCompareRow = {
  slug: string;
  label: string;
  grainRule: string;
  barrelRule: string;
  proofFloor: string;
  typicalFlavor: string;
  exampleBrands: string;
  commonConfusion: string;
  atlasHref: string;
  compareNotes?: string;
};

const ROW_DETAILS: Record<string, Omit<WhiskeyCategoryCompareRow, 'slug' | 'label' | 'compareNotes'>> = {
  bourbon: {
    grainRule: '≥51% corn',
    barrelRule: 'New charred oak (required)',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Caramel, vanilla, oak — corn sweetness backbone',
    exampleBrands: 'Buffalo Trace, Wild Turkey 101, Maker\'s Mark',
    commonConfusion: 'Not all American whiskey is bourbon — corn % and barrel rules matter',
    atlasHref: '/bourbon/atlas/straight-bourbon',
  },
  rye_whiskey: {
    grainRule: '≥51% rye grain',
    barrelRule: 'New charred oak (straight rye rules)',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Pepper, mint, baking spice — sharper than most bourbon',
    exampleBrands: 'Rittenhouse, Wild Turkey Rye, Old Overholt Bonded',
    commonConfusion: 'High-rye bourbon is NOT rye whiskey — bourbon requires ≥51% corn',
    atlasHref: '/bourbon/atlas/rye-whiskey',
  },
  tennessee_whiskey: {
    grainRule: '≥51% corn (bourbon-class mash)',
    barrelRule: 'New charred oak after charcoal mellowing',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Softer entry — maple charcoal filters new make',
    exampleBrands: 'Jack Daniel\'s, George Dickel',
    commonConfusion: 'Tennessee whiskey is not a separate federal grain category — process + state',
    atlasHref: '/bourbon/atlas/tennessee-whiskey',
  },
  american_single_malt: {
    grainRule: '100% malted barley (single distillery)',
    barrelRule: 'Oak aging under TTB single-malt rules',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Malt bread, honey, orchard fruit — beer-adjacent',
    exampleBrands: 'Westland, Stranahan\'s, Virginia Distillery',
    commonConfusion: 'Not bourbon — no corn minimum; barley is the identity',
    atlasHref: '/bourbon/atlas/american-single-malt',
  },
  wheat_whiskey: {
    grainRule: '≥51% wheat (primary grain)',
    barrelRule: 'New charred oak for straight wheat whiskey',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Soft grain, honey, pastry — distinct from wheated bourbon',
    exampleBrands: 'Bernheim Wheat Whiskey, some craft wheat releases',
    commonConfusion: 'Wheated bourbon uses wheat as flavor grain but corn is still ≥51%',
    atlasHref: '/bourbon/atlas/wheat-whiskey',
  },
  corn_whiskey: {
    grainRule: '≥80% corn',
    barrelRule: 'Can be unaged or used oak — different from bourbon',
    proofFloor: '80 proof if labeled whiskey',
    typicalFlavor: 'Sweet corn, light body — often moonshine-adjacent when unaged',
    exampleBrands: 'Mellow Corn, unaged corn spirits',
    commonConfusion: 'Corn whiskey allows unaged product; bourbon requires oak aging',
    atlasHref: '/bourbon/atlas/corn-whiskey',
  },
  blended_american_whiskey: {
    grainRule: 'Blend of straight whiskeys + neutral spirit (Part 5 rules)',
    barrelRule: 'Component whiskeys aged; blend may include GNS',
    proofFloor: '80 proof bottled minimum',
    typicalFlavor: 'Lighter, consistent — cocktail-friendly at volume',
    exampleBrands: 'Kessler, early American blends',
    commonConfusion: 'Not straight bourbon — read label for straight vs blend',
    atlasHref: '/bourbon/atlas/blended-american-whiskey',
  },
  canadian_whisky: {
    grainRule: 'Multi-grain blend — Canadian regulations',
    barrelRule: 'Often blended base + flavoring whisky; 9.09% rule legacy',
    proofFloor: '40% ABV typical export',
    typicalFlavor: 'Light, smooth, cocktail default — Crown Royal profile',
    exampleBrands: 'Crown Royal, Canadian Club',
    commonConfusion: 'Labeling and blending rules differ from U.S. straight standards',
    atlasHref: '/bourbon/atlas/american-whiskey',
  },
  scotch_whisky: {
    grainRule: 'Malted barley + other grains (single malt = one distillery malt)',
    barrelRule: 'Oak casks — often ex-bourbon, sherry, wine',
    proofFloor: '40% ABV minimum',
    typicalFlavor: 'Peat smoke (Islay), honey, heather, maritime — region-driven',
    exampleBrands: 'Glenlivet, Laphroaig, Macallan',
    commonConfusion: 'Scotch uses used barrels heavily; bourbon requires new oak',
    atlasHref: '/bourbon/atlas/american-whiskey',
  },
  irish_whiskey: {
    grainRule: 'Malted and unmalted barley blends common',
    barrelRule: 'Oak aging — often ex-bourbon barrels',
    proofFloor: '40% ABV minimum',
    typicalFlavor: 'Soft, triple-distilled smoothness, green apple, honey',
    exampleBrands: 'Jameson, Redbreast, Bushmills',
    commonConfusion: 'Irish single pot still is its own tradition — not bourbon-style corn',
    atlasHref: '/bourbon/atlas/american-whiskey',
  },
};

export const WHISKEY_CATEGORY_ROWS: WhiskeyCategoryCompareRow[] = [
  ...AMERICAN_WHISKEY_CATEGORIES.map((c) => {
    const detail = ROW_DETAILS[c.slug] ?? ROW_DETAILS.bourbon;
    return {
      slug: c.slug,
      label: c.label,
      ...detail,
      compareNotes: c.comparison_notes,
    };
  }),
  {
    slug: 'scotch_whisky',
    label: 'Scotch whisky (comparison)',
    ...ROW_DETAILS.scotch_whisky,
  },
  {
    slug: 'irish_whiskey',
    label: 'Irish whiskey (comparison)',
    ...ROW_DETAILS.irish_whiskey,
  },
];

export const CATEGORY_COMPARE_PRESETS: { id: string; label: string; slugs: string[] }[] = [
  {
    id: 'american-core',
    label: 'American core three',
    slugs: ['bourbon', 'rye_whiskey', 'tennessee_whiskey'],
  },
  {
    id: 'grain-spectrum',
    label: 'Grain identity spectrum',
    slugs: ['bourbon', 'rye_whiskey', 'wheat_whiskey', 'corn_whiskey'],
  },
  {
    id: 'bourbon-adjacent',
    label: 'Bourbon vs wheated vs high-rye confusion',
    slugs: ['bourbon', 'wheat_whiskey', 'rye_whiskey'],
  },
  {
    id: 'international',
    label: 'Bourbon vs Canadian vs Scotch',
    slugs: ['bourbon', 'canadian_whisky', 'scotch_whisky'],
  },
  {
    id: 'full-american',
    label: 'Full American map',
    slugs: ['bourbon', 'rye_whiskey', 'tennessee_whiskey', 'american_single_malt', 'corn_whiskey', 'blended_american_whiskey'],
  },
  {
    id: 'islands-and-ireland',
    label: 'Scotch vs Irish vs Bourbon',
    slugs: ['bourbon', 'scotch_whisky', 'irish_whiskey'],
  },
];

export function compareCategories(slugs: string[]): WhiskeyCategoryCompareRow[] {
  const set = new Set(slugs);
  return WHISKEY_CATEGORY_ROWS.filter((r) => set.has(r.slug));
}

export function allCategorySlugs(): { slug: string; label: string }[] {
  return WHISKEY_CATEGORY_ROWS.map((r) => ({ slug: r.slug, label: r.label }));
}
