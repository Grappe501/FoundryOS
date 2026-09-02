import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import type { DeliverOutcome } from '../spine/envelope';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { deliverBarFor } from './bars';
import { DELIVER_COPY } from './copy';

const OUTCOMES: readonly DeliverOutcome[] = ['complete', 'abandon'];

export function openDeliver(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'deliver', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const bar = deliverBarFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'deliver',
    move: 'constraint_seek',
    fact: { barId: bar.id, definitionOfDone: bar.definitionOfDone, copy: DELIVER_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      deliver: {
        barId: bar.id,
        outcome: null,
        body: '',
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `deliver-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'deliver',
        value: {
          bar,
          ask: DELIVER_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitDeliver(
  session: WorkshopSession,
  input: { body: string; outcome: DeliverOutcome },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'deliver' || session.envelope.progress.deliver !== 'open') {
    throw new Error('deliver_not_open');
  }
  if (!OUTCOMES.includes(input.outcome)) throw new Error('deliver_outcome');
  const bar = deliverBarFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'deliver', now);
  next = recordThinking(next, {
    beatId: 'deliver',
    move: 'explain',
    fact: { body: input.body, barId: bar.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'deliver',
    move: input.outcome === 'complete' ? 'finish' : 'abandon',
    fact: { outcome: input.outcome, definitionOfDone: bar.definitionOfDone },
    now: new Date(now.getTime() + 1),
  });
  next = submitBeat(next, 'deliver', now);
  const progress = { ...next.envelope.progress };
  progress.deliver = 'complete';
  const prior = next.envelope.deliver;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      deliver: {
        barId: bar.id,
        outcome: input.outcome,
        body: input.body,
        openedAt: prior?.openedAt ?? at,
        submittedAt: at,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `deliver-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'deliver-turn',
        value: {
          barId: bar.id,
          outcome: input.outcome,
          body: input.body,
          definitionOfDone: bar.definitionOfDone,
          metrics: textMetrics(input.body),
          clock: next.clocks.deliver,
        },
      },
    ],
  });
}
