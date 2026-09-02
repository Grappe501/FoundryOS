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
import { keepExploring, openRemember, rememberMe } from '../remember/engine';
import { openReturn, submitReturn } from '../return/engine';
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { COLLABORATE_PROMPTS } from './partners';
import { openCollaborate, submitCollaborate } from './engine';

assert.equal(/tuesday|hiring|november|salary|intern/i.test(JSON.stringify(COLLABORATE_PROMPTS)), false);

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

function throughReturnRemembered() {
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
  return submitReturn(ret.session, { body: 'Pat owns line 2.', finished: true }, new Date('2026-09-02T10:00:20.000Z'));
}

assert.equal(tryEnterStage(throughMake(), 'collaborate').reason, 'identity_required');

const anon = throughMake();
const remOpen = openRemember(anon, new Date('2026-09-02T09:02:00.000Z'));
if (!remOpen.ok) throw new Error('rem');
const exploring = keepExploring(remOpen.session, new Date('2026-09-02T09:02:10.000Z'));
const anonReturn = openReturn(exploring, new Date('2026-09-02T10:00:00.000Z'));
if (!anonReturn.ok) throw new Error('anon return');
const anonDone = submitReturn(anonReturn.session, { body: 'Cut line 2.', finished: true }, new Date('2026-09-02T10:00:20.000Z'));
assert.equal(tryEnterStage(anonDone, 'collaborate').reason, 'identity_required');

const ready = throughReturnRemembered();
assert.equal(ready.envelope.progress.collaborate, 'open');
const opened = openCollaborate(ready, new Date('2026-09-02T10:01:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('collab');
assert.equal(opened.session.envelope.spineStage, 'collaborate');
assert.equal(opened.session.stateId, 'linger');
assert.equal(opened.session.envelope.collaborate?.partnerId, 'rafi');
assert.equal(opened.session.envelope.collaborate?.promptId, 'C-operate');

const done = submitCollaborate(
  opened.session,
  {
    sent: 'Line 2 is yours if you want it. I will join at the handoff.',
    needBack: 'Tell me when line 2 has an owner.',
    finished: true,
  },
  new Date('2026-09-02T10:01:40.000Z'),
);
assert.equal(done.envelope.progress.collaborate, 'complete');
assert.equal(done.thinking.some((e) => e.move === 'handoff'), true);

const onward = tryAdvanceSpine(done);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'stub');
assert.equal(onward.stage, 'respond');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
