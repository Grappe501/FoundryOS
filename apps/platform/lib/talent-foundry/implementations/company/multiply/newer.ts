import type { ArtifactTrack } from '../spine/envelope';

export type NewerOnBench = {
  id: string;
  name: string;
  facts: string[];
};

/** Fictional. Earlier on the path. Not a real applicant. Not a cohort member. */
export const NEWER_NIA: NewerOnBench = {
  id: 'nia',
  name: 'Nia',
  facts: [
    'Standing at a bench you already left.',
    'Has not asked for a title.',
    'The work in front of them is work you already finished.',
  ],
};

export type MultiplyPrompt = {
  id: string;
  track: ArtifactTrack | 'any';
  newer: NewerOnBench;
  theyAreStuck: string;
};

export const MULTIPLY_PROMPTS: MultiplyPrompt[] = [
  {
    id: 'N-build',
    track: 'build',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia is staring at Delete as the way to start. They have not named a primary control.',
  },
  {
    id: 'N-explain',
    track: 'explain',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia rewrote the note and hid the risk again. They asked whether anyone needs to see it.',
  },
  {
    id: 'N-investigate',
    track: 'investigate',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia has one reason and a feeling. They have not named what would count as evidence.',
  },
  {
    id: 'N-design',
    track: 'design',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia made Account and Danger the same weight. They asked which one should move first.',
  },
  {
    id: 'N-operate',
    track: 'operate',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia has five empty lines and is waiting for someone else to assign owners.',
  },
  {
    id: 'N-grow',
    track: 'grow',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia said post everywhere. They have not named who receives the notes, or how.',
  },
  {
    id: 'N-organize',
    track: 'organize',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia told both owners to go first. They are waiting to see who moves.',
  },
  {
    id: 'N-any',
    track: 'any',
    newer: NEWER_NIA,
    theyAreStuck: 'Nia is on the step you already left and does not know what to do first.',
  },
];

export function multiplyPromptFor(track: ArtifactTrack | null): MultiplyPrompt {
  return MULTIPLY_PROMPTS.find((p) => p.track === track) ?? MULTIPLY_PROMPTS.find((p) => p.track === 'any')!;
}
