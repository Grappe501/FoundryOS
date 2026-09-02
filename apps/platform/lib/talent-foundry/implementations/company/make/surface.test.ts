import assert from 'node:assert/strict';
import {
  advanceWorkshop,
  createWorkshopSession,
  linger,
  markNoticeRegion,
  revealName,
  submitMess,
  submitNotice,
} from '../journey';
import { chooseMakeTrack, openMake, submitMake } from './engine';
import { MAKE_COPY } from './copy';
import { composeBuildBody, makeEligible, makeSurface, objectForTrack, trackLure, tracksOn } from './surface';

assert.equal(/tuesday|november|salary|oscar|academy|kelly|module|course|onboarding/i.test(JSON.stringify(MAKE_COPY)), false);
assert.equal(MAKE_COPY.methodArrived, 'You made something.');
assert.ok(MAKE_COPY.methodTurn.includes('how we make things here'));

function throughLinger() {
  let s = createWorkshopSession(new Date('2026-09-02T05:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T05:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T05:00:10.000Z'));
  s = submitNotice(s, { notice: 'Delete is primary.', change: 'Start.' }, new Date('2026-09-02T05:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T05:00:18.000Z'));
  s = submitMess(s, 'split', new Date('2026-09-02T05:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T05:00:34.000Z'));
  return linger(s, new Date('2026-09-02T05:00:40.000Z'));
}

const door = createWorkshopSession();
assert.equal(makeSurface(door), 'rest');
assert.equal(makeEligible(door), false);

const rested = throughLinger();
assert.equal(rested.stateId, 'linger');
assert.equal(makeSurface(rested), 'rest');
assert.equal(makeEligible(rested), true);

const opened = openMake(rested, new Date('2026-09-02T05:01:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('make');
assert.equal(opened.session.stateId, 'linger');
assert.equal(makeSurface(opened.session), 'need');
assert.equal(makeEligible(opened.session), false);

const chosen = chooseMakeTrack(opened.session, 'build', new Date('2026-09-02T05:01:05.000Z'));
assert.equal(makeSurface(chosen), 'attempt');
assert.ok(trackLure('build').includes('Delete'));
assert.deepEqual([...tracksOn('pulse')], ['build', 'design']);
assert.equal(tracksOn('draft').includes('operate'), true);
assert.equal(tracksOn('pulse').includes('operate'), false);
assert.equal(objectForTrack('build'), 'pulse');
assert.equal(objectForTrack('operate'), 'draft');
assert.equal(composeBuildBody('Start', 'Opens an empty bench.'), 'Start\nOpens an empty bench.');

const made = submitMake(
  chosen,
  { body: 'Primary says Start. It opens an empty bench.', finished: true },
  new Date('2026-09-02T05:02:10.000Z'),
);
assert.equal(made.stateId, 'linger');
assert.equal(makeSurface(made), 'equipped');
assert.equal(made.envelope.artifact?.finished, true);
