import type { ArtifactTrack } from '../spine/envelope';
import type { DraftTrace } from '../traces';
import type { WorkshopSession } from '../types';
import { MAKE_TRACKS } from './tracks';

export type MakeSurface = 'rest' | 'need' | 'attempt' | 'equipped';
export type BenchObject = 'pulse' | 'draft';

export const PULSE_TRACKS: readonly ArtifactTrack[] = ['build', 'design'];
export const DRAFT_TRACKS: readonly ArtifactTrack[] = ['explain', 'investigate', 'operate', 'grow', 'organize'];

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

export function tracksOn(object: BenchObject): readonly ArtifactTrack[] {
  return object === 'pulse' ? PULSE_TRACKS : DRAFT_TRACKS;
}

/** What the object currently exposes. Inventory stays on tracksOn. */
export function tracksVisibleOn(object: BenchObject, trace?: DraftTrace): readonly ArtifactTrack[] {
  if (object === 'pulse') return PULSE_TRACKS;
  if (trace === 'gone') return ['operate'];
  if (trace === 'question') return ['investigate', 'organize'];
  if (trace === 'copy') return ['explain', 'grow'];
  if (trace === 'restored') return ['explain'];
  return ['operate'];
}

export function objectForTrack(trackId: string | null): BenchObject {
  if (trackId && (PULSE_TRACKS as readonly string[]).includes(trackId)) return 'pulse';
  return 'draft';
}

export function pulseSided(trackId: string | null): boolean {
  return objectForTrack(trackId) === 'pulse';
}

export function composeBuildBody(label: string, happens: string): string {
  return `${label.trim()}\n${happens.trim()}`.trim();
}
