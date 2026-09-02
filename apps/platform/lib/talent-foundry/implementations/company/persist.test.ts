import assert from 'node:assert/strict';
import { createWorkshopSession } from './journey';
import { WORKSHOP_IMPLEMENTATION, WORKSHOP_SESSION_KEY } from './types';

const s = createWorkshopSession(new Date('2026-09-02T03:00:00.000Z'));
assert.equal(s.sessionKey, WORKSHOP_SESSION_KEY);
assert.equal(s.implementation, WORKSHOP_IMPLEMENTATION);
assert.notEqual(s.sessionKey, 'tf.kelly.v1');
assert.equal(JSON.stringify(s).includes('reddirt'), false);
assert.equal(JSON.stringify(s).includes('kelly'), false);
