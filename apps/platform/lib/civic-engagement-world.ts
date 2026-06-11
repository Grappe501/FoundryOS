/** Civic Engagement World — Life Leverage (PASS-024 factory) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const CIVIC_ENGAGEMENT_LOOP = [
  { step: 'Mission', description: 'Pick a civic action worth pursuing' },
  { step: 'Build', description: 'Research, prepare, or organize your participation' },
  { step: 'Show', description: 'Attend, volunteer, or lead — document what happened' },
  { step: 'Reflect', description: 'Write what you learned about your community' },
  { step: 'Improve', description: 'Plan the next civic step with more impact' },
  { step: 'Mentor', description: 'Invite someone to participate with you' },
] as const;

export const CIVIC_ENGAGEMENT_ACADEMY_LEVELS = [
  { slug: 'level-1', level: 1, title: 'Level 1', tagline: 'Research Your Ballot', unlocks: ['Mission 1: Research Your Ballot'] },
  { slug: 'level-2', level: 2, title: 'Level 2', tagline: 'Attend First Local Meeting', unlocks: ['Mission 2: Attend First Local Meeting'] },
  { slug: 'level-3', level: 3, title: 'Level 3', tagline: 'Volunteer for a Cause', unlocks: ['Mission 3: Volunteer for a Cause'] },
  { slug: 'level-4', level: 4, title: 'Level 4', tagline: 'Organize a Community Project', unlocks: ['Mission 4: Organize a Community Project'] },
  { slug: 'level-5', level: 5, title: 'Level 5', tagline: 'Lead a Civic Conversation', unlocks: ['Mission 5: Lead a Civic Conversation'] },
  { slug: 'level-6', level: 6, title: 'Level 6', tagline: 'Deepen civic practice', unlocks: ['Civic Circle mentorship'] },
  { slug: 'level-7', level: 7, title: 'Level 7', tagline: 'Deepen civic practice', unlocks: ['Civic Circle mentorship'] }
];

export const CIVIC_ENGAGEMENT_MISSIONS: WorldMission[] = [
  {
    slug: 'research-ballot',
    number: 1,
    title: 'Research Your Ballot',
    subtitle: 'Research Your Ballot — civic action with documented evidence',
    outcome: 'Completed research your ballot with reflection and portfolio artifact',
    evidence: 'Notes, photo, or summary proving you completed this civic mission',
    timeEstimate: '45–90 min',
    requiredLevel: 'Level 1',
    futureProof: 'Citizenship through action builds agency that transfers to every domain.',
    tomorrowHook: 'Tomorrow: Mission 2 — Attend First Local Meeting.',
    nextMissionSlug: 'local-meeting',
    steps: [
      { phase: 'Mission', title: 'Mission step 1', body: 'Mission for Research Your Ballot — document evidence and reflection.' },
      { phase: 'Build', title: 'Build step 2', body: 'Build for Research Your Ballot — document evidence and reflection.' },
      { phase: 'Show', title: 'Show step 3', body: 'Show for Research Your Ballot — document evidence and reflection.' },
      { phase: 'Reflect', title: 'Reflect step 4', body: 'Reflect for Research Your Ballot — document evidence and reflection.' },
      { phase: 'Improve', title: 'Improve step 5', body: 'Improve for Research Your Ballot — document evidence and reflection.' },
      { phase: 'Mentor', title: 'Mentor step 6', body: 'Mentor for Research Your Ballot — document evidence and reflection.' },
    ],
  },
  {
    slug: 'local-meeting',
    number: 2,
    title: 'Attend First Local Meeting',
    subtitle: 'Attend First Local Meeting — civic action with documented evidence',
    outcome: 'Completed attend first local meeting with reflection and portfolio artifact',
    evidence: 'Notes, photo, or summary proving you completed this civic mission',
    timeEstimate: '45–90 min',
    requiredLevel: 'Level 2',
    futureProof: 'Citizenship through action builds agency that transfers to every domain.',
    tomorrowHook: 'Tomorrow: Mission 3 — Volunteer for a Cause.',
    nextMissionSlug: 'volunteer-cause',
    steps: [
      { phase: 'Mission', title: 'Mission step 1', body: 'Mission for Attend First Local Meeting — document evidence and reflection.' },
      { phase: 'Build', title: 'Build step 2', body: 'Build for Attend First Local Meeting — document evidence and reflection.' },
      { phase: 'Show', title: 'Show step 3', body: 'Show for Attend First Local Meeting — document evidence and reflection.' },
      { phase: 'Reflect', title: 'Reflect step 4', body: 'Reflect for Attend First Local Meeting — document evidence and reflection.' },
      { phase: 'Improve', title: 'Improve step 5', body: 'Improve for Attend First Local Meeting — document evidence and reflection.' },
      { phase: 'Mentor', title: 'Mentor step 6', body: 'Mentor for Attend First Local Meeting — document evidence and reflection.' },
    ],
  },
  {
    slug: 'volunteer-cause',
    number: 3,
    title: 'Volunteer for a Cause',
    subtitle: 'Volunteer for a Cause — civic action with documented evidence',
    outcome: 'Completed volunteer for a cause with reflection and portfolio artifact',
    evidence: 'Notes, photo, or summary proving you completed this civic mission',
    timeEstimate: '45–90 min',
    requiredLevel: 'Level 3',
    futureProof: 'Citizenship through action builds agency that transfers to every domain.',
    tomorrowHook: 'Tomorrow: Mission 4 — Organize a Community Project.',
    nextMissionSlug: 'community-project',
    steps: [
      { phase: 'Mission', title: 'Mission step 1', body: 'Mission for Volunteer for a Cause — document evidence and reflection.' },
      { phase: 'Build', title: 'Build step 2', body: 'Build for Volunteer for a Cause — document evidence and reflection.' },
      { phase: 'Show', title: 'Show step 3', body: 'Show for Volunteer for a Cause — document evidence and reflection.' },
      { phase: 'Reflect', title: 'Reflect step 4', body: 'Reflect for Volunteer for a Cause — document evidence and reflection.' },
      { phase: 'Improve', title: 'Improve step 5', body: 'Improve for Volunteer for a Cause — document evidence and reflection.' },
      { phase: 'Mentor', title: 'Mentor step 6', body: 'Mentor for Volunteer for a Cause — document evidence and reflection.' },
    ],
  },
  {
    slug: 'community-project',
    number: 4,
    title: 'Organize a Community Project',
    subtitle: 'Organize a Community Project — civic action with documented evidence',
    outcome: 'Completed organize a community project with reflection and portfolio artifact',
    evidence: 'Notes, photo, or summary proving you completed this civic mission',
    timeEstimate: '45–90 min',
    requiredLevel: 'Level 4',
    futureProof: 'Citizenship through action builds agency that transfers to every domain.',
    tomorrowHook: 'Tomorrow: Mission 5 — Lead a Civic Conversation.',
    nextMissionSlug: 'lead-discussion',
    steps: [
      { phase: 'Mission', title: 'Mission step 1', body: 'Mission for Organize a Community Project — document evidence and reflection.' },
      { phase: 'Build', title: 'Build step 2', body: 'Build for Organize a Community Project — document evidence and reflection.' },
      { phase: 'Show', title: 'Show step 3', body: 'Show for Organize a Community Project — document evidence and reflection.' },
      { phase: 'Reflect', title: 'Reflect step 4', body: 'Reflect for Organize a Community Project — document evidence and reflection.' },
      { phase: 'Improve', title: 'Improve step 5', body: 'Improve for Organize a Community Project — document evidence and reflection.' },
      { phase: 'Mentor', title: 'Mentor step 6', body: 'Mentor for Organize a Community Project — document evidence and reflection.' },
    ],
  },
  {
    slug: 'lead-discussion',
    number: 5,
    title: 'Lead a Civic Conversation',
    subtitle: 'Lead a Civic Conversation — civic action with documented evidence',
    outcome: 'Completed lead a civic conversation with reflection and portfolio artifact',
    evidence: 'Notes, photo, or summary proving you completed this civic mission',
    timeEstimate: '45–90 min',
    requiredLevel: 'Level 5',
    futureProof: 'Citizenship through action builds agency that transfers to every domain.',
    tomorrowHook: 'Tomorrow: lead others in civic conversation.',
    
    steps: [
      { phase: 'Mission', title: 'Mission step 1', body: 'Mission for Lead a Civic Conversation — document evidence and reflection.' },
      { phase: 'Build', title: 'Build step 2', body: 'Build for Lead a Civic Conversation — document evidence and reflection.' },
      { phase: 'Show', title: 'Show step 3', body: 'Show for Lead a Civic Conversation — document evidence and reflection.' },
      { phase: 'Reflect', title: 'Reflect step 4', body: 'Reflect for Lead a Civic Conversation — document evidence and reflection.' },
      { phase: 'Improve', title: 'Improve step 5', body: 'Improve for Lead a Civic Conversation — document evidence and reflection.' },
      { phase: 'Mentor', title: 'Mentor step 6', body: 'Mentor for Lead a Civic Conversation — document evidence and reflection.' },
    ],
  }
];

export const CIVIC_ENGAGEMENT_PORTFOLIO_KEY = 'foundry-civic-portfolio';
export const CIVIC_ENGAGEMENT_PORTFOLIO_LABEL = 'My Civic Portfolio';

export const CIVIC_ENGAGEMENT_COMMUNITY = {
  name: 'Civic Circle',
  features: [
    { title: 'Local action threads', description: 'Share meeting notes and volunteer opportunities' },
    { title: 'Ballot research', description: 'Structured research before every election' },
    { title: 'Project showcases', description: 'Community projects with evidence and outcomes' },
    { title: 'Mentorship', description: 'Experienced members guide first-time participants' },
  ],
};

export const CIVIC_ENGAGEMENT_CORE_PROMISE = 'Improve your community through research, participation, and leadership that lasts.';

export function getCivicEngagementMission(slug: string): WorldMission | undefined {
  return CIVIC_ENGAGEMENT_MISSIONS.find((m) => m.slug === slug);
}
