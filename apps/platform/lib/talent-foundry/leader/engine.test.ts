import assert from 'node:assert/strict';
import { leaderMission } from '../campaigns/leader/people';
import { kellyCampaign } from '../campaigns/kelly';
import { createSession, migrateSessionState } from '../journey';
import { afterKeyTwo, afterLayer3Hook, layer2PublicSurface, layer3HookRendersOn } from '../operator/engine';
import {
  afterLayer3,
  allPlaced,
  applyLeaderPatch,
  canAdvanceLeader,
  canEnterLayer3,
  createLeaderRun,
  nextLeaderPhase,
  setPlacement,
} from './engine';
import { layer3Evidence } from './evidence';

function sessionWith(flags: Partial<ReturnType<typeof createSession>['flags']>) {
  const s = createSession(kellyCampaign);
  s.flags = { ...s.flags, ...flags };
  return s;
}

assert.equal(canEnterLayer3(sessionWith({ keyTwo: false, layer3Enabled: true })), false, 'no key two');
assert.equal(canEnterLayer3(sessionWith({ keyTwo: true, layer3Enabled: false })), false, 'flag off');
assert.equal(canEnterLayer3(sessionWith({ keyTwo: true, layer3Enabled: true })), true, 'key two enters');

let run = createLeaderRun();
assert.equal(run.phase, 'opening');
assert.equal(canAdvanceLeader(run), true, 'opening advances');
run = applyLeaderPatch(run, { phase: nextLeaderPhase(run) });
assert.equal(run.phase, 'roster');

run = applyLeaderPatch(run, { phase: 'place' });
assert.equal(allPlaced(run), false, 'unplaced');
assert.equal(canAdvanceLeader(run), false, 'place requires all four');
for (const person of leaderMission.people) {
  run = setPlacement(run, person.id, person.id === 'cam' ? 'hq' : person.id === 'imani' ? 'campus' : 'remote');
}
assert.equal(allPlaced(run), true, 'all placed');
assert.equal(canAdvanceLeader(run), true, 'placed advances');

run = applyLeaderPatch(run, { phase: 'coach', coachWho: 'noelle', coachHow: 'ask', coachNote: 'Ask what she already finished this week.' });
assert.equal(canAdvanceLeader(run), true, 'coach ready');

run = applyLeaderPatch(run, { phase: 'correct', correctAct: 'they_fix', correctNote: 'Cam writes the correction and the check they skipped.' });
assert.equal(canAdvanceLeader(run), true, 'correct ready');

run = applyLeaderPatch(run, { phase: 'protect', protectHow: 'smaller' });
assert.equal(canAdvanceLeader(run), true, 'protect ready');

run = applyLeaderPatch(run, {
  phase: 'invest',
  investWho: 'wes',
  investHow: 'weekly',
  investPlan: 'Weekly coaching and one stretch list that is actually his.',
});
assert.equal(canAdvanceLeader(run), true, 'invest ready');

run = applyLeaderPatch(run, { phase: 'paid_need', paidNeed: 'statewide' });
assert.equal(canAdvanceLeader(run), true, 'need chosen');
assert.equal(canAdvanceLeader(applyLeaderPatch(run, { phase: 'paid_who', paidWho: 'noelle', paidWhy: 'short' })), false, 'thin why blocked');

run = applyLeaderPatch(run, {
  phase: 'paid_who',
  paidWho: 'noelle',
  paidWhy: 'The campaign needs someone who already grows people where they live, and a plan to make her visible without making her loud.',
});
assert.equal(canAdvanceLeader(run), true, 'paid plan ready');

run = applyLeaderPatch(run, { phase: 'leftover', leftoverNote: 'Cam still has a path. Imani has a campus seat that is hers. Wes gets the stretch.' });
assert.equal(canAdvanceLeader(run), true, 'leftover ready');

run = applyLeaderPatch(run, { phase: 'mirror' });
run = applyLeaderPatch(run, { phase: 'self', selfCoach: 'I still skip the quiet person when the room gets loud.' });
assert.equal(canAdvanceLeader(run), true, 'self ready');

const evidence = layer3Evidence(run, true);
const labels = evidence.map((e) => e.label);
for (const required of [
  'Layer 3 started',
  'People placements',
  'First coaching decision',
  'Correction of overstep',
  'Protection without shrinking',
  'Development investment',
  'Paid-role work needed',
  'Paid-role recommendation',
  'Plan for people not chosen',
  'Self-coaching',
  'Layer 3 completed',
]) {
  assert.ok(labels.includes(required), `evidence: ${required}`);
}

assert.equal(kellyCampaign.flags.layer3Enabled, true, 'layer 3 flag on');
assert.equal(afterKeyTwo(), 'layer3_leader', 'key two → layer 3');
assert.equal(afterLayer3(), 'people_rule_close', 'layer 3 → people rule close');
assert.equal(layer3HookRendersOn('layer3_leader', true), false, 'hook does not render when Layer 3 is live');
assert.equal(layer2PublicSurface('people_rule_close'), 'people_rule_close', 'close is not the hook');
assert.notEqual(afterLayer3(), 'layer3_leader', 'complete does not loop the leader');
assert.deepEqual(
  ['key_two', afterKeyTwo(), afterLayer3()],
  ['key_two', 'layer3_leader', 'people_rule_close'],
  'Key Two → Layer 3 → people_rule_close',
);
assert.equal(migrateSessionState('layer3_leader'), 'layer3_leader', 'refresh recovers leader');
assert.equal(migrateSessionState('people_rule_close'), 'people_rule_close', 'refresh recovers close');
assert.equal(layer3HookRendersOn(migrateSessionState('people_rule_close'), true), false, 'recovered close is not the hook');
assert.equal(afterLayer3Hook(), 'people_rule_close', 'disabled-flag hook still exits to close');

const incomplete = layer3Evidence(createLeaderRun(), false).map((e) => e.label);
assert.equal(incomplete.includes('Layer 3 completed'), false, 'no complete before self-coach');

console.log('leader-engine: ok');
