import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { tryEnterStage } from '../spine/kernel';
import type { ArtifactTrack } from '../spine/envelope';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { makeTrack } from './tracks';

export function openMake(session: WorkshopSession, now = new Date()) {
  return tryEnterStage(session, 'make', now);
}

export function chooseMakeTrack(
  session: WorkshopSession,
  trackId: ArtifactTrack,
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'make' || session.envelope.progress.make !== 'open') {
    throw new Error('make_not_open');
  }
  const track = makeTrack(trackId);
  const at = now.toISOString();
  let next = markFirstInput(session, 'make', now);
  next = recordThinking(next, {
    beatId: 'make',
    move: 'decide',
    fact: { track: track.id, attractor: track.attractor },
    now,
  });
  return {
    ...next,
    envelope: {
      ...next.envelope,
      artifactTrack: track.id,
      artifact: {
        track: track.id,
        body: next.envelope.artifact?.body ?? '',
        finished: false,
        chosenAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `make-track-${at}`,
        at,
        stateId: session.stateId,
        type: 'access_event',
        label: 'make-track',
        value: { track: track.id, job: track.job },
      },
    ],
  };
}

export function submitMake(
  session: WorkshopSession,
  input: { body: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  const trackId = session.envelope.artifactTrack;
  if (!trackId || session.envelope.spineStage !== 'make') throw new Error('make_track_required');
  const track = makeTrack(trackId);
  const at = now.toISOString();
  let next = markFirstInput(session, 'make', now);
  next = recordThinking(next, {
    beatId: 'make',
    move: 'explain',
    fact: { body: input.body, track: trackId },
    now,
  });
  next = recordThinking(next, {
    beatId: 'make',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished, definitionOfDone: track.definitionOfDone },
    now: new Date(now.getTime() + 1),
  });
  if (input.finished) next = submitBeat(next, 'make', now);

  const progress = { ...next.envelope.progress };
  if (input.finished) progress.make = 'complete';

  return {
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      artifact: {
        track: trackId,
        body: input.body,
        finished: input.finished,
        chosenAt: next.envelope.artifact?.chosenAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `make-artifact-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'make-artifact',
        value: {
          track: trackId,
          body: input.body,
          finished: input.finished,
          metrics: textMetrics(input.body),
          definitionOfDone: track.definitionOfDone,
          clock: next.clocks.make,
        },
      },
    ],
  };
}
