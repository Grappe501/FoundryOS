import { openBeat } from '../clocks';
import type { WorkshopSession, WorkshopStateId } from '../types';
import type { HumanGateKind, HumanGateRecord, SpineEnvelope } from './envelope';
import { createEnvelope } from './envelope';
import type { SpineStageId } from './stages';
import { ERNIE_ZONE_NEXT, nextSpineStage, stageDef, workshopStateToStage } from './stages';

export type EnterStageResult =
  | { ok: true; session: WorkshopSession }
  | { ok: false; reason: 'ernie_zone' | 'stub' | 'human_gate' | 'locked' | 'already_complete'; stage: SpineStageId };

export function withEnvelope(session: WorkshopSession, envelope: SpineEnvelope = createEnvelope()): WorkshopSession {
  return { ...session, envelope };
}

export function syncEnvelope(session: WorkshopSession): WorkshopSession {
  const envelope = session.envelope ?? createEnvelope();
  const stateId = session.stateId as WorkshopStateId;
  const stage = workshopStateToStage(stateId);
  const progress = { ...envelope.progress };

  if (session.flags.entered) {
    progress.discover = 'complete';
    if (progress.notice === 'locked') progress.notice = 'open';
  }
  if (session.flags.noticeComplete) {
    progress.notice = 'complete';
    if (progress.solve === 'locked') progress.solve = 'open';
  }
  if (session.flags.messComplete) progress.solve = session.stateId === 'linger' || session.flags.named ? 'complete' : 'open';
  if (session.flags.named && session.stateId === 'linger') progress.solve = 'complete';

  return {
    ...session,
    envelope: {
      ...envelope,
      spineStage: stage,
      progress,
    },
  };
}

export function tryEnterStage(session: WorkshopSession, stage: SpineStageId, now = new Date()): EnterStageResult {
  const def = stageDef(stage);
  const current = session.envelope ?? createEnvelope();
  const progress = current.progress[stage];

  if (def.owner === 'ernie') {
    return { ok: false, reason: 'ernie_zone', stage };
  }
  if (def.fill === 'stub') {
    return { ok: false, reason: 'stub', stage };
  }
  if (def.advance === 'human_gate') {
    const allowed = session.envelope?.gates.some((g) => gateUnlocks(g.kind, stage));
    if (!allowed) return { ok: false, reason: 'human_gate', stage };
  }
  if (progress === 'locked') return { ok: false, reason: 'locked', stage };
  if (progress === 'complete') return { ok: false, reason: 'already_complete', stage };

  let next = openBeat(session, stage, now);
  next = {
    ...next,
    envelope: {
      ...(next.envelope ?? createEnvelope()),
      spineStage: stage,
      progress: { ...(next.envelope ?? createEnvelope()).progress, [stage]: 'open' },
    },
  };
  return { ok: true, session: next };
}

export function recordHumanGate(session: WorkshopSession, gate: HumanGateRecord): WorkshopSession {
  const envelope = session.envelope ?? createEnvelope();
  return {
    ...session,
    envelope: { ...envelope, gates: [...envelope.gates, gate] },
  };
}

export function tryAdvanceSpine(session: WorkshopSession, now = new Date()): EnterStageResult {
  const envelope = session.envelope ?? createEnvelope();
  const nxt = nextSpineStage(envelope.spineStage);
  if (!nxt) return { ok: false, reason: 'already_complete', stage: envelope.spineStage };
  return tryEnterStage(session, nxt, now);
}

function gateUnlocks(kind: HumanGateKind, stage: SpineStageId): boolean {
  if (stage === 'build') return kind === 'real_work_access';
  if (stage === 'earn') return kind === 'paid_project' || kind === 'internship' || kind === 'employment';
  if (stage === 'own') return kind === 'ownership_conversation';
  return false;
}

export function ernieZoneFrozen(): boolean {
  return (
    ERNIE_ZONE_NEXT.door === 'notice' &&
    ERNIE_ZONE_NEXT.notice === 'notice_ack' &&
    ERNIE_ZONE_NEXT.notice_ack === 'mess' &&
    ERNIE_ZONE_NEXT.mess === 'mess_consequence' &&
    ERNIE_ZONE_NEXT.mess_consequence === 'named' &&
    ERNIE_ZONE_NEXT.named === 'linger' &&
    ERNIE_ZONE_NEXT.linger === null
  );
}
