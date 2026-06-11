/** Civic Engagement World — Life Leverage (PASS-025 depth) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const CIVIC_ENGAGEMENT_LOOP = [
  { step: 'Mission', description: 'Pick a civic action worth pursuing' },
  { step: 'Build', description: 'Research, prepare, or organize your participation' },
  { step: 'Show', description: 'Attend, volunteer, or lead — document what happened' },
  { step: 'Debrief', description: 'What changed in the room? What would you do differently?' },
  { step: 'Refine', description: 'Fix one process or plan the next civic step' },
  { step: 'Teach', description: 'Invite someone to participate with you' },
] as const;

export const CIVIC_ENGAGEMENT_ACADEMY_LEVELS = [
  { slug: 'informed-voter', level: 1, title: 'Informed Voter', tagline: 'Research every ballot before you vote', unlocks: ['Mission 1: Research Your Ballot'] },
  { slug: 'local-participant', level: 2, title: 'Local Participant', tagline: 'Show up where local decisions get made', unlocks: ['Mission 2: Attend First Local Meeting'] },
  { slug: 'community-volunteer', level: 3, title: 'Community Volunteer', tagline: 'Give time to a cause that matters locally', unlocks: ['Mission 3: Volunteer for a Cause'] },
  { slug: 'project-organizer', level: 4, title: 'Project Organizer', tagline: 'Turn an idea into a community project others can join', unlocks: ['Mission 4: Organize a Community Project'] },
  { slug: 'civic-leader', level: 5, title: 'Civic Leader', tagline: 'Facilitate conversations that move people to act', unlocks: ['Mission 5: Lead a Civic Conversation'] },
  { slug: 'civic-mentor', level: 6, title: 'Civic Mentor', tagline: 'Guide first-time participants into sustained engagement', unlocks: ['Civic Circle mentorship'] },
  { slug: 'community-steward', level: 7, title: 'Community Steward', tagline: 'Sustain local impact across seasons and elections', unlocks: ['Civic Circle leadership'] },
];

const CIVIC_ENGAGEMENT_FOUNDATION_MISSIONS: WorldMission[] = [
  {
    slug: 'research-ballot',
    number: 1,
    title: 'Research Your Ballot',
    subtitle: 'Know what you are voting on before you walk into the booth — or mail your ballot',
    outcome: 'A completed ballot research sheet covering every race and measure you can vote on, with your positions noted',
    evidence: 'Ballot research document + one paragraph on the race or measure that surprised you most',
    timeEstimate: '45–90 min',
    requiredLevel: 'Informed Voter (Level 1 — you start here)',
    futureProof: 'Democracy only works when voters understand choices. This skill transfers to every decision you will ever make in groups.',
    toolsNeeded: 'Sample ballot (county elections site or Ballotpedia) · notebook or doc · voter guide from a trusted local source · calendar with election date',
    tomorrowHook: 'Tomorrow: Mission 2 — attend your first local government meeting and see decisions happen in real time.',
    nextMissionSlug: 'local-meeting',
    steps: [
      {
        phase: 'Mission',
        title: 'Get your sample ballot',
        body: 'Visit your county elections website or Ballotpedia. Enter your address. Download or screenshot every race and measure on your ballot. Write the election date at the top of your research doc.',
      },
      {
        phase: 'Build',
        title: 'Research each item',
        body: 'For every race: Who is running? What is their background? What do they say they will do? For every measure: What changes if it passes? Who supports and opposes it? Use at least two sources per item — official voter guide plus one independent source.',
        checklist: ['List every race and measure', 'Note candidate positions in your own words', 'Identify one source you trust and one you question'],
      },
      { phase: 'Show', title: 'Complete your ballot sheet', body: 'Fill in your research doc with a summary and your lean (support / oppose / undecided) for each item. This goes in My Civic Portfolio.' },
      { phase: 'Debrief', title: 'What surprised you?', body: 'Write 2–3 sentences: Which race or measure was harder to understand than you expected? What information was missing? What would you tell a friend who says "I never know who to vote for"?' },
      { phase: 'Refine', title: 'Share one finding', body: 'Tell one person one non-obvious thing you learned from your research — a local race, a ballot measure, or a candidate position they might not know.' },
      { phase: 'Teach', title: 'Walk someone through it', body: 'Help a parent, sibling, or friend open their sample ballot. Show them how you researched one item. Invite them to do Mission 1 with you before the next election.' },
    ],
  },
  {
    slug: 'local-meeting',
    number: 2,
    title: 'Attend First Local Meeting',
    subtitle: 'See how your town, school district, or city actually makes decisions',
    outcome: 'Attendance at one public meeting with structured notes on what was decided, who spoke, and what happens next',
    evidence: 'Meeting notes (agenda item, decision, your observation) + photo of agenda or virtual meeting screenshot',
    timeEstimate: '60–120 min (including travel or login)',
    requiredLevel: 'Local Participant (Level 2)',
    futureProof: 'Most people never watch local government work. Showing up once puts you ahead of 90% of your neighbors — and builds skills for school boards, HOAs, and workplace meetings.',
    toolsNeeded: 'City/county/school district website for meeting calendar · notebook or notes app · optional: public comment signup link',
    tomorrowHook: 'Tomorrow: Mission 3 — volunteer for a cause and move from observer to participant.',
    nextMissionSlug: 'volunteer-cause',
    steps: [
      {
        phase: 'Mission',
        title: 'Find a meeting',
        body: 'Search "city council meeting [your city]" or "school board meeting [your district]." Pick one within the next two weeks — in person or virtual. Add it to your calendar. Read the agenda beforehand so you know what is on the table.',
      },
      {
        phase: 'Build',
        title: 'Prepare to observe',
        body: 'Write three questions before you go: What is being decided? Who benefits? Who is not in the room? If public comment is allowed, draft one sentence you could say — you do not have to speak, but preparation builds confidence.',
        checklist: ['Confirm date, time, and location (or login link)', 'Skim the agenda', 'Write three observation questions'],
      },
      { phase: 'Show', title: 'Attend and take notes', body: 'Stay for at least 30 minutes. Note: meeting type, main agenda items, one decision or debate, one thing that confused you. Screenshot the agenda or take a photo of the room if in person.' },
      { phase: 'Debrief', title: 'What did you learn about your community?', body: 'Write in the reflection box: What issue got the most attention? Did the process feel fair? What would you want changed about how the meeting ran?' },
      { phase: 'Refine', title: 'Find the next meeting', body: 'Bookmark the calendar page. Identify one upcoming agenda item you want to follow — a budget vote, zoning change, or school policy.' },
      { phase: 'Teach', title: 'Invite someone next time', body: 'Tell a friend or family member one thing that happened at the meeting. Ask if they want to attend the next one with you.' },
    ],
  },
  {
    slug: 'volunteer-cause',
    number: 3,
    title: 'Volunteer for a Cause',
    subtitle: 'Move from watching to doing — give real hours to something that matters locally',
    outcome: 'At least one completed volunteer shift (2+ hours) with documentation of what you did and who it helped',
    evidence: 'Volunteer log (date, organization, hours, tasks) + reflection on whether you would return',
    timeEstimate: '2–4 hours (one shift)',
    requiredLevel: 'Community Volunteer (Level 3)',
    futureProof: 'Communities run on volunteers. Employers, colleges, and leaders notice people who show up — not just people who post about causes.',
    toolsNeeded: 'VolunteerMatch, local nonprofit directory, food bank/shelter/park cleanup signup, or ask a teacher/counselor for leads · comfortable clothes · transportation plan',
    tomorrowHook: 'Tomorrow: Mission 4 — organize a small community project you design yourself.',
    nextMissionSlug: 'community-project',
    steps: [
      { phase: 'Mission', title: 'Choose your cause', body: 'Pick one issue you care about locally: environment, food insecurity, literacy, animal welfare, elder support, youth programs. Find one organization doing work on it. Sign up for one volunteer shift.' },
      {
        phase: 'Build',
        title: 'Prepare for the shift',
        body: 'Confirm time, location, dress code, and what you will do. Write one sentence: "Today I am helping ___ because ___." If required, complete any waiver or orientation beforehand.',
        checklist: ['Sign up for a specific date', 'Confirm what to bring', 'Tell a parent or adult where you will be'],
      },
      { phase: 'Show', title: 'Complete the shift', body: 'Show up on time. Do the work. Before you leave, ask a staff member: "What is the biggest need right now?" Write down their answer.' },
      { phase: 'Debrief', title: 'Would you go back?', body: 'Write: What was harder than expected? What felt meaningful? Did you meet anyone who inspired you? Rate 1–10 how likely you are to volunteer again — and why.' },
      { phase: 'Refine', title: 'Schedule a second shift', body: 'Book one more date in the next month — or identify a different role (desk, outreach, events) if the first task was not a fit.' },
      { phase: 'Teach', title: 'Bring someone with you', body: 'Invite a friend to your next shift — or tell a sibling how to sign up for the same organization.' },
    ],
  },
  {
    slug: 'community-project',
    number: 4,
    title: 'Organize a Community Project',
    subtitle: 'Do not wait for permission — design a small project and recruit others to help',
    outcome: 'A completed micro-project with a plan, at least 2 participants (including you), and documented results',
    evidence: 'Project one-pager (goal, date, participants, outcome) + photo or summary of what changed',
    timeEstimate: '3–5 hours over 1–2 weeks',
    requiredLevel: 'Project Organizer (Level 4)',
    futureProof: 'Leaders do not just join — they organize. A documented project is proof you can mobilize people, a skill that transfers to school, work, and every community you join.',
    toolsNeeded: 'Google Doc or paper for plan · group chat or email for invites · supplies list (keep it small) · optional: permission from school/church/park if needed',
    tomorrowHook: 'Tomorrow: Mission 5 — lead a civic conversation that helps others think clearly about a local issue.',
    nextMissionSlug: 'lead-discussion',
    steps: [
      {
        phase: 'Mission',
        title: 'Define a doable project',
        body: 'Pick something completable in one day: neighborhood cleanup, donation drive, voter registration table, welcome packets for new students, community garden hour, letter-writing for a cause. Write: Who benefits? What will be different when we are done?',
      },
      {
        phase: 'Build',
        title: 'Plan and recruit',
        body: 'Set a date and location. List tasks and who does what. Invite at least 2 other people — friends, family, classmates. Create a simple one-page plan: goal, date, supplies, roles.',
        checklist: ['Write project goal in one sentence', 'Set date and location', 'Invite at least 2 helpers', 'List supplies needed'],
      },
      { phase: 'Show', title: 'Execute the project', body: 'Run the project. Take a photo or write a 3-sentence summary of results: what you did, how many people helped, what changed. Add to My Civic Portfolio.' },
      { phase: 'Debrief', title: 'What was the hardest part?', body: 'Organizing is different from volunteering. Write: What almost did not happen? What would you do differently next time? What skill did you practice — planning, recruiting, communicating?' },
      { phase: 'Refine', title: 'Thank your helpers', body: 'Send a short message to everyone who helped. Ask one person: "What would make the next project better?"' },
      { phase: 'Teach', title: 'Document the playbook', body: 'Write 5 bullet points another student could follow to run the same type of project. Share with Civic Circle or a friend.' },
    ],
  },
  {
    slug: 'lead-discussion',
    number: 5,
    title: 'Lead a Civic Conversation',
    subtitle: 'Help people think clearly about a local issue — without shouting or preaching',
    outcome: 'A facilitated 30–45 minute conversation with 3+ people on a civic topic, with notes on what was learned',
    evidence: 'Discussion guide you wrote + attendee count + reflection on what shifted in the room',
    timeEstimate: '90 min prep + 45 min session',
    requiredLevel: 'Civic Leader (Level 5)',
    futureProof: 'Democracy needs people who can host hard conversations. This is public speaking plus facilitation — skills every leader, teacher, and organizer needs.',
    toolsNeeded: 'Discussion guide (doc) · 3+ participants (classmates, family, club) · timer · ground rules slide or handout · quiet space or video call',
    tomorrowHook: 'Tomorrow: mentor someone through Mission 1 before the next election — citizenship compounds when you bring others in.',
    steps: [
      {
        phase: 'Mission',
        title: 'Choose the topic',
        body: 'Pick a local issue people have opinions on: school schedule, park funding, traffic safety, teen voting, food access. Write one neutral framing question: "What should our community prioritize about ___?" Avoid yes/no — aim for exploration.',
      },
      {
        phase: 'Build',
        title: 'Design the conversation',
        body: 'Create a 45-minute guide: opening (5 min) · ground rules (2 min) · round-robin opening thoughts (10 min) · main discussion with 2–3 prompts (20 min) · closing: one takeaway each (8 min). Your job is to ask questions and keep time — not to win the argument.',
        checklist: ['Write 3 discussion prompts', 'Set ground rules (listen, no personal attacks, everyone speaks)', 'Invite at least 3 participants', 'Schedule date and send the question in advance'],
      },
      { phase: 'Show', title: 'Facilitate the session', body: 'Lead the conversation. Stay neutral. Make sure quieter voices get time. Take brief notes on themes — not names. Thank everyone at the end.' },
      { phase: 'Debrief', title: 'What shifted?', body: 'Write: Did anyone change their mind or see something new? What moment felt tense? What facilitation move worked — pausing, paraphrasing, redirecting?' },
      { phase: 'Refine', title: 'One follow-up action', body: 'Identify one concrete next step the group could take: attend a meeting, volunteer, research a ballot item, or run a mini-project. Write it down even if no one commits yet.' },
      { phase: 'Teach', title: 'Coach a future facilitator', body: 'Share your discussion guide with someone who wants to lead. Offer to co-facilitate their first session — or debrief with them after they try.' },
    ],
  },
];

import { expandCivicMissions, CIVIC_TRACKS } from './immersion/worlds/civic-engagement';

export { CIVIC_TRACKS };
export const CIVIC_ENGAGEMENT_MISSIONS = expandCivicMissions(CIVIC_ENGAGEMENT_FOUNDATION_MISSIONS);

export const CIVIC_ENGAGEMENT_PORTFOLIO_KEY = 'foundry-civic-portfolio';
export const CIVIC_ENGAGEMENT_PORTFOLIO_LABEL = 'My Civic Portfolio';

export const CIVIC_ENGAGEMENT_COMMUNITY = {
  name: 'Civic Circle',
  features: [
    { title: 'Local action threads', description: 'Share meeting notes, ballot research, and volunteer opportunities by city' },
    { title: 'Ballot research exchanges', description: 'Compare how members researched the same races and measures before election day' },
    { title: 'Project showcases', description: 'Community projects with evidence, participant count, and lessons learned' },
    { title: 'Mentorship pairs', description: 'Experienced members guide first-time voters and meeting attendees' },
  ],
};

export const CIVIC_ENGAGEMENT_CORE_PROMISE = 'Serve your community through research, participation, and leadership that lasts.';

export function getCivicEngagementMission(slug: string): WorldMission | undefined {
  return CIVIC_ENGAGEMENT_MISSIONS.find((m) => m.slug === slug);
}
