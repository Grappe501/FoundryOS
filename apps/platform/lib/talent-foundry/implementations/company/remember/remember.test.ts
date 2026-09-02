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
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { REMEMBER_COPY } from './copy';
import { keepExploring, openRemember, rememberMe } from './engine';

assert.match(REMEMBER_COPY.leftBehind, /LEFT SOMETHING BEHIND/);
assert.equal(/hiring|résumé|resume|november|salary/i.test(JSON.stringify(REMEMBER_COPY)), false);

function throughMake() {
  let s = createWorkshopSession(new Date('2026-09-02T06:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T06:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T06:00:10.000Z'));
  s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T06:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T06:00:18.000Z'));
  s = submitMess(s, 'split', new Date('2026-09-02T06:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T06:00:34.000Z'));
  s = linger(s, new Date('2026-09-02T06:00:40.000Z'));
  const opened = openMake(s, new Date('2026-09-02T06:01:00.000Z'));
  if (!opened.ok) throw new Error('make');
  s = chooseMakeTrack(opened.session, 'explain', new Date('2026-09-02T06:01:05.000Z'));
  return submitMake(
    s,
    { body: 'The review is still open. Do not hide it.', finished: true },
    new Date('2026-09-02T06:01:20.000Z'),
  );
}

assert.equal(tryEnterStage(createWorkshopSession(), 'remember').reason, 'locked');

const made = throughMake();
assert.equal(made.envelope.progress.remember, 'open');
assert.equal(made.stateId, 'linger');

const opened = openRemember(made, new Date('2026-09-02T06:02:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('remember');
assert.equal(opened.session.envelope.spineStage, 'remember');
assert.equal(opened.session.stateId, 'linger');

const exploring = keepExploring(opened.session, new Date('2026-09-02T06:02:10.000Z'));
assert.equal(exploring.envelope.rememberChoice, 'keep_exploring');
assert.equal(exploring.envelope.remember, null);
assert.equal(exploring.envelope.placeEligible, false);
assert.equal(exploring.envelope.progress.remember, 'open');
assert.ok(exploring.envelope.artifact);

const named = rememberMe(
  opened.session,
  { firstName: 'Ada', lastName: 'Cole', email: 'ada@example.com', location: 'Little Rock' },
  new Date('2026-09-02T06:02:30.000Z'),
);
assert.equal(named.envelope.rememberChoice, 'remember_me');
assert.equal(named.envelope.remember?.email, 'ada@example.com');
assert.equal(named.envelope.placeEligible, true);
assert.equal(named.envelope.progress.remember, 'complete');
assert.equal(named.thinking.some((e) => e.move === 'finish'), true);

assert.throws(() => rememberMe(opened.session, { firstName: 'Ada', lastName: 'Cole', email: 'nope' }));
assert.throws(() =>
  rememberMe(opened.session, {
    firstName: 'Ada',
    lastName: 'Cole',
    email: 'ada@example.com',
    phone: '555',
  } as never),
);

const onward = tryAdvanceSpine(named);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'stub');
assert.equal(onward.stage, 'return');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
