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
import { openDeliver, submitDeliver } from '../deliver/engine';
import { openMultiply, submitMultiply } from '../multiply/engine';
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { LEAD_CONSTRAINTS } from './constraints';
import { openLead, submitLead } from './engine';

assert.equal(/tuesday|hiring|november|salary|intern|oscar|academy/i.test(JSON.stringify(LEAD_CONSTRAINTS)), false);

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

function throughMultiply() {
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
  s = submitRespond(
    resp.session,
    {
      stance: 'incorporate',
      body: 'Line 2 is mine until Pat takes it. The join waits.',
      finished: true,
    },
    new Date('2026-09-02T10:02:30.000Z'),
  );
  const del = openDeliver(s, new Date('2026-09-02T10:03:00.000Z'));
  if (!del.ok) throw new Error('deliver');
  s = submitDeliver(
    del.session,
    {
      body: 'Five lines. Pat owns line 2. I own the join.',
      outcome: 'complete',
    },
    new Date('2026-09-02T10:03:20.000Z'),
  );
  const mul = openMultiply(s, new Date('2026-09-02T10:04:00.000Z'));
  if (!mul.ok) throw new Error('multiply');
  return submitMultiply(
    mul.session,
    {
      help: 'Write five lines. You own line 1.',
      unblocks: 'They can run without asking you who owns the join.',
      finished: true,
    },
    new Date('2026-09-02T10:04:30.000Z'),
  );
}

assert.equal(tryEnterStage(throughMake(), 'lead').reason, 'identity_required');

const ready = throughMultiply();
assert.equal(ready.envelope.progress.lead, 'open');
assert.equal(ready.envelope.cohortId, null);
const opened = openLead(ready, new Date('2026-09-02T10:05:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('lead');
assert.equal(opened.session.envelope.spineStage, 'lead');
assert.equal(opened.session.stateId, 'linger');
assert.equal(opened.session.envelope.lead?.constraintId, 'L-operate');
assert.equal(opened.session.envelope.cohortId, null);

const done = submitLead(
  opened.session,
  {
    keep: 'The join. I stay on it until it has an owner.',
    assign: 'Rafi owns line 3. Nia writes line 1.',
    cut: 'Lines 4 and 5 wait. They are not this hour.',
    finished: true,
  },
  new Date('2026-09-02T10:05:40.000Z'),
);
assert.equal(done.envelope.progress.lead, 'complete');
assert.equal(done.envelope.cohortId, null);
assert.equal(done.envelope.gates.length, 0);
assert.equal(done.thinking.some((e) => e.move === 'scope_cut' && e.beatId === 'lead'), true);
assert.equal(done.thinking.some((e) => e.move === 'decide' && e.beatId === 'lead'), true);

const onward = tryAdvanceSpine(done);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'stub');
assert.equal(onward.stage, 'build');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
