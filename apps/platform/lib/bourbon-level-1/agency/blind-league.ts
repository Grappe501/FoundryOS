export type LeagueChallenge = {
  id: string;
  monthKey: string;
  title: string;
  description: string;
  questions: { prompt: string; options: string[]; answer: number }[];
};

function monthKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const CHALLENGE_POOL: Omit<LeagueChallenge, 'monthKey'>[] = [
  {
    id: 'mashbill-guess',
    title: 'Wheated vs rye blind',
    description: 'Can you spot wheat softness vs rye spice from description alone?',
    questions: [
      { prompt: 'Soft caramel, no burn, crowd pleaser — mashbill?', options: ['Wheated', 'High rye', 'Corn-heavy'], answer: 0 },
      { prompt: 'Black pepper, cherry, long spice finish — mashbill?', options: ['Wheated', 'High rye', 'Traditional only'], answer: 1 },
      { prompt: 'Banana bread, gentle, Maker\'s cousin vibes — mashbill?', options: ['High rye', 'Wheated', 'Peated'], answer: 1 },
    ],
  },
  {
    id: 'proof-range',
    title: 'Proof range challenge',
    description: 'Guess the proof band from tasting notes.',
    questions: [
      { prompt: 'Hot but flavorful — add water opens it up. Proof band?', options: ['80–90', '90–100', '100–110+'], answer: 2 },
      { prompt: 'Easy sipper, cocktail friendly, gentle nose. Proof band?', options: ['80–90', '100–110', '120+'], answer: 0 },
      { prompt: 'Bold but not barrel proof — Wild Turkey zone. Proof band?', options: ['80', '101', '130'], answer: 1 },
    ],
  },
  {
    id: 'age-range',
    title: 'Age range challenge',
    description: 'Young energy vs deep oak — can you tell from notes?',
    questions: [
      { prompt: 'Bright corn, short finish, youthful — age?', options: ['4–6 yr', '10–12 yr', '20+ yr'], answer: 0 },
      { prompt: 'Deep oak, tannin, dried fruit — age?', options: ['4 yr', '10+ yr', 'Unaged'], answer: 1 },
      { prompt: 'Balanced daily pour, NAS but mature — age?', options: ['2 yr', '6–8 yr typical', '30 yr'], answer: 1 },
    ],
  },
];

export function getMonthlyChallenge(d = new Date()): LeagueChallenge {
  const key = monthKey(d);
  const idx = d.getMonth() % CHALLENGE_POOL.length;
  return { ...CHALLENGE_POOL[idx], monthKey: key };
}

export type LeagueScore = {
  monthKey: string;
  challengeId: string;
  score: number;
  total: number;
  at: string;
};
