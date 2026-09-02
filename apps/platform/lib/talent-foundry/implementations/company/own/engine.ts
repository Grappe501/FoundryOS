import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { OWN_COPY } from './copy';
import { ownConversation } from './conversations';

export function openOwn(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'own', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const conversation = ownConversation();
  let next = recordThinking(result.session, {
    beatId: 'own',
    move: 'constraint_seek',
    fact: { conversationId: conversation.id, bound: conversation.bound, copy: OWN_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      own: {
        conversationId: conversation.id,
        subject: '',
        entered: false,
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `own-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'own',
        value: {
          conversation,
          auto: false,
          equity: false,
          prize: false,
          partnerTrack: false,
          ask: OWN_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitOwn(
  session: WorkshopSession,
  input: { subject: string; entered: boolean; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'own' || session.envelope.progress.own !== 'open') {
    throw new Error('own_not_open');
  }
  const conversation = ownConversation();
  const at = now.toISOString();
  const closed = input.finished && input.entered;
  let next = markFirstInput(session, 'own', now);
  next = recordThinking(next, {
    beatId: 'own',
    move: 'decide',
    fact: { subject: input.subject, conversationId: conversation.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'own',
    move: 'constraint_seek',
    fact: { entered: input.entered, bound: conversation.bound },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'own',
    move: closed ? 'finish' : 'abandon',
    fact: { finished: input.finished, entered: input.entered },
    now: new Date(now.getTime() + 2),
  });
  if (closed) next = submitBeat(next, 'own', now);
  const progress = { ...next.envelope.progress };
  if (closed) progress.own = 'complete';
  const prior = next.envelope.own;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      own: {
        conversationId: conversation.id,
        subject: input.subject,
        entered: input.entered,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: closed ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `own-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'own-turn',
        value: {
          conversationId: conversation.id,
          subject: input.subject,
          entered: input.entered,
          finished: input.finished,
          metrics: { subject: textMetrics(input.subject) },
          auto: false,
          equity: false,
          prize: false,
          partnerTrack: false,
          clock: next.clocks.own,
        },
      },
    ],
  });
}
