import assert from 'node:assert/strict';
import { roomDepth } from './room';

assert.equal(roomDepth('door'), 'void');
assert.equal(roomDepth('notice'), 'object');
assert.equal(roomDepth('notice_ack'), 'object');
assert.equal(roomDepth('mess'), 'aftermath');
assert.equal(roomDepth('named'), 'named');
assert.equal(roomDepth('linger'), 'linger');
