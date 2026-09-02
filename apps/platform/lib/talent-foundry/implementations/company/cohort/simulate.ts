/** Research only. Draws posture mixes and compares composed vs random rooms. Not a hiring pipeline. */
import { teamLift, type PostureMix, dominantPosture } from './lift';
import { POSTURE_IDS, type PostureId } from './postures';

export type SimSummary = {
  runs: number;
  postureMixes: number;
  poolSize: number;
  composed3Mean: number;
  random3Mean: number;
  composed5Mean: number;
  random5Mean: number;
  lift3: number;
  lift5: number;
  starterWins: Record<PostureId, number>;
  expandWins: Record<PostureId, number>;
  starterOrder: PostureId[];
  expandOrder: PostureId[];
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function emptyCounts(): Record<PostureId, number> {
  const out = {} as Record<PostureId, number>;
  for (const id of POSTURE_IDS) out[id] = 0;
  return out;
}

/** One of 1000 possible working-posture mixes. Research only. Not a personality. */
export function drawPostureMix(rand: () => number): PostureMix {
  const mix: PostureMix = {};
  for (const id of POSTURE_IDS) mix[id] = 0;
  const n = 2 + Math.floor(rand() * 3);
  const chosen: PostureId[] = [];
  while (chosen.length < n) {
    const id = POSTURE_IDS[Math.floor(rand() * POSTURE_IDS.length)]!;
    if (!chosen.includes(id)) chosen.push(id);
  }
  let sum = 0;
  const raw = chosen.map(() => 0.15 + rand());
  for (const r of raw) sum += r;
  chosen.forEach((id, i) => {
    mix[id] = raw[i]! / sum;
  });
  return mix;
}

function pickRandom<T>(items: T[], n: number, rand: () => number): T[] {
  const copy = [...items];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]!);
  }
  return out;
}

/** Research greedy search. Not a production seat assigner. */
function greedyCompose(pool: PostureMix[], n: number, already: PostureMix[] = []): PostureMix[] {
  const unused = pool.filter((p) => !already.includes(p));
  const picked: PostureMix[] = [...already];
  while (picked.length < n && unused.length) {
    let bestI = 0;
    let best = -1;
    for (let i = 0; i < unused.length; i++) {
      const v = teamLift([...picked, unused[i]!]).combined;
      if (v > best) {
        best = v;
        bestI = i;
      }
    }
    picked.push(unused.splice(bestI, 1)[0]!);
  }
  return picked;
}

export function runCohortSimulations(runs = 1000, seed = 20261115): SimSummary {
  const rand = rng(seed);
  const people: PostureMix[] = Array.from({ length: 1000 }, () => drawPostureMix(rand));
  const starterWins = emptyCounts();
  const expandWins = emptyCounts();
  let composed3 = 0;
  let random3 = 0;
  let composed5 = 0;
  let random5 = 0;
  const poolSize = 18;

  for (let i = 0; i < runs; i++) {
    const pool = pickRandom(people, poolSize, rand);
    const team3 = greedyCompose(pool, 3);
    const team5 = greedyCompose(pool, 5, team3);
    const extra = team5.slice(3);
    const r3 = pickRandom(pool, 3, rand);
    const r5 = pickRandom(pool, 5, rand);
    composed3 += teamLift(team3).combined;
    random3 += teamLift(r3).combined;
    composed5 += teamLift(team5).combined;
    random5 += teamLift(r5).combined;
    for (const m of team3) starterWins[dominantPosture(m)] += 1;
    for (const m of extra) expandWins[dominantPosture(m)] += 1;
  }

  const order = (counts: Record<PostureId, number>) =>
    [...POSTURE_IDS].sort((a, b) => counts[b] - counts[a]);

  return {
    runs,
    postureMixes: 1000,
    poolSize,
    composed3Mean: round4(composed3 / runs),
    random3Mean: round4(random3 / runs),
    composed5Mean: round4(composed5 / runs),
    random5Mean: round4(random5 / runs),
    lift3: round4(composed3 / runs - random3 / runs),
    lift5: round4(composed5 / runs - random5 / runs),
    starterWins,
    expandWins,
    starterOrder: order(starterWins),
    expandOrder: order(expandWins),
  };
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
