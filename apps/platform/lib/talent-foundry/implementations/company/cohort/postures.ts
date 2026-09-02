import type { ThinkingMove } from '../types';

/**
 * Staff-only working postures. Derived from demonstrated moves.
 * Never a personality type. Never written onto a participant.
 */
export const POSTURE_IDS = [
  'navigator',
  'builder',
  'witness',
  'connector',
  'reframer',
  'cutter',
  'finisher',
  'asker',
  'helper',
  'solo',
  'critic',
  'drifter',
] as const;

export type PostureId = (typeof POSTURE_IDS)[number];

export type PostureDef = {
  id: PostureId;
  staffName: string;
  whatTheyDo: string;
  moves: Partial<Record<ThinkingMove, number>>;
  lifts: boolean;
  canHoldPlan: boolean;
  expandsThought: boolean;
};

export const POSTURES: PostureDef[] = [
  {
    id: 'navigator',
    staffName: 'Navigator',
    whatTheyDo: 'Writes a plan others can follow. Seeks the fence, decides, explains.',
    moves: { decide: 3, constraint_seek: 3, explain: 2, scope_cut: 2 },
    lifts: true,
    canHoldPlan: true,
    expandsThought: false,
  },
  {
    id: 'builder',
    staffName: 'Builder',
    whatTheyDo: 'Changes the object. Revises until it ships.',
    moves: { revise: 3, finish: 3, assertion: 2 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: false,
  },
  {
    id: 'witness',
    staffName: 'Witness',
    whatTheyDo: 'Sees what is actually there. Asks before asserting. Keeps the room honest.',
    moves: { notice: 3, attention: 2, question: 2, first_mark: 1 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: true,
  },
  {
    id: 'connector',
    staffName: 'Connector',
    whatTheyDo:
      'Makes the next person faster. Hands off clean. Helps without taking the work. Load-bearing for a founding three.',
    moves: { help: 3, handoff: 3 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: false,
  },
  {
    id: 'reframer',
    staffName: 'Reframer',
    whatTheyDo: 'Renames the problem. Opens a path the first plan missed.',
    moves: { reframe: 3, question: 2, notice: 1 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: true,
  },
  {
    id: 'cutter',
    staffName: 'Cutter',
    whatTheyDo: 'Reduces the problem so the hour can finish.',
    moves: { scope_cut: 3, decide: 2 },
    lifts: true,
    canHoldPlan: true,
    expandsThought: false,
  },
  {
    id: 'finisher',
    staffName: 'Finisher',
    whatTheyDo: 'Closes. Does not leave the bench mid-draft.',
    moves: { finish: 3, assertion: 2, decide: 1 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: false,
  },
  {
    id: 'asker',
    staffName: 'Asker',
    whatTheyDo: 'Finds the missing fact before the group commits.',
    moves: { question: 3, constraint_seek: 2 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: true,
  },
  {
    id: 'helper',
    staffName: 'Helper',
    whatTheyDo: 'Unblocks someone earlier on the path.',
    moves: { help: 3, handoff: 1 },
    lifts: true,
    canHoldPlan: false,
    expandsThought: false,
  },
  {
    id: 'solo',
    staffName: 'Solo',
    whatTheyDo: 'Ships alone. Does not look up. The group gets their output, not their lift.',
    moves: { assertion: 3, finish: 2, ignore: 2 },
    lifts: false,
    canHoldPlan: false,
    expandsThought: false,
  },
  {
    id: 'critic',
    staffName: 'Critic',
    whatTheyDo: 'Sees the flaw. May not stay to fix it.',
    moves: { notice: 2, question: 2, abandon: 2 },
    lifts: false,
    canHoldPlan: false,
    expandsThought: true,
  },
  {
    id: 'drifter',
    staffName: 'Drifter',
    whatTheyDo: 'Leaves, pauses, skips. A tape with almost no load-bearing moves.',
    moves: { abandon: 3, pause: 2, ignore: 2 },
    lifts: false,
    canHoldPlan: false,
    expandsThought: false,
  },
];

export const NEEDED_MOVES: ThinkingMove[] = [
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
];

export function postureById(id: PostureId): PostureDef {
  const found = POSTURES.find((p) => p.id === id);
  if (!found) throw new Error(`unknown posture: ${id}`);
  return found;
}
