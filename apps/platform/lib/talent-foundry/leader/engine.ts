import { leaderMission } from '../campaigns/leader/people';
import type { JourneyStateId, TalentFoundrySession } from '../types';
import type { LeaderPersistAt, LeaderPhase, LeaderPlacement, LeaderRunState } from './types';

export const LEADER_PHASES: LeaderPhase[] = [
  'opening',
  'roster',
  'place',
  'coach',
  'correct',
  'protect',
  'invest',
  'paid_need',
  'paid_who',
  'leftover',
  'mirror',
  'self',
];

const PHASE_SET = new Set<string>(LEADER_PHASES);

/** Deterministic length only. No scoring. */
export const PAID_REASON_MIN = 40;

export function createLeaderRun(missionId = leaderMission.id): LeaderRunState {
  return {
    missionId,
    phase: 'opening',
    placements: [],
    coachWho: null,
    coachHow: null,
    coachNote: '',
    correctAct: null,
    correctNote: '',
    protectWho: 'imani',
    protectHow: null,
    investWho: null,
    investHow: null,
    investPlan: '',
    paidNeed: null,
    paidWho: null,
    paidWhy: '',
    paidPlan: '',
    leftoverNote: '',
    selfCoach: '',
    persistAt: 'none',
  };
}

export function isLeaderPhase(value: string): value is LeaderPhase {
  return PHASE_SET.has(value);
}

export function canEnterLayer3(session: TalentFoundrySession): boolean {
  return Boolean(session.flags.keyTwo && session.flags.layer3Enabled);
}

export function nextLeaderPhase(run: LeaderRunState): LeaderPhase {
  const i = LEADER_PHASES.indexOf(run.phase);
  return LEADER_PHASES[Math.min(i + 1, LEADER_PHASES.length - 1)] ?? run.phase;
}

export function persistCheckpoint(phase: LeaderPhase): LeaderPersistAt {
  if (phase === 'opening' || phase === 'roster') return 'start';
  if (phase === 'correct' || phase === 'invest' || phase === 'paid_need') return 'mid';
  if (phase === 'self' || phase === 'mirror') return 'complete';
  return 'none';
}

export function applyLeaderPatch(run: LeaderRunState, patch: Partial<LeaderRunState>): LeaderRunState {
  const next: LeaderRunState = {
    ...run,
    ...patch,
    placements: patch.placements ?? run.placements,
  };
  if (patch.phase) {
    const mark = persistCheckpoint(patch.phase);
    if (mark === 'start' && run.persistAt === 'none') next.persistAt = 'start';
    if (mark === 'mid' && run.persistAt !== 'complete') next.persistAt = 'mid';
    if (mark === 'complete') next.persistAt = 'complete';
  }
  return next;
}

export function setPlacement(run: LeaderRunState, personId: string, seatId: string | null): LeaderRunState {
  const rest = run.placements.filter((row) => row.personId !== personId);
  return {
    ...run,
    placements: seatId ? [...rest, { personId, seatId }] : rest,
  };
}

export function placementFor(run: LeaderRunState, personId: string): string | undefined {
  return run.placements.find((row) => row.personId === personId)?.seatId;
}

export function allPlaced(run: LeaderRunState, people = leaderMission.people): boolean {
  return people.every((person) => run.placements.some((row) => row.personId === person.id));
}

export function afterLayer3(): JourneyStateId {
  return 'people_rule_close';
}

export function missionComplete(run: LeaderRunState): boolean {
  return run.phase === 'self' && run.selfCoach.trim().length >= 4;
}

export function canAdvanceLeader(run: LeaderRunState): boolean {
  switch (run.phase) {
    case 'opening':
    case 'roster':
    case 'mirror':
      return true;
    case 'place':
      return allPlaced(run);
    case 'coach':
      return Boolean(run.coachWho && run.coachHow && run.coachNote.trim().length >= 4);
    case 'correct':
      return Boolean(run.correctAct && run.correctNote.trim().length >= 4);
    case 'protect':
      return Boolean(run.protectHow);
    case 'invest':
      return Boolean(run.investWho && run.investHow && run.investPlan.trim().length >= 4);
    case 'paid_need':
      return Boolean(run.paidNeed);
    case 'paid_who':
      return Boolean(
        run.paidWho &&
          run.paidWhy.trim().length >= PAID_REASON_MIN &&
          run.paidPlan.trim().length >= PAID_REASON_MIN,
      );
    case 'leftover':
      return run.leftoverNote.trim().length >= 4;
    case 'self':
      return run.selfCoach.trim().length >= 4;
    default:
      return false;
  }
}

export function normalizeLeaderRun(value: unknown, missionId = leaderMission.id): LeaderRunState {
  const fresh = createLeaderRun(missionId);
  if (!value || typeof value !== 'object') return fresh;
  const raw = value as Partial<LeaderRunState>;
  const placements: LeaderPlacement[] = Array.isArray(raw.placements)
    ? raw.placements.filter((row) => row && row.personId && row.seatId)
    : [];
  return {
    ...fresh,
    ...raw,
    missionId: typeof raw.missionId === 'string' ? raw.missionId : missionId,
    phase: isLeaderPhase(raw.phase ?? '') ? raw.phase! : 'opening',
    placements,
    coachNote: typeof raw.coachNote === 'string' ? raw.coachNote : '',
    correctNote: typeof raw.correctNote === 'string' ? raw.correctNote : '',
    investPlan: typeof raw.investPlan === 'string' ? raw.investPlan : '',
    paidWhy: typeof raw.paidWhy === 'string' ? raw.paidWhy : '',
    paidPlan: typeof raw.paidPlan === 'string' ? raw.paidPlan : '',
    leftoverNote: typeof raw.leftoverNote === 'string' ? raw.leftoverNote : '',
    selfCoach: typeof raw.selfCoach === 'string' ? raw.selfCoach : '',
    protectWho: typeof raw.protectWho === 'string' ? raw.protectWho : 'imani',
  };
}
