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
import { ERNIE_ZONE_NEXT } from '../spine/stages';
import { tryAdvanceSpine, tryEnterStage } from '../spine/kernel';
import { RETURN_CHALLENGES } from './challenges';
import { openReturn, submitReturn } from './engine';

assert.equal(/tuesday|hiring|november|salary/i.test(JSON.stringify(RETURN_CHALLENGES)), false);

function throughMake() {
  let s = createWorkshopSession(new Date('2026-09-02T07:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T07:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T07:00:10.000Z'));
  s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T07:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T07:00:18.000Z'));
  s = submitMess(s, 'split', new Date('2026-09-02T07:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T07:00:34.000Z'));
  s = linger(s, new Date('2026-09-02T07:00:40.000Z'));
  const opened = openMake(s, new Date('2026-09-02T07:01:00.000Z'));
  if (!opened.ok) throw new Error('make');
  s = chooseMakeTrack(opened.session, 'operate', new Date('2026-09-02T07:01:05.000Z'));
  return submitMake(
    s,
    { body: '1 A\n2 B\n3 C\n4 D\n5 E', finished: true },
    new Date('2026-09-02T07:01:20.000Z'),
  );
}

assert.equal(tryEnterStage(throughMake(), 'return').reason, 'locked');

const made = throughMake();
const rem = openRemember(made, new Date('2026-09-02T07:02:00.000Z'));
if (!rem.ok) throw new Error('remember');
const exploring = keepExploring(rem.session, new Date('2026-09-02T07:02:10.000Z'));
assert.equal(exploring.envelope.progress.return, 'open');

const cameBack = openReturn(exploring, new Date('2026-09-02T08:00:00.000Z'));
assert.equal(cameBack.ok, true);
if (!cameBack.ok) throw new Error('return');
assert.equal(cameBack.session.envelope.spineStage, 'return');
assert.equal(cameBack.session.stateId, 'linger');
assert.equal(cameBack.session.envelope.returnVisit?.challengeId, 'R-operate');
assert.ok((cameBack.session.envelope.returnVisit?.gapMs ?? 0) >= 3_400_000);
assert.equal(cameBack.session.thinking.some((e) => e.move === 'return'), true);

const finished = submitReturn(
  cameBack.session,
  { body: 'Pat owns line 2. Kim waits.', finished: true },
  new Date('2026-09-02T08:00:40.000Z'),
);
assert.equal(finished.envelope.progress.return, 'complete');
assert.equal(finished.envelope.returnVisit?.finished, true);

const named = rememberMe(
  rem.session,
  { firstName: 'Ada', lastName: 'Cole', email: 'ada@example.com' },
  new Date('2026-09-02T07:02:30.000Z'),
);
const namedReturn = tryAdvanceSpine(named);
assert.equal(namedReturn.ok, true);
if (!namedReturn.ok) throw new Error('named return');
assert.equal(namedReturn.session.envelope.spineStage, 'return');

const onward = tryAdvanceSpine(finished);
assert.equal(onward.ok, false);
assert.equal(onward.reason, 'stub');
assert.equal(onward.stage, 'collaborate');

for (const state of Object.keys(ERNIE_ZONE_NEXT) as (keyof typeof ERNIE_ZONE_NEXT)[]) {
  assert.equal(nextWorkshopState(state), ERNIE_ZONE_NEXT[state]);
}
