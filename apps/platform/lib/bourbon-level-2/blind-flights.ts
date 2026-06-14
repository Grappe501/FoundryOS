/** Level 2 v3 — blind tasting presets with bag discipline */

export type BlindFlightPreset = {
  id: string;
  title: string;
  difficulty: 'starter' | 'intermediate' | 'advanced';
  bottleSlugs: string[];
  variable: string;
  setupSteps: string[];
  revealPrompt: string;
  linkedFlightId?: string;
  linkedGridId?: string;
};

export const BLIND_FLIGHT_PRESETS: BlindFlightPreset[] = [
  {
    id: 'value-four-blind',
    title: 'Value four blind',
    difficulty: 'starter',
    bottleSlugs: ['evan-williams-black', 'wild-turkey-101', 'four-roses-yellow', 'larceny'],
    variable: 'Under $35 — price blind',
    setupSteps: [
      'Bag four bottles — number glasses 1–4.',
      'Pour ½ oz each — no label hints on table.',
      'Score nose, palate, finish 1–10 before any reveal.',
      'Rank 1–4 — write flavor words only, no brand guesses.',
    ],
    revealPrompt: 'Did cheapest bottle win? Humility is data.',
    linkedFlightId: 'value-blind-prep',
    linkedGridId: 'value-five',
  },
  {
    id: 'mashbill-blind-triangle',
    title: 'Mash bill blind triangle',
    difficulty: 'intermediate',
    bottleSlugs: ['buffalo-trace', 'wild-turkey-101', 'makers-mark'],
    variable: 'Mash bill — traditional vs high-rye vs wheated',
    setupSteps: [
      'Bag three pours — match proof ~90 where possible.',
      'Guess mash bill family before reveal — not brand.',
      'Defend #1 with grain vocabulary.',
    ],
    revealPrompt: 'Could you name wheated vs high-rye without the label?',
    linkedFlightId: 'mashbill-triangle',
    linkedGridId: 'mashbill-three',
  },
  {
    id: 'category-blind-triangle',
    title: 'Category blind triangle',
    difficulty: 'intermediate',
    bottleSlugs: ['buffalo-trace', 'rittenhouse-rye', 'jack-daniels-old-no-7'],
    variable: 'Bourbon vs rye vs Tennessee',
    setupSteps: [
      'Bag three — read categories only after scoring.',
      'Write legal category guess per glass before reveal.',
    ],
    revealPrompt: 'Which difference was grain vs process vs proof?',
    linkedFlightId: 'category-triangle',
  },
  {
    id: 'wheated-blind-four',
    title: 'Wheated blind four',
    difficulty: 'intermediate',
    bottleSlugs: ['makers-mark', 'larceny', 'wilderness-trail-bib', 'log-still-diving-bell'],
    variable: 'Wheated — major vs craft',
    setupSteps: [
      'Four wheated pours bagged — craft may surprise.',
      'Rank texture and sweetness before reveal.',
    ],
    revealPrompt: 'Did craft beat Maker\'s on your palate tonight?',
    linkedGridId: 'wheated-four',
  },
  {
    id: 'proof-blind-ladder',
    title: 'Proof blind ladder',
    difficulty: 'advanced',
    bottleSlugs: ['old-forester-86', 'knob-creek-9', 'rare-breed', 'old-forester-1920'],
    variable: 'Proof only — mixed houses',
    setupSteps: [
      'Bag four — order by perceived proof before reveal.',
      'Water one drop on highest perceived only.',
    ],
    revealPrompt: 'Did you rank proof correctly blind?',
    linkedFlightId: 'proof-ladder',
  },
  {
    id: 'craft-splurge-blind',
    title: 'Craft splurge blind',
    difficulty: 'advanced',
    bottleSlugs: ['buffalo-trace', 'peerless-bourbon', 'blue-run-8-year', 'eagle-rare'],
    variable: 'Price vs palate — splurge humility',
    setupSteps: [
      'Include one $30 bottle with three splurge pours bagged.',
      'Rank blind — price order vs preference order.',
    ],
    revealPrompt: 'Splurge must earn rank — not marketing.',
    linkedGridId: 'splurge-craft-four',
  },
  {
    id: 'host-night-blind',
    title: 'Host night blind five',
    difficulty: 'starter',
    bottleSlugs: ['makers-mark', 'buffalo-trace', 'wild-turkey-101', 'larceny', 'four-roses-yellow'],
    variable: 'Crowd-pleaser discovery — host homework',
    setupSteps: [
      'Pick five host-friendly bottles — bag all.',
      'Guests rank — you take notes, not scores.',
      'Reveal and discuss #1 — why it won for the room.',
    ],
    revealPrompt: 'Host wins when the room learns, not when you show off.',
    linkedFlightId: 'host-skeptic-flight',
  },
];

export function getBlindPreset(id: string): BlindFlightPreset | undefined {
  return BLIND_FLIGHT_PRESETS.find((p) => p.id === id);
}
