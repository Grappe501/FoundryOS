/** Civic Engagement World meta — PASS-025 depth (bundle is source of truth) */

import { CIVIC_DEPTH } from './world-depth/bundles/civic-engagement';

export const CIVIC_ENGAGEMENT_PLAYGROUND_LABS = [
  { slug: 'ballot-lab', title: 'Ballot Research Lab', description: 'Practice researching sample ballots, measures, and candidate positions before election day.', unlockLevel: 1 },
  { slug: 'meeting-lab', title: 'Meeting Observer Lab', description: 'Replay a city council session, practice agenda reading, and draft public comment.', unlockLevel: 2 },
  { slug: 'volunteer-lab', title: 'Volunteer Match Lab', description: 'Find local causes, compare organizations, and draft a volunteer plan.', unlockLevel: 3 },
  { slug: 'project-lab', title: 'Project Planner Lab', description: 'Design a one-day community project with roles, supplies, and recruitment script.', unlockLevel: 4 },
  { slug: 'facilitation-lab', title: 'Facilitation Lab', description: 'Build ground rules and discussion prompts for a 45-minute civic conversation.', unlockLevel: 5 },
];

export const CIVIC_ENGAGEMENT_PORTFOLIO_SECTIONS = [
  { slug: 'ballot-research', title: 'Ballot Research', description: 'Sample ballot notes and position summaries' },
  { slug: 'meetings', title: 'Meeting Notes', description: 'Agendas, decisions, and public comment observations' },
  { slug: 'volunteer', title: 'Volunteer Log', description: 'Hours, organizations, and shift reflections' },
  { slug: 'projects', title: 'Community Projects', description: 'Plans, photos, and outcomes from organized projects' },
  { slug: 'conversations', title: 'Civic Conversations', description: 'Discussion guides and facilitation reflections' },
];

export const CIVIC_ENGAGEMENT_PARENT_VIEW = {
  headline: CIVIC_DEPTH.parent.headline,
  oneLiner: CIVIC_DEPTH.parent.oneLiner,
  sections: CIVIC_DEPTH.parent.sections,
};

export const CIVIC_ENGAGEMENT_CAREERS = [
  { title: 'Community Organizer', connection: 'Build coalitions around local issues and turn meetings into movements' },
  { title: 'Public Policy Analyst', connection: 'Research how laws affect communities and write briefs decision-makers use' },
  { title: 'Lawyer / Public Defender', connection: 'Represent clients and shape justice inside systems citizens must understand' },
  { title: 'Journalist', connection: 'Cover local government and hold officials accountable with facts' },
  { title: 'Nonprofit Director', connection: 'Run organizations that deliver services volunteers and donors sustain' },
  { title: 'City Planner', connection: 'Design neighborhoods through zoning, transit, and housing policy' },
  { title: 'Campaign Manager', connection: 'Elect leaders or pass measures by mobilizing voters and volunteers' },
  { title: 'Teacher', connection: 'Model citizenship and help the next generation participate early' },
  { title: 'Elected Official', connection: 'Serve as school board member, council member, or mayor — many start young' },
];

/** Simple term + definition for glossary page; full depth in CIVIC_DEPTH.glossary */
export const CIVIC_ENGAGEMENT_GLOSSARY = CIVIC_DEPTH.glossary.map(({ term, definition }) => ({
  term,
  definition,
}));

export { CIVIC_DEPTH };
