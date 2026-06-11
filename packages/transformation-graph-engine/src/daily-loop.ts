/**
 * Daily Loop — the rhythm of a companion, not a destination.
 */
export const DAILY_LOOP = [
  {
    rhythm: 'Morning',
    question: 'What am I becoming?',
    phase: 'orientation',
  },
  {
    rhythm: 'During the Day',
    question: 'What should I work on?',
    phase: 'action',
  },
  {
    rhythm: 'Evening',
    question: 'What did I learn?',
    phase: 'reflection',
  },
  {
    rhythm: 'Long-Term',
    question: 'How have I changed?',
    phase: 'journey',
  },
] as const;

export const DAILY_LOOP_PRINCIPLE =
  'PASS-010 proves the intelligence loop. The daily experience is how a companion shows up.';
