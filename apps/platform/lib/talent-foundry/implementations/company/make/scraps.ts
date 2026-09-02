import type { ArtifactTrack } from '../spine/envelope';
import { trackLure } from './surface';

/** Residue on a job note. Looks left behind. Not a card. */
export type WorkScrap = {
  id: ArtifactTrack;
  struck: string;
  when: string;
  lure: string;
};

const STRUCK: Record<ArtifactTrack, string> = {
  build: 'Delete is fine for now',
  design: 'same weight is fine',
  explain: 'keep the review quiet',
  investigate: 'Continue had no copy — skip',
  operate: 'someone will sort the draft',
  grow: 'the notes are saved, that is enough',
  organize: 'both can own Publish',
};

const WHEN: Record<ArtifactTrack, string> = {
  build: '01:14',
  design: '01:16',
  explain: 'last night',
  investigate: '01:41',
  operate: '02:03',
  grow: '02:11',
  organize: '02:18',
};

export function scrapFor(id: ArtifactTrack): WorkScrap {
  return { id, struck: STRUCK[id], when: WHEN[id], lure: trackLure(id) };
}

export function scrapsFor(ids: readonly ArtifactTrack[]): WorkScrap[] {
  return ids.map(scrapFor);
}
