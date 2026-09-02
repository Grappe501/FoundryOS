import type { MessSeed, NoticeSeed } from '../types';

/** Conflicting first-run screen. Regions are planted so coverage can show read vs skim as facts. */
export const NOTICE_N1: NoticeSeed = {
  id: 'N1',
  title: 'Pulse — first run',
  body: 'Get started with Pulse. Primary control: Delete workspace. Helper: “You’re all set.” Buried: Import from last night. Badge: Draft · 14 conflicts.',
  regions: [
    { id: 'heading', label: 'Get started with Pulse', kind: 'surface', cues: ['get started', 'pulse'] },
    { id: 'primary', label: 'Delete workspace', kind: 'conflict', cues: ['delete', 'destroy', 'workspace'] },
    { id: 'helper', label: 'You’re all set.', kind: 'surface', cues: ['all set'] },
    { id: 'import', label: 'Import from last night', kind: 'buried', cues: ['import', 'last night'] },
    { id: 'badge', label: 'Draft · 14 conflicts', kind: 'conflict', cues: ['conflict', 'draft', '14'] },
  ],
  prompts: {
    notice: 'What do you notice?',
    change: 'What would you change first?',
  },
  surfaces: ['first_mark', 'attention', 'notice', 'reframe', 'assertion', 'ignore'],
};

export const NOTICE_N2: NoticeSeed = {
  id: 'N2',
  title: 'Send when ready',
  body: 'Label says send when ready. Toggle auto-sends every few minutes. Fine print: you will not be able to undo. Preview is secondary. 3 unpublished changes.',
  regions: [
    { id: 'label', label: 'Send when ready', kind: 'surface', cues: ['send when ready'] },
    { id: 'toggle', label: 'Auto-send', kind: 'conflict', cues: ['auto', 'toggle'] },
    { id: 'fine_print', label: 'You will not be able to undo.', kind: 'buried', cues: ['undo'] },
    { id: 'preview', label: 'Preview', kind: 'surface', cues: ['preview'] },
    { id: 'status', label: '3 unpublished changes', kind: 'conflict', cues: ['unpublished', '3'] },
  ],
  prompts: {
    notice: 'What do you notice?',
    change: 'What would you change first?',
  },
  surfaces: ['attention', 'notice', 'constraint_seek', 'ignore'],
};

export const NOTICE_SEEDS: NoticeSeed[] = [NOTICE_N1, NOTICE_N2];

/**
 * No calendar bait. The mess is a handoff that can destroy work.
 * Choices are thinking moves, not a correct launch date.
 */
export const MESS_M1: MessSeed = {
  id: 'M1',
  title: 'The last draft',
  facts: [
    'The control says Continue.',
    'Continue replaces the draft on the bench.',
    'Last night’s notes exist only in that draft.',
    'There is no copy.',
  ],
  choices: [
    {
      id: 'continue',
      label: 'Continue and replace the draft',
      moves: ['decide'],
      consequence: 'The bench is clear. Last night’s notes are gone.',
    },
    {
      id: 'restore',
      label: 'Restore last night’s notes first',
      moves: ['decide', 'constraint_seek'],
      consequence: 'The notes are back. Continue is still waiting.',
    },
    {
      id: 'ask',
      label: 'Ask who the draft belongs to',
      moves: ['question', 'constraint_seek'],
      consequence: 'A question sits on the bench. The draft is untouched.',
    },
    {
      id: 'split',
      label: 'Save a copy, then continue',
      moves: ['scope_cut'],
      consequence: 'A copy exists. The bench can move.',
    },
  ],
  surfaces: ['decide', 'question', 'constraint_seek', 'scope_cut'],
};

export const MESS_SEEDS: MessSeed[] = [MESS_M1];

export const PHASE_1_NOTICE = NOTICE_N1;
export const PHASE_1_MESS = MESS_M1;

export function noticeById(id: string): NoticeSeed | undefined {
  return NOTICE_SEEDS.find((s) => s.id === id);
}

export function messById(id: string): MessSeed | undefined {
  return MESS_SEEDS.find((s) => s.id === id);
}

export function messChoice(seed: MessSeed, choiceId: string) {
  return seed.choices.find((c) => c.id === choiceId);
}
