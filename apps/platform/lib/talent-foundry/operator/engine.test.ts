import assert from 'node:assert/strict';
import { shiftMission } from '../campaigns/operator/shift';
import { createSession, migrateSessionState } from '../journey';
import { kellyCampaign } from '../campaigns/kelly';
import { deriveWorld } from './consequences';
import {
  applyOperatorPatch,
  canEnterLayer2,
  createOperatorRun,
  nextOperatorPhase,
  setAssignment,
} from './engine';
import { layer2Evidence } from './evidence';

function sessionWith(flags: Partial<ReturnType<typeof createSession>['flags']>) {
  const s = createSession(kellyCampaign);
  s.flags = { ...s.flags, ...flags };
  return s;
}

assert.equal(canEnterLayer2(sessionWith({ keyOne: false, layer2Enabled: true })), false, 'no key one');
assert.equal(canEnterLayer2(sessionWith({ keyOne: true, layer2Enabled: false })), false, 'flag off');
assert.equal(canEnterLayer2(sessionWith({ keyOne: true, layer2Enabled: true })), true, 'key one enters');

let run = createOperatorRun();
assert.equal(run.phase, 'entry');
run = applyOperatorPatch(run, { phase: nextOperatorPhase(run) });
assert.equal(run.phase, 'unlock');

run = applyOperatorPatch(run, { firstPriority: 'office', firstReasoning: 'coverage' });
assert.equal(run.firstPriority, 'office');

run = setAssignment(run, 'office', 'maya');
run = setAssignment(run, 'materials', 'jordan');
run = setAssignment(run, 'onboard', 'self');
run = setAssignment(run, 'social', 'eli');
assert.equal(run.assignments.length, 4);

run = applyOperatorPatch(run, { clarification: 'hold', organizerMessage: 'Confirming Kelly timing now. I will text you as soon as I have it.' });
run = applyOperatorPatch(run, { interruption: 'later' });
run = applyOperatorPatch(run, { peopleFirst: 'teach' });
run = applyOperatorPatch(run, { unknown: 'ai', usedAi: true });
assert.equal(nextOperatorPhase({ ...run, phase: 'unknown' }), 'ai_result');
run = applyOperatorPatch(run, { unknownAct: 'test' });
run = applyOperatorPatch(run, { critical: ['kelly_ready', 'materials_there', 'office_covered'] });
run = applyOperatorPatch(run, { handoffNote: 'Materials with Jordan. Organizer waiting on confirmed time. New volunteer is learning the table.' });
run = applyOperatorPatch(run, { reflectSelf: 'I would have checked Kelly timing first.', reflectTeam: 'Jordan already knew the venue.' });

const wave = deriveWorld(run, shiftMission, 'waveOne');
assert.ok(wave.outcomes.some((o) => o.id === 'materials_early'), 'jordan materials arrive');
assert.ok(wave.outcomes.some((o) => o.id === 'organizer_held'), 'organizer reassured');
assert.ok(wave.outcomes.some((o) => o.id === 'new_useful') || wave.outcomes.some((o) => o.id === 'new_taught'), 'onboarded');

const ignored = deriveWorld(
  applyOperatorPatch(createOperatorRun(), { unknown: 'ignore', unknownAct: 'ignore' }),
  shiftMission,
  'waveTwo',
);
assert.ok(ignored.outcomes.some((o) => o.id === 'qr_down'), 'ignored QR stays broken');

const hoard = deriveWorld(setAssignment(createOperatorRun(), 'office', null), shiftMission, 'waveOne');
assert.ok(hoard.outcomes.some((o) => o.id === 'office_open'), 'uncovered office');

const eliRisk = deriveWorld(
  applyOperatorPatch(setAssignment(createOperatorRun(), 'social', 'eli'), { clarification: 'guess' }),
  shiftMission,
  'waveOne',
);
assert.ok(eliRisk.outcomes.some((o) => o.id === 'social_risk'), 'unconfirmed social');

const evidence = layer2Evidence(run, true);
const labels = evidence.map((e) => e.label);
for (const required of [
  'Layer 2 started',
  'Initial priority',
  'Delegation assignments',
  'Clarification behavior',
  'Organizer communication',
  'Response to volunteer mistake',
  'Unknown-problem strategy',
  'Critical outcomes before Kelly leaves',
  'Shift handoff',
  'Self-reflection',
  'Team-credit response',
  'Layer 2 completed',
  'KEY 02 ACQUIRED',
]) {
  assert.ok(labels.includes(required), `evidence: ${required}`);
}

assert.equal(kellyCampaign.flags.layer2Enabled, true, 'layer 2 flag on');
assert.equal(migrateSessionState('layer2_operator'), 'layer2_operator', 'resume operator');
assert.equal(migrateSessionState('key_two'), 'key_two', 'resume key two');
assert.equal(migrateSessionState('layer3_leader'), 'layer3_leader', 'resume hook');

const incomplete = layer2Evidence(createOperatorRun(), false).map((e) => e.label);
assert.equal(incomplete.includes('KEY 02 ACQUIRED'), false, 'no key two before completion');

console.log('operator-engine: ok');
