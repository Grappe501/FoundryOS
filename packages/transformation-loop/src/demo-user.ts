/**
 * Demo User — canonical PASS-010 proof (Ernie specification).
 */
export const DEMO_USER = {
  slug: 'demo-user',
  display_name: 'Demo User',
  goal: 'Become a Better Public Speaker',
} as const;

export const DEMO_EVIDENCE = {
  status: 'Speech completed',
  audience_size: 8,
  location: 'Rotary Club',
} as const;

export const DEMO_REFLECTIONS = {
  what_happened:
    'Delivered a 5-minute speech at Rotary Club to an audience of 8. Finished without losing my place.',
  what_did_you_learn: 'Preparation mattered more than perfection. The audience was supportive.',
  what_would_you_do_differently: 'Practice transitions between main points — that is where I struggled most.',
} as const;

export const DEMO_INSIGHT =
  'You were more comfortable than expected but struggled with transitions.';

export const DEMO_NEXT_ACTION = {
  action: 'Deliver a second speech using a prepared outline.',
  why: '71% of successful speakers completed multiple short speeches before joining advanced speaking groups.',
  impact: 'high' as const,
} as const;

export const DEMO_USER_EXIT_MESSAGE =
  'I completed my first speech and know exactly what to do next.';

/** Action text aligned to Step 4 */
export const DEMO_ACTION = 'Deliver a 5-minute speech';
