import type { ThinkingMove } from '../types';
import type { PostureMix } from './lift';
import { POSTURE_IDS, POSTURES, type PostureId } from './postures';
import { FUNCTION_CAPABILITY, type CohortCompositionState, type FoundingFunction } from './vacancy';

/** Locked after the 1000-sim pass. Plan + make + glue. Connector is load-bearing. */
export const STARTER_THREE: readonly PostureId[] = ['navigator', 'builder', 'connector'];

/** Locked after the 1000-sim pass. See clearly, then open a second path. */
export const EXPAND_TWO: readonly PostureId[] = ['witness', 'reframer'];

export const CONNECTOR_NOTE =
  'The Connector is not an optional soft-skill seat. Help and handoff convert individual output into an organization.';

export type CapabilityId = 'planning' | 'shipping' | 'collaboration' | 'noticing' | 'reframing';

export type CapabilityNeed = {
  capability: CapabilityId;
  kind: 'missing' | 'thin' | 'covered' | 'overrepresented';
  moves: ThinkingMove[];
  loadBearing: boolean;
  note: string;
};

export type CompositionGaps = {
  needs: CapabilityNeed[];
  notes: string[];
  humanInviteStillRequired: true;
  assignsSeats: false;
  selectsPeople: false;
  foundingComplete?: boolean;
  openFunctions?: FoundingFunction[];
};

export type CohortSeat = {
  seat: 'start' | 'expand';
  postureId: PostureId;
  staffName: string;
  why: string;
  loadBearing: boolean;
};

export type CohortComposition = {
  start: CohortSeat[];
  expand: CohortSeat[];
  coveredMoves: ThinkingMove[];
  followOnePlan: boolean;
  connectorLoadBearing: true;
  connectorNote: typeof CONNECTOR_NOTE;
  humanInviteStillRequired: true;
  assignsSeats: false;
  selectsPeople: false;
};

const CAPABILITIES: {
  id: CapabilityId;
  moves: ThinkingMove[];
  loadBearing: boolean;
  missing: string;
  thin: string;
  covered: string;
}[] = [
  {
    id: 'planning',
    moves: ['decide', 'constraint_seek', 'explain', 'scope_cut'],
    loadBearing: true,
    missing: 'Cohort 01 still needs demonstrated evidence of planning — a followable plan, a fence, a decision.',
    thin: 'Planning evidence is thin. The room still needs a plan others can follow.',
    covered: 'Planning evidence is present.',
  },
  {
    id: 'shipping',
    moves: ['revise', 'finish'],
    loadBearing: true,
    missing: 'Cohort 01 still needs demonstrated evidence of shipping — they change the object and finish.',
    thin: 'Shipping evidence is thin. Revise and finish are scarce.',
    covered: 'Shipping evidence is present.',
  },
  {
    id: 'collaboration',
    moves: ['help', 'handoff'],
    loadBearing: true,
    missing: 'Cohort 01 still needs demonstrated evidence of clean handoff/help.',
    thin: 'Collaboration evidence is thin. Help and handoff are what begin an organization.',
    covered: 'Collaboration evidence is present.',
  },
  {
    id: 'noticing',
    moves: ['notice', 'question', 'attention'],
    loadBearing: false,
    missing: 'Adding someone whose tape contains notice/question behavior would broaden this group.',
    thin: 'Notice and question behavior is thin. The room may miss what is actually on the bench.',
    covered: 'Notice and question evidence is present.',
  },
  {
    id: 'reframing',
    moves: ['reframe', 'question'],
    loadBearing: false,
    missing: 'Adding someone whose tape contains reframe behavior would open a path the first plan missed.',
    thin: 'Reframe evidence is thin. The first plan may stay the only plan.',
    covered: 'Reframe evidence is present.',
  },
];

export function compositionLock(): CohortComposition {
  const start = STARTER_THREE.map((id) => seat('start', id));
  const expand = EXPAND_TWO.map((id) => seat('expand', id));
  return {
    start,
    expand,
    coveredMoves: [
      'notice',
      'question',
      'constraint_seek',
      'decide',
      'scope_cut',
      'revise',
      'finish',
      'help',
      'handoff',
      'reframe',
      'explain',
    ],
    followOnePlan: true,
    connectorLoadBearing: true,
    connectorNote: CONNECTOR_NOTE,
    humanInviteStillRequired: true,
    assignsSeats: false,
    selectsPeople: false,
  };
}

function seat(kind: 'start' | 'expand', id: PostureId): CohortSeat {
  const def = POSTURES.find((p) => p.id === id)!;
  return {
    seat: kind,
    postureId: id,
    staffName: def.staffName,
    why: def.whatTheyDo,
    loadBearing: id === 'connector',
  };
}

