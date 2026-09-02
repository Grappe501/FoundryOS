import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { earnAgreementFor, earnGateOn } from './agreements';
import { EARN_COPY } from './copy';

export function openEarn(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'earn', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const gate = earnGateOn(result.session);
  const agreement = earnAgreementFor(gate);
  let next = recordThinking(result.session, {
    beatId: 'earn',
    move: 'constraint_seek',
    fact: { agreementId: agreement.id, gate: agreement.gate, copy: EARN_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      earn: {
        agreementId: agreement.id,
        gateKind: agreement.gate,
        work: '',
        accepted: false,
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `earn-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'earn',
        value: {
          agreement,
          auto: false,
          equity: false,
          prize: false,
          ask: EARN_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitEarn(
  session: WorkshopSession,
  input: { work: string; accepted: boolean; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'earn' || session.envelope.progress.earn !== 'open') {
    throw new Error('earn_not_open');
  }
  const gate = earnGateOn(session);
  const agreement = earnAgreementFor(gate);
  const at = now.toISOString();
  const closed = input.finished && input.accepted;
  let next = markFirstInput(session, 'earn', now);
  next = recordThinking(next, {
    beatId: 'earn',
    move: 'decide',
    fact: { work: input.work, agreementId: agreement.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'earn',
    move: 'constraint_seek',
    fact: { accepted: input.accepted, bound: agreement.bound },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'earn',
    move: closed ? 'finish' : 'abandon',
    fact: { finished: input.finished, accepted: input.accepted },
    now: new Date(now.getTime() + 2),
  });
  if (closed) next = submitBeat(next, 'earn', now);
  const progress = { ...next.envelope.progress };
  if (closed) progress.earn = 'complete';
  const prior = next.envelope.earn;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      earn: {
        agreementId: agreement.id,
        gateKind: agreement.gate,
        work: input.work,
        accepted: input.accepted,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: closed ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `earn-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'earn-turn',
        value: {
          agreementId: agreement.id,
          gateKind: agreement.gate,
          work: input.work,
          accepted: input.accepted,
          finished: input.finished,
          metrics: { work: textMetrics(input.work) },
          auto: false,
          equity: false,
          prize: false,
          clock: next.clocks.earn,
        },
      },
    ],
  });
}
