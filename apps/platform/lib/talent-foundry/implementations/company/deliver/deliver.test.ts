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
import { openRespond, submitRespond } from '../respond/engine';
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { DELIVER_BARS } from './bars';
import { openDeliver, submitDeliver } from './engine';

assert.equal(/tuesday|hiring|november|salary|intern/i.test(JSON.stringify(DELIVER_BARS)), false);

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

function throughRespond() {
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
  s = submitCollaborate(
    collab.session,
    {
      sent: 'Line 2 is yours if you want it.',
      needBack: 'Tell me when line 2 has an owner.',
      finished: true,
    },
    new Date('2026-09-02T10:01:40.000Z'),
  );
  const resp = openRespond(s, new Date('2026-09-02T10:02:00.000Z'));
  if (!resp.ok) throw new Error('respond');
  return submitRespond(
    resp.session,
    {
      stance: 'incorporate',
      body: 'Line 2 is mine until Pat takes it. The join waits.',
      finished: true,
    },
    new Date('2026-09-02T10:02:30.000Z'),
  );
}

assert.equal(tryEnterStage(throughMake(), 'deliver').reason, 'identity_required');

const ready = throughRespond();
assert.equal(ready.envelope.progress.deliver, 'open');
const opened = openDeliver(ready, new Date('2026-09-02T10:03:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('deliver');
assert.equal(opened.session.envelope.spineStage, 'deliver');
assert.equal(opened.session.stateId, 'linger');
assert.equal(opened.session.envelope.deliver?.barId, 'D-operate');

const done = submitDeliver(
  opened.session,
  {
    body: 'Five lines. Pat owns line 2. I own the join.',
    outcome: 'complete',
  },
  new Date('2026-09-02T10:03:20.000Z'),
);
assert.equal(done.envelope.progress.deliver, 'complete');
assert.equal(done.envelope.deliver?.outcome, 'complete');
assert.equal(done.thinking.some((e) => e.move === 'finish' && e.beatId === 'deliver'), true);

const left = submitDeliver(
  opened.session,
  {
    body: 'Line 2 is still empty. I am leaving the bench.',
    outcome: 'abandon',
  },
  new Date('2026-09-02T10:03:20.000Z'),
);
assert.equal(left.envelope.progress.deliver, 'complete');
assert.equal(left.envelope.deliver?.outcome, 'abandon');
assert.equal(left.thinking.some((e) => e.move === 'abandon' && e.beatId === 'deliver'), true);

const onward = tryAdvanceSpine(done);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'stub');
assert.equal(onward.stage, 'multiply');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
