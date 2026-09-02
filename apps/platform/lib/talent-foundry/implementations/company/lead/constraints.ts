import type { ArtifactTrack } from '../spine/envelope';

export type LeadConstraint = {
  id: string;
  track: ArtifactTrack | 'any';
  people: string[];
  limit: string;
  outcome: string;
};

/** Fictional people. Limited hour. Not a cohort. Not a leadership appointment. */
export const LEAD_CONSTRAINTS: LeadConstraint[] = [
  {
    id: 'L-build',
    track: 'build',
    people: ['rafi', 'nia'],
    limit: 'One hour.',
    outcome: 'Rafi can change the control. Nia will press it. You cannot sit with both.',
  },
  {
    id: 'L-explain',
    track: 'explain',
    people: ['rafi', 'nia'],
    limit: 'One note leaves the bench.',
    outcome: 'Rafi will send it. Nia will read it. You cannot rewrite it after it leaves.',
  },
  {
    id: 'L-investigate',
    track: 'investigate',
    people: ['rafi', 'nia'],
    limit: 'One reason can be checked in the hour.',
    outcome: 'Rafi has a fact. Nia has a feeling. You pick which reason lives.',
  },
  {
    id: 'L-design',
    track: 'design',
    people: ['rafi', 'nia'],
    limit: 'One change can ship.',
    outcome: 'Rafi will move Danger. Nia will look at Account. You cannot move both.',
  },
  {
    id: 'L-operate',
    track: 'operate',
    people: ['rafi', 'nia'],
    limit: 'One hour.',
    outcome: 'Rafi and Nia are both here. Five lines cannot all be yours.',
  },
  {
    id: 'L-grow',
    track: 'grow',
    people: ['rafi', 'nia'],
    limit: 'One person can receive the path.',
    outcome: 'Rafi can send. Nia is asking. You cannot add a second channel.',
  },
  {
    id: 'L-organize',
    track: 'organize',
    people: ['rafi', 'nia'],
    limit: 'The next ten minutes.',
    outcome: 'Both think they go first. You name who moves. The other waits.',
  },
  {
    id: 'L-any',
    track: 'any',
    people: ['rafi', 'nia'],
    limit: 'One hour. Two people. One outcome.',
    outcome: 'You cannot keep all of it.',
  },
];

export function leadConstraintFor(track: ArtifactTrack | null): LeadConstraint {
  return LEAD_CONSTRAINTS.find((c) => c.track === track) ?? LEAD_CONSTRAINTS.find((c) => c.track === 'any')!;
}
