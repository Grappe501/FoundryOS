import { COHORT_01 } from '../constants';
import type { ThinkingMove } from '../types';

/** Demonstrated cohort functions. Staff labels on a cohort record — never a person's identity. */
export type FoundingFunction = 'navigator' | 'builder' | 'connector';
export type ExpansionFunction = 'witness' | 'reframer';
export type CohortFunction = FoundingFunction | ExpansionFunction;

export type HumanFunctionDecision = {
  actor: string;
  at: string;
  kind: 'cohort_function_assignment';
  note?: string;
};

export type FilledCohortFunction = {
  functionId: CohortFunction;
  /** Staff reference to a person. Does not write a type onto them. */
  personRef: string;
  evidence: ThinkingMove[];
  decision: HumanFunctionDecision;
  assignedAt: string;
  note?: string;
};

export type ExpansionObservation = {
  personRef: string;
  functions: ExpansionFunction[];
  evidence: ThinkingMove[];
  retainedAt: string;
  note: string;
  decision: {
    actor: string;
    at: string;
    kind: 'expansion_observation';
    note?: string;
  };
};

/** Evidence belongs to the person. A function assignment belongs to the cohort. */
export type PersonTape = {
  personRef: string;
  evidence: ThinkingMove[];
};

export type CohortCompositionState = {
  cohortId: string;
  targetSize: 3 | 5;
  filled: FilledCohortFunction[];
  open: FoundingFunction[];
  expansionReserve: ExpansionFunction[];
  expansionHeld: ExpansionObservation[];
  people: PersonTape[];
  foundingComplete: boolean;
  humanInviteStillRequired: true;
  assignsSeats: false;
  selectsPeople: false;
};

const FOUNDING: readonly FoundingFunction[] = ['navigator', 'builder', 'connector'];

export const FUNCTION_CAPABILITY = {
  navigator: 'planning',
  builder: 'shipping',
  connector: 'collaboration',
  witness: 'noticing',
  reframer: 'reframing',
} as const;

export const EXPANSION_EVIDENCE: Record<ExpansionFunction, readonly ThinkingMove[]> = {
  witness: ['notice', 'question', 'attention'],
  reframer: ['reframe', 'question'],
};

export const EXPANSION_NOTE =
  'Demonstrated evidence may be relevant if Cohort 01 expands to five.';

export function emptyComposition(
  cohortId = COHORT_01.id,
  targetSize: 3 | 5 = 3,
): CohortCompositionState {
  return {
    cohortId,
    targetSize,
    filled: [],
    open: [...FOUNDING],
    expansionReserve: ['witness', 'reframer'],
    expansionHeld: [],
    people: [],
    foundingComplete: false,
    humanInviteStillRequired: true,
    assignsSeats: false,
    selectsPeople: false,
  };
}

export function approvedPersonRefs(state: CohortCompositionState): string[] {
  return [...new Set(state.filled.map((f) => f.personRef))];
}

export function filledFunctions(state: CohortCompositionState): CohortFunction[] {
  return state.filled.map((f) => f.functionId);
}

export function openFunctions(state: CohortCompositionState): FoundingFunction[] {
  return [...state.open];
}

export function evidenceForPerson(state: CohortCompositionState, personRef: string): ThinkingMove[] {
  return state.people.find((p) => p.personRef === personRef)?.evidence ?? [];
}

function withPersonEvidence(
  people: PersonTape[],
  personRef: string,
  evidence: ThinkingMove[],
): PersonTape[] {
  const prior = people.find((p) => p.personRef === personRef)?.evidence ?? [];
  const next = [...prior];
  for (const move of evidence) {
    if (!next.includes(move)) next.push(move);
  }
  return [...people.filter((p) => p.personRef !== personRef), { personRef, evidence: next }];
}

