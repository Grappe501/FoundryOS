/** Legendary bottle progression chains — purpose, not catalog */

export type ChainStep = {
  slug?: string;
  name: string;
  note: string;
  href?: string;
};

export type ProgressionChain = {
  id: string;
  title: string;
  house: string;
  tagline: string;
  steps: ChainStep[];
};

export const PROGRESSION_CHAINS: ProgressionChain[] = [
  {
    id: 'wild-turkey-ladder',
    title: 'Wild Turkey ladder',
    house: 'Wild Turkey',
    tagline: 'From 101 proof honesty to Russell legacy.',
    steps: [
      { slug: 'wild-turkey-101', name: 'Wild Turkey 101', note: 'Proof education — rye spice baseline', href: '/bourbon/bottles/wild-turkey-101' },
      { name: 'Rare Breed', note: 'Barrel proof blend — heat with structure', href: '/bourbon/graph/barrel-proof' },
      { slug: 'russells-reserve-10', name: "Russell's Reserve 10", note: 'Decade mellow — Turkey without punch', href: '/bourbon/bottles/russells-reserve-10' },
      { name: "Russell's Reserve Single Barrel", note: 'Picker\'s barrel — floor lottery', href: '/bourbon/store-picks' },
    ],
  },
  {
    id: 'makers-ladder',
    title: "Maker's Mark ladder",
    house: "Maker's Mark",
    tagline: 'Wheated hospitality → intensity.',
    steps: [
      { slug: 'makers-mark', name: "Maker's Mark", note: 'Crowd-pleasing wheat — the host bottle', href: '/bourbon/bottles/makers-mark' },
      { name: "Maker's 46", note: 'Stave-finishing — oak without age', href: '/bourbon/atlas/char-level' },
      { slug: 'bookers', name: "Maker's Mark Cask Strength", note: 'Full volume wheat — add water intentionally', href: '/bourbon/bottles/bookers' },
      { name: 'Private Selection', note: 'Retail pick — stave profile chosen', href: '/bourbon/store-picks' },
    ],
  },
  {
    id: 'buffalo-trace-ladder',
    title: 'Buffalo Trace ladder',
    house: 'Buffalo Trace',
    tagline: 'Campus baseline → allocation electives.',
    steps: [
      { slug: 'buffalo-trace', name: 'Buffalo Trace', note: 'House DNA — gateway pour', href: '/bourbon/bottles/buffalo-trace' },
      { slug: 'eagle-rare', name: 'Eagle Rare 10', note: 'Age statement on same mash', href: '/bourbon/bottles/eagle-rare' },
      { slug: 'weller-special-reserve', name: 'Weller Special Reserve', note: 'Wheated allocation — hunt at MSRP only', href: '/bourbon/detective/weller-ghost' },
      { name: 'E.H. Taylor / Stagg line', note: 'Graduate when blind tastings prove readiness', href: '/bourbon/graph/bottled-in-bond' },
    ],
  },
  {
    id: 'heaven-hill-value',
    title: 'Heaven Hill value chain',
    house: 'Heaven Hill',
    tagline: 'Honest bourbon from $18 to enthusiast.',
    steps: [
      { slug: 'evan-williams-black', name: 'Evan Williams Black', note: 'Daily pour under $20', href: '/bourbon/bottles/evan-williams-black' },
      { name: 'Evan Williams BiB', note: 'Green label — BiB discipline', href: '/bourbon/graph/bottled-in-bond' },
      { slug: 'larceny', name: 'Larceny', note: 'Wheated step-up from same house', href: '/bourbon/bottles/larceny' },
      { slug: 'old-forester-1920', name: 'Elijah Craig Barrel Proof', note: 'Heaven Hill heat — when you trust water', href: '/bourbon/bottles/old-forester-1920' },
    ],
  },
  {
    id: 'four-roses-recipes',
    title: 'Four Roses recipe path',
    house: 'Four Roses',
    tagline: 'Ten recipes — learn variation as religion.',
    steps: [
      { slug: 'four-roses-yellow', name: 'Yellow Label', note: 'Blend baseline — gentle high-rye', href: '/bourbon/bottles/four-roses-yellow' },
      { slug: 'four-roses-single-barrel', name: 'Single Barrel OBSV/OESK', note: 'One recipe, one barrel — read the code', href: '/bourbon/bottles/four-roses-single-barrel' },
      { name: 'Store pick Four Roses', note: 'Recipe code on the label — ask which yeast', href: '/bourbon/store-picks' },
    ],
  },
];

export function getChain(id: string): ProgressionChain | undefined {
  return PROGRESSION_CHAINS.find((c) => c.id === id);
}

export function chainProgress(slugsOnShelf: string[], chain: ProgressionChain): number {
  let n = 0;
  for (const step of chain.steps) {
    if (step.slug && slugsOnShelf.includes(step.slug)) n++;
  }
  return n;
}
