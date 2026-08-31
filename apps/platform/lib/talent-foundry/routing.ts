import type { ConversionState, PaidInterest, TalentFoundryFlags } from './types';

export type AreaOption = { id: string; label: string };

export const AREA_OPTIONS: AreaOption[] = [
  { id: 'social', label: 'Social media / digital' },
  { id: 'office', label: 'Office operations' },
  { id: 'field', label: 'Field / canvassing' },
  { id: 'events', label: 'Events' },
  { id: 'comms', label: 'Communications / PR' },
  { id: 'creative', label: 'Graphic design / creative' },
  { id: 'fundraising', label: 'Fundraising' },
  { id: 'leadership', label: 'Volunteer leadership' },
  { id: 'research', label: 'Research / data' },
  { id: 'tech', label: 'Digital / technology' },
  { id: 'driving', label: 'Driving / travel support' },
  { id: 'community', label: 'Community organizing' },
  { id: 'campus', label: 'Campus / school organizing' },
  { id: 'remote', label: 'Remote support' },
  { id: 'other', label: 'Other' },
];

export type PathwayId =
  | 'headquarters'
  | 'local_volunteer'
  | 'local_leader'
  | 'campus_leader'
  | 'remote'
  | 'events_road'
  | 'paid_intern';

export const PATHWAY_COPY: Record<PathwayId, { title: string; body: string }> = {
  headquarters: {
    title: 'Headquarters / Little Rock',
    body: 'In-person help at the campaign office — a human still confirms what that looks like week to week.',
  },
  local_volunteer: {
    title: 'Local volunteer',
    body: 'Help from your town or county. The movement needs people where you already are.',
  },
  local_leader: {
    title: 'Local leadership interest',
    body: 'You marked an interest in helping others find their place. A human will talk with you before any title is real.',
  },
  campus_leader: {
    title: 'Campus / school interest',
    body: 'Help students gather, learn, and participate. A human confirms the fit.',
  },
  remote: {
    title: 'Remote contributor',
    body: 'Useful work from a living room, kitchen table, or library — not a lesser lane.',
  },
  events_road: {
    title: 'Events / road support',
    body: 'Help gatherings happen: setup, people, travel, the unglamorous work that makes a room work.',
  },
  paid_intern: {
    title: 'Paid-intern consideration',
    body: 'You asked to be considered for the one paid role that exists now. That is interest — not selection.',
  },
};

export type MissionDef = { id: string; title: string; body: string };

export const MISSIONS: Record<string, MissionDef> = {
  social: {
    id: 'social',
    title: 'Read the room online',
    body: "Review Kelly's public campaign content. Identify one post or message you believe people in your community would respond to — and be ready to tell the team why. Do not create unofficial campaign posts.",
  },
  community: {
    id: 'community',
    title: 'Three people you already know',
    body: 'Think of three people in your community who care about making Arkansas work better. Ask whether they would like to learn about the campaign or volunteer. Do not upload their private contact information here.',
  },
  campus: {
    id: 'campus',
    title: 'Find the gathering place',
    body: 'Identify one place or organization on campus where students interested in civic participation naturally gather. Bring that observation to your human contact.',
  },
  events: {
    id: 'events',
    title: 'One event you could help',
    body: "Look at the campaign's public events and identify one you could realistically help with. Do not speak for the campaign.",
  },
  creative: {
    id: 'creative',
    title: 'See it more clearly',
    body: "Review the campaign's public visual material. Identify one thing you think could communicate more clearly. Bring the observation — not a surprise official graphic.",
  },
  office: {
    id: 'office',
    title: 'Open the day',
    body: 'Think through what you would check first when opening a campaign office for the day. Bring your list when the team contacts you.',
  },
  research: {
    id: 'research',
    title: 'One public fact',
    body: 'Find one publicly available fact about your community that you think the campaign should understand. Keep the source. No voter-file access. No private donor lists.',
  },
  remote: {
    id: 'remote',
    title: 'One reliable hour',
    body: 'Choose one way you could reliably give the campaign an hour from where you are — writing, research, calls, or organizing people you already know.',
  },
};

export function suggestPathway(
  conversion: ConversionState,
  flags: TalentFoundryFlags,
): PathwayId {
  const paid = conversion.paidInterest;
  if (
    (paid === 'yes' || paid === 'both') &&
    flags.internPathwayEligible &&
    (conversion.littleRock === 'yes' || conversion.littleRock === 'sometimes')
  ) {
    return 'paid_intern';
  }
  if (conversion.areas.includes('campus') || conversion.campus.trim()) return 'campus_leader';
  if (conversion.littleRock === 'yes' && conversion.areas.includes('office')) return 'headquarters';
  if (conversion.areas.includes('events') || conversion.areas.includes('driving')) return 'events_road';
  if (conversion.leadership === 'yes') return 'local_leader';
  if (conversion.remote === 'yes' && conversion.littleRock === 'no') return 'remote';
  return 'local_volunteer';
}

export function pickMission(areas: string[], pathway: PathwayId): MissionDef {
  if (areas.includes('social') || areas.includes('comms')) return MISSIONS.social;
  if (areas.includes('campus') || pathway === 'campus_leader') return MISSIONS.campus;
  if (areas.includes('creative')) return MISSIONS.creative;
  if (areas.includes('office') || pathway === 'headquarters' || pathway === 'paid_intern') return MISSIONS.office;
  if (areas.includes('research') || areas.includes('tech')) return MISSIONS.research;
  if (areas.includes('events') || pathway === 'events_road') return MISSIONS.events;
  if (areas.includes('community') || areas.includes('field')) return MISSIONS.community;
  if (areas.includes('remote') || pathway === 'remote') return MISSIONS.remote;
  return MISSIONS.community;
}

export const PAID_CHOICES: { id: PaidInterest; label: string }[] = [
  { id: 'yes', label: 'Yes, consider me for the paid role' },
  { id: 'volunteer', label: "I'm primarily here to volunteer" },
  { id: 'both', label: "I'm interested in both" },
  { id: 'unsure', label: 'Not sure yet' },
];
