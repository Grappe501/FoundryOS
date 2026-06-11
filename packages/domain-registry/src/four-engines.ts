/**
 * Core engines — Purpose first, then four domain engines, then Mentor.
 * @deprecated Use CORE_ENGINES from @foundry/outcome-engine for full stack.
 */
export const FOUR_ENGINES = [
  {
    key: 'knowledge',
    name: 'Knowledge Engine',
    question: 'What is it?',
    package: '@foundry/encyclopedia-engine',
  },
  {
    key: 'mastery',
    name: 'Mastery Engine',
    question: 'How do I become good at it?',
    package: '@foundry/path-engine',
  },
  {
    key: 'project',
    name: 'Project Engine',
    question: 'What do I actually do?',
    package: '@foundry/project-engine',
  },
  {
    key: 'community',
    name: 'Community Engine',
    question: 'Who do I do it with?',
    package: '@foundry/community-engine',
  },
] as const;

/** Full self-assembly stack per domain */
export const SELF_ASSEMBLY_STACK = [
  'Purpose',
  'Knowledge',
  'Learning Pyramid',
  'Mastery',
  'Projects',
  'Community',
  'Mentor',
  'Identity',
  'Legacy',
] as const;

export const FOUNDRY_FACTORY_ECOSYSTEM = [
  'Entity Factory',
  'Knowledge Factory',
  'Academy Factory',
  'Project Factory',
  'Community Factory',
  'Mentor Factory',
  'Outcome Factory',
] as const;

export const SELF_ASSEMBLY_PRINCIPLE =
  'Not 2,000 websites. A machine that creates Knowledge + Mastery + Projects + Community + Identity + Legacy for any subject a human cares about.';
