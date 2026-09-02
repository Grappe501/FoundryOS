import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORBIDDEN_INFERENCE_KEYS } from '../constants';
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
import {
  SOUL_DEFAULT_RESPONSE,
  SOUL_NEVER,
  SOUL_NOT_RELATIONSHIP,
  SOUL_OPTIMIZES_FOR,
  SOUL_PLACE_ATTACHMENT,
  SOUL_RELATIONSHIP,
  SOUL_TRAITS,
  SOUL_VOICE_FORBIDDEN,
} from './contract';
import { readSoul } from './engine';
import { hasFact, placeFacts } from './memory';

const here = dirname(fileURLToPath(import.meta.url));
const engineSrc = readFileSync(join(here, 'memory.ts'), 'utf8') + readFileSync(join(here, 'engine.ts'), 'utf8');

assert.equal(/congratulations|great job|confetti|keep it up/i.test(engineSrc), false);
assert.equal(/personality|grit|fit_score|engagement_score/i.test(engineSrc), false);
assert.equal(/maya|rafi|nia|oscar/i.test(engineSrc), false);
assert.equal(SOUL_RELATIONSHIP.includes('what I have done here'), true);
assert.equal(SOUL_NOT_RELATIONSHIP.includes('who I am'), true);
assert.deepEqual([...SOUL_OPTIMIZES_FOR], ['capability', 'voluntary_return']);
assert.equal(SOUL_NEVER.includes('time_on_platform'), true);
assert.equal(SOUL_NEVER.includes('punish_leaving'), true);
assert.equal(SOUL_NEVER.includes('fake_human_messages'), true);
assert.equal(SOUL_NEVER.includes('streak_loss'), true);
assert.equal(SOUL_DEFAULT_RESPONSE, 'silence');
assert.ok(SOUL_TRAITS.includes('observant'));
assert.ok(SOUL_PLACE_ATTACHMENT.some((line) => line.includes('unfinished work')));

function throughLinger() {
  let s = createWorkshopSession(new Date('2026-09-02T06:00:00.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T06:00:08.000Z'));
  s = markNoticeRegion(s, 'primary', new Date('2026-09-02T06:00:10.000Z'), 400);
  s = markNoticeRegion(s, 'import', new Date('2026-09-02T06:00:12.000Z'), 300);
  s = submitNotice(s, { notice: 'Delete is primary.', change: 'Start.' }, new Date('2026-09-02T06:00:16.000Z'));
  s = advanceWorkshop(s, new Date('2026-09-02T06:00:18.000Z'));
  s = submitMess(s, 'ask', new Date('2026-09-02T06:00:30.000Z'));
  s = revealName(s, new Date('2026-09-02T06:00:34.000Z'));
  return linger(s, new Date('2026-09-02T06:00:40.000Z'));
}

const door = createWorkshopSession();
const doorSoul = readSoul(door);
assert.equal(doorSoul.trust, 'stranger');
assert.equal(doorSoul.rhythm, 'mystery');
assert.equal(doorSoul.loop, 'curiosity');
assert.equal(doorSoul.voice.kind, 'silence');
assert.equal(doorSoul.voice.line, null);
assert.equal(doorSoul.claps, false);
assert.equal(doorSoul.infersPerson, false);
assert.equal(doorSoul.optimizesSessionLength, false);
assert.equal(doorSoul.punishesLeaving, false);

const lingered = throughLinger();
const lingerSoul = readSoul(lingered);
assert.equal(lingerSoul.trust, 'guest');
assert.equal(lingerSoul.rhythm, 'silence');
assert.equal(hasFact(lingerSoul.facts, 'noticed-delete'), true);
assert.equal(hasFact(lingerSoul.facts, 'noticed-import'), true);
assert.equal(hasFact(lingerSoul.facts, 'question-stays'), true);
assert.equal(lingerSoul.mystery.includes('join-to-draft'), true);
assert.equal(lingerSoul.voice.kind, 'silence');

const aftermath = submitMess(
  (() => {
    let s = createWorkshopSession(new Date('2026-09-02T06:00:00.000Z'));
    s = advanceWorkshop(s, new Date('2026-09-02T06:00:08.000Z'));
    s = markNoticeRegion(s, 'primary', new Date('2026-09-02T06:00:10.000Z'));
    s = submitNotice(s, { notice: 'Delete.', change: 'Start.' }, new Date('2026-09-02T06:00:16.000Z'));
    s = advanceWorkshop(s, new Date('2026-09-02T06:00:18.000Z'));
    return s;
  })(),
  'ask',
  new Date('2026-09-02T06:00:30.000Z'),
);
const afterSoul = readSoul(aftermath);
assert.equal(afterSoul.voice.kind, 'challenge');
assert.equal(afterSoul.voice.line, 'That was not the obvious solution.');

const opened = openMake(lingered, new Date('2026-09-02T06:01:00.000Z'));
assert.equal(opened.ok, true);
if (!opened.ok) throw new Error('make');
const chosen = chooseMakeTrack(opened.session, 'build', new Date('2026-09-02T06:01:05.000Z'));
const mid = readSoul(chosen);
assert.equal(mid.trust, 'worker');
assert.equal(mid.rhythm, 'agency');
assert.equal(hasFact(mid.facts, 'left-unfinished'), true);
assert.equal(mid.voice.kind, 'silence');

const made = submitMake(
  chosen,
  { body: 'Start\nOpens.', finished: true },
  new Date('2026-09-02T06:02:10.000Z'),
);
const done = readSoul(made);
assert.equal(done.trust, 'capable');
assert.equal(done.rhythm, 'recognition');
assert.equal(hasFact(done.facts, 'work-stayed'), true);
assert.equal(hasFact(done.facts, 'fixed-symptom'), true);
assert.equal(done.voice.kind, 'challenge');
assert.equal(done.voice.line, 'You fixed the symptom.');
assert.equal(done.mystery.includes('far-tool'), true);
assert.equal(done.reachable.includes('deeper-machine'), true);

const dump = JSON.stringify({ doorSoul, lingerSoul, done, facts: placeFacts(made) });
assert.equal(/congratulations|great job|welcome aboard|keep it up/i.test(dump), false);
for (const word of SOUL_VOICE_FORBIDDEN) {
  assert.equal(dump.toLowerCase().includes(word), false, word);
}
for (const key of FORBIDDEN_INFERENCE_KEYS) {
  assert.equal(key in doorSoul, false);
  assert.equal(key in lingerSoul, false);
  assert.equal(key in done, false);
}
assert.equal(/maya changed|someone is waiting|your streak/i.test(dump), false);
