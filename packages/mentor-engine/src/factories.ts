/**
 * PASS-009 evolution → full factory ecosystem
 * End state: complete growth ecosystems, not content generation
 */
/** @deprecated Use ULTIMATE_FACTORY_ECOSYSTEM from @foundry/outcome-engine */
export const FOUNDRY_FACTORY_ECOSYSTEM = [
  { key: 'entity', name: 'Entity Factory', output: 'Universal records + relationships' },
  { key: 'expert', name: 'Expert Factory', output: 'Care reason, journeys, community use cases' },
  { key: 'academy', name: 'Academy Factory', output: 'Learning Pyramid per domain — not courses' },
  { key: 'project', name: 'Project Factory', output: 'Build something — labs, apps, archives' },
  { key: 'mentor', name: 'Mentor Factory', output: 'Mentor paths, study groups, curricula templates' },
] as const;

export const MENTOR_ENGINE_TAGLINE = 'Every expert path eventually reaches Mentor — not Complete Course.';
