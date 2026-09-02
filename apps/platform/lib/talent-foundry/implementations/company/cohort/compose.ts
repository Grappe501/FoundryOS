import type { ThinkingMove } from '../types';
import { teamLift, type PostureMix, dominantPosture } from './lift';
import { POSTURE_IDS, POSTURES, type PostureId } from './postures';

/** Locked after the 1000-sim pass. Plan + make + glue. */
export const STARTER_THREE: readonly PostureId[] = ['navigator', 'builder', 'connector'];

/** Locked after the 1000-sim pass. See clearly, then open a second path. */
export const EXPAND_TWO: readonly PostureId[] = ['witness', 'reframer'];

export type CohortSeat = {
  seat: 'start' | 'expand';
  postureId: PostureId;
  staffName: string;
  why: string;
};

export type CohortComposition = {
  start: CohortSeat[];
  expand: CohortSeat[];
  coveredMoves: ThinkingMove[];
  followOnePlan: boolean;
  humanInviteStillRequired: true;
};

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
    humanInviteStillRequired: true,
  };
}

function seat(kind: 'start' | 'expand', id: PostureId): CohortSeat {
  const def = POSTURES.find((p) => p.id === id)!;
  return {
    seat: kind,
    postureId: id,
    staffName: def.staffName,
    why: def.whatTheyDo,
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

export function recommendSeats(candidates: { id: string; mix: PostureMix }[]): {
  start: string[];
  expand: string[];
  note: string;
} {
  const start = pickBest(candidates, 3, STARTER_THREE);
  const remain = candidates.filter((c) => !start.includes(c.id));
  const expand = pickBest(remain, 2, EXPAND_TWO);
  return {
    start,
    expand,
    note: 'Human invite still required. This organizes complementary tapes. It does not choose people.',
  };
}

function pickBest(pool: { id: string; mix: PostureMix }[], n: number, prefer: readonly PostureId[]): string[] {
  if (pool.length === 0 || n <= 0) return [];
  const picked: { id: string; mix: PostureMix }[] = [];
  const unused = [...pool];
  while (picked.length < n && unused.length) {
    let bestI = 0;
    let best = -1;
    for (let i = 0; i < unused.length; i++) {
      const trial = [...picked, unused[i]!];
      const lift = teamLift(trial.map((t) => t.mix)).combined;
      const preferBonus = prefer.includes(dominantPosture(unused[i]!.mix)) ? 0.04 : 0;
      const v = lift + preferBonus;
      if (v > best) {
        best = v;
        bestI = i;
      }
    }
    picked.push(unused.splice(bestI, 1)[0]!);
  }
  return picked.map((p) => p.id);
}
