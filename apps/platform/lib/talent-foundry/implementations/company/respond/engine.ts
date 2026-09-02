import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import type { RespondStance } from '../spine/envelope';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { ThinkingMove, WorkshopSession } from '../types';
import { RESPOND_COPY } from './copy';
import { respondNoteFor } from './notes';

const STANCES: readonly RespondStance[] = ['incorporate', 'hold', 'ask'];

function stanceMove(stance: RespondStance): ThinkingMove {
  if (stance === 'incorporate') return 'revise';
  if (stance === 'hold') return 'decide';
  return 'question';
}

export function openRespond(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'respond', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const note = respondNoteFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'respond',
    move: 'attention',
    fact: { noteId: note.id, from: note.from, copy: RESPOND_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      respond: {
        noteId: note.id,
        stance: null,
        body: '',
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `respond-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'respond',
        value: {
          note,
          fictional: true,
          ask: RESPOND_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitRespond(
  session: WorkshopSession,
  input: { stance: RespondStance; body: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'respond' || session.envelope.progress.respond !== 'open') {
    throw new Error('respond_not_open');
  }
  if (!STANCES.includes(input.stance)) throw new Error('respond_stance');
  const note = respondNoteFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'respond', now);
  next = recordThinking(next, {
    beatId: 'respond',
    move: stanceMove(input.stance),
    fact: { stance: input.stance, noteId: note.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'respond',
    move: 'explain',
    fact: { body: input.body },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'respond',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished },
    now: new Date(now.getTime() + 2),
  });
  if (input.finished) next = submitBeat(next, 'respond', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.respond = 'complete';
  const prior = next.envelope.respond;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      respond: {
        noteId: note.id,
        stance: input.stance,
        body: input.body,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `respond-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'respond-turn',
        value: {
          noteId: note.id,
          stance: input.stance,
          body: input.body,
          finished: input.finished,
          metrics: textMetrics(input.body),
          fictionalFrom: note.from,
          clock: next.clocks.respond,
        },
      },
    ],
  });
}
