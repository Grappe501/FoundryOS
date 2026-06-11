/** Poker World — Passion Trinity · Strategic Thinking (PASS-023 foundation) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const POKER_LOOP = [
  { step: 'Mission', description: 'Pick a skill, session, or concept to master' },
  { step: 'Build', description: 'Study, track, or play with intention' },
  { step: 'Show', description: 'Log results, share hands, or teach a concept' },
  { step: 'Reflect', description: 'Review decisions — not just outcomes' },
  { step: 'Improve', description: 'Adjust strategy based on evidence' },
  { step: 'Mentor', description: 'Coach a new player on fundamentals' },
] as const;

export const POKER_ACADEMY_LEVELS = [
  { slug: 'learner', level: 1, title: 'Table Learner', tagline: 'Rules, ranks, and basic position', unlocks: ['Mission 1: Track First Bankroll'] },
  { slug: 'grinder', level: 2, title: 'Session Grinder', tagline: 'Play with structure and stop-loss discipline', unlocks: ['Hand Review Lab'] },
  { slug: 'analyst', level: 3, title: 'Hand Analyst', tagline: 'Review decisions with evidence, not vibes', unlocks: ['Mission 3: Review 10 Hands'] },
  { slug: 'tournament', level: 4, title: 'Tournament Player', tagline: 'ICM, bubbles, and final table pressure', unlocks: ['Mission 2: Play First Tournament'] },
  { slug: 'final-table', level: 5, title: 'Final Table Player', tagline: 'Close out events under pressure', unlocks: ['Mission 4: Final Table'] },
  { slug: 'coach', level: 6, title: 'Study Coach', tagline: 'Run study groups and structured reviews', unlocks: ['Mission 5: Teach New Player'] },
  { slug: 'mentor', level: 7, title: 'Poker Mentor', tagline: 'Lead the Poker Study Circle', unlocks: ['Circle mentorship'] },
];

export const POKER_MISSIONS: WorldMission[] = [
  {
    slug: 'track-bankroll',
    number: 1,
    title: 'Track First Bankroll',
    subtitle: 'Treat poker like a skill with a budget — not a lottery ticket',
    outcome: 'A bankroll spreadsheet with starting amount, session logs, and stop-loss rules',
    evidence: 'Bankroll doc + 3 session entries + written rules for when you stop',
    timeEstimate: '45–60 min setup + 2 sessions',
    requiredLevel: 'Table Learner (Level 1 — you start here)',
    futureProof: 'Bankroll discipline is financial literacy applied to decision-making under uncertainty.',
    toolsNeeded: 'Spreadsheet or app · defined recreational budget · home game or legal venue',
    tomorrowHook: 'Tomorrow: Mission 2 — enter your first tournament with a plan.',
    nextMissionSlug: 'first-tournament',
    steps: [
      { phase: 'Mission', title: 'Set your bankroll', body: 'Define money you can lose without stress. Separate from rent, savings, and investing.' },
      { phase: 'Build', title: 'Log sessions', body: 'Date · stakes · buy-in · cash-out · duration · one note on biggest mistake.' },
      { phase: 'Show', title: 'Share rules with a friend', body: 'Tell someone your stop-loss — accountability matters.' },
      { phase: 'Reflect', title: 'Emotional check', body: 'Did you chase losses? Play too long? Write honestly.' },
      { phase: 'Improve', title: 'One rule upgrade', body: 'Add a time limit, win cap, or mandatory break rule.' },
      { phase: 'Mentor', title: 'Warn a beginner', body: 'Explain why bankroll management matters before stakes go up.' },
    ],
  },
  {
    slug: 'first-tournament',
    number: 2,
    title: 'Play First Tournament',
    subtitle: 'Survival mode — position, patience, and pick your spots',
    outcome: 'Completed tournament with position notes and key hand log',
    evidence: 'Finish position + 2 key hands written up + one strategic lesson',
    timeEstimate: '3–6 hours',
    requiredLevel: 'Tournament Player (Level 4)',
    futureProof: 'Tournaments teach resource management when you cannot rebuy forever.',
    tomorrowHook: 'Tomorrow: Mission 3 — review ten hands with decision-focused notes.',
    nextMissionSlug: 'review-ten-hands',
    steps: [
      { phase: 'Mission', title: 'Pick your event', body: 'Home tourney, local card room, or online MTT — know structure and blind levels.' },
      { phase: 'Build', title: 'Play with a plan', body: 'Tight early · steal blinds in middle · survive bubble with math not hope.' },
      { phase: 'Show', title: 'Log key moments', body: 'Bubble spot · biggest pot · elimination hand (or win!).' },
      { phase: 'Reflect', title: 'Decision quality', body: 'Ignore outcome — were your decisions +EV with info you had?' },
      { phase: 'Improve', title: 'One leak to fix', body: 'Over-folding? Over-bluffing? Write the leak.' },
      { phase: 'Mentor', title: 'Explain blinds to a newbie', body: 'Teach how blinds force action.' },
    ],
  },
  {
    slug: 'review-ten-hands',
    number: 3,
    title: 'Review 10 Hands',
    subtitle: 'Study beats volume — learn from decisions, not results',
    outcome: 'Ten hand histories with street-by-street decisions and alternative lines',
    evidence: 'Hand review doc + one hand where you changed your mind after review',
    timeEstimate: '2–3 hours',
    requiredLevel: 'Hand Analyst (Level 3)',
    futureProof: 'Structured review is how amateurs become analysts — in poker and in life.',
    tomorrowHook: 'Tomorrow: Mission 4 — play for a final table finish.',
    nextMissionSlug: 'final-table',
    steps: [
      { phase: 'Mission', title: 'Collect hands', body: 'Winners, losers, and weird spots — not just bad beats.' },
      { phase: 'Build', title: 'Review each street', body: 'Preflop · flop · turn · river — what did you know? What should you do differently?' },
      { phase: 'Show', title: 'Share one hand', body: 'Post or discuss one hand with a study partner.' },
      { phase: 'Reflect', title: 'Pattern hunt', body: 'What mistake repeats across multiple hands?' },
      { phase: 'Improve', title: 'One drill', body: 'Pick one spot type to study (3-bet pots, river bluffs, etc.).' },
      { phase: 'Mentor', title: 'Review a beginner hand', body: 'Walk someone through one hand without jargon overload.' },
    ],
  },
  {
    slug: 'final-table',
    number: 4,
    title: 'Final Table',
    subtitle: 'Pressure, pay jumps, and patience when everyone is tired',
    outcome: 'Final table appearance with ICM-aware decision notes',
    evidence: 'Finish position + pay jump math + one ICM decision explained',
    timeEstimate: 'Tournament day',
    requiredLevel: 'Final Table Player (Level 5)',
    futureProof: 'Final tables are leadership under uncertainty — read the room, manage risk.',
    tomorrowHook: 'Tomorrow: Mission 5 — teach a new player the fundamentals.',
    nextMissionSlug: 'teach-new-player',
    steps: [
      { phase: 'Mission', title: 'Know the pay ladder', body: 'Write pay jumps before you sit. Know when survival beats accumulation.' },
      { phase: 'Build', title: 'Play ICM-aware', body: 'Short stacks push · big stacks apply pressure · medium stacks pick spots.' },
      { phase: 'Show', title: 'Log the table', body: 'Stack sizes · aggression levels · who is tilting.' },
      { phase: 'Reflect', title: 'Best and worst decision', body: 'Ignore finish if needed — judge decisions.' },
      { phase: 'Improve', title: 'Study one FT spot', body: 'Find a similar final table hand online and compare lines.' },
      { phase: 'Mentor', title: 'Explain pay jumps', body: 'Teach someone why chip EV differs from money EV.' },
    ],
  },
  {
    slug: 'teach-new-player',
    number: 5,
    title: 'Teach New Player',
    subtitle: 'Teaching forces mastery — hand ranks, position, and bankroll first',
    outcome: 'A new player completes their first session with your coaching on fundamentals',
    evidence: 'Teaching outline + student feedback + one concept they mastered',
    timeEstimate: '2 hours',
    requiredLevel: 'Study Coach (Level 6)',
    futureProof: 'Teachers become mentors — the highest form of strategic mastery.',
    tomorrowHook: 'Tomorrow: return to Bourbon World — appreciate craft at the shelf.',
    steps: [
      { phase: 'Mission', title: 'Design lesson 1', body: 'Hand ranks · blinds · position · one starting hand chart — nothing more.' },
      { phase: 'Build', title: 'Run a home lesson', body: 'Play low-stakes or chips-only. Stop when they are overwhelmed.' },
      { phase: 'Show', title: 'Debrief together', body: 'Ask what confused them. Fix one misconception.' },
      { phase: 'Reflect', title: 'Teaching log', body: 'What explanation landed? What did you rush?' },
      { phase: 'Improve', title: 'Lesson 2 outline', body: 'Plan pot odds or continuation bets for next session.' },
      { phase: 'Mentor', title: 'Invite to study circle', body: 'Connect them to the Poker Study Circle when ready.' },
    ],
  },
];

export const POKER_PORTFOLIO_KEY = 'foundry-poker-portfolio';
export const POKER_PORTFOLIO_LABEL = 'My Poker Journey';

export const POKER_COMMUNITY = {
  name: 'Poker Study Circle',
  features: [
    { title: 'Hand reviews', description: 'Structured post-session analysis — no results-oriented thinking' },
    { title: 'Bankroll accountability', description: 'Stop-loss rules shared with study partners' },
    { title: 'Tournament debriefs', description: 'Final table decisions dissected with respect' },
    { title: 'Mentorship', description: 'Coaches guide first home games and first reviews' },
  ],
};

export function getPokerMission(slug: string) {
  return POKER_MISSIONS.find((m) => m.slug === slug);
}
export const POKER_CORE_PROMISE = 'Build strategic thinking, bankroll discipline, and confidence at the table.';