export function assignFunction(
  state: CohortCompositionState,
  input: {
    functionId: CohortFunction;
    personRef: string;
    evidence: ThinkingMove[];
    decision: HumanFunctionDecision;
    note?: string;
  },
): CohortCompositionState {
  if (!input.decision?.actor?.trim() || !input.decision.at) {
    throw new Error('human_decision_required');
  }
  if (input.decision.kind !== 'cohort_function_assignment') {
    throw new Error('human_decision_required');
  }
  if (state.filled.some((f) => f.functionId === input.functionId)) {
    throw new Error('function_already_filled');
  }
  const isFounding = FOUNDING.includes(input.functionId as FoundingFunction);
  const isExpansion = input.functionId === 'witness' || input.functionId === 'reframer';
  if (isFounding && !state.open.includes(input.functionId as FoundingFunction)) {
    throw new Error('function_not_open');
  }
  if (isExpansion && state.targetSize < 5) {
    throw new Error('expansion_not_open');
  }

  const filled: FilledCohortFunction[] = [
    ...state.filled,
    {
      functionId: input.functionId,
      personRef: input.personRef,
      evidence: [...input.evidence],
      decision: input.decision,
      assignedAt: input.decision.at,
      note: input.note,
    },
  ];
  const open = state.open.filter((id) => id !== input.functionId);
  const expansionReserve = state.expansionReserve.filter((id) => id !== input.functionId);
  const foundingComplete = FOUNDING.every((id) => filled.some((f) => f.functionId === id));

  return {
    ...state,
    filled,
    open,
    expansionReserve,
    people: withPersonEvidence(state.people, input.personRef, input.evidence),
    foundingComplete,
    humanInviteStillRequired: true,
    assignsSeats: false,
    selectsPeople: false,
  };
}

export function retainExpansionEvidence(
  state: CohortCompositionState,
  input: {
    personRef: string;
    functions: ExpansionFunction[];
    evidence: ThinkingMove[];
    decision: { actor: string; at: string; note?: string };
    note?: string;
  },
): CohortCompositionState {
  if (!input.decision?.actor?.trim() || !input.decision.at) {
    throw new Error('human_decision_required');
  }
  const functions = input.functions.filter((id) => id === 'witness' || id === 'reframer');
  if (functions.length === 0) throw new Error('expansion_function_required');
  const allowed = functions.flatMap((id) => EXPANSION_EVIDENCE[id]);
  const evidence = input.evidence.filter((m) => allowed.includes(m));

  const observation: ExpansionObservation = {
    personRef: input.personRef,
    functions,
    evidence,
    retainedAt: input.decision.at,
    note: input.note ?? EXPANSION_NOTE,
    decision: {
      actor: input.decision.actor,
      at: input.decision.at,
      kind: 'expansion_observation',
      note: input.decision.note,
    },
  };

  return {
    ...state,
    people: withPersonEvidence(state.people, input.personRef, evidence),
    expansionHeld: [...state.expansionHeld, observation],
    humanInviteStillRequired: true,
    assignsSeats: false,
    selectsPeople: false,
  };
}

export function describeVacancies(state: CohortCompositionState): {
  approved: string[];
  filled: { functionId: CohortFunction; personRef: string }[];
  open: FoundingFunction[];
  foundingComplete: boolean;
  expansionHeld: number;
  note: string;
} {
  const note = state.foundingComplete
    ? 'Founding composition complete.'
    : state.open.length === 3
      ? 'Navigator, Builder, and Connector remain open.'
      : `${state.open.map(staffName).join(', ')} remain open.`;
  return {
    approved: approvedPersonRefs(state),
    filled: state.filled.map((f) => ({ functionId: f.functionId, personRef: f.personRef })),
    open: [...state.open],
    foundingComplete: state.foundingComplete,
    expansionHeld: state.expansionHeld.length,
    note,
  };
}

function staffName(id: FoundingFunction): string {
  if (id === 'navigator') return 'Navigator';
  if (id === 'builder') return 'Builder';
  return 'Connector';
}
