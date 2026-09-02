import assert from 'node:assert/strict';
import { COHORT_01, FORBIDDEN_INFERENCE_KEYS } from './constants';
import {
  advanceWorkshop,
  createWorkshopSession,
  linger,
  markNoticeRegion,
  nextWorkshopState,
  revealDoorLine,
  revealName,
  submitMess,
  submitNotice,
} from './journey';
import { PHASE_1_MESS, PHASE_1_NOTICE } from './scenarios/lab';
import { assertPlainThinkingEvent, thinkingMoves } from './thinking-trace';

assert.equal(COHORT_01.name, 'FOUNDry Cohort 01');
assert.equal(COHORT_01.capacityMin, 3);
assert.equal(COHORT_01.capacityMax, 5);
assert.equal(COHORT_01.workStartsOn, '2026-11-15');

const messText = JSON.stringify(PHASE_1_MESS);
assert.equal(/tuesday/i.test(messText), false, 'no Tuesday deadline in M1');
assert.equal(/november|11\/15|hiring|salary|intern/i.test(messText), false);

const s0 = createWorkshopSession(new Date('2026-09-02T03:00:00.000Z'));
assert.equal(s0.implementation, 'company');
assert.equal(s0.sessionKey, 'workshop.v1');
assert.equal(s0.stateId, 'door');
assert.equal(s0.envelope.spineStage, 'discover');
assert.equal(s0.noticeId, 'N1');
assert.equal(s0.messId, 'M1');
assert.ok(s0.clocks.door);
assert.equal(s0.doorPacing.line1At, s0.startedAt);
assert.equal(nextWorkshopState('door'), 'notice');
assert.equal(nextWorkshopState('linger'), null);

const paced = revealDoorLine(
  revealDoorLine(s0, 'line2', new Date('2026-09-02T03:00:04.000Z')),
  'line3',
  new Date('2026-09-02T03:00:08.000Z'),
);
assert.equal(paced.doorPacing.line2At, '2026-09-02T03:00:04.000Z');
assert.equal(paced.doorPacing.line3At, '2026-09-02T03:00:08.000Z');

const entered = advanceWorkshop(paced, new Date('2026-09-02T03:00:12.000Z'));
assert.equal(entered.stateId, 'notice');
assert.equal(entered.flags.entered, true);
assert.equal(entered.clocks.door.lingerMs, 12_000);
assert.equal(entered.clocks.notice.openedAt, '2026-09-02T03:00:12.000Z');

const marked = markNoticeRegion(entered, 'primary', new Date('2026-09-02T03:00:20.000Z'), 1800);
assert.deepEqual(thinkingMoves(marked, 'notice').slice(0, 2), ['first_mark', 'attention']);
assert.deepEqual(marked.addressedRegionIds, ['primary']);
assert.equal(marked.clocks.notice.hesitationMs, 8_000);
assert.equal(marked.regionDwells.primary.dwellMs, 1800);

const noticed = submitNotice(
  marked,
  { notice: 'The main button deletes the workspace.', change: 'Make the primary action start, not destroy.' },
  new Date('2026-09-02T03:00:40.000Z'),
);
assert.equal(noticed.stateId, 'notice_ack');
assert.equal(noticed.flags.noticeComplete, true);
assert.equal(noticed.clocks.notice.lingerMs, 28_000);
assert.ok(thinkingMoves(noticed, 'notice').includes('ignore'));
const ignore = noticed.thinking.find((e) => e.move === 'ignore');
const ignoreFact = ignore?.fact as { ignored: string[] };
assert.ok(ignoreFact.ignored.includes('import'), 'buried import unread');
assert.ok(!ignoreFact.ignored.includes('primary'));

const noticeEvidence = noticed.evidence.find((e) => e.type === 'response');
const coverage = (noticeEvidence?.value as { coverage: { buriedVisited: string[]; mentioned: string[] } }).coverage;
assert.deepEqual(coverage.buriedVisited, []);
assert.ok(coverage.mentioned.includes('primary'));

const toMess = advanceWorkshop(noticed, new Date('2026-09-02T03:00:46.000Z'));
assert.equal(toMess.stateId, 'mess');
assert.equal(toMess.clocks.notice.afterSubmitLingerMs, 6_000);

const asked = submitMess(toMess, 'ask', new Date('2026-09-02T03:01:10.000Z'));
assert.equal(asked.stateId, 'mess_consequence');
assert.ok(thinkingMoves(asked, 'mess').includes('question'));
assert.ok(thinkingMoves(asked, 'mess').includes('constraint_seek'));
assert.match(String(asked.evidence.at(-1)?.value), /question sits/i);
assert.equal(asked.clocks.mess.lingerMs, 24_000);

const named = revealName(asked, new Date('2026-09-02T03:01:18.000Z'));
assert.equal(named.stateId, 'named');
assert.equal(named.clocks.mess.afterSubmitLingerMs, 8_000);

const done = linger(named, new Date('2026-09-02T03:01:22.000Z'));
assert.equal(done.stateId, 'linger');
assert.equal(done.envelope.progress.solve, 'complete');
assert.equal(done.envelope.progress.make, 'locked');

for (const event of done.thinking) {
  assertPlainThinkingEvent(event);
  for (const key of FORBIDDEN_INFERENCE_KEYS) {
    assert.equal(key in event, false, key);
  }
}

assert.equal(PHASE_1_NOTICE.regions.filter((r) => r.kind === 'buried').length, 1);
assert.equal(PHASE_1_NOTICE.regions.filter((r) => r.kind === 'conflict').length, 2);
assert.equal(PHASE_1_MESS.choices.length, 4);
assert.deepEqual(
  PHASE_1_MESS.choices.map((c) => c.id),
  ['continue', 'restore', 'ask', 'split'],
);

assert.throws(() => {
  assertPlainThinkingEvent({
    id: 'x',
    at: 't',
    beatId: 'notice',
    move: 'notice',
    fact: {},
    seriousness: 9,
  } as never);
}, /seriousness/);
