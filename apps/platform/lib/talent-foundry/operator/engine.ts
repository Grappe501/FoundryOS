import { shiftMission } from '../campaigns/operator/shift';
import type { JourneyStateId, TalentFoundrySession } from '../types';
import type {
  OperatorMissionDef,
  OperatorPersistAt,
  OperatorPhase,
  OperatorRunState,
} from './types';

export const OPERATOR_PHASES: OperatorPhase[] = [
  'entry',
  'unlock',
  'opening',
  'picture',
  'delegation',
  'clarification',
  'communication',
  'wave_one',
  'interruption',
  'people_first',
  'unknown',
  'ai_result',
  'unknown_act',
  'wave_two',
  'prioritize',
  'handoff',
  'finale',
  'reflect_self',
  'reflect_team',
];

const PHASE_SET = new Set<string>(OPERATOR_PHASES);

export function createOperatorRun(missionId = shiftMission.id): OperatorRunState {
  return {
    missionId,
    phase: 'entry',
    firstPriority: null,
    firstReasoning: '',
    assignments: [],
    clarification: null,
    organizerMessage: '',
    interruption: null,
    peopleFirst: null,
    unknown: null,
    unknownAct: null,
    usedAi: false,
    critical: [],
    handoffNote: '',
    reflectSelf: '',
    reflectTeam: '',
    persistAt: 'none',
  };
}

export function isOperatorPhase(value: string): value is OperatorPhase {
  return PHASE_SET.has(value);
}

export function canEnterLayer2(session: TalentFoundrySession): boolean {
  return Boolean(session.flags.keyOne && session.flags.layer2Enabled);
}

export function nextOperatorPhase(run: OperatorRunState): OperatorPhase {
  if (run.phase === 'unknown' && run.unknown === 'ai') return 'ai_result';
  if (run.phase === 'unknown') return 'unknown_act';
  if (run.phase === 'ai_result') return 'unknown_act';
  const i = OPERATOR_PHASES.indexOf(run.phase);
  return OPERATOR_PHASES[Math.min(i + 1, OPERATOR_PHASES.length - 1)] ?? run.phase;
}

export function persistCheckpoint(phase: OperatorPhase): OperatorPersistAt {
  if (phase === 'opening' || phase === 'picture') return 'start';
  if (phase === 'wave_one' || phase === 'interruption') return 'mid';
  if (phase === 'reflect_team' || phase === 'finale') return 'complete';
  return 'none';
}

export function applyOperatorPatch(
  run: OperatorRunState,
  patch: Partial<OperatorRunState>,
): OperatorRunState {
  const next: OperatorRunState = { ...run, ...patch, assignments: patch.assignments ?? run.assignments };
  if (patch.unknown === 'ai' || (patch.unknown === undefined && run.unknown === 'ai')) {
    next.usedAi = true;
  }
  if (patch.phase) {
    const mark = persistCheckpoint(patch.phase);
    if (mark === 'start' && run.persistAt === 'none') next.persistAt = 'start';
    if (mark === 'mid' && run.persistAt !== 'complete') next.persistAt = 'mid';
    if (mark === 'complete') next.persistAt = 'complete';
  }
  return next;
}

export function setAssignment(
  run: OperatorRunState,
  needId: string,
  actorId: string | null,
): OperatorRunState {
  const rest = run.assignments.filter((a) => a.needId !== needId);
  return {
    ...run,
    assignments: actorId ? [...rest, { needId, actorId }] : rest,
  };
}

export function assignedTo(run: OperatorRunState, needId: string): string | undefined {
  return run.assignments.find((a) => a.needId === needId)?.actorId;
}

export function assignmentsFor(run: OperatorRunState, actorId: string): string[] {
  return run.assignments.filter((a) => a.actorId === actorId).map((a) => a.needId);
}

export function unusedPeople(run: OperatorRunState, mission: OperatorMissionDef = shiftMission): string[] {
  return mission.people
    .filter((p) => !p.isSelf)
    .filter((p) => !run.assignments.some((a) => a.actorId === p.id))
    .map((p) => p.id);
}

export function selfLoad(run: OperatorRunState): number {
  return assignmentsFor(run, 'self').length;
}

export function missionComplete(run: OperatorRunState): boolean {
  return run.phase === 'reflect_team' && Boolean(run.reflectTeam.trim() || run.reflectSelf.trim() || run.handoffNote);
}

export type Layer2PublicSurface = 'operator' | 'key_two' | 'layer3_hook' | 'people_rule_close' | 'none';

/** One screen per post-Layer-2 state. The hook must not also own the close. */
export function layer2PublicSurface(stateId: JourneyStateId | string): Layer2PublicSurface {
  if (stateId === 'layer2_operator') return 'operator';
  if (stateId === 'key_two') return 'key_two';
  if (stateId === 'layer3_leader') return 'layer3_hook';
  if (stateId === 'people_rule_close') return 'people_rule_close';
  return 'none';
}

export function afterKeyTwo(): JourneyStateId {
  return 'layer3_leader';
}

export function afterLayer3Hook(): JourneyStateId {
  return 'people_rule_close';
}

export function layer3HookRendersOn(stateId: JourneyStateId | string, layer3Enabled = false): boolean {
  if (layer3Enabled) return false;
  return layer2PublicSurface(stateId) === 'layer3_hook';
}

export function normalizeOperatorRun(value: unknown, missionId = shiftMission.id): OperatorRunState {
  const fresh = createOperatorRun(missionId);
  if (!value || typeof value !== 'object') return fresh;
  const raw = value as Partial<OperatorRunState>;
  return {
    ...fresh,
    ...raw,
    missionId: typeof raw.missionId === 'string' ? raw.missionId : missionId,
    phase: isOperatorPhase(raw.phase ?? '') ? raw.phase! : 'entry',
    assignments: Array.isArray(raw.assignments) ? raw.assignments.filter((a) => a && a.needId && a.actorId) : [],
    critical: Array.isArray(raw.critical) ? raw.critical.filter((id) => typeof id === 'string') : [],
    firstReasoning: typeof raw.firstReasoning === 'string' ? raw.firstReasoning : '',
    organizerMessage: typeof raw.organizerMessage === 'string' ? raw.organizerMessage : '',
    handoffNote: typeof raw.handoffNote === 'string' ? raw.handoffNote : '',
    reflectSelf: typeof raw.reflectSelf === 'string' ? raw.reflectSelf : '',
    reflectTeam: typeof raw.reflectTeam === 'string' ? raw.reflectTeam : '',
    usedAi: Boolean(raw.usedAi || raw.unknown === 'ai'),
  };
}
