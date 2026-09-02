import type { ArtifactTrack } from '../spine/envelope';

export type FeedbackNote = {
  id: string;
  track: ArtifactTrack | 'any';
  from: string;
  body: string;
};

/** Fictional. Work-grounded. Not a score. Not a hire signal. */
export const RESPOND_NOTES: FeedbackNote[] = [
  {
    id: 'F-build',
    track: 'build',
    from: 'rafi',
    body: 'Rafi used your control. They said the second action is still attached. They asked which one is the real start.',
  },
  {
    id: 'F-explain',
    track: 'explain',
    from: 'rafi',
    body: 'Rafi read your sentence twice. They said a new person can still skip the risk. They asked which word is doing the hiding.',
  },
  {
    id: 'F-investigate',
    track: 'investigate',
    from: 'rafi',
    body: 'Rafi brought a third fact. It contradicts one of your reasons. They did not say which.',
  },
  {
    id: 'F-design',
    track: 'design',
    from: 'rafi',
    body: 'Rafi put Danger next to Account again. They said the first change did not hold. They asked what you notice now.',
  },
  {
    id: 'F-operate',
    track: 'operate',
    from: 'rafi',
    body: 'Rafi came back. Line 2 still has no owner. They said your join assumes someone else will claim it.',
  },
  {
    id: 'F-grow',
    track: 'grow',
    from: 'rafi',
    body: "Rafi's person asked again. Rafi said your path does not answer the question they actually asked.",
  },
  {
    id: 'F-organize',
    track: 'organize',
    from: 'rafi',
    body: 'The other owner is still waiting. Rafi asked what is blocking them, in one sentence.',
  },
  {
    id: 'F-any',
    track: 'any',
    from: 'rafi',
    body: 'Rafi left a note on your last step: this still depends on something you did not name.',
  },
];

export function respondNoteFor(track: ArtifactTrack | null): FeedbackNote {
  return RESPOND_NOTES.find((n) => n.track === track) ?? RESPOND_NOTES.find((n) => n.track === 'any')!;
}
