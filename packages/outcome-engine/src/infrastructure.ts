/**
 * Foundry = Human Potential Infrastructure
 * Lifelong Expert Development is what we do.
 * Human Potential Infrastructure is what we become.
 */
export const HUMAN_POTENTIAL_INFRASTRUCTURE = {
  headline: 'Human Potential Infrastructure',
  does: 'Lifelong Expert Development',
  becomes: 'Human Potential Infrastructure',
} as const;

/** The seven systems we've discovered — human development, not education */
export const HUMAN_DEVELOPMENT_LAYERS = [
  { key: 'knowledge', question: 'What is it?' },
  { key: 'mastery', question: 'How do I get good at it?' },
  { key: 'projects', question: 'How do I apply it?' },
  { key: 'community', question: 'Who can help me?' },
  { key: 'identity', question: 'Who am I becoming?' },
  { key: 'legacy', question: 'What impact did I have?' },
  { key: 'mentorship', question: 'Who did I help become better?' },
] as const;

export const NOT_EDUCATION_NOT_SOCIAL_NOT_AI =
  'That is not education. That is not social networking. That is not AI. That is human development.';
