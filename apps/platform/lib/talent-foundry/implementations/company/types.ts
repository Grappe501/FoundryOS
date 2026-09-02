/**
 * Company Foundry (workshop) contracts.
 * Isolated from Campaign Foundry — do not import Kelly journey types.
 */

import type { SpineEnvelope } from './spine/envelope';

export const WORKSHOP_IMPLEMENTATION = 'company' as const;
export const WORKSHOP_SESSION_KEY = 'workshop.v1';
export const WORKSHOP_SESSION_VERSION = 1 as const;

export type WorkshopStateId =
  | 'door'
  | 'notice'
  | 'notice_ack'
  | 'mess'
  | 'mess_consequence'
  | 'named'
  | 'linger';

export type ThinkingMove =
  | 'first_mark'
  | 'attention'
  | 'notice'
  | 'reframe'
  | 'question'
  | 'assertion'
  | 'constraint_seek'
  | 'scope_cut'
  | 'ignore'
  | 'decide'
  | 'explain'
  | 'revise'
  | 'finish'
  | 'abandon'
  | 'return'
  | 'handoff'
  | 'help'
  | 'pause';

export type ThinkingEvent = {
  id: string;
  at: string;
  beatId: string;
  move: ThinkingMove;
  fact: unknown;
  regionId?: string;
  durationMs?: number;
};

export type WorkshopEvidenceType =
  | 'response'
  | 'decision'
  | 'consequence'
  | 'access_event'
  | 'thinking'
  | 'clock'
  | 'identity';

export type WorkshopEvidence = {
  id: string;
  at: string;
  stateId: WorkshopStateId;
  type: WorkshopEvidenceType;
  label: string;
  value: unknown;
};

export type WorkshopFlags = {
  entered: boolean;
  noticeStarted: boolean;
  noticeComplete: boolean;
  messComplete: boolean;
  named: boolean;
};

/** Silent beat timing. Facts only. Never a seriousness score. */
export type BeatClock = {
  beatId: string;
  openedAt: string;
  firstInputAt: string | null;
  submittedAt: string | null;
  /** opened → first input */
  hesitationMs: number | null;
  /** opened → submitted */
  lingerMs: number | null;
  /** submitted → they left the aftermath / ack */
  afterSubmitLingerMs: number | null;
};

export type RegionKind = 'surface' | 'buried' | 'conflict';

export type RegionDwell = {
  regionId: string;
  firstAt: string;
  lastAt: string;
  visits: number;
  dwellMs: number;
};

export type CoverageFact = {
  offered: string[];
  visited: string[];
  ignored: string[];
  visitedRatio: number;
  buriedVisited: string[];
  conflictVisited: string[];
  mentioned: string[];
  mentionedUnvisited: string[];
};

export type DoorLineId = 'line1' | 'line2' | 'line3' | 'enter';

export type DoorPacing = {
  line1At: string | null;
  line2At: string | null;
  line3At: string | null;
  enterAt: string | null;
};

export type WorkshopSession = {
  v: typeof WORKSHOP_SESSION_VERSION;
  implementation: typeof WORKSHOP_IMPLEMENTATION;
  sessionKey: typeof WORKSHOP_SESSION_KEY;
  stateId: WorkshopStateId;
  startedAt: string;
  noticeId: string;
  messId: string;
  evidence: WorkshopEvidence[];
  thinking: ThinkingEvent[];
  flags: WorkshopFlags;
  addressedRegionIds: string[];
  clocks: Record<string, BeatClock>;
  regionDwells: Record<string, RegionDwell>;
  doorPacing: DoorPacing;
  /** Uniform layer over all 14 spine stages. Ernie-zone UI does not render this. */
  envelope: SpineEnvelope;
};

export type NoticeRegion = {
  id: string;
  label: string;
  kind: RegionKind;
  /** Distinctive phrases used only to see if their writing mentioned this region. */
  cues: string[];
};

export type NoticeSeed = {
  id: string;
  title: string;
  body: string;
  regions: NoticeRegion[];
  prompts: { notice: string; change: string };
  surfaces: ThinkingMove[];
};

export type MessChoice = {
  id: string;
  label: string;
  moves: ThinkingMove[];
  consequence: string;
};

export type MessSeed = {
  id: string;
  title: string;
  facts: string[];
  choices: MessChoice[];
  surfaces: ThinkingMove[];
};
