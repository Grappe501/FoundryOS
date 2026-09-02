/**
 * Master spine — all 14 stages exist now.
 * Ernie owns the live Phase 1 fill (discover → notice → solve).
 * Later stages are stubs with the same beat envelope.
 */

export const SPINE_STAGE_IDS = [
  'discover',
  'notice',
  'solve',
  'make',
  'remember',
  'return',
  'collaborate',
  'respond',
  'deliver',
  'multiply',
  'lead',
  'build',
  'earn',
  'own',
] as const;

export type SpineStageId = (typeof SPINE_STAGE_IDS)[number];

export type StageFill = 'live' | 'stub';
export type StageOwner = 'ernie' | 'spine';
export type StageAdvance = 'participant' | 'human_gate';
export type StageIdentity = 'anonymous' | 'optional' | 'remembered' | 'remembered_plus_gate';

export type SpineStageDef = {
  id: SpineStageId;
  n: number;
  name: string;
  buildPhase: 1 | 2 | 3 | 4 | 5 | 7;
  owner: StageOwner;
  fill: StageFill;
  identity: StageIdentity;
  advance: StageAdvance;
};

export const SPINE_STAGES: SpineStageDef[] = [
  { id: 'discover', n: 1, name: 'DISCOVER', buildPhase: 1, owner: 'ernie', fill: 'live', identity: 'anonymous', advance: 'participant' },
  { id: 'notice', n: 2, name: 'NOTICE', buildPhase: 1, owner: 'ernie', fill: 'live', identity: 'anonymous', advance: 'participant' },
  { id: 'solve', n: 3, name: 'SOLVE', buildPhase: 1, owner: 'ernie', fill: 'live', identity: 'anonymous', advance: 'participant' },
  { id: 'make', n: 4, name: 'MAKE', buildPhase: 2, owner: 'spine', fill: 'live', identity: 'anonymous', advance: 'participant' },
  { id: 'remember', n: 5, name: 'REMEMBER', buildPhase: 2, owner: 'spine', fill: 'live', identity: 'optional', advance: 'participant' },
  { id: 'return', n: 6, name: 'RETURN', buildPhase: 3, owner: 'spine', fill: 'live', identity: 'optional', advance: 'participant' },
  { id: 'collaborate', n: 7, name: 'COLLABORATE', buildPhase: 4, owner: 'spine', fill: 'stub', identity: 'remembered', advance: 'participant' },
  { id: 'respond', n: 8, name: 'RESPOND', buildPhase: 3, owner: 'spine', fill: 'stub', identity: 'remembered', advance: 'participant' },
  { id: 'deliver', n: 9, name: 'DELIVER', buildPhase: 3, owner: 'spine', fill: 'stub', identity: 'remembered', advance: 'participant' },
  { id: 'multiply', n: 10, name: 'MULTIPLY', buildPhase: 4, owner: 'spine', fill: 'stub', identity: 'remembered', advance: 'participant' },
  { id: 'lead', n: 11, name: 'LEAD', buildPhase: 4, owner: 'spine', fill: 'stub', identity: 'remembered', advance: 'participant' },
  { id: 'build', n: 12, name: 'BUILD', buildPhase: 5, owner: 'spine', fill: 'stub', identity: 'remembered_plus_gate', advance: 'human_gate' },
  { id: 'earn', n: 13, name: 'EARN', buildPhase: 5, owner: 'spine', fill: 'stub', identity: 'remembered_plus_gate', advance: 'human_gate' },
  { id: 'own', n: 14, name: 'OWN', buildPhase: 7, owner: 'spine', fill: 'stub', identity: 'remembered_plus_gate', advance: 'human_gate' },
];

/** Phase 1 workshop states — do not add Company stages here. Ernie's UI zone. */
export const ERNIE_ZONE_STATES = [
  'door',
  'notice',
  'notice_ack',
  'mess',
  'mess_consequence',
  'named',
  'linger',
] as const;

export const ERNIE_ZONE_NEXT: Record<(typeof ERNIE_ZONE_STATES)[number], (typeof ERNIE_ZONE_STATES)[number] | null> = {
  door: 'notice',
  notice: 'notice_ack',
  notice_ack: 'mess',
  mess: 'mess_consequence',
  mess_consequence: 'named',
  named: 'linger',
  linger: null,
};

export function stageDef(id: SpineStageId): SpineStageDef {
  const found = SPINE_STAGES.find((s) => s.id === id);
  if (!found) throw new Error(`unknown spine stage: ${id}`);
  return found;
}

export function nextSpineStage(id: SpineStageId): SpineStageId | null {
  const i = SPINE_STAGES.findIndex((s) => s.id === id);
  return SPINE_STAGES[i + 1]?.id ?? null;
}

export function workshopStateToStage(
  stateId: (typeof ERNIE_ZONE_STATES)[number],
): SpineStageId {
  if (stateId === 'door') return 'discover';
  if (stateId === 'notice' || stateId === 'notice_ack') return 'notice';
  return 'solve';
}
