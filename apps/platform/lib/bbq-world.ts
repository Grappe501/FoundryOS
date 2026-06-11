/** BBQ World — Passion Trinity · Create Experiences (PASS-023 foundation) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const BBQ_LOOP = [
  { step: 'Mission', description: 'Pick a cook, event, or skill worth mastering' },
  { step: 'Build', description: 'Prep, fire, smoke, and manage the cook' },
  { step: 'Show', description: 'Serve, share, or document the result' },
  { step: 'Reflect', description: 'Write what worked, what failed, and why' },
  { step: 'Improve', description: 'Adjust temps, timing, or technique next time' },
  { step: 'Mentor', description: 'Teach someone their first fire or prep step' },
] as const;

export const BBQ_ACADEMY_LEVELS = [
  { slug: 'backyard', level: 1, title: 'Backyard Cook', tagline: 'Fire, smoke, and patience — the basics', unlocks: ['Mission 1: Smoke First Pork Butt'] },
  { slug: 'pitmaster', level: 2, title: 'Pit Apprentice', tagline: 'Manage temps and timing with confidence', unlocks: ['Fire Lab'] },
  { slug: 'brisket', level: 3, title: 'Brisket Builder', tagline: 'The cook that separates hobby from craft', unlocks: ['Mission 2: Smoke First Brisket'] },
  { slug: 'host', level: 4, title: 'Backyard Host', tagline: 'Feed a crowd with a plan', unlocks: ['Mission 3: Host Backyard BBQ'] },
  { slug: 'competitor', level: 5, title: 'Competition Cook', tagline: 'Turn-in boxes, timelines, and consistency', unlocks: ['Mission 4: Enter First Competition'] },
  { slug: 'judge', level: 6, title: 'Table Judge', tagline: 'Evaluate BBQ with structured criteria', unlocks: ['Mission 5: Judge a Competition'] },
  { slug: 'mentor', level: 7, title: 'Pitmaster Mentor', tagline: 'Lead the Pitmasters Circle', unlocks: ['Circle mentorship'] },
];

export const BBQ_MISSIONS: WorldMission[] = [
  {
    slug: 'first-pork-butt',
    number: 1,
    title: 'Smoke First Pork Butt',
    subtitle: 'Low and slow — your first real smoke that feeds people',
    outcome: 'A completed pork shoulder cook with documented temps, timing, and pull test',
    evidence: 'Cook log + finished product photo + one paragraph on bark and tenderness',
    timeEstimate: '10–14 hours active monitoring',
    requiredLevel: 'Backyard Cook (Level 1 — you start here)',
    futureProof: 'Long cooks teach patience, systems, and showing up — transferable to every ambitious project.',
    toolsNeeded: 'Smoker or kettle setup · pork butt · rub · probe thermometer · notebook',
    tomorrowHook: 'Tomorrow: Mission 2 — take on brisket, the graduate exam of BBQ.',
    nextMissionSlug: 'first-brisket',
    steps: [
      { phase: 'Mission', title: 'Plan the cook', body: 'Pick a Saturday. Target 195–203°F internal. Write your timeline backward from serve time.' },
      { phase: 'Build', title: 'Run the smoke', body: 'Trim lightly, apply rub, maintain steady temp. Log temps every hour.' },
      { phase: 'Show', title: 'Pull and serve', body: 'Rest 30+ min. Pull. Feed at least two people.' },
      { phase: 'Reflect', title: 'Cook log review', body: 'When did the stall hit? What would you change?' },
      { phase: 'Improve', title: 'One variable', body: 'Next cook change ONE thing: wood, rub, wrap time, or temp target.' },
      { phase: 'Mentor', title: 'Explain the stall', body: 'Tell someone why BBQ takes longer than they think.' },
    ],
  },
  {
    slug: 'first-brisket',
    number: 2,
    title: 'Smoke First Brisket',
    subtitle: 'The cook that teaches humility — and rewards patience',
    outcome: 'A whole packer or flat cook with slice test and smoke ring photo',
    evidence: 'Slice photo + temp graph or log + honest rating 1–10',
    timeEstimate: '12–16 hours',
    requiredLevel: 'Brisket Builder (Level 3)',
    futureProof: 'Brisket failure stories become your best teaching material.',
    tomorrowHook: 'Tomorrow: Mission 3 — host a full backyard BBQ for friends or family.',
    nextMissionSlug: 'backyard-bbq',
    steps: [
      { phase: 'Mission', title: 'Select your cut', body: 'Start with a flat if nervous, packer if bold. Note weight.' },
      { phase: 'Build', title: 'Smoke to probe tender', body: 'Track bark development. Wrap when color looks right.' },
      { phase: 'Show', title: 'Slice and present', body: 'Slice against the grain. Note flat vs point differences.' },
      { phase: 'Reflect', title: 'Honest score', body: 'Dry? Tough? Perfect? Write why.' },
      { phase: 'Improve', title: 'Retry one half', body: 'If you have leftovers, plan what variable changes on brisket #2.' },
      { phase: 'Mentor', title: 'Share a slice lesson', body: 'Show someone how grain direction affects bite.' },
    ],
  },
  {
    slug: 'backyard-bbq',
    number: 3,
    title: 'Host Backyard BBQ',
    subtitle: 'Create an experience — not just food on a plate',
    outcome: 'A hosted meal for 4+ people with menu, timeline, and assigned sides',
    evidence: 'Menu card + guest count + one guest quote or thank-you',
    timeEstimate: 'Planning + 1 cook day',
    requiredLevel: 'Backyard Host (Level 4)',
    futureProof: 'Hosting builds leadership — timing, delegation, and hospitality.',
    tomorrowHook: 'Tomorrow: Mission 4 — enter your first competition (even backyard comp counts).',
    nextMissionSlug: 'first-competition',
    steps: [
      { phase: 'Mission', title: 'Design the menu', body: 'Protein + 2 sides + drink. Write who brings what.' },
      { phase: 'Build', title: 'Execute timeline', body: 'Work backward from guests arriving. Prep day-before checklist.' },
      { phase: 'Show', title: 'Host the table', body: 'Welcome, serve, tell one story about the cook.' },
      { phase: 'Reflect', title: 'Host debrief', body: 'What ran late? What would guests remember?' },
      { phase: 'Improve', title: 'One hosting upgrade', body: 'Better signage, playlist, or prep station next time.' },
      { phase: 'Mentor', title: 'Invite a learner', body: 'Have someone shadow your fire setup.' },
    ],
  },
  {
    slug: 'first-competition',
    number: 4,
    title: 'Enter First Competition',
    subtitle: 'Turn-in discipline — boxes, timing, presentation',
    outcome: 'Competition entry (KCBS, local comp, or structured backyard comp) with turn-in photos',
    evidence: 'Turn-in box photo + scoresheet or peer judge notes',
    timeEstimate: 'Weekend',
    requiredLevel: 'Competition Cook (Level 5)',
    futureProof: 'Competition feedback accelerates learning faster than solo cooks.',
    tomorrowHook: 'Tomorrow: Mission 5 — judge a table and learn what winners do differently.',
    nextMissionSlug: 'judge-competition',
    steps: [
      { phase: 'Mission', title: 'Pick your comp', body: 'Local KCBS, church cookoff, or formal backyard comp with rubric.' },
      { phase: 'Build', title: 'Practice turn-in', body: 'Build boxes at home — appearance, tenderness, taste.' },
      { phase: 'Show', title: 'Compete', body: 'Submit on time. Stay calm. Log results.' },
      { phase: 'Reflect', title: 'Score analysis', body: 'Which category scored lowest? Why?' },
      { phase: 'Improve', title: 'One category focus', body: 'Pick appearance, taste, or tenderness for next comp prep.' },
      { phase: 'Mentor', title: 'Debrief with a rookie', body: 'Share one thing you wish you knew before your first turn-in.' },
    ],
  },
  {
    slug: 'judge-competition',
    number: 5,
    title: 'Judge a Competition',
    subtitle: 'Train your palate to evaluate — not just enjoy',
    outcome: 'Judging session with structured scores and written feedback for cooks',
    evidence: 'Completed scoresheet + 3 specific feedback notes you gave cooks',
    timeEstimate: '4–6 hours',
    requiredLevel: 'Table Judge (Level 6)',
    futureProof: 'Judging teaches criteria-based thinking — the same skill as code review or hiring.',
    tomorrowHook: 'Tomorrow: explore Poker World — strategic thinking at the table.',
    steps: [
      { phase: 'Mission', title: 'Get certified or invited', body: 'KCBS judging class, local comp volunteer, or structured peer judging.' },
      { phase: 'Build', title: 'Score systematically', body: 'Appearance → tenderness → taste. No comparing entries to each other out loud.' },
      { phase: 'Show', title: 'Submit honest scores', body: 'Write constructive notes — what would make this box win?' },
      { phase: 'Reflect', title: 'Palate calibration', body: 'What surprised you about what scored well?' },
      { phase: 'Improve', title: 'Apply to your cook', body: 'Change one thing in your next backyard cook based on judging insight.' },
      { phase: 'Mentor', title: 'Explain judging criteria', body: 'Teach a cook what judges actually look for.' },
    ],
  },
];

export const BBQ_PORTFOLIO_KEY = 'foundry-bbq-portfolio';
export const BBQ_PORTFOLIO_LABEL = 'My BBQ Journal';

export const BBQ_COMMUNITY = {
  name: 'Pitmasters Circle',
  features: [
    { title: 'Cook logs', description: 'Shared temps, woods, and timelines — learn from every fire' },
    { title: 'Turn-in prep', description: 'Box builds and comp debriefs' },
    { title: 'Backyard host playbooks', description: 'Menus and timelines that actually work' },
    { title: 'Mentorship', description: 'Experienced pitmasters guide first smokes' },
  ],
};

export function getBbqMission(slug: string) {
  return BBQ_MISSIONS.find((m) => m.slug === slug);
}
export const BBQ_CORE_PROMISE = 'Create experiences around the pit — patience, hosting, and craft that feeds a crowd.';
