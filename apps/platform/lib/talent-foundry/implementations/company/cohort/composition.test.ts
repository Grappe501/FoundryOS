import assert from 'node:assert/strict';
import { FORBIDDEN_INFERENCE_KEYS } from '../constants';
import { compositionLock, EXPAND_TWO, mixFromMoves, recommendSeats, STARTER_THREE } from './compose';
import { runCohortSimulations } from './simulate';

const sim = runCohortSimulations(1000, 20261115);

assert.equal(sim.runs, 1000);
assert.equal(sim.personalities, 1000);
assert.ok(sim.composed3Mean > sim.random3Mean);
assert.ok(sim.composed5Mean > sim.random5Mean);
assert.ok(sim.lift3 > 0.15);

assert.deepEqual(sim.starterOrder.slice(0, 3), ['navigator', 'builder', 'connector']);
assert.deepEqual([...STARTER_THREE], ['navigator', 'builder', 'connector']);
assert.deepEqual([...EXPAND_TWO], ['witness', 'reframer']);
assert.ok(sim.expandWins.witness >= sim.expandWins.critic);
assert.ok(sim.expandWins.reframer >= sim.expandWins.drifter);

const lock = compositionLock();
assert.equal(lock.humanInviteStillRequired, true);
assert.equal(lock.followOnePlan, true);
assert.equal(lock.start.length, 3);
assert.equal(lock.expand.length, 2);
assert.equal(/score|trait|fit|rank|personality|grit|serious/i.test(JSON.stringify(lock)), false);
for (const key of FORBIDDEN_INFERENCE_KEYS) {
  assert.equal(key in lock, false);
}

const tapes = [
  { id: 'a', mix: mixFromMoves(['decide', 'constraint_seek', 'explain', 'scope_cut']) },
  { id: 'b', mix: mixFromMoves(['revise', 'finish', 'assertion', 'revise']) },
  { id: 'c', mix: mixFromMoves(['help', 'handoff', 'help']) },
  { id: 'd', mix: mixFromMoves(['notice', 'question', 'attention']) },
  { id: 'e', mix: mixFromMoves(['reframe', 'question', 'reframe']) },
  { id: 'f', mix: mixFromMoves(['abandon', 'ignore', 'pause']) },
];
const rec = recommendSeats(tapes);
assert.equal(rec.start.includes('f'), false);
assert.ok(rec.note.includes('Human invite'));
assert.equal(rec.start.length, 3);
assert.equal(rec.expand.length, 2);
