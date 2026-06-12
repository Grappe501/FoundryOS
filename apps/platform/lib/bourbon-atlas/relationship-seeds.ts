/**
 * PASS-034P.5 — Atlas Phase 2 relationship seeds
 * Typed graph edges beyond glossary links — not consumer UI yet.
 */

export type AtlasRelationshipSeed = {
  slug: string;
  people?: string[];
  places?: string[];
  organizations?: string[];
  events?: string[];
  controversies?: string[];
  mysteries?: string[];
  collections?: string[];
  objects?: string[];
  timeline?: { label: string; era?: string }[];
};

export const BOURBON_RELATIONSHIP_SEEDS: AtlasRelationshipSeed[] = [
  {
    slug: 'rickhouse',
    people: ['Jimmy Russell', 'Elmer T. Lee'],
    places: ['Kentucky River', 'Bardstown', 'Frankfort'],
    organizations: ['Buffalo Trace', 'Heaven Hill', 'Warehouse H'],
    events: ['Heat cycling seasons', 'Rickhouse fire era'],
    controversies: ['Top-floor pick hype vs reality'],
    mysteries: ['Stitzel-Weller Mystery', 'Barrel floor myth'],
    collections: ['Wheated Explorer', 'Distillery Pilgrim'],
    objects: ['Barrel char', 'Angel\'s share', 'Rickhouse position'],
    timeline: [
      { label: 'Railroad-era warehouse design', era: '1890s' },
      { label: 'Modern climate-controlled alternatives', era: '2000s' },
    ],
  },
  {
    slug: 'wheated-bourbon',
    people: ['Julian Van Winkle', 'Bill Samuels Sr.'],
    places: ['Frankfort', 'Loretto'],
    organizations: ['Maker\'s Mark', 'Buffalo Trace', 'Stitzel-Weller'],
    controversies: ['Allocation ethics', 'Juice sourcing debates'],
    mysteries: ['Weller Allocation Mystery', 'Stitzel-Weller Mystery'],
    collections: ['Wheated Explorer'],
    objects: ['Red wax seal', 'Store pick label'],
  },
  {
    slug: 'allocation',
    people: ['Retail buyers', 'Distillery allocators'],
    organizations: ['Buffalo Trace', 'Heaven Hill'],
    events: ['Allocation season', 'Secondary market surge'],
    controversies: ['MSRP vs secondary', 'Flipper culture'],
    mysteries: ['Weller Allocation Mystery', 'Allocated worth case'],
    collections: ['Wheated Explorer'],
  },
  {
    slug: 'mash-bill',
    people: ['Master distillers'],
    organizations: ['Four Roses', 'Buffalo Trace', 'Maker\'s Mark'],
    controversies: ['High rye vs wheated identity'],
    objects: ['Corn', 'Rye', 'Wheat', 'Barley'],
    collections: ['Wheated Explorer', 'High Rye Hunter'],
  },
  {
    slug: 'four-roses',
    people: ['Jim Rutledge', 'Brent Elliott'],
    organizations: ['Four Roses', 'Kirin'],
    controversies: ['OBSV vs OESK recipe loyalty'],
    mysteries: ['Yeast strain divergence'],
    objects: ['Ten recipes', 'Single story bottling'],
  },
];

export function getRelationshipSeed(slug: string): AtlasRelationshipSeed | undefined {
  return BOURBON_RELATIONSHIP_SEEDS.find((s) => s.slug === slug);
}
