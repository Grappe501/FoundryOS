import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { returnChallengeFor } from './challenges';
import { RETURN_COPY } from './copy';

function lastActivityMs(session: WorkshopSession): number | null {
  const times = [
    ...session.thinking.map((e) => Date.parse(e.at)),
    ...session.evidence.map((e) => Date.parse(e.at)),
  ].filter((n) => Number.isFinite(n));
  if (!times.length) return null;
  return Math.max(...times);
}

export function openReturn(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'return', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const last = lastActivityMs(result.session);
  const gapMs = last == null ? null : now.getTime() - last;
  const challenge = returnChallengeFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'return',
    move: 'return',
    fact: { gapMs, challengeId: challenge.id, copy: RETURN_COPY.stillHere },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      returnVisit: {
        challengeId: challenge.id,
        gapMs,
        body: '',
        finished: false,
        returnedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `return-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'return',
        value: { gapMs, challengeId: challenge.id, prompt: challenge.prompt },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitReturn(
  session: WorkshopSession,
  input: { body: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'return' || session.envelope.progress.return !== 'open') {
    throw new Error('return_not_open');
  }
  const challenge = returnChallengeFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'return', now);
  next = recordThinking(next, {
    beatId: 'return',
    move: 'explain',
    fact: { body: input.body, challengeId: challenge.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'return',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished, definitionOfDone: challenge.definitionOfDone },
    now: new Date(now.getTime() + 1),
  });
  if (input.finished) next = submitBeat(next, 'return', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.return = 'complete';
  const prior = next.envelope.returnVisit;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      returnVisit: {
        challengeId: challenge.id,
        gapMs: prior?.gapMs ?? null,
        body: input.body,
        finished: input.finished,
        returnedAt: prior?.returnedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `return-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'return-challenge',
        value: {
          challengeId: challenge.id,
          body: input.body,
          finished: input.finished,
          metrics: textMetrics(input.body),
          definitionOfDone: challenge.definitionOfDone,
          gapMs: prior?.gapMs ?? null,
          clock: next.clocks.return,
        },
      },
    ],
  });
}
