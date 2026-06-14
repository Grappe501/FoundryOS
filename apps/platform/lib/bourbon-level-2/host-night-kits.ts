/** Level 2 v3 — pre-built host scenarios */

export type HostNightKit = {
  id: string;
  title: string;
  guestProfile: string;
  duration: string;
  bottleSlugs: string[];
  flightOrder: string[];
  talkingPoints: string[];
  avoid: string[];
  linkedBlindId?: string;
  linkedFlightId?: string;
};

export const HOST_NIGHT_KITS: HostNightKit[] = [
  {
    id: 'skeptic-three',
    title: 'Three skeptics — "I hate whiskey"',
    guestProfile: 'Friends who say bourbon burns or tastes like fire',
    duration: '45 min · 3 pours',
    bottleSlugs: ['makers-mark', 'buffalo-trace', 'jack-daniels-old-no-7'],
    flightOrder: ['makers-mark', 'buffalo-trace', 'jack-daniels-old-no-7'],
    talkingPoints: [
      'Start wheated — Maker\'s softens the category introduction.',
      'BT as "what bourbon tastes like on a shelf" — corn sweet baseline.',
      'Jack last — Tennessee process, not bourbon label, same conversation.',
    ],
    avoid: ['Barrel proof', 'Lecturing mash bills before first sip', 'Making them guess brands'],
    linkedFlightId: 'host-skeptic-flight',
  },
  {
    id: 'mashbill-education',
    title: 'Mash bill education night',
    guestProfile: 'Curious drinkers ready for one variable',
    duration: '60 min · 3 pours',
    bottleSlugs: ['buffalo-trace', 'wild-turkey-101', 'makers-mark'],
    flightOrder: ['buffalo-trace', 'wild-turkey-101', 'makers-mark'],
    talkingPoints: [
      'One word per pour before tasting — nose only.',
      'Explain wheat vs rye after they rank — not before.',
      'Optional blind bag on round two for repeat guests.',
    ],
    avoid: ['More than three pours', 'Allocated bottle flex'],
    linkedFlightId: 'mashbill-triangle',
    linkedBlindId: 'mashbill-blind-triangle',
  },
  {
    id: 'value-showdown',
    title: 'Value showdown — price is wrong',
    guestProfile: 'Mix of budgets — teach humility together',
    duration: '50 min · 4 pours blind',
    bottleSlugs: ['evan-williams-black', 'wild-turkey-101', 'four-roses-yellow', 'larceny'],
    flightOrder: ['evan-williams-black', 'wild-turkey-101', 'four-roses-yellow', 'larceny'],
    talkingPoints: [
      'Bag all four — number glasses.',
      'Everyone ranks — reveal price after.',
      'Winner buys next round story — not loser shame.',
    ],
    avoid: ['Revealing Evan Williams first', 'Score inflation to match price'],
    linkedBlindId: 'value-four-blind',
  },
  {
    id: 'craft-intro',
    title: 'Craft intro — beyond Buffalo Trace',
    guestProfile: 'BT fans ready for craft campus',
    duration: '75 min · 4 pours',
    bottleSlugs: ['buffalo-trace', 'new-riff-bourbon', 'wilderness-trail-bib', 'green-river-kentucky-straight'],
    flightOrder: ['buffalo-trace', 'green-river-kentucky-straight', 'new-riff-bourbon', 'wilderness-trail-bib'],
    talkingPoints: [
      'BT baseline first — then value craft Green River.',
      'BiB craft (New Riff) — explain bond rules if asked.',
      'Wheated craft WT BiB last — compare to Maker\'s if someone asks.',
    ],
    avoid: ['Splurge craft before straight profiles', 'DSP lecture longer than pours'],
    linkedFlightId: 'craft-campus',
  },
  {
    id: 'rye-gateway',
    title: 'Rye gateway night',
    guestProfile: 'Bourbon drinkers who never tried rye whiskey',
    duration: '55 min · 4 pours',
    bottleSlugs: ['buffalo-trace', 'bulleit-bourbon', 'bulleit-rye', 'rittenhouse-rye'],
    flightOrder: ['buffalo-trace', 'bulleit-bourbon', 'bulleit-rye', 'rittenhouse-rye'],
    talkingPoints: [
      'Same brand bourbon vs rye — Bulleit duo is fastest lesson.',
      'Rittenhouse BiB for Manhattan crowd — sip or cocktail.',
      'Legal line: ≥51% rye grain, not just spicy bourbon.',
    ],
    avoid: ['Starting with rye', 'Overproof rye on first timer'],
    linkedFlightId: 'rye-vs-bourbon',
  },
  {
    id: 'finish-dessert',
    title: 'Finish dessert flight',
    guestProfile: 'Dessert pour fans — post-dinner',
    duration: '60 min · 4 pours small',
    bottleSlugs: ['buffalo-trace', 'woodford-double-oaked', 'angels-envy-bourbon', 'makers-mark-46'],
    flightOrder: ['buffalo-trace', 'makers-mark-46', 'woodford-double-oaked', 'angels-envy-bourbon'],
    talkingPoints: [
      'Straight baseline BT — then stave, second oak, port finish.',
      'Small pours — dessert pours are ¼ oz.',
      'Name finish sweetness vs mash bill change.',
    ],
    avoid: ['Barrel proof finale', 'More than four finishes'],
    linkedFlightId: 'finish-lab',
  },
];

export function getHostNightKit(id: string): HostNightKit | undefined {
  return HOST_NIGHT_KITS.find((k) => k.id === id);
}
