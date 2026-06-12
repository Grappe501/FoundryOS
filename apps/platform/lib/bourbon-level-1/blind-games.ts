export type MysteryChallenge = {
  id: string;
  color: string;
  nose: string[];
  palate: string[];
  finish: string;
  options: { label: string; correct: boolean }[];
  reveal: { name: string; proof: string; mashbill: string; age: string; teach: string };
};

export type DistilleryMatchQuestion = {
  id: string;
  description: string;
  options: { producerSlug: string; name: string; correct: boolean }[];
  explain: string;
};

export const MYSTERY_CHALLENGES: MysteryChallenge[] = [
  {
    id: 'm1',
    color: 'Deep amber with copper highlights',
    nose: ['Caramel corn', 'Vanilla bean', 'Light cinnamon'],
    palate: ['Toffee', 'Orange peel', 'Black pepper on the back'],
    finish: 'Medium-long; rye spice builds after swallow',
    options: [{ label: '80–86 proof', correct: false }, { label: '90–95 proof', correct: true }, { label: '100–110 proof', correct: false }, { label: '115+ proof', correct: false }],
    reveal: { name: 'Classic high-rye Kentucky bourbon (~90 proof)', proof: '90', mashbill: 'High rye (~15%)', age: '4–8 years (typical NAS)', teach: 'Rye spice on the finish often means higher rye mash bill — not always higher proof.' },
  },
  {
    id: 'm2',
    color: 'Honey gold',
    nose: ['Banana bread', 'Honey', 'Soft oak'],
    palate: ['Caramel', 'Vanilla', 'Minimal burn'],
    finish: 'Short-medium; gentle and sweet',
    options: [{ label: 'High rye bourbon', correct: false }, { label: 'Wheated bourbon', correct: true }, { label: 'Corn whiskey', correct: false }, { label: 'Rye whiskey', correct: false }],
    reveal: { name: 'Wheated bourbon profile', proof: '86–90', mashbill: 'Wheat as flavor grain', age: 'NAS typical', teach: 'Banana and soft sweetness often signal wheat replacing rye in the mash bill.' },
  },
  {
    id: 'm3',
    color: 'Mahogany',
    nose: ['Deep oak', 'Leather', 'Dark cherry'],
    palate: ['Chocolate', 'Espresso', 'Dried fig'],
    finish: 'Long; tannic oak dries the palate',
    options: [{ label: '2–4 years', correct: false }, { label: '6–10 years', correct: true }, { label: '15–20 years', correct: false }, { label: 'Unaged', correct: false }],
    reveal: { name: 'Aged straight bourbon', proof: '90–100', mashbill: 'Traditional', age: '8–12 years', teach: 'Leather and dried fruit often mean real age — but check for over-oaked tannin vs elegance.' },
  },
];

export const DISTILLERY_MATCH: DistilleryMatchQuestion[] = [
  {
    id: 'd1',
    description: 'Red wax, wheated mash bill, Loretto Kentucky. Soft caramel and vanilla. The bottle your non-bourbon friends already recognize.',
    options: [{ producerSlug: 'makers-mark', name: "Maker's Mark", correct: true }, { producerSlug: 'wild-turkey', name: 'Wild Turkey', correct: false }, { producerSlug: 'four-roses', name: 'Four Roses', correct: false }],
    explain: "Maker's Mark — wheat instead of rye defines the soft profile and iconic wax dip.",
  },
  {
    id: 'd2',
    description: 'Ten different bourbon recipes. Floral high-rye nose. Yellow label entry, single barrel step-up. Lawrenceburg campus.',
    options: [{ producerSlug: 'four-roses', name: 'Four Roses', correct: true }, { producerSlug: 'buffalo-trace', name: 'Buffalo Trace', correct: false }, { producerSlug: 'jim-beam', name: 'Jim Beam', correct: false }],
    explain: 'Four Roses — unique multi-recipe system makes them instantly identifiable in blind format.',
  },
  {
    id: 'd3',
    description: '101 proof benchmark. Jimmy Russell legacy. Rye spice, caramel, and a finish that reminds you bourbon is not soda.',
    options: [{ producerSlug: 'wild-turkey', name: 'Wild Turkey', correct: true }, { producerSlug: 'heaven-hill', name: 'Heaven Hill', correct: false }, { producerSlug: 'old-forester', name: 'Old Forester', correct: false }],
    explain: 'Wild Turkey 101 — the 101 proof standard and high-rye boldness are signature.',
  },
  {
    id: 'd4',
    description: 'Frankfort campus. Vanilla-caramel daily pour. Gateway to Eagle Rare and Weller — if you can find them.',
    options: [{ producerSlug: 'buffalo-trace', name: 'Buffalo Trace', correct: true }, { producerSlug: 'woodford-reserve', name: 'Woodford Reserve', correct: false }, { producerSlug: 'barton-1792', name: 'Barton 1792', correct: false }],
    explain: 'Buffalo Trace — the house pour that launched a thousand allocations.',
  },
];
