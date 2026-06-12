export * from './detective-cases';
export * from './bottle-xray';
export * from './compare-five';
export * from './shelf-psychology';
export * from './personalities';
export * from './store-picks';
export * from './economy';
export * from './campus-maps';
export * from './flavor-wheel';
export * from './blind-league';
export * from './trail-planner';
export * from './bottle-progression';

/** Curiosity rabbit holes — "Want to know something weird?" */
export const CURIOSITY_HOOKS: { text: string; href: string }[] = [
  { text: 'Bourbon Street was not named after whiskey.', href: '/bourbon/wild/bourbon-street' },
  { text: 'Why is Eagle Rare $40 in one state and $140 in another?', href: '/bourbon/detective/eagle-rare-price' },
  { text: 'The DSP number on your label is telling the truth.', href: '/bourbon/detective/dsp-numbers' },
  { text: 'Top rickhouse floor vs bottom — same mash, different whiskey.', href: '/bourbon/detective/barrel-floor' },
  { text: 'What Bottled-in-Bond actually guarantees (1897 law).', href: '/bourbon/detective/bib-guarantee' },
  { text: 'Why allocated bourbon might not beat a $28 blind pour.', href: '/bourbon/detective/allocated-worth' },
  { text: 'Glassware changes the pour before your first sip.', href: '/bourbon/lore#lore-experience' },
  { text: 'Store picks are not magic — they are curated barrels.', href: '/bourbon/store-picks' },
];

export function randomCuriosityHook(seed?: string): { text: string; href: string } {
  const hooks = CURIOSITY_HOOKS;
  if (!seed) return hooks[Math.floor(Math.random() * hooks.length)];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % hooks.length;
  return hooks[h];
}
