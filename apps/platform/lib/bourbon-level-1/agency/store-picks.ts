export type StorePickLesson = {
  id: string;
  title: string;
  body: string;
  detectiveLink?: string;
};

export const STORE_PICK_LESSONS: StorePickLesson[] = [
  {
    id: 'what',
    title: 'What is a store pick?',
    body: 'A retailer-selected single barrel (or small batch) bottled exclusively for that store. Same brand expression as shelf — different barrel, often different proof and flavor. The store name appears on the label.',
    detectiveLink: '/bourbon/detective/store-pick-magic',
  },
  {
    id: 'why-different',
    title: 'Why are they different?',
    body: 'Standard bottles are blended for consistency across thousands of barrels. A store pick is one barrel chosen because it tasted exceptional — or because a buyer liked the profile. Rickhouse floor, season, and age all vary.',
    detectiveLink: '/bourbon/detective/barrel-floor',
  },
  {
    id: 'worth-it',
    title: 'When are they worth buying?',
    body: 'Worth it when: modest premium over standard, trusted picker, you can compare side-by-side. Skip when: 2× markup with no tasting notes, unknown picker, or you have not tried the standard expression yet.',
  },
  {
    id: 'evaluate',
    title: 'How do you evaluate a pick?',
    body: 'Ask: pick date, warehouse, proof, who selected. Taste against standard if possible. Note nose, palate, finish — does the premium buy you more complexity or just more hype?',
  },
  {
    id: 'famous',
    title: 'Famous pick programs',
    body: 'Buffalo Trace, Four Roses, Russell\'s Reserve, and Knob Creek all have active pick cultures. Each house has a different pick personality — BT picks often show oak; Four Roses picks highlight yeast/recipe variation.',
  },
  {
    id: 'first-pick',
    title: 'Your first store pick move',
    body: 'Buy the standard bottle first. Learn the house baseline. Then buy one pick from a store you trust. Pour half-ounce of each blind. That one night teaches more than a year of forum reading.',
  },
];

export type StorePickProgram = {
  producerSlug: string;
  name: string;
  typicalProof: string;
  whatToAsk: string;
};

export const STORE_PICK_PROGRAMS: StorePickProgram[] = [
  { producerSlug: 'buffalo-trace', name: 'Buffalo Trace Single Barrel', typicalProof: '90 (varies)', whatToAsk: 'Which warehouse? OESQ vs other recipes if applicable.' },
  { producerSlug: 'four-roses', name: 'Four Roses Single Barrel OBSV/OESK/etc.', typicalProof: '100', whatToAsk: 'Which recipe code? Each is a different personality.' },
  { producerSlug: 'wild-turkey', name: "Russell's Reserve Single Barrel", typicalProof: '110', whatToAsk: 'Rickhouse floor and age — Turkey picks run hot.' },
  { producerSlug: 'jim-beam', name: 'Knob Creek Single Barrel', typicalProof: '120', whatToAsk: 'Barrel age — KC picks often 9+ years.' },
];
