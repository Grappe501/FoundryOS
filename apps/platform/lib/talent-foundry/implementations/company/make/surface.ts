import type { WorkshopSession } from '../types';
import { MAKE_TRACKS } from './tracks';

export type MakeSurface = 'rest' | 'need' | 'attempt' | 'equipped';

/** UI surface while Ernie stateId stays linger. Not a new journey state. */
export function makeSurface(session: WorkshopSession): MakeSurface {
  if (session.stateId !== 'linger') return 'rest';
  if (session.envelope.progress.make === 'complete') return 'equipped';
  if (session.envelope.spineStage === 'make' && session.envelope.artifactTrack) return 'attempt';
  if (session.envelope.spineStage === 'make') return 'need';
  return 'rest';
}

export function makeEligible(session: WorkshopSession): boolean {
  return session.stateId === 'linger' && session.envelope.progress.make === 'open' && session.envelope.spineStage !== 'make';
}

export function trackLure(trackId: string): string {
  const track = MAKE_TRACKS.find((t) => t.id === trackId);
  if (!track) return '';
  const stop = track.job.indexOf('.');
  return stop > 0 ? track.job.slice(0, stop + 1) : track.job;
}

export function pulseSided(trackId: string | null): boolean {
  return trackId === 'build' || trackId === 'design' || trackId === 'investigate';
}
