import type { ArtifactTrack } from '../spine/envelope';

export type BenchPartner = {
  id: string;
  name: string;
  facts: string[];
};

/** Fictional. Facts only. Not a real applicant. Not a type label. */
export const PARTNER_RAFI: BenchPartner = {
  id: 'rafi',
  name: 'Rafi',
  facts: ['Left a note on the shared bench.', 'Has been here before.', 'Did not wait for a title.'],
};

export type CollaboratePrompt = {
  id: string;
  track: ArtifactTrack | 'any';
  partner: BenchPartner;
  theyLeft: string;
};

export const COLLABORATE_PROMPTS: CollaboratePrompt[] = [
  {
    id: 'C-build',
    track: 'build',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi changed the primary control and asked whether your start action still holds.',
  },
  {
    id: 'C-explain',
    track: 'explain',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi rewrote one line of your note and asked if the risk is still visible.',
  },
  {
    id: 'C-investigate',
    track: 'investigate',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi checked one of your reasons and brought back a conflicting fact.',
  },
  {
    id: 'C-design',
    track: 'design',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi moved Danger down a level and asked what should rise instead.',
  },
  {
    id: 'C-operate',
    track: 'operate',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi took line 3 and left line 2 still empty. They asked who owns the join.',
  },
  {
    id: 'C-grow',
    track: 'grow',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi sent your path to one person. That person asked a question Rafi cannot answer.',
  },
  {
    id: 'C-organize',
    track: 'organize',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi started first. The other owner is waiting. Rafi asked what to tell them.',
  },
  {
    id: 'C-any',
    track: 'any',
    partner: PARTNER_RAFI,
    theyLeft: 'Rafi left a half-finished next step on your work and a question in the margin.',
  },
];

export function collaboratePromptFor(track: ArtifactTrack | null): CollaboratePrompt {
  return COLLABORATE_PROMPTS.find((p) => p.track === track) ?? COLLABORATE_PROMPTS.find((p) => p.track === 'any')!;
}
