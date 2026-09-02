import {
  coverageFact,
  markAfterSubmitLinger,
  markFirstInput,
  openBeat,
  submitBeat,
  textMetrics,
  touchRegion,
} from './clocks';
import { PHASE_1_MESS, PHASE_1_NOTICE, messChoice } from './scenarios/lab';
import { createEnvelope } from './spine/envelope';
import { syncEnvelope } from './spine/kernel';
import { closeBeatIgnores, recordThinking } from './thinking-trace';
import type { DoorLineId, WorkshopSession, WorkshopStateId } from './types';
import { WORKSHOP_IMPLEMENTATION, WORKSHOP_SESSION_KEY, WORKSHOP_SESSION_VERSION } from './types';

function emit(session: WorkshopSession): WorkshopSession {
  return syncEnvelope(session);
}

const NEXT: Record<WorkshopStateId, WorkshopStateId | null> = {
  door: 'notice',
  notice: 'notice_ack',
  notice_ack: 'mess',
  mess: 'mess_consequence',
  mess_consequence: 'named',
  named: 'linger',
  linger: null,
};

const EMPTY_DOOR = { line1At: null, line2At: null, line3At: null, enterAt: null };

export function createWorkshopSession(now = new Date()): WorkshopSession {
  const startedAt = now.toISOString();
  const created: WorkshopSession = {
    v: WORKSHOP_SESSION_VERSION,
    implementation: WORKSHOP_IMPLEMENTATION,
    sessionKey: WORKSHOP_SESSION_KEY,
    stateId: 'door',
    startedAt,
    noticeId: PHASE_1_NOTICE.id,
    messId: PHASE_1_MESS.id,
    evidence: [],
    thinking: [],
    flags: {
      entered: false,
      noticeStarted: false,
      noticeComplete: false,
      messComplete: false,
      named: false,
    },
    addressedRegionIds: [],
    clocks: {
      door: {
        beatId: 'door',
        openedAt: startedAt,
        firstInputAt: null,
        submittedAt: null,
        hesitationMs: null,
        lingerMs: null,
        afterSubmitLingerMs: null,
      },
    },
    regionDwells: {},
    doorPacing: { ...EMPTY_DOOR, line1At: startedAt },
    envelope: createEnvelope(),
  };
  return emit(created);
}

export function nextWorkshopState(stateId: WorkshopStateId): WorkshopStateId | null {
  return NEXT[stateId];
}

/** Call as each opening line appears. Plants whether they sat with the mystery or rushed ENTER. */
export function revealDoorLine(session: WorkshopSession, line: DoorLineId, now = new Date()): WorkshopSession {
  const at = now.toISOString();
  const key = line === 'enter' ? 'enterAt' : (`${line}At` as const);
  if (session.doorPacing[key]) return session;
  return {
    ...session,
    doorPacing: { ...session.doorPacing, [key]: at },
  };
}

export function noteTyping(session: WorkshopSession, beatId: string, now = new Date()): WorkshopSession {
  return markFirstInput(session, beatId, now);
}

export function enterWorkshop(session: WorkshopSession, now = new Date()): WorkshopSession {
  const at = now.toISOString();
  let next = revealDoorLine(session, 'enter', now);
  next = submitBeat(next, 'door', now);
  next = openBeat(next, 'notice', now);
  const entered = {
    ...next,
    stateId: 'notice' as const,
    flags: { ...next.flags, entered: true },
    evidence: [
      ...next.evidence,
      {
        id: `enter-${at}`,
        at,
        stateId: 'door' as const,
        type: 'access_event' as const,
        label: 'ENTER',
        value: { doorLingerMs: next.clocks.door?.lingerMs, doorPacing: next.doorPacing },
      },
    ],
  };
  return emit(entered);
}

export function markNoticeRegion(
  session: WorkshopSession,
  regionId: string,
  now = new Date(),
  dwellMs = 0,
): WorkshopSession {
  let next = markFirstInput(session, 'notice', now);
  next = touchRegion(next, regionId, now, dwellMs);
  next = recordThinking(next, {
    beatId: 'notice',
    move: 'attention',
    fact: { regionId, dwellMs },
    regionId,
    durationMs: dwellMs || undefined,
    now,
  });
  return { ...next, flags: { ...next.flags, noticeStarted: true } };
}

