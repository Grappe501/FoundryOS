import assert from 'node:assert/strict';
import { createSession } from '../journey';
import { kellyCampaign } from '../campaigns/kelly';
import { resumeLinkCopy } from './copy';
import { buildResumeSnapshot, resumeLandingState } from './snapshot';
import { generateResumeToken, hashResumeToken, isResumeTokenShape } from './token';

const a = generateResumeToken();
const b = generateResumeToken();
assert.notEqual(a, b);
assert.equal(isResumeTokenShape(a), true);
assert.equal(isResumeTokenShape('abc'), false);
assert.equal(isResumeTokenShape('user_123'), false);
assert.equal(hashResumeToken(a).length, 64);
assert.notEqual(hashResumeToken(a), a);
assert.equal(hashResumeToken(a), hashResumeToken(a));

function sess(stateId: ReturnType<typeof createSession>['stateId'], flags: Partial<ReturnType<typeof createSession>['flags']> = {}) {
  const s = createSession(kellyCampaign);
  s.stateId = stateId;
  s.flags = { ...s.flags, identified: true, ...flags };
  s.identity = {
    firstName: 'Ada',
    lastName: 'Test',
    phone: '5015550100',
    email: 'ada@example.com',
    zip: '72201',
    startWhen: 'now',
    submissionId: 'sub_1',
  };
  s.flags.keyOne = flags.keyOne ?? true;
  return s;
}

const terminal = sess('visit_complete', { firstVisitComplete: true, keyOne: true });
assert.equal(resumeLandingState(terminal), 'visit_complete');
assert.equal(buildResumeSnapshot(terminal).identity?.submissionId, 'sub_1');
assert.equal(resumeLinkCopy(terminal).body.includes('Key One'), true);

const savedL2 = sess('visit_complete', { firstVisitComplete: true, keyOne: true, layer2Deferred: true });
assert.equal(resumeLandingState(savedL2), 'layer2_offer');
assert.notEqual(resumeLandingState(savedL2), 'layer2_operator');
assert.equal(resumeLinkCopy(buildResumeSnapshot(savedL2)).body.includes('Key One'), true);

const midShift = sess('layer2_operator', { keyOne: true });
assert.equal(resumeLandingState(midShift), 'layer2_operator');
assert.equal(resumeLinkCopy(midShift).body.includes('shift'), true);

const savedL3 = sess('visit_complete', { keyOne: true, keyTwo: true, layer3Deferred: true, layer3Enabled: true });
assert.equal(resumeLandingState(savedL3), 'layer3_offer');
assert.notEqual(resumeLandingState(savedL3), 'layer3_leader');
assert.equal(resumeLinkCopy(buildResumeSnapshot(savedL3)).body.includes('Key Two'), true);

const midLeader = sess('layer3_leader', { keyOne: true, keyTwo: true, layer3Enabled: true });
assert.equal(resumeLandingState(midLeader), 'layer3_leader');
assert.equal(resumeLinkCopy(midLeader).body.includes('people'), true);

assert.throws(() => buildResumeSnapshot(createSession(kellyCampaign)));

console.log('resume: ok');
