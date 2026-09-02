import type { ArtifactTrack } from '../spine/envelope';

export type DeliveryBar = {
  id: string;
  track: ArtifactTrack | 'any';
  definitionOfDone: string;
};

/** Track-specific last bar. A fact they answer. Not a grade. */
export const DELIVER_BARS: DeliveryBar[] = [
  {
    id: 'D-build',
    track: 'build',
    definitionOfDone: 'One primary control. One action. A new person can start without Delete.',
  },
  {
    id: 'D-explain',
    track: 'explain',
    definitionOfDone: 'A short note another person can act on. The risk is visible without a whisper.',
  },
  {
    id: 'D-investigate',
    track: 'investigate',
    definitionOfDone: 'Two reasons that can be checked. The conflicting fact is named or cut.',
  },
  {
    id: 'D-design',
    track: 'design',
    definitionOfDone: 'The first hierarchy change holds when Account and Danger sit together again.',
  },
  {
    id: 'D-operate',
    track: 'operate',
    definitionOfDone: 'Five lines. One owner each. The join has an owner or is cut.',
  },
  {
    id: 'D-grow',
    track: 'grow',
    definitionOfDone: 'One path. The person who asked can use the answer without a second channel.',
  },
  {
    id: 'D-organize',
    track: 'organize',
    definitionOfDone: 'One person moves first. The other owner knows what they do while waiting.',
  },
  {
    id: 'D-any',
    track: 'any',
    definitionOfDone: 'The last step no longer depends on something you did not name.',
  },
];

export function deliverBarFor(track: ArtifactTrack | null): DeliveryBar {
  return DELIVER_BARS.find((b) => b.track === track) ?? DELIVER_BARS.find((b) => b.track === 'any')!;
}
