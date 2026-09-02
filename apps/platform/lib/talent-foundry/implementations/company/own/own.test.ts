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
import { openLead, submitLead } from '../lead/engine';
import { openBuild, submitBuild } from '../build/engine';
import { openEarn, submitEarn } from '../earn/engine';
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { recordHumanGate, tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { OWN_CONVERSATION } from './conversations';
import { OWN_COPY } from './copy';
import { openOwn, submitOwn } from './engine';

assert.equal(/tuesday|november|salary|oscar|academy|kelly|reddirt|\$20|equity granted/i.test(JSON.stringify({ OWN_COPY, OWN_CONVERSATION })), false);

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

function throughEarn() {
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
    { sent: 'Line 2 is yours.', needBack: 'Tell me when line 2 has an owner.', finished: true },
    new Date('2026-09-02T10:01:40.000Z'),
  );
  const resp = openRespond(s, new Date('2026-09-02T10:02:00.000Z'));
  if (!resp.ok) throw new Error('respond');
  s = submitRespond(
    resp.session,
    { stance: 'incorporate', body: 'Line 2 is mine until Pat takes it.', finished: true },
    new Date('2026-09-02T10:02:30.000Z'),
  );
  const del = openDeliver(s, new Date('2026-09-02T10:03:00.000Z'));
  if (!del.ok) throw new Error('deliver');
  s = submitDeliver(del.session, { body: 'Five lines.', outcome: 'complete' }, new Date('2026-09-02T10:03:20.000Z'));
  const mul = openMultiply(s, new Date('2026-09-02T10:04:00.000Z'));
  if (!mul.ok) throw new Error('multiply');
  s = submitMultiply(
    mul.session,
    { help: 'Write five lines.', unblocks: 'They can run without you.', finished: true },
    new Date('2026-09-02T10:04:30.000Z'),
  );
  const lead = openLead(s, new Date('2026-09-02T10:05:00.000Z'));
  if (!lead.ok) throw new Error('lead');
  s = submitLead(
    lead.session,
    { keep: 'The join.', assign: 'Rafi owns line 3.', cut: 'Lines 4 and 5 wait.', finished: true },
    new Date('2026-09-02T10:05:40.000Z'),
  );
  s = recordHumanGate(s, { kind: 'real_work_access', at: '2026-09-02T10:06:00.000Z', actor: 'ernie' });
  const built = openBuild(s, new Date('2026-09-02T10:06:10.000Z'));
  if (!built.ok) throw new Error('build');
  s = submitBuild(
    built.session,
    { changed: 'Line 2 has an owner.', left: 'Did not deploy.', finished: true },
    new Date('2026-09-02T10:06:40.000Z'),
  );
  s = recordHumanGate(s, { kind: 'paid_project', at: '2026-09-02T10:07:00.000Z', actor: 'ernie' });
  const earned = openEarn(s, new Date('2026-09-02T10:07:10.000Z'));
  if (!earned.ok) throw new Error('earn');
  return submitEarn(
    earned.session,
    { work: 'Owner board, classified as a paid project.', accepted: true, finished: true },
    new Date('2026-09-02T10:07:40.000Z'),
  );
}

assert.equal(tryEnterStage(throughMake(), 'own').reason, 'identity_required');

const ready = throughEarn();
assert.equal(ready.envelope.progress.own, 'open');
assert.equal(tryEnterStage(ready, 'own').reason, 'human_gate');
assert.equal(tryAdvanceSpine(ready).reason, 'human_gate');

const payOnly = recordHumanGate(ready, {
  kind: 'employment',
  at: '2026-09-02T10:08:00.000Z',
  actor: 'ernie',
});
assert.equal(tryEnterStage(payOnly, 'own').reason, 'human_gate');

const gated = recordHumanGate(ready, {
  kind: 'ownership_conversation',
  at: '2026-09-02T10:08:00.000Z',
  actor: 'ernie',
  note: 'founders only — no grant',
});
const opened = openOwn(gated, new Date('2026-09-02T10:08:10.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('own');
assert.equal(opened.session.envelope.spineStage, 'own');
assert.equal(opened.session.stateId, 'linger');
assert.equal(opened.session.envelope.own?.conversationId, 'O-founders');
assert.equal(opened.session.envelope.cohortId, null);
assert.equal(
  opened.session.evidence.some((e) => e.label === 'own' && (e.value as { equity?: boolean }).equity === false),
  true,
);
assert.equal(
  opened.session.evidence.some((e) => e.label === 'own' && (e.value as { prize?: boolean }).prize === false),
  true,
);

const refused = submitOwn(
  opened.session,
  { subject: 'Whether ownership is even on the table.', entered: false, finished: true },
  new Date('2026-09-02T10:08:20.000Z'),
);
assert.equal(refused.envelope.progress.own, 'open');
assert.equal(refused.thinking.some((e) => e.move === 'abandon' && e.beatId === 'own'), true);

const done = submitOwn(
  refused,
  { subject: 'Whether ownership is even on the table.', entered: true, finished: true },
  new Date('2026-09-02T10:08:40.000Z'),
);
assert.equal(done.envelope.progress.own, 'complete');
assert.equal(done.envelope.own?.entered, true);
assert.equal(done.stateId, 'linger');
assert.equal(done.thinking.some((e) => e.move === 'decide' && e.beatId === 'own'), true);

const onward = tryAdvanceSpine(done);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'already_complete');
assert.equal(onward.stage, 'own');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
