/** Level 4 — store pick vs standard expression labs */

export type StorePickLab = {
  id: string;
  title: string;
  standardSlug: string;
  pickSlug: string;
  markupTest: string;
  worthItIf: string;
  skipIf: string;
};

export const STORE_PICK_LABS: StorePickLab[] = [
  {
    id: 'four-roses-sb',
    title: 'Four Roses SB vs Small Batch',
    standardSlug: 'four-roses-small-batch',
    pickSlug: 'four-roses-single-barrel',
    markupTest: 'SB often $10–15 over Small Batch — blind rank before paying.',
    worthItIf: 'SB shows clear fruit/spice lift over blend on your palate.',
    skipIf: 'SB tastes like higher-proof Yellow — buy Small Batch instead.',
  },
  {
    id: 'eagle-bt',
    title: 'Eagle Rare vs Buffalo Trace',
    standardSlug: 'buffalo-trace',
    pickSlug: 'eagle-rare',
    markupTest: 'ER allocation markup vs BT shelf price — age justify?',
    worthItIf: 'Age read justifies step-up for your oak preference.',
    skipIf: 'BT wins blind — allocation time better spent elsewhere.',
  },
  {
    id: 'ec-pick',
    title: 'Elijah Craig vs store pick hype',
    standardSlug: 'elijah-craig-small-batch',
    pickSlug: 'knob-creek-9',
    markupTest: 'Barrel pick premiums — compare to EC small batch baseline.',
    worthItIf: 'Pick shows unique profile vs standard EC batch.',
    skipIf: 'Pick equals standard — pay MSRP for EC only.',
  },
  {
    id: 'wt-russell',
    title: 'WT101 vs Russell\'s Reserve',
    standardSlug: 'wild-turkey-101',
    pickSlug: 'russells-reserve-10',
    markupTest: 'Age step-up worth it over 101 daily?',
    worthItIf: 'Russell\'s mellows spice while keeping Turkey DNA.',
    skipIf: '101 wins on value and flavor density for your palate.',
  },
];

export function getStorePickLab(id: string): StorePickLab | undefined {
  return STORE_PICK_LABS.find((l) => l.id === id);
}
