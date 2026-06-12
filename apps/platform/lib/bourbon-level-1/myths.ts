export type BourbonMyth = {
  slug: string;
  statement: string;
  answer: 'true' | 'false' | 'mostly-false' | 'mostly-true';
  explanation: string;
  surprise: string;
};

export const BOURBON_MYTHS: BourbonMyth[] = [
  { slug: 'older-is-better', statement: 'Older bourbon is always better.', answer: 'false', explanation: 'Age adds oak, tannin, and depth — but past a point you get dry, woody, over-oaked whiskey. Many 6–10 year bourbons beat 15+ year expressions for daily drinking.', surprise: 'Buffalo Trace Eagle Rare at 10 years is often preferred over much older sourced whiskey.' },
  { slug: 'wheated-smoother', statement: 'Wheated bourbon is always smoother than rye-forward bourbon.', answer: 'mostly-false', explanation: 'Wheat replaces rye in the mash bill, which can reduce spice — but proof, age, and distillation cut matter more. High-proof wheated bourbon can still punch hard.', surprise: 'Compare Maker\'s Mark (wheated) to Wild Turkey 101 (high rye) at the same proof before deciding.' },
  { slug: 'must-be-kentucky', statement: 'Bourbon must come from Kentucky.', answer: 'false', explanation: 'Federal law requires bourbon be made in the United States — not Kentucky specifically. Excellent bourbon is distilled in Indiana, Texas, New York, and beyond.', surprise: 'Many "Kentucky" brands source from Indiana (MGP) at some point in their history.' },
  { slug: 'single-barrel-better', statement: 'Single barrel is always better than small batch.', answer: 'mostly-false', explanation: 'Single barrel = one barrel\'s personality (variation). Small batch = blender\'s consistency. One isn\'t superior — they solve different problems.', surprise: 'Blenders often reject barrels that are too odd for single-barrel release.' },
  { slug: 'char-level-flavor', statement: 'Heavier barrel char always means more flavor.', answer: 'mostly-true', explanation: 'Char #3 and #4 caramelize wood sugars and create vanilla/caramel compounds — but too much char can dominate young whiskey.', surprise: 'Most bourbon uses char #3 or #4 — the difference is real but not linear.' },
  { slug: 'add-water-ruins', statement: 'Adding water ruins good bourbon.', answer: 'false', explanation: 'Water releases aromatic compounds and reduces alcohol burn, often revealing flavors hidden at full proof — especially on barrel-proof pours.', surprise: 'Master distillers routinely proof down or add water when evaluating barrels.' },
  { slug: 'bottled-in-bond-old', statement: 'Bottled in Bond means the bourbon is old.', answer: 'false', explanation: 'BiB requires 4 years minimum, one season, one distiller, 100 proof — but many BiB bourbons are exactly 4 years, not decades.', surprise: 'BiB is a quality standard, not an age flex.' },
  { slug: 'color-means-age', statement: 'Darker color always means older bourbon.', answer: 'false', explanation: 'Char level, barrel entry proof, warehouse location, and finishing barrels affect color. Young whiskey in a heavy char barrel can look dark.', surprise: 'Chill filtration can lighten color without changing age.' },
  { slug: 'expensive-sourced', statement: 'Expensive bourbon is always distilled by the brand on the label.', answer: 'false', explanation: 'Many brands source whiskey from large distilleries (MGP, Heaven Hill, Bardstown) and age/blend/bottle under their own label. Read the DSP number.', surprise: 'Sourcing isn\'t bad — transparency is the issue.' },
  { slug: 'ice-only-for-bad', statement: 'Ice is only for bad bourbon.', answer: 'false', explanation: 'Ice slows aromatic release and dilutes — some people prefer that, especially on hot days or with high-proof pours. Tasting vs enjoying are different modes.', surprise: 'There is no bourbon police — but learn neat first, then choose.' },
];