export function submitNotice(
  session: WorkshopSession,
  input: { notice: string; change: string },
  now = new Date(),
): WorkshopSession {
  const at = now.toISOString();
  let next = markFirstInput(session, 'notice', now);
  next = recordThinking(next, {
    beatId: 'notice',
    move: 'notice',
    fact: { text: input.notice },
    now,
  });
  next = recordThinking(next, {
    beatId: 'notice',
    move: 'assertion',
    fact: { text: input.change },
    now: new Date(now.getTime() + 1),
  });
  next = closeBeatIgnores(
    next,
    'notice',
    PHASE_1_NOTICE.regions.map((r) => r.id),
    new Date(now.getTime() + 2),
  );
  next = submitBeat(next, 'notice', now);
  const coverage = coverageFact(next, PHASE_1_NOTICE, `${input.notice} ${input.change}`);
  return emit({
    ...next,
    stateId: 'notice_ack',
    flags: { ...next.flags, noticeComplete: true },
    evidence: [
      ...next.evidence,
      {
        id: `notice-${at}`,
        at,
        stateId: 'notice',
        type: 'response',
        label: 'notice+change',
        value: {
          ...input,
          metrics: { notice: textMetrics(input.notice), change: textMetrics(input.change) },
          coverage,
          clock: next.clocks.notice,
        },
      },
    ],
  });
}

export function submitMess(session: WorkshopSession, choiceId: string, now = new Date()): WorkshopSession {
  const choice = messChoice(PHASE_1_MESS, choiceId);
  if (!choice) throw new Error(`unknown mess choice: ${choiceId}`);
  const at = now.toISOString();
  let next = markFirstInput(session, 'mess', now);
  for (const [i, move] of choice.moves.entries()) {
    next = recordThinking(next, {
      beatId: 'mess',
      move,
      fact: { choiceId, label: choice.label },
      now: new Date(now.getTime() + i),
    });
  }
  next = submitBeat(next, 'mess', now);
  return emit({
    ...next,
    stateId: 'mess_consequence',
    flags: { ...next.flags, messComplete: true },
    evidence: [
      ...next.evidence,
      {
        id: `mess-${at}`,
        at,
        stateId: 'mess',
        type: 'decision',
        label: choice.label,
        value: { choiceId, consequence: choice.consequence, clock: next.clocks.mess },
      },
      {
        id: `mess-conseq-${at}`,
        at,
        stateId: 'mess_consequence',
        type: 'consequence',
        label: 'aftermath',
        value: choice.consequence,
      },
    ],
  });
}

export function revealName(session: WorkshopSession, now = new Date()): WorkshopSession {
  const at = now.toISOString();
  let next = markAfterSubmitLinger(session, 'mess', now);
  next = openBeat(next, 'named', now);
  return emit({
    ...next,
    stateId: 'named',
    flags: { ...next.flags, named: true },
    evidence: [
      ...next.evidence,
      {
        id: `named-${at}`,
        at,
        stateId: 'named',
        type: 'access_event',
        label: 'THIS IS TALENT FOUNDRY',
        value: { messAftermathLingerMs: next.clocks.mess?.afterSubmitLingerMs },
      },
    ],
  });
}

export function linger(session: WorkshopSession, now = new Date()): WorkshopSession {
  let next = submitBeat(session, 'named', now);
  next = openBeat(next, 'linger', now);
  return emit({ ...next, stateId: 'linger' });
}

export function advanceWorkshop(session: WorkshopSession, now = new Date()): WorkshopSession {
  switch (session.stateId) {
    case 'door':
      return enterWorkshop(session, now);
    case 'notice_ack': {
      const leftAck = markAfterSubmitLinger(session, 'notice', now);
      return emit(openBeat({ ...leftAck, stateId: 'mess' }, 'mess', now));
    }
    case 'mess_consequence':
      return revealName(session, now);
    case 'named':
      return linger(session, now);
    default:
      return session;
  }
}
