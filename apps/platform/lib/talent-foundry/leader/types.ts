import type { EvidenceDimension } from '../types';

export type LeaderPhase =
  | 'opening'
  | 'roster'
  | 'place'
  | 'coach'
  | 'correct'
  | 'protect'
  | 'invest'
  | 'paid_need'
  | 'paid_who'
  | 'leftover'
  | 'mirror'
  | 'self';

export type LeaderPersistAt = 'none' | 'start' | 'mid' | 'complete';

export type LeaderPersonId = string;
export type LeaderSeatId = string;

export type LeaderPerson = {
  id: LeaderPersonId;
  name: string;
  from: string;
  pattern: string;
  facts: string[];
};

export type LeaderSeat = {
  id: LeaderSeatId;
  label: string;
  hint: string;
};

export type LeaderChoice = {
  id: string;
  label: string;
};

export type LeaderPlacement = {
  personId: LeaderPersonId;
  seatId: LeaderSeatId;
};

export type LeaderRunState = {
  missionId: string;
  phase: LeaderPhase;
  placements: LeaderPlacement[];
  coachWho: string | null;
  coachHow: string | null;
  coachNote: string;
  correctAct: string | null;
  correctNote: string;
  protectWho: string | null;
  protectHow: string | null;
  investWho: string | null;
  investHow: string | null;
  investPlan: string;
  paidNeed: string | null;
  paidWho: string | null;
  paidWhy: string;
  paidPlan: string;
  leftoverNote: string;
  selfCoach: string;
  persistAt: LeaderPersistAt;
};

export type LeaderMissionDef = {
  id: string;
  internalTitle: string;
  people: LeaderPerson[];
  seats: LeaderSeat[];
  coachHow: LeaderChoice[];
  correctChoices: LeaderChoice[];
  protectHow: LeaderChoice[];
  investHow: LeaderChoice[];
  paidNeeds: LeaderChoice[];
};

export type LeaderEvidenceSeed = {
  label: string;
  value: unknown;
  dimensions?: EvidenceDimension[];
  kind?: 'choice' | 'decision' | 'text' | 'revision' | 'mission';
};