export function mixFromMoves(moves: ThinkingMove[]): PostureMix {
  const counts: PostureMix = {};
  for (const id of POSTURE_IDS) counts[id] = 0;
  if (moves.length === 0) return counts;
  for (const def of POSTURES) {
    let w = 0;
    for (const [move, n] of Object.entries(def.moves)) {
      const hits = moves.filter((m) => m === move).length;
      w += hits * n;
    }
    counts[def.id] = w;
  }
  const sum = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0) || 1;
  for (const id of POSTURE_IDS) counts[id] = (counts[id] ?? 0) / sum;
  return counts;
}

/**
 * Production composition helper. Describes missing and thin demonstrated
 * evidence in an already-invited group. Does not name, rank, or assign people.
 */
export function compositionGaps(
  invitedTapes: readonly ThinkingMove[][],
  options?: { composition?: CohortCompositionState },
): CompositionGaps {
  const composition = options?.composition;
  if (composition?.foundingComplete) {
    return {
      needs: [],
      notes: ['Founding composition complete.'],
      humanInviteStillRequired: true,
      assignsSeats: false,
      selectsPeople: false,
      foundingComplete: true,
      openFunctions: [],
    };
  }

  const openCaps = composition
    ? new Set(composition.open.map((id) => FUNCTION_CAPABILITY[id]))
    : null;
  const catalog = openCaps ? CAPABILITIES.filter((cap) => openCaps.has(cap.id)) : CAPABILITIES;
  const needs = catalog.map((cap) => describeCapability(invitedTapes, cap));
  return {
    needs,
    notes: synthesizeNotes(needs, Boolean(openCaps)),
    humanInviteStillRequired: true,
    assignsSeats: false,
    selectsPeople: false,
    foundingComplete: false,
    openFunctions: composition ? [...composition.open] : undefined,
  };
}

function describeCapability(
  invitedTapes: readonly ThinkingMove[][],
  cap: (typeof CAPABILITIES)[number],
): CapabilityNeed {
  const hits = invitedTapes.reduce((n, tape) => n + tape.filter((m) => cap.moves.includes(m)).length, 0);
  const tapesWith = invitedTapes.filter((tape) => tape.some((m) => cap.moves.includes(m))).length;
  const kind = kindFor(hits, tapesWith, invitedTapes.length);
  const note =
    kind === 'covered' || kind === 'overrepresented'
      ? cap.covered
      : kind === 'thin'
        ? cap.thin
        : cap.missing;
  return {
    capability: cap.id,
    kind,
    moves: [...cap.moves],
    loadBearing: cap.loadBearing,
    note,
  };
}

function kindFor(hits: number, tapesWith: number, invited: number): CapabilityNeed['kind'] {
  if (hits === 0) return 'missing';
  if (invited >= 2 && tapesWith === invited && hits >= invited * 2) return 'overrepresented';
  if (hits < 2) return 'thin';
  return 'covered';
}

function synthesizeNotes(needs: CapabilityNeed[], openingsOnly = false): string[] {
  const byId = Object.fromEntries(needs.map((n) => [n.capability, n])) as Partial<Record<CapabilityId, CapabilityNeed>>;
  const notes: string[] = [];
  const plan = byId.planning;
  const ship = byId.shipping;
  const collab = byId.collaboration;
  const notice = byId.noticing;
  const reframe = byId.reframing;

  const present = (n?: CapabilityNeed) =>
    n && (n.kind === 'covered' || n.kind === 'overrepresented' || n.kind === 'thin');
  const strong = (n?: CapabilityNeed) => n && (n.kind === 'covered' || n.kind === 'overrepresented');

  if (plan && ship && collab && strong(plan) && strong(ship) && (collab.kind === 'missing' || collab.kind === 'thin')) {
    notes.push('Current invited group strongly covers planning and shipping; collaboration evidence is thin.');
    notes.push(CONNECTOR_NOTE);
  } else if (collab && (collab.kind === 'missing' || collab.kind === 'thin')) {
    notes.push(collab.note);
    notes.push(CONNECTOR_NOTE);
  }

  if (plan && !present(plan)) notes.push(plan.note);
  if (ship && !present(ship)) notes.push(ship.note);

  if (!openingsOnly) {
    if (notice && (notice.kind === 'missing' || notice.kind === 'thin')) notes.push(notice.note);
    else if (reframe && (reframe.kind === 'missing' || reframe.kind === 'thin')) notes.push(reframe.note);
  }

  return notes;
}
