/** PASS-010 execution mode — vision locked, prove the loop */
export const PASS_010_EXECUTION_MODE = {
  status: 'execution' as const,
  directive: 'Stop expanding vision. Prove the loop.',
  proof: 'One user · One domain (Public Speaker) · One complete loop',
} as const;

export const VISION_LOCKED = {
  mission: 'Foundry helps people become who they are capable of becoming.',
  category: 'Human Potential Infrastructure',
  product: 'A companion for human growth.',
  core_question: 'How does this help the user today?',
  success_story: 'I became the person I wanted to become.',
  not_success_story: 'I learned a lot.',
} as const;

/** Explicitly avoid during PASS-010 */
export const PASS_010_AVOID = [
  'No new major engines',
  'No new registries',
  'No new categories',
  'No new verticals',
  'No new monetization layers',
  'No new social mechanics',
] as const;

export const PASS_010_EXECUTION_QUESTION =
  'Can the system guide a human through meaningful progress?';

export const PASS_010_EXIT_CRITERIA =
  'A real transformation loop works — not code compiles, not pages exist, not routes load.';

export const PASS_010_PRODUCTION_ROUTES = ['/loop', '/transformation-graph', '/equation'] as const;
