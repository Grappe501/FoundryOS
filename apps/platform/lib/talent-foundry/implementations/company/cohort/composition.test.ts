import assert from 'node:assert/strict';
import { FORBIDDEN_INFERENCE_KEYS } from '../constants';
import {
  CONNECTOR_NOTE,
  compositionGaps,
  compositionLock,
  EXPAND_TWO,
  STARTER_THREE,
} from './compose';
import { runCohortSimulations } from './simulate';

const sim = runCohortSimulations(1000, 20261115);

assert.equal(sim.runs, 1000);
assert.equal(sim.postureMixes, 1000);
assert.equal('personalities' in sim, false);
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
assert.equal(lock.assignsSeats, false);
assert.equal(lock.selectsPeople, false);
assert.equal(lock.followOnePlan, true);
assert.equal(lock.connectorLoadBearing, true);
assert.equal(lock.connectorNote, CONNECTOR_NOTE);
assert.equal(lock.start.length, 3);
assert.equal(lock.expand.length, 2);
assert.equal(lock.start.find((s) => s.postureId === 'connector')?.loadBearing, true);
assert.equal(/score|trait|fit|rank|personality|grit|serious/i.test(JSON.stringify(lock)), false);
for (const key of FORBIDDEN_INFERENCE_KEYS) {
  assert.equal(key in lock, false);
}

const empty = compositionGaps([]);
assert.equal(empty.assignsSeats, false);
assert.equal(empty.selectsPeople, false);
assert.equal(empty.humanInviteStillRequired, true);
assert.equal(empty.needs.find((n) => n.capability === 'collaboration')?.kind, 'missing');
assert.equal(empty.needs.find((n) => n.capability === 'collaboration')?.loadBearing, true);
assert.ok(empty.notes.some((n) => n.includes('handoff/help')));
assert.ok(empty.notes.includes(CONNECTOR_NOTE));
assert.equal('start' in empty, false);
assert.equal('expand' in empty, false);
assert.equal(JSON.stringify(empty).includes('"id"'), false);

const planAndShip = compositionGaps([
  ['decide', 'constraint_seek', 'explain', 'scope_cut'],
  ['revise', 'finish', 'assertion', 'revise'],
]);
const collab = planAndShip.needs.find((n) => n.capability === 'collaboration');
assert.ok(collab?.kind === 'missing' || collab?.kind === 'thin');
assert.ok(
  planAndShip.notes.some((n) =>
    n.includes('planning and shipping') && n.includes('collaboration evidence is thin'),
  ),
);
assert.ok(planAndShip.notes.includes(CONNECTOR_NOTE));
assert.equal(/invite [A-Z]/i.test(JSON.stringify(planAndShip)), false);

const founding = compositionGaps([
  ['decide', 'constraint_seek', 'explain', 'scope_cut'],
  ['revise', 'finish', 'assertion', 'revise'],
  ['help', 'handoff', 'help'],
]);
assert.equal(founding.needs.find((n) => n.capability === 'planning')?.kind, 'covered');
assert.equal(founding.needs.find((n) => n.capability === 'shipping')?.kind, 'covered');
assert.equal(founding.needs.find((n) => n.capability === 'collaboration')?.kind, 'covered');
assert.ok(founding.notes.some((n) => n.includes('notice/question')));
assert.equal(founding.notes.includes(CONNECTOR_NOTE), false);

const dump = JSON.stringify({ lock, empty, planAndShip, founding, sim });
assert.equal(/personality|personalities/i.test(dump), false);
assert.equal(/invite steve|invite maya|invite carlos/i.test(dump), false);
assert.equal(dump.includes('"recommendSeats"'), false);
for (const key of FORBIDDEN_INFERENCE_KEYS) {
  assert.equal(key in empty, false);
  assert.equal(key in planAndShip, false);
}
