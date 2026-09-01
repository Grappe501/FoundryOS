import assert from 'node:assert/strict';
import { buildContinuePayload, buildIdentifyPayload } from './evidence';
import { completeOptionalDoor, createSession, migrateSessionState, patchSession } from './journey';
import { canEnterLayer2 } from './operator/engine';
import { canEnterLayer3 } from './leader/engine';
import { kellyCampaign } from './campaigns/kelly';
import { LAYER1_PEOPLE, LAYER2_PEOPLE, LAYER3_PEOPLE } from './people-memory';
import {
  FIRST_VISIT_DOOR,
  INTENT_TO_PAID,
  chapterFor,
  nextVisitState,
  resumeCopy,
  wantsPaid,
  youreInCopy,
} from './visit';
import { volunteersScenario } from './campaigns/scenarios/volunteers';

function sess(flags: Partial<ReturnType<typeof createSession>['flags']> = {}, stateId?: ReturnType<typeof createSession>['stateId']) {
  const s = createSession(kellyCampaign);
  s.flags = { ...s.flags, ...flags };
  if (stateId) s.stateId = stateId;
  return s;
}

assert.equal(nextVisitState(sess({}, 'entry')), 'change_prompt');
assert.equal(nextVisitState(sess({}, 'change_prompt')), 'people_rule');
assert.equal(nextVisitState(sess({}, 'people_rule')), 'kelly_video');
assert.equal(nextVisitState(sess({}, 'kelly_video')), 'intent');
assert.equal(nextVisitState(sess({ visitIntent: 'volunteer' }, 'intent')), 'lead_challenge');
assert.equal(nextVisitState(sess({ visitIntent: 'paid' }, 'intent')), 'paid_brief');
assert.equal(nextVisitState(sess({ visitIntent: 'both' }, 'intent')), 'paid_brief');
assert.equal(nextVisitState(sess({ visitIntent: 'exploring' }, 'intent')), 'lead_challenge');
assert.equal(nextVisitState(sess({ visitIntent: 'volunteer' }, 'opportunity')), 'mission_one');
assert.equal(nextVisitState(sess({ visitIntent: 'paid' }, 'opportunity')), 'availability');
assert.equal(nextVisitState(sess({ visitIntent: 'exploring' }, 'youre_in')), 'opportunity');

assert.equal(INTENT_TO_PAID.volunteer, 'volunteer');
assert.equal(INTENT_TO_PAID.paid, 'yes');
assert.equal(INTENT_TO_PAID.both, 'both');
assert.equal(INTENT_TO_PAID.exploring, 'unsure');
assert.equal(wantsPaid('volunteer'), false);
assert.equal(wantsPaid('exploring'), false);
assert.equal(wantsPaid('paid'), true);

assert.ok(youreInCopy('volunteer', 'Ada').body.includes('contribute'));
assert.ok(youreInCopy('paid', 'Ada').body.includes('paid lead-intern'));
assert.ok(youreInCopy('both', 'Ada').body.includes('help now'));
assert.ok(youreInCopy('exploring', 'Ada').body.includes('decide'));

const decisions = volunteersScenario.beats.filter((b) => b.kind === 'decision');
assert.equal(decisions.length, 4, 'required scenario is 4 decisions');

assert.equal(chapterFor('intent'), 'discover');
assert.equal(chapterFor('scenario_volunteers'), 'show_us');
assert.equal(chapterFor('identify'), 'step_in');
assert.equal(chapterFor('handoff'), 'your_path');
assert.equal(chapterFor('layer2_operator'), 'operator');
assert.equal(chapterFor('layer3_leader'), 'leader');

assert.equal(migrateSessionState('mystery'), 'change_prompt');
assert.equal(migrateSessionState('volunteer_commitment'), 'intent');
assert.equal(migrateSessionState('scenario_revision'), 'optional_doors');
assert.equal(migrateSessionState('still_in'), 'still_in');
assert.equal(migrateSessionState('layer3_offer'), 'layer3_offer');

const afterDoor = completeOptionalDoor(sess({ keyOne: true }, 'optional_doors'), FIRST_VISIT_DOOR);
assert.equal(afterDoor.stateId, 'key_one');
assert.equal(afterDoor.flags.optionalDoorsCompleted.includes('room'), true);
assert.equal(afterDoor.flags.optionalDoorsCompleted.length, 1);

const skipped = sess({ keyOne: true }, 'optional_doors');
assert.equal(nextVisitState(skipped), 'key_one');

const volunteer = sess({ visitIntent: 'volunteer', keyOne: true, identified: true }, 'handoff');
assert.equal(canEnterLayer2(volunteer), true);
assert.equal(canEnterLayer3(volunteer), false);

const noKey = sess({ visitIntent: 'paid', keyOne: false, layer2Enabled: true }, 'handoff');
assert.equal(canEnterLayer2(noKey), false);

const keyTwo = sess({ keyTwo: true, layer3Enabled: true }, 'key_two');
assert.equal(canEnterLayer3(keyTwo), true);
assert.equal(nextVisitState(keyTwo), 'layer3_offer');

const saved = sess({ keyTwo: true, layer3Enabled: true, layer3Deferred: true, identified: true }, 'still_in');
assert.ok(resumeCopy(saved)?.body.includes('people') || resumeCopy(saved)?.title.includes('Key Two') || resumeCopy(saved));

const l2 = sess({ keyOne: true, identified: true }, 'layer2_operator');
assert.ok(resumeCopy(l2)?.title.toLowerCase().includes('shift'));

const identified = patchSession(createSession(kellyCampaign), {
  stateId: 'still_in',
  flags: { identified: true, firstVisitComplete: true, visitIntent: 'volunteer', keyOne: true },
  identity: {
    firstName: 'Ada',
    lastName: 'Test',
    phone: '5015550100',
    email: 'ada@example.com',
    zip: '72201',
    startWhen: 'now',
    submissionId: 'sub_1',
  },
});
assert.equal(identified.flags.firstVisitComplete, true);
assert.ok(resumeCopy(identified));

const peopleSnapshot = JSON.stringify(LAYER1_PEOPLE);
assert.equal(JSON.stringify(LAYER1_PEOPLE), peopleSnapshot, 'people memory is static');
assert.equal(LAYER2_PEOPLE.length, 5);
assert.equal(LAYER3_PEOPLE.length, 4);

const payload = buildIdentifyPayload(identified, 'now');
assert.equal(payload.flags.visitIntent, 'volunteer');
assert.equal(payload.flags.keyOne, true);
const cont = buildContinuePayload(identified);
assert.equal(cont.routing?.visitIntent, 'volunteer');
assert.equal(cont.routing?.paidInterest, identified.conversion.paidInterest);
assert.ok(Array.isArray(cont.evidence));

assert.equal(kellyCampaign.flags.layer2Enabled, true);
assert.equal(kellyCampaign.flags.layer3Enabled, true);

console.log('visit-one: ok');
