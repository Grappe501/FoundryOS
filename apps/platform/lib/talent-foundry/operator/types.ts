import type { EvidenceDimension } from '../types';

export type OperatorPhase =
  | 'entry'
  | 'unlock'
  | 'opening'
  | 'picture'
  | 'delegation'
  | 'clarification'
  | 'communication'
  | 'wave_one'
  | 'interruption'
  | 'people_first'
  | 'unknown'
  | 'ai_result'
  | 'unknown_act'
  | 'wave_two'
  | 'prioritize'
  | 'handoff'
  | 'finale'
  | 'reflect_self'
  | 'reflect_team';

export type OperatorPersistAt = 'none' | 'start' | 'mid' | 'complete';

export type ActorId = string;
export type NeedId = string;

export type OperatorPerson = {
  id: ActorId;
  name: string;
  facts: string[];
  hasVehicle?: boolean;
  availableUntil?: string;
  arrivesLateMinutes?: number;
  firstShift?: boolean;
  isNew?: boolean;
  isSelf?: boolean;
};

export type OperatorNeed = {
  id: NeedId;
  label: string;
  bucket: 'now' | 'people' | 'event' | 'campaign';
};

export type OperatorChoice = {
  id: string;
  label: string;
};

export type OperatorAssignment = {
  needId: NeedId;
  actorId: ActorId;
};

export type OperatorFact = {
  id: string;
  text: string;
};

export type OperatorOutcome = {
  id: string;
  text: string;
};

export type OperatorWorld = {
  clock: string;
  outcomes: OperatorOutcome[];
  board: Array<{
    needId: NeedId;
    status: 'open' | 'assigned' | 'done' | 'risk' | 'missed';
    note: string;
  }>;
  people: Array<{
    actorId: ActorId;
    status: 'available' | 'placed' | 'late' | 'left' | 'stretched';
    note: string;
  }>;
};

export type OperatorRunState = {
  missionId: string;
  phase: OperatorPhase;
  firstPriority: string | null;
  firstReasoning: string;
  assignments: OperatorAssignment[];
  clarification: string | null;
  organizerMessage: string;
  interruption: string | null;
  peopleFirst: string | null;
  unknown: string | null;
  unknownAct: string | null;
  usedAi: boolean;
  critical: string[];
  handoffNote: string;
  reflectSelf: string;
  reflectTeam: string;
  persistAt: OperatorPersistAt;
};

export type OperatorMissionDef = {
  id: string;
  internalTitle: string;
  clocks: {
    open: string;
    waveOne: string;
    waveTwo: string;
    finale: string;
  };
  place: string;
  openingLines: string[];
  facts: OperatorFact[];
  people: OperatorPerson[];
  needs: OperatorNeed[];
  firstPriorities: OperatorChoice[];
  clarificationPrompt: string;
  clarificationChoices: OperatorChoice[];
  communicationPrompt: string;
  interruptionPrompt: string;
  interruptionChoices: OperatorChoice[];
  peopleFirstPrompt: string;
  peopleFirstChoices: OperatorChoice[];
  unknownPrompt: string;
  unknownChoices: OperatorChoice[];
  unknownActChoices: OperatorChoice[];
  aiReply: string;
  criticalPrompt: string;
  criticalChoices: OperatorChoice[];
  criticalLimit: number;
  handoffPrompt: string;
  reflectSelfPrompt: string;
  reflectTeamPrompt: string;
};

export type OperatorEvidenceSeed = {
  label: string;
  value: unknown;
  dimensions?: EvidenceDimension[];
  kind?: 'choice' | 'decision' | 'text' | 'revision' | 'mission';
};
