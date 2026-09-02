import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { BUILD_COPY } from './copy';
import { buildSurfaceFor } from './surfaces';

export function openBuild(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'build', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const surface = buildSurfaceFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'build',
    move: 'constraint_seek',
    fact: { surfaceId: surface.id, bound: surface.bound, copy: BUILD_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      build: {
        surfaceId: surface.id,
        changed: '',
        left: '',
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `build-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'build',
        value: {
          surface,
          sandbox: true,
          production: false,
          employment: false,
          pay: false,
          ask: BUILD_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitBuild(
  session: WorkshopSession,
  input: { changed: string; left: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'build' || session.envelope.progress.build !== 'open') {
    throw new Error('build_not_open');
  }
  const surface = buildSurfaceFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'build', now);
  next = recordThinking(next, {
    beatId: 'build',
    move: 'revise',
    fact: { changed: input.changed, surfaceId: surface.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'build',
    move: 'scope_cut',
    fact: { left: input.left, bound: surface.bound },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'build',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished },
    now: new Date(now.getTime() + 2),
  });
  if (input.finished) next = submitBeat(next, 'build', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.build = 'complete';
  const prior = next.envelope.build;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      build: {
        surfaceId: surface.id,
        changed: input.changed,
        left: input.left,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `build-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'build-turn',
        value: {
          surfaceId: surface.id,
          changed: input.changed,
          left: input.left,
          finished: input.finished,
          metrics: { changed: textMetrics(input.changed), left: textMetrics(input.left) },
          sandbox: true,
          production: false,
          employment: false,
          pay: false,
          clock: next.clocks.build,
        },
      },
    ],
  });
}
