/** Chess World — Skills Guild · Think Deeply (PASS-032) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

/** Voice guide loop — Debrief / Refine / Teach (see docs/VOICE_GUIDE.md) */
export const CHESS_LOOP = [
  { step: 'Mission', description: 'Pick a game, puzzle set, or line to study' },
  { step: 'Build', description: 'Play, solve, or analyze with intention' },
  { step: 'Show', description: 'Log the PGN, score sheet, or puzzle streak' },
  { step: 'Debrief', description: 'Name the blunder, pattern, or turning point' },
  { step: 'Refine', description: 'One adjustment to repertoire or calculation' },
  { step: 'Teach', description: 'Explain a tactic or rule to a beginner' },
] as const;

export const CHESS_ACADEMY_LEVELS = [
  {
    slug: 'beginner',
    level: 1,
    title: 'Beginner',
    tagline: 'Rules, mates, and your first complete games',
    unlocks: ['Mission 1: Play Your First Complete Game'],
  },
  {
    slug: 'novice',
    level: 2,
    title: 'Novice',
    tagline: 'Notation, basic tactics, daily puzzle habit',
    unlocks: ['Mission 2: Learn Algebraic Notation'],
  },
  {
    slug: 'club-player',
    level: 3,
    title: 'Club Player',
    tagline: 'Regular play with a sketch repertoire',
    unlocks: ['Mission 3: Solve 50 Tactical Puzzles'],
  },
  {
    slug: 'tactician',
    level: 4,
    title: 'Tactician',
    tagline: 'See forks, pins, and skewers without hesitation',
    unlocks: ['Mission 4: Build a Mini Repertoire'],
  },
  {
    slug: 'strategist',
    level: 5,
    title: 'Strategist',
    tagline: 'Plans, pawn structures, middlegame judgment',
    unlocks: ['Mission 7: Study One Pawn Structure'],
  },
  {
    slug: 'competitor',
    level: 6,
    title: 'Competitor',
    tagline: 'Rated games, clocks, tournament nerves',
    unlocks: ['Mission 10: Play Your First Rated Game'],
  },
  {
    slug: 'candidate',
    level: 7,
    title: 'Candidate',
    tagline: 'Deep study blocks and norm-track milestones',
    unlocks: ['Mission 13: Build a Weekly Study Plan'],
  },
  {
    slug: 'master',
    level: 8,
    title: 'Master',
    tagline: 'Teach, lead study, publish your standard',
    unlocks: ['Mission 15: Lead a Study Session'],
  },
];

