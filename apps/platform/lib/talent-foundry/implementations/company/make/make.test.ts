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
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { chooseMakeTrack, openMake, submitMake } from './engine';
import { MAKE_TRACKS } from './tracks';

assert.equal(MAKE_TRACKS.length, 7);
assert.equal(/tuesday|hiring|november|salary|intern/i.test(JSON.stringify(MAKE_TRACKS)), false);

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

const early = createWorkshopSession();
assert.equal(tryEnterStage(early, 'make').reason, 'locked');

const rested = throughLinger();
assert.equal(rested.stateId, 'linger');
assert.equal(rested.envelope.progress.make, 'open');
assert.equal(rested.envelope.spineStage, 'solve');

const opened = openMake(rested, new Date('2026-09-02T05:01:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('make should open after linger');
assert.equal(opened.session.envelope.spineStage, 'make');
assert.equal(opened.session.stateId, 'linger', 'Ernie UI state stays linger');

const chosen = chooseMakeTrack(opened.session, 'operate', new Date('2026-09-02T05:01:05.000Z'));
assert.equal(chosen.envelope.artifactTrack, 'operate');
assert.equal(chosen.thinking.some((e) => e.move === 'decide'), true);

const made = submitMake(
  chosen,
  {
    body: '1 Pat copies the draft\n2 Kim confirms Continue is safe\n3 Lee tells the channel\n4 Sam watches the bench\n5 Pat deletes nothing',
    finished: true,
  },
  new Date('2026-09-02T05:02:00.000Z'),
);
assert.equal(made.envelope.progress.make, 'complete');
assert.equal(made.envelope.artifact?.finished, true);
assert.equal(made.thinking.some((e) => e.move === 'finish'), true);
assert.ok((made.clocks.make?.lingerMs ?? 0) >= 60_000);

const next = tryAdvanceSpine(made);
assert.equal(next.ok, true);
if (!next.ok) throw new Error('remember');
assert.equal(next.session.envelope.spineStage, 'remember');
assert.equal(next.session.stateId, 'linger');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
