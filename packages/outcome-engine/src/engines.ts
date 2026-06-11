/** Core engines — Purpose is the missing layer */
export const CORE_ENGINES = [
  { key: 'purpose', name: 'Purpose Engine', question: 'Why does this matter to me?', package: '@foundry/outcome-engine' },
  { key: 'knowledge', name: 'Knowledge Engine', question: 'What is it?', package: '@foundry/encyclopedia-engine' },
  { key: 'mastery', name: 'Mastery Engine', question: 'How do I get good at it?', package: '@foundry/path-engine' },
  { key: 'project', name: 'Project Engine', question: 'How do I apply it?', package: '@foundry/project-engine' },
  { key: 'community', name: 'Community Engine', question: 'Who can help me?', package: '@foundry/community-engine' },
  { key: 'mentor', name: 'Mentor Engine', question: 'Who did I help become better?', package: '@foundry/mentor-engine' },
] as const;

export const FOUNDRY_STARTS_WITH = {
  education: 'Subject',
  foundry: 'Goal',
} as const;

export const OUTCOME_PRINCIPLE =
  'Humans do not pursue domains. They pursue outcomes. Domains are simply the paths we travel to reach them.';