const CHESS_FOUNDATION_MISSIONS: WorldMission[] = [
  {
    slug: 'first-complete-game',
    number: 1,
    title: 'Play Your First Complete Game',
    subtitle: 'Finish a full game — win, lose, or draw — and know why it ended',
    outcome: 'One completed game with a written note on how checkmate or resignation happened',
    evidence: 'Opponent name/date + result + 3-sentence summary',
    timeEstimate: '30–60 min',
    requiredLevel: 'Beginner (Level 1 — you start here)',
    futureProof: 'Finishing games builds clock discipline and endgame awareness early.',
    toolsNeeded: 'Chess board or app · optional coach or friend',
    tomorrowHook: 'Tomorrow: Mission 2 — learn notation and review the game you just played.',
    nextMissionSlug: 'learn-notation',
    steps: [
      { phase: 'Mission', title: 'Set up the board', body: 'Physical board or Lichess/Chess.com — pick one surface and stick with it this mission.' },
      { phase: 'Build', title: 'Play to completion', body: 'No takebacks. Play until checkmate, resignation, stalemate, or agreed draw.' },
      { phase: 'Show', title: 'Record the result', body: 'Winner · method (mate/resign/draw) · approximate move count.' },
      { phase: 'Debrief', title: 'Find the turning point', body: 'One move where the evaluation swung — even if you do not know engine scores yet.' },
      { phase: 'Refine', title: 'One rule to solidify', body: 'Castling? En passant? Promotion? Pick one rule you were unsure about and read it once.' },
      { phase: 'Teach', title: 'Explain checkmate', body: 'Show a beginner how the king gets mated — two rooks or queen + king is enough.' },
    ],
  },
  {
    slug: 'learn-notation',
    number: 2,
    title: 'Learn Algebraic Notation',
    subtitle: 'Write moves so you can review — study starts when games become records',
    outcome: 'Your Mission 1 game rewritten in algebraic notation (at least 20 moves)',
    evidence: 'Notation sheet or PGN export + one corrected move you misread',
    timeEstimate: '45 min',
    requiredLevel: 'Novice (Level 2)',
    futureProof: 'Every strong player reads games as text. Notation is the save file.',
    tomorrowHook: 'Tomorrow: Mission 3 — fifty tactical puzzles.',
    nextMissionSlug: 'fifty-tactics',
    steps: [
      { phase: 'Mission', title: 'Learn the grid', body: 'Files a–h, ranks 1–8. Piece letters: K Q R B N. Captures, checks, checkmate symbols.' },
      { phase: 'Build', title: 'Transcribe your game', body: 'Replay Mission 1 move by move. Pause when unsure — look up the square.' },
      { phase: 'Show', title: 'Save the score', body: 'Photo of scoresheet or PGN paste in your portfolio.' },
      { phase: 'Debrief', title: 'Where notation broke', body: 'Which move was hardest to notate — disambiguation? Castling? En passant?' },
      { phase: 'Refine', title: 'Notation drill', body: 'Play 10 moves solo on a board and write them without looking at answers.' },
      { phase: 'Teach', title: 'Quiz a friend', body: 'Call out e4 e5 Nf3 — have them point to the squares.' },
    ],
  },
  {
    slug: 'fifty-tactics',
    number: 3,
    title: 'Solve 50 Tactical Puzzles',
    subtitle: 'Forks and pins until you see them without thinking',
    outcome: '50 puzzles logged with themes tagged (fork, pin, skewer, mate net)',
    evidence: 'Puzzle log + accuracy % + one puzzle you failed twice',
    timeEstimate: '3–5 sessions',
    requiredLevel: 'Club Player (Level 3)',
    futureProof: 'Tactics win club games. Strategy wins master games — but you need both.',
    toolsNeeded: 'Lichess puzzles, Chess.com tactics, or a tactics book',
    tomorrowHook: 'Tomorrow: Mission 4 — build a mini opening repertoire.',
    nextMissionSlug: 'mini-repertoire',
    steps: [
      { phase: 'Mission', title: 'Pick a source', body: 'One app or book. Rating-appropriate — start easy, raise difficulty slowly.' },
      { phase: 'Build', title: 'Solve 50', body: 'Tag each theme when you finish. Note when you saw the idea vs calculated it.' },
      { phase: 'Show', title: 'Screenshot streak', body: 'Export or screenshot your puzzle history / streak.' },
      { phase: 'Debrief', title: 'Pattern audit', body: 'Which theme appears most in your misses — pins? Back rank?' },
      { phase: 'Refine', title: 'Theme drill', body: 'Do 10 extra puzzles on your weakest theme only.' },
      { phase: 'Teach', title: 'Show one fork', body: 'Set up a knight fork on the board and explain why both pieces cannot escape.' },
    ],
  },
  {
    slug: 'mini-repertoire',
    number: 4,
    title: 'Build a Mini Repertoire',
    subtitle: 'One opening for White, one for Black — depth beats breadth',
    outcome: 'Written repertoire: 1.e4 or 1.d4 line + Black response through move 8',
    evidence: 'Repertoire doc + one blitz game where you reached your tabiya',
    timeEstimate: '2 hours',
    requiredLevel: 'Tactician (Level 4)',
    futureProof: 'Club players lose in the opening less when they have a plan, not a surprise.',
    tomorrowHook: 'Tomorrow: Mission 5 — king and pawn endgame essentials.',
    nextMissionSlug: 'kp-endings',
    steps: [
      { phase: 'Mission', title: 'Choose systems', body: 'White: Italian or London. Black vs e4: …e5 or Sicilian simplified. Write why you chose them.' },
      { phase: 'Build', title: 'Learn 8 moves deep', body: 'Not 20 openings — one line each color. Know the idea, not just moves.' },
      { phase: 'Show', title: 'Play three blitz games', body: 'Try to reach your line. Note when opponents deviate.' },
      { phase: 'Debrief', title: 'Deviation log', body: 'What sideline hurt you? One line to add or one trap to avoid.' },
      { phase: 'Refine', title: 'Add one branch', body: 'Cover the most common deviation you faced.' },
      { phase: 'Teach', title: 'Explain the plan', body: 'Tell a beginner the goal of your opening — not every move.' },
    ],
  },
  {
    slug: 'kp-endings',
    number: 5,
    title: 'King and Pawn Endgame Essentials',
    subtitle: 'Opposition, square rule, and promotion races — games decided here',
    outcome: 'Can demonstrate opposition and win a basic K+P vs K endgame',
    evidence: 'Written notes on three positions + one win against engine or coach',
    timeEstimate: '90 min',
    requiredLevel: 'Strategist (Level 5)',
    futureProof: 'Many club games simplify. Endgame technique is free rating points.',
    tomorrowHook: 'Tomorrow: Mission 6 — post-mortem your last ten games.',
    nextMissionSlug: 'ten-post-mortems',
    steps: [
      { phase: 'Mission', title: 'Study three ideas', body: 'Opposition · square rule · outside passed pawn. Use a book or Lichess endgame chapter.' },
      { phase: 'Build', title: 'Drill positions', body: 'Set up 5 K+P vs K wins. Play both sides until automatic.' },
      { phase: 'Show', title: 'Win one cold', body: 'No hints — win from a winning position against a friend or bot.' },
      { phase: 'Debrief', title: 'Where you almost drew', body: 'One move that would have thrown the win — mark it.' },
      { phase: 'Refine', title: 'One pawn race', body: 'Study a promotion race position and write who wins and why.' },
      { phase: 'Teach', title: 'Show opposition', body: 'Place kings on the board and explain why one side must give way.' },
    ],
  },
];

import { expandChessMissions } from './immersion/worlds/chess';

export const CHESS_MISSIONS = expandChessMissions(CHESS_FOUNDATION_MISSIONS);

export const CHESS_PORTFOLIO_KEY = 'foundry-chess-portfolio';
export const CHESS_PORTFOLIO_LABEL = 'My Chess Log';

export const CHESS_COMMUNITY = {
  name: 'Chess Study Circle',
  features: [
    { title: 'Post-mortems', description: 'Structured game review — blunders named, not hidden' },
    { title: 'Repertoire threads', description: 'Share lines, deviations, and preparation notes' },
    { title: 'Tournament debriefs', description: 'Rating changes with decision quality, not excuses' },
    { title: 'Study blocks', description: 'Pair up for tactics drills and endgame sparring' },
  ],
};

export function getChessMission(slug: string) {
  return CHESS_MISSIONS.find((m) => m.slug === slug);
}

export const CHESS_CORE_PROMISE =
  'Study the game seriously — from first complete game to club strength, rated play, and the master track.';
