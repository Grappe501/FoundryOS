import assert from 'node:assert/strict';
import {
  advanceWorkshop,
  createWorkshopSession,
  linger,
  markNoticeRegion,
  nextWorkshopState,
  revealName,
  submitMess,
  submitNotice,
} from '../journey';
import { recordHumanGate, tryAdvanceSpine, tryEnterStage } from './kernel';
import { ERNIE_ZONE_NEXT, ERNIE_ZONE_STATES, SPINE_STAGES, SPINE_STAGE_IDS, stageDef } from './stages';

assert.equal(SPINE_STAGE_IDS.length, 14);
assert.equal(SPINE_STAGES.filter((s) => s.owner === 'ernie').length, 3);
assert.equal(SPINE_STAGES.filter((s) => s.fill === 'stub').length, 3);
assert.equal(stageDef('build').advance, 'human_gate');
assert.equal(stageDef('earn').advance, 'human_gate');
assert.equal(stageDef('own').advance, 'human_gate');

for (const state of ERNIE_ZONE_STATES) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state], `ernie zone frozen: ${state}`);
}

const t0 = new Date('2026-09-02T04:00:00.000Z');
let s = createWorkshopSession(t0);
assert.equal(s.envelope.spineStage, 'discover');
assert.equal(s.envelope.progress.discover, 'open');
assert.equal(s.envelope.progress.make, 'locked');
assert.equal(s.envelope.remember, null);
assert.equal(s.envelope.cohortId, null);

assert.equal(tryEnterStage(s, 'notice').reason, 'ernie_zone');
assert.equal(tryEnterStage(s, 'make').reason, 'locked');
assert.equal(tryAdvanceSpine(s).reason, 'ernie_zone', 'next live stage is still Ernie NOTICE');

s = advanceWorkshop(s, new Date('2026-09-02T04:00:10.000Z'));
assert.equal(s.envelope.progress.discover, 'complete');
assert.equal(s.envelope.progress.notice, 'open');

s = markNoticeRegion(s, 'primary', new Date('2026-09-02T04:00:12.000Z'));
s = submitNotice(s, { notice: 'Delete is the primary.', change: 'Start, do not destroy.' }, new Date('2026-09-02T04:00:20.000Z'));
s = advanceWorkshop(s, new Date('2026-09-02T04:00:22.000Z'));
s = submitMess(s, 'split', new Date('2026-09-02T04:00:40.000Z'));
s = revealName(s, new Date('2026-09-02T04:00:45.000Z'));
s = linger(s, new Date('2026-09-02T04:00:50.000Z'));

assert.equal(s.stateId, 'linger');
assert.equal(s.envelope.spineStage, 'solve');
assert.equal(s.envelope.progress.solve, 'complete');
assert.equal(s.envelope.progress.make, 'open');

const pastLinger = tryAdvanceSpine(s);
assert.equal(pastLinger.ok, true);
if (!pastLinger.ok) throw new Error('expected make');
assert.equal(pastLinger.session.envelope.spineStage, 'make');
assert.equal(pastLinger.session.stateId, 'linger');

const gated = recordHumanGate(s, {
  kind: 'paid_project',
  at: '2026-09-02T04:01:00.000Z',
  actor: 'ernie',
});
assert.equal(tryEnterStage(gated, 'earn').reason, 'stub');
assert.equal(gated.envelope.gates.length, 1);
assert.equal(s.stateId, 'linger', 'human gate does not move Ernie-zone state');
