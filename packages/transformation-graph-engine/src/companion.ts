/**
 * Companion Principle — Foundry is not a destination. It's a companion.
 * Reserved doctrine. Every system serves the user today.
 */
export const COMPANION_PRINCIPLE = {
  headline: 'Foundry is not a destination. It is a companion.',
  not: 'A place you visit',
  is: 'Become something.',
  platform_question: 'How does this help the user today?',
  not_platform_question: 'How does this improve the platform?',
} as const;

export const PLATFORM_COMPARISON = [
  { platform: 'Wikipedia', behavior: 'look something up' },
  { platform: 'YouTube', behavior: 'watch something' },
  { platform: 'Reddit', behavior: 'discuss something' },
  { platform: 'MasterClass', behavior: 'learn something' },
  { platform: 'Foundry', behavior: 'become something' },
] as const;

/** Home screen should feel like a companion — not software */
export const COMPANION_HOME_SCREEN = [
  "Here's where you are.",
  "Here's what's working.",
  "Here's what's next.",
  "Here's why it matters.",
] as const;

export const LONG_TERM_TEST = {
  not: 'I learned a lot.',
  is: 'I became the person I wanted to become.',
  twenty_years:
    'If the platform consistently helps people tell that story, Human Potential Infrastructure has achieved its purpose.',
} as const;

export const BURT_PASS_010_FOCUS =
  'Prove one complete transformation loop for one user in one domain. The loop is the product. Everything else is content wrapped around it.';
