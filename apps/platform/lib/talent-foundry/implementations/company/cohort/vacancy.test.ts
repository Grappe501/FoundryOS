import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORBIDDEN_INFERENCE_KEYS } from '../constants';
import { compositionGaps } from './compose';
import {
  approvedPersonRefs,
  assignFunction,
  describeVacancies,
  emptyComposition,
  filledFunctions,
  openFunctions,
  retainExpansionEvidence,
} from './vacancy';

const here = dirname(fileURLToPath(import.meta.url));
const vacancySrc = readFileSync(join(here, 'vacancy.ts'), 'utf8');
const composeSrc = readFileSync(join(here, 'compose.ts'), 'utf8');
assert.equal(/fit_score|employability|auto_invite|recommended_candidate/i.test(vacancySrc + composeSrc), false);
assert.equal(/recommendSeats|pickBest/i.test(vacancySrc + composeSrc), false);

const empty = emptyComposition();
assert.deepEqual(openFunctions(empty), ['navigator', 'builder', 'connector']);
assert.deepEqual(filledFunctions(empty), []);
assert.equal(empty.foundingComplete, false);
assert.equal(empty.assignsSeats, false);
assert.equal(empty.selectsPeople, false);
assert.equal(empty.humanInviteStillRequired, true);

const gapsEmpty = compositionGaps([], { composition: empty });
assert.ok(gapsEmpty.needs.some((n) => n.capability === 'planning'));
assert.ok(gapsEmpty.needs.some((n) => n.capability === 'shipping'));
assert.ok(gapsEmpty.needs.some((n) => n.capability === 'collaboration'));
assert.equal(gapsEmpty.needs.some((n) => n.capability === 'noticing'), false);

assert.throws(() =>
  assignFunction(empty, {
    functionId: 'navigator',
    personRef: 'person-a',
    evidence: ['decide', 'explain'],
    decision: { actor: '', at: '2026-09-02T12:00:00.000Z', kind: 'cohort_function_assignment' },
  }),
);

const afterNav = assignFunction(empty, {
  functionId: 'navigator',
  personRef: 'person-a',
  evidence: ['decide', 'constraint_seek', 'explain', 'scope_cut', 'notice'],
  decision: {
    actor: 'ernie',
    at: '2026-09-02T12:00:00.000Z',
    kind: 'cohort_function_assignment',
    note: 'assigned Navigator function from demonstrated plan',
  },
  note: 'For Cohort 01, staff assigned this person to fulfill the Navigator function based on demonstrated evidence.',
});
assert.deepEqual(openFunctions(afterNav), ['builder', 'connector']);
assert.deepEqual(filledFunctions(afterNav), ['navigator']);
assert.deepEqual(approvedPersonRefs(afterNav), ['person-a']);
assert.deepEqual(afterNav.filled[0]?.evidence, ['decide', 'constraint_seek', 'explain', 'scope_cut', 'notice']);
assert.equal(afterNav.filled[0]?.personRef === 'navigator', false);
assert.equal(afterNav.filled[0]?.functionId, 'navigator');
assert.ok(afterNav.filled[0]?.decision.actor);

const gapsNav = compositionGaps([['decide', 'explain']], { composition: afterNav });
assert.equal(gapsNav.needs.some((n) => n.capability === 'planning'), false);
assert.ok(gapsNav.needs.some((n) => n.capability === 'shipping'));
assert.ok(gapsNav.needs.some((n) => n.capability === 'collaboration'));
assert.deepEqual(gapsNav.openFunctions, ['builder', 'connector']);

const afterBuild = assignFunction(afterNav, {
  functionId: 'builder',
  personRef: 'person-b',
  evidence: ['revise', 'finish'],
  decision: { actor: 'ernie', at: '2026-09-02T12:05:00.000Z', kind: 'cohort_function_assignment' },
});
assert.deepEqual(openFunctions(afterBuild), ['connector']);
const gapsBuild = compositionGaps([['revise', 'finish']], { composition: afterBuild });
assert.equal(gapsBuild.needs.some((n) => n.capability === 'planning'), false);
assert.equal(gapsBuild.needs.some((n) => n.capability === 'shipping'), false);
assert.ok(gapsBuild.needs.some((n) => n.capability === 'collaboration'));

const founding = assignFunction(afterBuild, {
  functionId: 'connector',
  personRef: 'person-c',
  evidence: ['help', 'handoff'],
  decision: { actor: 'ernie', at: '2026-09-02T12:10:00.000Z', kind: 'cohort_function_assignment' },
});
assert.equal(founding.foundingComplete, true);
assert.deepEqual(openFunctions(founding), []);
assert.equal(describeVacancies(founding).note, 'Founding composition complete.');
const gapsDone = compositionGaps([], { composition: founding });
assert.equal(gapsDone.foundingComplete, true);
assert.deepEqual(gapsDone.notes, ['Founding composition complete.']);
assert.equal(gapsDone.humanInviteStillRequired, true);
assert.equal(gapsDone.selectsPeople, false);

assert.throws(() =>
  assignFunction(empty, {
    functionId: 'witness',
    personRef: 'person-d',
    evidence: ['notice'],
    decision: { actor: 'ernie', at: '2026-09-02T12:12:00.000Z', kind: 'cohort_function_assignment' },
  }),
);

const held = retainExpansionEvidence(afterNav, {
  personRef: 'person-d',
  functions: ['witness'],
  evidence: ['notice', 'question', 'attention', 'finish'],
  decision: { actor: 'ernie', at: '2026-09-02T12:15:00.000Z' },
  note: 'Strong Witness-related evidence retained for possible expansion review.',
});
assert.equal(held.expansionHeld.length, 1);
assert.deepEqual(held.expansionHeld[0]?.evidence, ['notice', 'question', 'attention']);
assert.equal(held.expansionHeld[0]?.note.includes('expands to five') || held.expansionHeld[0]?.note.includes('expansion review'), true);
assert.equal(held.open.includes('navigator'), false);
assert.equal(JSON.stringify(held).includes('92'), false);
assert.equal(/score|rank|percent|suitable for/i.test(JSON.stringify(held.expansionHeld)), false);
assert.equal(approvedPersonRefs(held).includes('person-d'), false);

const dump = JSON.stringify({ empty, afterNav, founding, held, gapsDone });
assert.equal(/personality|grit|employability|auto_invite|recommended_candidate|fit_score/i.test(dump), false);
assert.equal(/invite steve|invite maya/i.test(dump), false);
for (const key of FORBIDDEN_INFERENCE_KEYS) {
  assert.equal(key in empty, false);
  assert.equal(key in afterNav, false);
  assert.equal(key in held, false);
}
