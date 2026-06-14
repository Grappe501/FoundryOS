/** Level 2 learning modules — flights, grids, and academy wired together */

export type Level2Module = {
  id: string;
  title: string;
  goal: string;
  flightId?: string;
  gridId?: string;
  blindId?: string;
  hostKitId?: string;
  academySlug: string;
  detectiveSlug?: string;
  order: number;
};

export const LEVEL_2_MODULES: Level2Module[] = [
  {
    id: 'mashbill-basics',
    title: 'Mash bill fork',
    goal: 'Taste traditional vs high-rye vs wheated in one session.',
    flightId: 'mashbill-triangle',
    gridId: 'mashbill-three',
    academySlug: 'mash-bill-in-the-mouth',
    order: 1,
  },
  {
    id: 'flavor-vocabulary',
    title: 'Flavor vocabulary',
    goal: 'Use five flavor families — no "smooth" alone.',
    academySlug: 'flavor-wheel-practice',
    order: 2,
  },
  {
    id: 'category-literacy',
    title: 'Category literacy',
    goal: 'Bourbon · rye · Tennessee — grain vs process vs proof.',
    flightId: 'category-triangle',
    gridId: 'category-three',
    academySlug: 'rye-and-tennessee-cousins',
    detectiveSlug: 'rye-vs-high-rye-bourbon',
    order: 3,
  },
  {
    id: 'grid-discipline',
    title: 'Comparison grid',
    goal: 'Hold one variable — fill every cell before ranking.',
    gridId: 'mashbill-three',
    academySlug: 'comparison-grid-basics',
    order: 4,
  },
  {
    id: 'proof-water',
    title: 'Proof & water',
    goal: 'Feel proof density — one drop on highest pour only.',
    flightId: 'proof-ladder',
    gridId: 'proof-five',
    academySlug: 'water-and-proof-experiment',
    order: 5,
  },
  {
    id: 'blind-humility',
    title: 'Blind humility',
    goal: 'Bag one bottle — score before reveal.',
    flightId: 'value-blind-prep',
    gridId: 'value-five',
    academySlug: 'blind-one-pour-drill',
    order: 6,
  },
  {
    id: 'tennessee-process',
    title: 'Tennessee process',
    goal: 'Charcoal mellowing in flavor terms.',
    flightId: 'tennessee-duo',
    academySlug: 'tennessee-charcoal-tasting',
    order: 7,
  },
  {
    id: 'bib-transparency',
    title: 'BiB transparency',
    goal: '100 proof bond rules — taste the guarantee.',
    flightId: 'bib-transparency',
    academySlug: 'bib-tasting-lab',
    detectiveSlug: 'bib-guarantee',
    order: 8,
  },
  {
    id: 'craft-inventory',
    title: 'Craft inventory',
    goal: 'Value craft → BiB → wheated → farm grain.',
    flightId: 'craft-campus',
    gridId: 'craft-inventory-five',
    academySlug: 'craft-kentucky-tasting',
    order: 9,
  },
  {
    id: 'finish-literacy',
    title: 'Cask finish literacy',
    goal: 'Straight vs second barrel vs port finish.',
    flightId: 'finish-lab',
    gridId: 'finish-four',
    academySlug: 'finish-tasting-lab',
    order: 10,
  },
  {
    id: 'craft-rye',
    title: 'Craft rye shelf',
    goal: 'Craft BiB rye vs major rye — same proof band.',
    flightId: 'craft-rye-flight',
    gridId: 'craft-rye-four',
    academySlug: 'craft-rye-on-the-shelf',
    order: 11,
  },
  {
    id: 'house-ladders',
    title: 'House proof ladders',
    goal: 'Heaven Hill, Wild Turkey, Barton — proof on one mash story.',
    flightId: 'heaven-hill-ladder',
    gridId: 'heaven-hill-four',
    academySlug: 'house-proof-ladders',
    order: 12,
  },
  {
    id: 'barrel-proof',
    title: 'Barrel proof showdown',
    goal: 'Rare Breed vs 1792 Full Proof vs OF1920 — heat vs flavor.',
    flightId: 'barrel-proof-showdown',
    gridId: 'barrel-proof-four',
    academySlug: 'water-and-proof-experiment',
    order: 13,
  },
  {
    id: 'ncf-texture',
    title: 'NCF & mouthfeel',
    goal: 'Craft non-chill filtered vs filtered majors.',
    flightId: 'ncf-craft-duel',
    academySlug: 'ncf-and-texture',
    order: 14,
  },
  {
    id: 'journal-streak',
    title: 'Journal streak',
    goal: 'Five entries — same template, no forbidden words.',
    academySlug: 'tasting-journal-structure',
    order: 15,
  },
  {
    id: 'checkpoint',
    title: 'Level 2 checkpoint',
    goal: 'Submit evidence — flights, grid, category paragraph.',
    academySlug: 'level-2-checkpoint',
    order: 16,
  },
  {
    id: 'house-universe',
    title: 'House universe flights',
    goal: 'Buffalo Trace · Four Roses — same campus, tier literacy.',
    flightId: 'buffalo-trace-universe',
    gridId: 'buffalo-universe-four',
    academySlug: 'house-universe-flights',
    order: 17,
  },
  {
    id: 'age-proof-debate',
    title: 'Age vs proof',
    goal: 'Stated age vs NAS — oak vs heat.',
    flightId: 'age-statement-flight',
    gridId: 'age-statement-four',
    academySlug: 'age-vs-proof-debate',
    order: 18,
  },
  {
    id: 'blind-hosting',
    title: 'Blind hosting etiquette',
    goal: 'Bag pours — score before reveal, teach after rank.',
    blindId: 'value-four-blind',
    flightId: 'value-blind-prep',
    academySlug: 'blind-hosting-etiquette',
    order: 19,
  },
  {
    id: 'splurge-test',
    title: 'Splurge worth-it test',
    goal: 'Blind rank vs price — splurge must earn shelf space.',
    flightId: 'splurge-worth-it',
    gridId: 'splurge-craft-four',
    academySlug: 'splurge-worth-it-test',
    order: 20,
  },
  {
    id: 'host-night',
    title: 'Host night kit',
    goal: 'Run skeptic three or value showdown — guests rank first.',
    hostKitId: 'skeptic-three',
    flightId: 'host-skeptic-flight',
    academySlug: 'host-night-checklist',
    order: 21,
  },
  {
    id: 'cocktail-role',
    title: 'Cocktail vs sip role',
    goal: 'Neat score vs Manhattan job — both belong on shelf.',
    flightId: 'cocktail-vs-sip',
    gridId: 'cocktail-three',
    academySlug: 'cocktail-pour-vs-neat',
    order: 22,
  },
  {
    id: 'flight-builder',
    title: 'Flight builder',
    goal: 'Catalog filters — custom flights from your shelf reality.',
    academySlug: 'flight-builder-discipline',
    order: 23,
  },
  {
    id: 'eight-week-program',
    title: '8-week program',
    goal: 'Structured Confident Taster — week 1–8 with homework.',
    academySlug: 'eight-week-program-overview',
    order: 24,
  },
];

export function getLevel2Module(id: string): Level2Module | undefined {
  return LEVEL_2_MODULES.find((m) => m.id === id);
}
