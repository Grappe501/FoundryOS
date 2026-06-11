export type { PyramidLayer, PyramidLayerDef, AcademicDomain } from './types';

export {
  FOUNDRY_UNIVERSITY_TAGLINE,
  TUTORING_VS_FOUNDRY,
  AI_ERA_LEARNING,
  LEARNING_PYRAMID,
  getLayer,
} from './pyramid';

export {
  ACADEMIC_DOMAIN_CATALOG,
  ACADEMIC_DOMAIN_EXAMPLES,
  getAcademicDomain,
} from './academic/catalog';

export { CALCULUS_DOMAIN } from './academic/calculus';
export { PHYSICS_DOMAIN } from './academic/physics';
export { CHEMISTRY_DOMAIN } from './academic/chemistry';
export { HISTORY_DOMAIN } from './academic/history';
export { COMPUTER_SCIENCE_DOMAIN, ROAD_TO_AI_BUILDER } from './academic/computer-science';

/** What we do */
export const LIFELONG_EXPERT_DEVELOPMENT = {
  headline: 'Lifelong Expert Development',
  not_owned_by: ['MasterClass', 'Universities', 'YouTube', 'Wikipedia', 'ChatGPT'],
  foundry_owns: 'Beginner → Expert → Mentor across academics, careers, hobbies, communities, leadership, trades, personal growth',
} as const;
