import type { ThinkingMove } from '../types';
import { NEEDED_MOVES, POSTURES, type PostureId, postureById } from './postures';

export type PostureMix = Partial<Record<PostureId, number>>;

export type TeamLift = {
  coverage: number;
  planFollow: number;
  lift: number;
  ship: number;
  thought: number;
  combined: number;
};

function mixMoves(mix: PostureMix): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [id, weight] of Object.entries(mix)) {
    if (!weight) continue;
    const def = postureById(id as PostureId);
    for (const [move, n] of Object.entries(def.moves)) {
      out[move] = (out[move] ?? 0) + n * weight;
    }
  }
  return out;
}

function strength(moves: Record<string, number>, keys: ThinkingMove[]): number {
  let t = 0;
  for (const k of keys) t += moves[k] ?? 0;
  return t;
}

export function teamMoves(members: PostureMix[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const mix of members) {
    const m = mixMoves(mix);
    for (const [k, v] of Object.entries(m)) out[k] = Math.max(out[k] ?? 0, v);
  }
  return out;
}

export function teamLift(members: PostureMix[]): TeamLift {
  if (members.length === 0) {
    return { coverage: 0, planFollow: 0, lift: 0, ship: 0, thought: 0, combined: 0 };
  }
  const covered = teamMoves(members);
  const coverage = NEEDED_MOVES.filter((m) => (covered[m] ?? 0) >= 1).length / NEEDED_MOVES.length;

  const planStrengths = members.map((mix) => {
    const m = mixMoves(mix);
    return strength(m, ['decide', 'constraint_seek', 'explain', 'scope_cut']);
  });
  const sorted = [...planStrengths].sort((a, b) => b - a);
  const leader = sorted[0] ?? 0;
  const rival = sorted[1] ?? 0;
  const conflict = leader > 0 ? Math.min(1, rival / (leader + 0.001)) : 1;
  const followers = members.filter((_, i) => planStrengths[i] < leader - 0.4 || planStrengths[i] !== leader);
  const followCapacity =
    followers.length === 0
      ? 0
      : followers.reduce((acc, mix) => {
          const m = mixMoves(mix);
          return acc + strength(m, ['help', 'handoff', 'revise', 'notice']);
        }, 0) / followers.length;
  const planFollow = Math.max(0, Math.min(1, (leader / 8) * (1 - conflict * 0.55) * (0.35 + followCapacity / 10)));

  const lift =
    members.reduce((acc, mix) => {
      const defLift = Object.entries(mix).reduce((s, [id, w]) => {
        const def = POSTURES.find((p) => p.id === id);
        return s + (def?.lifts ? w ?? 0 : 0);
      }, 0);
      const m = mixMoves(mix);
      return acc + defLift + strength(m, ['help', 'handoff']) / 6;
    }, 0) / members.length;

  const ship =
    members.reduce((acc, mix) => {
      const m = mixMoves(mix);
      return acc + strength(m, ['finish', 'revise']) - strength(m, ['abandon', 'ignore']);
    }, 0) /
    members.length /
    6;

  const thought =
    members.reduce((acc, mix) => {
      const m = mixMoves(mix);
      return acc + strength(m, ['reframe', 'question', 'notice']);
    }, 0) /
    members.length /
    6;

  const combined = Math.max(
    0,
    coverage * 0.28 + planFollow * 0.24 + Math.max(0, lift) * 0.2 + Math.max(0, ship) * 0.16 + Math.max(0, thought) * 0.12,
  );

  return {
    coverage: round4(coverage),
    planFollow: round4(planFollow),
    lift: round4(lift),
    ship: round4(ship),
    thought: round4(thought),
    combined: round4(combined),
  };
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

export function dominantPosture(mix: PostureMix): PostureId {
  let best: PostureId = 'drifter';
  let max = -1;
  for (const [id, w] of Object.entries(mix)) {
    if ((w ?? 0) > max) {
      max = w ?? 0;
      best = id as PostureId;
    }
  }
  return best;
}
