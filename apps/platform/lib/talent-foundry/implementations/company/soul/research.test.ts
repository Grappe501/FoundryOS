import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  advanceWorkshop,
  createWorkshopSession,
  linger,
  markNoticeRegion,
  revealName,
  submitMess,
  submitNotice,
} from '../journey';
import { chooseMakeTrack, openMake, submitMake } from '../make/engine';
import { FOUNDRY_CULTURE, FOUNDRY_DOCTRINE, RESEARCH_LOOP, SOUL_NEVER } from './contract';
import { readSoul } from './engine';
import { fragmentsFromSession, researchReflection } from './fragments';
import { hasFact } from './memory';
import { addReceipt, bringBack, comeBack, inquiryOf, inquirySurface, leaveToLook } from './research';

const here = dirname(fileURLToPath(import.meta.url));
const src =
  readFileSync(join(here, 'research.ts'), 'utf8') +
  readFileSync(join(here, 'fragments.ts'), 'utf8') +
  readFileSync(join(here, 'engine.ts'), 'utf8');

assert.equal(/congratulations|great job|confetti|keep it up|you're talented/i.test(src), false);
assert.equal(/maya|rafi|nia|oscar/i.test(src), false);
assert.equal(/fit_score|engagement_score|researchScore|grade:/i.test(src), false);
assert.equal(FOUNDRY_DOCTRINE.includes('how to go get better answers'), true);
assert.equal(FOUNDRY_CULTURE.includes('Use every tool you have'), true);
assert.deepEqual([...RESEARCH_LOOP], [
  'encounter',
  'wonder',
  'search',
  'compare',
  'test',
  'bring_back',
  'apply',
  'explain',
]);
assert.equal(SOUL_NEVER.includes('score_research'), true);
assert.equal(SOUL_NEVER.includes('bibliography_form'), true);
assert.equal(SOUL_NEVER.includes('tool_privilege'), true);
assert.equal(SOUL_NEVER.includes('token_logging'), true);

function throughAttempt() {
  let s = createWorkshopSession(new Date('2026-09-02T07:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T07:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T07:00:10.000Z'), 400);
  s = markNoticeRegion(s, 'import', new Date('2026-09-02T07:00:12.000Z'), 300);
  s = submitNotice(s, { notice: 'Delete is primary.', change: 'Start.' }, new Date('2026-09-02T07:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T07:00:18.000Z'));
  s = submitMess(s, 'ask', new Date('2026-09-02T07:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T07:00:34.000Z'));
  s = linger(s, new Date('2026-09-02T07:00:40.000Z'));
  const opened = openMake(s, new Date('2026-09-02T07:01:00.000Z'));
  assert.equal(opened.ok, true);
  if (!opened.ok) throw new Error('make');
  return chooseMakeTrack(opened.session, 'build', new Date('2026-09-02T07:01:05.000Z'));
}

const start = throughAttempt();
assert.equal(start.stateId, 'linger');
assert.equal(inquirySurface(start), 'rest');
assert.equal(start.envelope.inquiry.history.length, 0);
assert.equal(readSoul(start).voice.kind, 'permission');
assert.equal(readSoul(start).voice.line, 'Go look.');
assert.equal(readSoul(start).voice.response, 'expose');

const ignored = leaveToLook(createWorkshopSession(), { question: 'why?' });
assert.equal(inquirySurface(ignored), 'rest');

const away = leaveToLook(start, { question: 'Why is Delete primary?' }, new Date('2026-09-02T07:02:00.000Z'));
assert.equal(inquirySurface(away), 'away');
assert.equal(away.stateId, 'linger');
assert.equal(away.envelope.progress.make, 'open');
assert.equal(inquiryOf(away).current?.question, 'Why is Delete primary?');
assert.equal(readSoul(away).voice.kind, 'silence');
assert.equal(readSoul(away).loop, 'discovery');
assert.equal(hasFact(readSoul(away).facts, 'went-to-look'), true);
assert.equal(fragmentsFromSession(away).some((bit) => bit.kind === 'looked'), true);
assert.equal(
  away.thinking.some((event) => event.move === 'question' && event.beatId === 'research'),
  true,
);

const stillAway = leaveToLook(away);
assert.equal(inquirySurface(stillAway), 'away');

const back = comeBack(away, new Date('2026-09-02T07:08:00.000Z'));
assert.equal(inquirySurface(back), 'back');
assert.equal(readSoul(back).voice.kind, 'ask');
assert.equal(readSoul(back).voice.line, 'What did you find?');
assert.equal(readSoul(back).voice.response, 'ask');
assert.equal(back.thinking.some((event) => event.move === 'return'), true);

const emptyBring = bringBack(back, { finding: '   ' }, new Date('2026-09-02T07:08:10.000Z'));
assert.equal(inquirySurface(emptyBring), 'back');

const brought = bringBack(
  back,
  {
    finding: 'Partial indexes only help when the predicate matches the query.',
    changed: 'Index the active rows instead of the whole table.',
    rejected: 'The generated migration was wrong for this case.',
    tools: 'ChatGPT, postgres docs',
  },
  new Date('2026-09-02T07:09:00.000Z'),
);
assert.equal(inquirySurface(brought), 'rest');
assert.equal(inquiryOf(brought).history.length, 1);
assert.equal(inquiryOf(brought).current, null);
assert.equal(inquiryOf(brought).receipts.length, 2);
assert.equal(hasFact(readSoul(brought).facts, 'brought-back'), true);
assert.equal(hasFact(readSoul(brought).facts, 'used-a-tool'), true);
assert.equal(hasFact(readSoul(brought).facts, 'rejected-something'), true);
assert.equal(hasFact(readSoul(brought).facts, 'changed-because'), true);
assert.equal(readSoul(brought).loop, 'competence');
assert.equal(readSoul(brought).voice.kind, 'silence');
assert.equal(readSoul(brought).reachable.includes('research-trail'), true);

const trail = fragmentsFromSession(brought);
assert.ok(trail.some((bit) => bit.kind === 'found'));
assert.ok(trail.some((bit) => bit.kind === 'ai' && bit.label === 'AI suggested this'));
assert.ok(trail.some((bit) => bit.kind === 'source' && bit.label.includes('postgres')));
assert.ok(trail.some((bit) => bit.kind === 'tested' || bit.kind === 'rejected'));
assert.ok(trail.some((bit) => bit.label === 'changed approach'));
assert.equal(trail.some((bit) => bit.kind === 'works'), false);

const receipt = addReceipt(
  brought,
  { tool: 'local test', usedFor: 'Tried the second approach. It failed first.' },
  new Date('2026-09-02T07:10:00.000Z'),
);
assert.equal(inquiryOf(receipt).receipts.length, 3);

const made = submitMake(
  receipt,
  { body: 'Start on active rows\nOpens only what is live.', finished: true },
  new Date('2026-09-02T07:12:00.000Z'),
);
const doneTrail = fragmentsFromSession(made);
assert.ok(doneTrail.some((bit) => bit.kind === 'works'));
assert.equal(researchReflection(made), 'You used AI for the first hypothesis and documentation for verification.');
assert.equal(made.stateId, 'linger');

const dump = JSON.stringify({ brought: inquiryOf(brought), trail, soul: readSoul(made) });
assert.equal(/congratulations|great job|welcome aboard|score|badge/i.test(dump), false);
assert.equal(/maya|oscar|you.re talented/i.test(dump), false);
assert.equal('score' in inquiryOf(brought), false);
assert.equal('grade' in inquiryOf(brought).history[0], false);
