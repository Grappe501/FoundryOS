import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { MULTIPLY_COPY } from './copy';
import { multiplyPromptFor } from './newer';

export function openMultiply(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'multiply', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const prompt = multiplyPromptFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'multiply',
    move: 'help',
    fact: { newerId: prompt.newer.id, promptId: prompt.id, copy: MULTIPLY_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      multiply: {
        promptId: prompt.id,
        newerId: prompt.newer.id,
        help: '',
        unblocks: '',
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `multiply-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'multiply',
        value: {
          newer: prompt.newer,
          theyAreStuck: prompt.theyAreStuck,
          fictional: true,
          cohort: false,
          ask: MULTIPLY_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitMultiply(
  session: WorkshopSession,
  input: { help: string; unblocks: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'multiply' || session.envelope.progress.multiply !== 'open') {
    throw new Error('multiply_not_open');
  }
  const prompt = multiplyPromptFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'multiply', now);
  next = recordThinking(next, {
    beatId: 'multiply',
    move: 'help',
    fact: { help: input.help, newerId: prompt.newer.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'multiply',
    move: 'handoff',
    fact: { unblocks: input.unblocks },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'multiply',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished },
    now: new Date(now.getTime() + 2),
  });
  if (input.finished) next = submitBeat(next, 'multiply', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.multiply = 'complete';
  const prior = next.envelope.multiply;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      multiply: {
        promptId: prompt.id,
        newerId: prompt.newer.id,
        help: input.help,
        unblocks: input.unblocks,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `multiply-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'multiply-turn',
        value: {
          promptId: prompt.id,
          newerId: prompt.newer.id,
          help: input.help,
          unblocks: input.unblocks,
          finished: input.finished,
          metrics: { help: textMetrics(input.help), unblocks: textMetrics(input.unblocks) },
          fictional: true,
          cohort: false,
          clock: next.clocks.multiply,
        },
      },
    ],
  });
}
