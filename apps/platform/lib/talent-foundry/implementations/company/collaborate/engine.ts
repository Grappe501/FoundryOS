import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { COLLABORATE_COPY } from './copy';
import { collaboratePromptFor } from './partners';

export function openCollaborate(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'collaborate', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const prompt = collaboratePromptFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'collaborate',
    move: 'help',
    fact: { partnerId: prompt.partner.id, promptId: prompt.id, copy: COLLABORATE_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      collaborate: {
        partnerId: prompt.partner.id,
        promptId: prompt.id,
        sent: '',
        needBack: '',
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `collab-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'collaborate',
        value: {
          partner: prompt.partner,
          theyLeft: prompt.theyLeft,
          fictional: true,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitCollaborate(
  session: WorkshopSession,
  input: { sent: string; needBack: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'collaborate' || session.envelope.progress.collaborate !== 'open') {
    throw new Error('collaborate_not_open');
  }
  const prompt = collaboratePromptFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'collaborate', now);
  next = recordThinking(next, {
    beatId: 'collaborate',
    move: 'handoff',
    fact: { sent: input.sent, partnerId: prompt.partner.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'collaborate',
    move: 'help',
    fact: { needBack: input.needBack },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'collaborate',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished },
    now: new Date(now.getTime() + 2),
  });
  if (input.finished) next = submitBeat(next, 'collaborate', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.collaborate = 'complete';
  const prior = next.envelope.collaborate;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      collaborate: {
        partnerId: prompt.partner.id,
        promptId: prompt.id,
        sent: input.sent,
        needBack: input.needBack,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `collab-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'collaborate-turn',
        value: {
          sent: input.sent,
          needBack: input.needBack,
          finished: input.finished,
          metrics: { sent: textMetrics(input.sent), needBack: textMetrics(input.needBack) },
          fictionalPartner: prompt.partner.id,
          clock: next.clocks.collaborate,
        },
      },
    ],
  });
}
