import type { ArtifactTrack } from '../spine/envelope';

export type ReturnChallenge = {
  id: string;
  track: ArtifactTrack | 'any';
  prompt: string;
  definitionOfDone: string;
};

export const RETURN_CHALLENGES: ReturnChallenge[] = [
  {
    id: 'R-build',
    track: 'build',
    prompt: 'Someone used your primary control. It now does two things at once. What do you change first so it does one thing well?',
    definitionOfDone: 'One change. What you would leave alone, and why.',
  },
  {
    id: 'R-explain',
    track: 'explain',
    prompt: 'A new person read your note and still hid the risk. Rewrite the one sentence they must not be able to skip.',
    definitionOfDone: 'One sentence that makes the risk unavoidable.',
  },
  {
    id: 'R-investigate',
    track: 'investigate',
    prompt: 'One of your two reasons was wrong. Which one would you re-check first, and what would count as evidence?',
    definitionOfDone: 'The reason + the evidence that would settle it.',
  },
  {
    id: 'R-design',
    track: 'design',
    prompt: 'Your first hierarchy change shipped. Account and Danger now look the same again, for a different reason. What do you notice this time?',
    definitionOfDone: 'What you notice + the next first change.',
  },
  {
    id: 'R-operate',
    track: 'operate',
    prompt: 'Line 2 of your plan has no owner today. The rest of the plan is already moving. What do you do with that line?',
    definitionOfDone: 'What happens to the orphan line. One owner or a cut.',
  },
  {
    id: 'R-grow',
    track: 'grow',
    prompt: 'The path you named reached the wrong person. Name the correction without adding a second channel.',
    definitionOfDone: 'One correction. Same channel or a different recipient — not both.',
  },
  {
    id: 'R-organize',
    track: 'organize',
    prompt: 'Both owners showed up first. Rewrite the first ten minutes so only one of them moves.',
    definitionOfDone: 'Who moves first, and what the other person does while waiting.',
  },
  {
    id: 'R-any',
    track: 'any',
    prompt: 'The work you left is still on the bench, but one assumption underneath it is no longer true. Which assumption, and what do you do first?',
    definitionOfDone: 'The broken assumption + the first action.',
  },
];

export function returnChallengeFor(track: ArtifactTrack | null): ReturnChallenge {
  return RETURN_CHALLENGES.find((c) => c.track === track) ?? RETURN_CHALLENGES.find((c) => c.track === 'any')!;
}
