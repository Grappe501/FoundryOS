/** PASS-034A — Why people fall in love (emotion > facts) */

export type WorldObsession = {
  world_slug: string;
  headline: string;
  reasons: { title: string; body: string }[];
};

export const WORLD_OBSESSIONS: WorldObsession[] = [
  {
    world_slug: 'bourbon',
    headline: 'Why people become obsessed with bourbon',
    reasons: [
      { title: 'The hunt', body: 'Allocated bottles, distillery trips, the thrill of finding something rare on a shelf.' },
      { title: 'The stories', body: 'Every pour carries history — Prohibition, family dynasties, rickhouse legends.' },
      { title: 'The craftsmanship', body: 'Mash bills, char levels, proof choices — a craft you can taste.' },
      { title: 'The friendships', body: 'Tastings are excuses to gather. The bourbon is the excuse; the table is the point.' },
    ],
  },
  {
    world_slug: 'public-speaking',
    headline: 'Why people become obsessed with speaking',
    reasons: [
      { title: 'Influence', body: 'One clear talk can shift a room, a team, or a vote.' },
      { title: 'Confidence', body: 'The skill compounds — every rep makes the next stage smaller.' },
      { title: 'Connection', body: 'Speaking is structured vulnerability. Audiences remember honesty.' },
    ],
  },
  {
    world_slug: 'ai-builder',
    headline: 'Why people become obsessed with building',
    reasons: [
      { title: 'Creation', body: 'Ideas become tools overnight. You are not waiting for permission.' },
      { title: 'Freedom', body: 'Automate the boring. Spend time on what only you can do.' },
      { title: 'Leverage', body: 'One assistant, one workflow, one product — multiplied effort.' },
    ],
  },
  {
    world_slug: 'financial-independence',
    headline: 'Why people become obsessed with financial independence',
    reasons: [
      { title: 'Security', body: 'Sleep better when you know where money goes and why.' },
      { title: 'Options', body: 'Say yes to the right opportunities — and no without panic.' },
      { title: 'Freedom', body: 'Time is the asset. Money is how you protect it.' },
    ],
  },
  {
    world_slug: 'civic-engagement',
    headline: 'Why people become obsessed with civic life',
    reasons: [
      { title: 'Agency', body: 'Meetings, ballots, and budgets are levers — once you see them.' },
      { title: 'Belonging', body: 'Communities need people who show up consistently.' },
      { title: 'Legacy', body: 'Local change is how most history actually happens.' },
    ],
  },
  {
    world_slug: 'bbq',
    headline: 'Why people become obsessed with BBQ',
    reasons: [
      { title: 'Patience', body: 'Fire teaches time. You cannot rush smoke.' },
      { title: 'Feeding people', body: 'The best compliments come with sauce on your fingers.' },
      { title: 'Craft pride', body: 'Bark, smoke ring, rest — details strangers taste.' },
    ],
  },
  {
    world_slug: 'poker',
    headline: 'Why people become obsessed with poker',
    reasons: [
      { title: 'Probability', body: 'Luck happens. Edge is built over thousands of hands.' },
      { title: 'Psychology', body: 'Reading people without speaking — a social puzzle.' },
      { title: 'The table', body: 'Home games become traditions. The cards are the ritual.' },
    ],
  },
];

export function getWorldObsession(worldSlug: string): WorldObsession | undefined {
  return WORLD_OBSESSIONS.find((w) => w.world_slug === worldSlug);
}
