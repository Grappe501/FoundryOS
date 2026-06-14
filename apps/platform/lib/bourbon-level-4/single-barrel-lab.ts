/** Level 4 — single barrel vs small batch lab pairings */

export type SingleBarrelLab = {
  id: string;
  title: string;
  variable: string;
  standardSlug: string;
  stepUpSlug: string;
  singleBarrelSlug: string;
  steps: string[];
  whatToNotice: string;
};

export const SINGLE_BARREL_LABS: SingleBarrelLab[] = [
  {
    id: 'four-roses-ladder',
    title: 'Four Roses — Yellow → Small Batch → SB',
    variable: 'Blend vs single barrel on one campus',
    standardSlug: 'four-roses-yellow',
    stepUpSlug: 'four-roses-small-batch',
    singleBarrelSlug: 'four-roses-single-barrel',
    steps: ['Pour Yellow, Small Batch, Single Barrel — ½ oz each.', 'Read recipe code on SB if visible.', 'Write variance in fruit vs spice before checking forum notes.'],
    whatToNotice: 'SB is one barrel lottery — blend is house consistency.',
  },
  {
    id: 'eagle-vs-bt',
    title: 'BT NAS vs Eagle Rare 10',
    variable: 'Age statement on same mash family',
    standardSlug: 'buffalo-trace',
    stepUpSlug: 'eagle-rare',
    singleBarrelSlug: 'eh-taylor-small-batch',
    steps: ['BT baseline — NAS polish.', 'Eagle Rare age — oak read.', 'E.H. Taylor BiB — collector tier bond rules.'],
    whatToNotice: 'Age vs BiB vs NAS — three transparency styles on BT campus.',
  },
  {
    id: 'wt-ladder',
    title: 'Wild Turkey — 101 → Russell\'s → Rare Breed',
    variable: 'Proof and age on Turkey mash',
    standardSlug: 'wild-turkey-101',
    stepUpSlug: 'russells-reserve-10',
    singleBarrelSlug: 'rare-breed',
    steps: ['101 spice baseline.', 'Russell\'s age mellow.', 'Rare Breed barrel proof — tiny pour.'],
    whatToNotice: 'Single barrel at barrel proof is different lesson than SB at 100 proof.',
  },
  {
    id: 'heaven-hill-fork',
    title: 'Heaven Hill — Evan → Elijah → EC SB',
    variable: 'House value to single barrel pick',
    standardSlug: 'evan-williams-black',
    stepUpSlug: 'elijah-craig-small-batch',
    singleBarrelSlug: 'larceny',
    steps: ['Evan value baseline.', 'Elijah Craig step-up oak.', 'Larceny wheated fork — not SB but house branch.'],
    whatToNotice: 'Wheated fork teaches branch within house before chasing SB picks.',
  },
  {
    id: 'beam-ladder',
    title: 'Beam — KC9 → Booker\'s',
    variable: 'Age statement vs barrel proof uncut',
    standardSlug: 'knob-creek-9',
    stepUpSlug: 'knob-creek-9',
    singleBarrelSlug: 'bookers',
    steps: ['Knob Creek 9 at 100 proof.', 'Booker\'s uncut — water mandatory.', 'Compare age statement vs heat delivery.'],
    whatToNotice: 'Booker\'s is batch barrel proof — not single barrel but uncut lesson.',
  },
  {
    id: 'craft-sb-prep',
    title: 'Craft — standard vs BiB vs pick',
    variable: 'Craft transparency ladder',
    standardSlug: 'green-river-kentucky-straight',
    stepUpSlug: 'new-riff-bourbon',
    singleBarrelSlug: 'wilderness-trail-bib',
    steps: ['Green River straight baseline.', 'New Riff BiB NCF.', 'Wilderness Trail wheated BiB.'],
    whatToNotice: 'Craft SB picks emerging — BiB is current craft transparency standard.',
  },
];

export function getSingleBarrelLab(id: string): SingleBarrelLab | undefined {
  return SINGLE_BARREL_LABS.find((l) => l.id === id);
}
