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
import { chooseMakeTrack, openMake, submitMake } from '../make/engine';
import { openRemember, rememberMe } from '../remember/engine';
import { openReturn, submitReturn } from '../return/engine';
import { openCollaborate, submitCollaborate } from '../collaborate/engine';
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { RESPOND_NOTES } from './notes';
import { openRespond, submitRespond } from './engine';

assert.equal(/tuesday|hiring|november|salary|intern/i.test(JSON.stringify(RESPOND_NOTES)), false);

function throughMake() {
  let s = createWorkshopSession(new Date('2026-09-02T09:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T09:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T09:00:10.000Z'));
  s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T09:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T09:00:18.000Z'));
  s = submitMess(s, 'split', new Date('2026-09-02T09:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T09:00:34.000Z'));
  s = linger(s, new Date('2026-09-02T09:00:40.000Z'));
  const opened = openMake(s, new Date('2026-09-02T09:01:00.000Z'));
  if (!opened.ok) throw new Error('make');
  s = chooseMakeTrack(opened.session, 'operate', new Date('2026-09-02T09:01:05.000Z'));
  return submitMake(s, { body: '1 A\n2 B\n3 C\n4 D\n5 E', finished: true }, new Date('2026-09-02T09:01:20.000Z'));
}

function throughCollaborate() {
  let s = throughMake();
  const rem = openRemember(s, new Date('2026-09-02T09:02:00.000Z'));
  if (!rem.ok) throw new Error('remember');
  s = rememberMe(
    rem.session,
    { firstName: 'Ada', lastName: 'Cole', email: 'ada@example.com' },
    new Date('2026-09-02T09:02:10.000Z'),
  );
  const ret = openReturn(s, new Date('2026-09-02T10:00:00.000Z'));
  if (!ret.ok) throw new Error('return');
  s = submitReturn(ret.session, { body: 'Pat owns line 2.', finished: true }, new Date('2026-09-02T10:00:20.000Z'));
  const collab = openCollaborate(s, new Date('2026-09-02T10:01:00.000Z'));
  if (!collab.ok) throw new Error('collab');
  return submitCollaborate(
    collab.session,
    {
      sent: 'Line 2 is yours if you want it.',
      needBack: 'Tell me when line 2 has an owner.',
      finished: true,
    },
    new Date('2026-09-02T10:01:40.000Z'),
  );
}

assert.equal(tryEnterStage(throughMake(), 'respond').reason, 'identity_required');

const ready = throughCollaborate();
assert.equal(ready.envelope.progress.respond, 'open');
const opened = openRespond(ready, new Date('2026-09-02T10:02:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('respond');
assert.equal(opened.session.envelope.spineStage, 'respond');
assert.equal(opened.session.stateId, 'linger');
assert.equal(opened.session.envelope.respond?.noteId, 'F-operate');

const done = submitRespond(
  opened.session,
  {
    stance: 'incorporate',
    body: 'Line 2 is mine until Pat takes it. The join waits.',
    finished: true,
  },
  new Date('2026-09-02T10:02:30.000Z'),
);
assert.equal(done.envelope.progress.respond, 'complete');
assert.equal(done.envelope.respond?.stance, 'incorporate');
assert.equal(done.thinking.some((e) => e.move === 'revise'), true);

const held = submitRespond(
  opened.session,
  {
    stance: 'hold',
    body: 'The join is correct. Line 2 stays empty on purpose.',
    finished: true,
  },
  new Date('2026-09-02T10:02:30.000Z'),
);
assert.equal(held.envelope.respond?.stance, 'hold');
assert.equal(held.thinking.some((e) => e.move === 'decide' && e.beatId === 'respond'), true);

const onward = tryAdvanceSpine(done);
assert.equal(onward.ok, true);
if (!onward.ok) throw new Error('deliver');
assert.equal(onward.session.envelope.spineStage, 'deliver');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
