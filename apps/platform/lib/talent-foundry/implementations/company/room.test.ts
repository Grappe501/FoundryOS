import assert from 'node:assert/strict';
import {
  advanceWorkshop,
  createWorkshopSession,
  linger,
  markNoticeRegion,
  revealName,
  submitMess,
  submitNotice,
} from './journey';
import { openMake } from './make/engine';
import { roomDepth, workshopDepth } from './room';
import { objectLife } from './traces';

assert.equal(roomDepth('door'), 'void');
assert.equal(roomDepth('notice'), 'object');
assert.equal(roomDepth('notice_ack'), 'object');
assert.equal(roomDepth('mess'), 'aftermath');
assert.equal(roomDepth('named'), 'named');
assert.equal(roomDepth('linger'), 'linger');

let s = createWorkshopSession(new Date('2026-09-02T05:00:00.000Z'));
s = advanceWorkshop(s, new Date('2026-09-02T05:00:08.000Z'));
s = markNoticeRegion(s, 'primary', new Date('2026-09-02T05:00:10.000Z'));
s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T05:00:16.000Z'));
s = advanceWorkshop(s, new Date('2026-09-02T05:00:18.000Z'));
s = submitMess(s, 'split', new Date('2026-09-02T05:00:30.000Z'));
s = revealName(s, new Date('2026-09-02T05:00:34.000Z'));
s = linger(s, new Date('2026-09-02T05:00:40.000Z'));
assert.equal(workshopDepth(s), 'linger');
const opened = openMake(s, new Date('2026-09-02T05:01:00.000Z'));
assert.equal(opened.ok, true);
if (opened.ok) assert.equal(workshopDepth(opened.session), 'make');

assert.equal(objectLife({}), 'found');
assert.equal(objectLife({ reachable: true }), 'touched');
assert.equal(objectLife({ reachable: true, opened: true }), 'opened');
assert.equal(objectLife({ opened: true, changed: true }), 'changed');
assert.equal(objectLife({ changed: true, persisted: true }), 'persisted');
