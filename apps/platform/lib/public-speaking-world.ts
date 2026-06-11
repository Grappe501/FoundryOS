/** PASS-019 — Public Speaking World (Communicate Value) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const PS_LOOP = [
  { step: 'Mission', description: 'Pick a talk, story, or moment that matters' },
  { step: 'Build', description: 'Write, outline, and rehearse your message' },
  { step: 'Show', description: 'Deliver — live or recorded' },
  { step: 'Reflect', description: 'Review what worked and what felt hard' },
  { step: 'Improve', description: 'Revise based on feedback or playback' },
  { step: 'Mentor', description: 'Coach someone else or share what you learned' },
] as const;

export const PS_ACADEMY_LEVELS = [
  { slug: 'explorer', level: 1, title: 'Speaker Explorer', tagline: 'Understand what confident speaking looks like', unlocks: ['Mission 1: First 3-Minute Talk'] },
  { slug: 'confident', level: 2, title: 'Confident Speaker', tagline: 'Stand up and deliver without freezing', unlocks: ['Voice Lab'] },
  { slug: 'story', level: 3, title: 'Story Builder', tagline: 'Structure stories that people remember', unlocks: ['Mission 3: Story That Lands'] },
  { slug: 'persuasive', level: 4, title: 'Persuasive Communicator', tagline: 'Move an audience to think or act', unlocks: ['Mission 5: Persuasive Presentation'] },
  { slug: 'leader', level: 5, title: 'Group Leader', tagline: 'Facilitate discussions and lead rooms', unlocks: ['Mission 4: Lead Discussion'] },
  { slug: 'trainer', level: 6, title: 'Trainer', tagline: 'Teach skills — not just perform', unlocks: ['Workshop Lab'] },
  { slug: 'mentor', level: 7, title: 'Mentor Speaker', tagline: 'Develop other speakers in the circle', unlocks: ['Speakers Circle mentorship'] },
];

export const PS_MISSIONS: WorldMission[] = [
  {
    slug: 'first-talk',
    number: 1,
    title: 'Deliver Your First 3-Minute Talk',
    subtitle: 'One topic you care about — three minutes, one audience, real delivery',
    outcome: 'A completed 3-minute talk delivered to at least one person (or recorded on video)',
    evidence: 'Talk outline + reflection on how it felt + optional video link or witness name',
    timeEstimate: '45–60 min',
    requiredLevel: 'Speaker Explorer (Level 1 — you start here)',
    futureProof: 'Ideas only matter if you can explain them. Every leader, student, and builder needs this skill.',
    toolsNeeded: 'Phone camera or voice memo app · paper or doc for outline · one willing listener (friend, parent, sibling) OR record solo',
    tomorrowHook: 'Tomorrow: Mission 2 — record yourself and watch it back without cringing (much).',
    nextMissionSlug: 'record-review',
    steps: [
      { phase: 'Mission', title: 'Pick your topic', body: 'Choose something you know: a hobby, book, game, cause, or lesson learned. Write one sentence: "After my talk, my audience will understand ___."' },
      {
        phase: 'Build',
        title: 'Outline your 3 minutes',
        body: 'Use this structure: Hook (15 sec) · 2 main points (2 min) · Close with one takeaway (45 sec). Write bullet points — not a script word-for-word.',
        checklist: ['Write your one-sentence goal', 'Outline hook + 2 points + close', 'Practice out loud twice'],
      },
      { phase: 'Show', title: 'Deliver the talk', body: 'Give the talk to one person OR record on your phone. Start a timer. Stop at 3 minutes.' },
      { phase: 'Reflect', title: 'How did it feel?', body: 'Write in the box below: What went well? Where did you rush or freeze? Would you do it again?' },
      { phase: 'Improve', title: 'One fix', body: 'Re-deliver just the opening 30 seconds — make it stronger.' },
      { phase: 'Mentor', title: 'Ask for one tip', body: 'Ask your listener: "What is one thing I should improve?" Write it down.' },
    ],
  },
  {
    slug: 'record-review',
    number: 2,
    title: 'Record and Review Yourself',
    subtitle: 'See what your audience sees — the fastest way to improve',
    outcome: 'A recorded talk reviewed with 3 specific improvements identified',
    evidence: 'Recording (keep private if you want) + written review notes',
    timeEstimate: '45–60 min',
    requiredLevel: 'Confident Speaker (Level 2)',
    futureProof: 'Most people never watch themselves speak. You will — that alone puts you ahead.',
    toolsNeeded: 'Phone or laptop camera · quiet space · same topic from Mission 1 or a new 2-minute version',
    tomorrowHook: 'Tomorrow: Mission 3 — craft a story with a beginning, tension, and payoff.',
    nextMissionSlug: 'story-that-lands',
    steps: [
      { phase: 'Mission', title: 'Set up the recording', body: 'Prop phone at eye level. Light on your face. Record a 2–3 minute talk — same topic or new.' },
      { phase: 'Build', title: 'Record without stopping', body: 'One take is enough. Do not delete it. You are building the habit of finishing.' },
      { phase: 'Show', title: 'Watch it back', body: 'Watch once with sound. Note: filler words ("um"), pace, eye contact with camera, energy.' },
      { phase: 'Reflect', title: 'Three improvements', body: 'Write exactly three things to fix next time. Be specific — not "be better" but "pause after the hook."' },
      { phase: 'Improve', title: 'Re-record 60 seconds', body: 'Record only the improved opening minute.' },
      { phase: 'Mentor', title: 'Share one lesson', body: 'Tell someone one thing you noticed about yourself on camera.' },
    ],
  },
  {
    slug: 'story-that-lands',
    number: 3,
    title: 'Tell a Story That Lands',
    subtitle: 'Stories beat facts — learn the structure that makes people lean in',
    outcome: 'A 3–4 minute story with clear setup, tension, and resolution — delivered live or recorded',
    evidence: 'Story outline + delivery reflection + what reaction you got',
    timeEstimate: '60–90 min',
    requiredLevel: 'Story Builder (Level 3)',
    futureProof: 'Create value (AI Builder) and keep value (FI) mean nothing if you cannot communicate them.',
    tomorrowHook: 'Tomorrow: Mission 4 — lead a small group discussion without dominating it.',
    nextMissionSlug: 'lead-discussion',
    steps: [
      { phase: 'Mission', title: 'Choose your story', body: 'Personal moment: failure, win, lesson, or change. Real beats impressive.' },
      { phase: 'Build', title: 'Structure it', body: 'Setup (where were you?) · Tension (what went wrong or what was at stake?) · Turn (what changed?) · Lesson (what do you know now?).' },
      { phase: 'Show', title: 'Tell it', body: 'Deliver to one person or record. Focus on emotion and pacing — not memorizing every word.' },
      { phase: 'Reflect', title: 'Did they lean in?', body: 'What moment got a reaction? Where did you lose them?' },
      { phase: 'Improve', title: 'Sharpen the lesson', body: 'Rewrite your final sentence — one clear takeaway the listener remembers tomorrow.' },
      { phase: 'Mentor', title: 'Help someone find their story', body: 'Ask a friend: "What is a moment that changed how you think?" Help them outline it.' },
    ],
  },
  {
    slug: 'lead-discussion',
    number: 4,
    title: 'Lead a Small Group Discussion',
    subtitle: 'Speaking is not always presenting — sometimes you guide the room',
    outcome: 'A 20-minute facilitated discussion with 2+ people on a topic you chose',
    evidence: 'Discussion plan + 3 questions you asked + reflection on who spoke and why',
    timeEstimate: '60 min prep + 20 min live',
    requiredLevel: 'Group Leader (Level 5)',
    futureProof: 'Leaders do not have all the answers — they ask the right questions and make space.',
    tomorrowHook: 'Tomorrow: Mission 5 — build a persuasive presentation with a clear ask.',
    nextMissionSlug: 'persuasive-presentation',
    steps: [
      { phase: 'Mission', title: 'Pick the topic', body: 'School project, club, family dinner, or online chat. Topic must allow different opinions.' },
      { phase: 'Build', title: 'Plan 3 questions', body: 'Opening question (easy) · Deeper question (why) · Closing question (what next). Write them down.' },
      { phase: 'Show', title: 'Facilitate', body: 'Lead 20 minutes. Your job: ask questions, summarize, invite quiet voices — talk less than 30% of the time.' },
      { phase: 'Reflect', title: 'Who spoke most?', body: 'Did everyone get space? What would you do differently?' },
      { phase: 'Improve', title: 'One facilitation fix', body: 'Write one phrase you will use next time to invite a quiet person in.' },
      { phase: 'Mentor', title: 'Debrief with the group', body: 'Ask: "What made this discussion useful?" Write the answer.' },
    ],
  },
  {
    slug: 'persuasive-presentation',
    number: 5,
    title: 'Give a Persuasive Presentation',
    subtitle: 'Move people to think, feel, or act — the capstone of Communicate Value',
    outcome: 'A 5-minute persuasive talk with a clear call to action — delivered and reflected on',
    evidence: 'Slide outline or one-pager + recording or audience feedback + reflection',
    timeEstimate: '90–120 min',
    requiredLevel: 'Persuasive Communicator (Level 4)',
    futureProof: 'The Trinity completes here: create value, keep value, communicate value. You are future-proof.',
    tomorrowHook: 'Tomorrow: share your best talk in Speakers Circle — and review a peer\'s presentation.',
    steps: [
      { phase: 'Mission', title: 'Choose your ask', body: 'What should the audience DO or BELIEVE after 5 minutes? One clear call to action.' },
      { phase: 'Build', title: 'Build the case', body: 'Problem · Why it matters to them · Your solution · Evidence · Call to action. Outline on one page or 5 slides max.' },
      { phase: 'Show', title: 'Present', body: 'Deliver to 2+ people or record. End with the ask — explicitly.' },
      { phase: 'Reflect', title: 'Trinity check', body: 'How does speaking connect to what you build (AI) and what you keep (money)? Write 3 sentences.' },
      { phase: 'Improve', title: 'Strengthen the ask', body: 'Rewrite your final 30 seconds — clearer, bolder, specific.' },
      { phase: 'Mentor', title: 'Speakers Circle', body: 'Share one slide or outline with a peer. Give them one piece of feedback; receive one back.' },
    ],
  },
];

export const PS_PLAYGROUND_LABS = [
  { slug: 'voice-lab', title: 'Voice Lab', description: 'Practice pace, volume, and pauses — read a paragraph at 3 speeds.', unlockLevel: 'Confident Speaker' },
  { slug: 'hook-lab', title: 'Hook Lab', description: 'Write 5 opening lines for the same topic — test which grabs attention.', unlockLevel: 'Speaker Explorer' },
  { slug: 'story-lab', title: 'Story Lab', description: 'Turn a fact into a story — before/after structure.', unlockLevel: 'Story Builder' },
  { slug: 'workshop-lab', title: 'Workshop Lab', description: 'Design a 10-minute mini-lesson you could teach someone.', unlockLevel: 'Trainer' },
  { slug: 'stage-lab', title: 'Stage Lab', description: 'Practice body language — stand, gestures, eye contact drills.', unlockLevel: 'Confident Speaker' },
];

export const PS_PORTFOLIO_SECTIONS = [
  { slug: 'talks', title: 'My Talks', description: 'Outlines and recordings' },
  { slug: 'stories', title: 'My Stories', description: 'Stories that landed' },
  { slug: 'reviews', title: 'My Reviews', description: 'Self-review notes and feedback' },
  { slug: 'wins', title: 'My Wins', description: 'Reflections and confidence milestones' },
];

export const PS_PARENT_VIEW = {
  headline: 'Why Public Speaking matters for your child',
  oneLiner:
    'Your child practices real communication skills—not worksheets—and builds confidence through recorded talks, reflections, and presentations.',
  sections: [
    { title: 'Why speaking matters now', body: 'AI can write. Humans still present, persuade, lead, and connect. Schools rarely teach deliberate speaking practice.' },
    { title: 'Skills employers want', body: 'Clear communication · Storytelling · Leading meetings · Persuasion · Confidence under pressure' },
    { title: 'What your child is building', body: 'Five missions: 3-minute talk, self-review, story, group facilitation, persuasive presentation — all in My Speaking Portfolio.' },
    { title: 'How progress is measured', body: 'Recordings · Reflections · Peer feedback · Not grades — real talks delivered.' },
    { title: 'The Trinity', body: 'AI Builder creates value. Financial Independence keeps value. Public Speaking communicates value. Together: future-proof.' },
  ],
};

export const PS_CAREERS = [
  { title: 'Leadership', connection: 'Every leader presents vision' },
  { title: 'Sales', connection: 'Persuasion and story drive revenue' },
  { title: 'Teaching', connection: 'Explain complex ideas simply' },
  { title: 'Law & Politics', connection: 'Argument and delivery win rooms' },
  { title: 'Entrepreneurship', connection: 'Pitch investors and customers' },
  { title: 'Medicine', connection: 'Explain diagnoses with empathy' },
  { title: 'Media & Content', connection: 'On-camera and podcast skills' },
  { title: 'Community Organizer', connection: 'Move groups to action' },
];

export const PS_GLOSSARY = [
  { term: 'Hook', definition: 'The opening that grabs attention in the first 15 seconds' },
  { term: 'Call to Action', definition: 'What you want the audience to do or believe after you speak' },
  { term: 'Filler Words', definition: 'Um, uh, like — habits that weaken clarity' },
  { term: 'Pace', definition: 'Speed of delivery — vary it to keep attention' },
  { term: 'Facilitation', definition: 'Guiding a group discussion without dominating' },
  { term: 'Rhetoric', definition: 'The art of persuasive communication' },
  { term: 'Narrative Arc', definition: 'Setup → tension → resolution in a story' },
  { term: 'Stage Presence', definition: 'How you occupy space — voice, body, eye contact' },
];

export const PS_COMMUNITY = {
  name: 'Speakers Circle',
  features: [
    { title: 'Talk Showcases', description: 'Share recordings or live talks — constructive feedback only' },
    { title: 'Weekly Prompts', description: 'One speaking challenge per week — 2 minutes max' },
    { title: 'Peer Coaching', description: 'Review two talks to get feedback on yours' },
  ],
};

export function getPsMission(slug: string): WorldMission | undefined {
  return PS_MISSIONS.find((m) => m.slug === slug);
}

export const PS_PORTFOLIO_KEY = 'foundry-ps-portfolio';

export const PS_CORE_PROMISE =
  'Build the confidence to explain your ideas, lead a room, and speak when it matters.';
