import assert from 'node:assert/strict';
import { createWorkshopSession, submitMess, submitNotice, markNoticeRegion, advanceWorkshop } from './journey';
import { draftTrace, messChoiceId, pulsePresence, draftPresence, attendedRegionIds } from './traces';

assert.equal(pulsePresence('door'), 'absent');
assert.equal(pulsePresence('notice'), 'focus');
assert.equal(pulsePresence('mess'), 'ghost');
assert.equal(pulsePresence('linger'), 'ghost');
assert.equal(draftPresence('notice'), 'absent');
assert.equal(draftPresence('mess'), 'focus');
assert.equal(draftPresence('linger'), 'ghost');

let s = createWorkshopSession(new Date('2026-09-02T09:00:00.000Z'));
s = advanceWorkshop(s, new Date('2026-09-02T09:00:08.000Z'));
s = markNoticeRegion(s, 'primary', new Date('2026-09-02T09:00:10.000Z'));
assert.deepEqual(attendedRegionIds(s), ['primary']);
s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T09:00:16.000Z'));
s = advanceWorkshop(s, new Date('2026-09-02T09:00:18.000Z'));
s = submitMess(s, 'continue', new Date('2026-09-02T09:00:30.000Z'));
assert.equal(messChoiceId(s), 'continue');
assert.equal(draftTrace(s), 'gone');

assert.equal(/score|trait|fit|serious/i.test(JSON.stringify({ draftTrace: draftTrace(s) })), false);
