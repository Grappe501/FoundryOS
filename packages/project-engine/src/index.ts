export type {
  ProjectCategory,
  ProjectStatus,
  FoundryProject,
  ProjectStep,
  UserProjectProgress,
  JourneyEvent,
} from './types';

export {
  PROJECT_CATALOG,
  getProject,
  getProjectsForVertical,
  getProjectsForPath,
  getActiveProjects,
} from './projects/catalog';

export { BOURBON_PROJECTS } from './projects/bourbon';

export {
  assembleProject,
  calculateProjectProgress,
  type ProjectAssembly,
} from './assemble';

export {
  LIFE_GRAPHS,
  EXAMPLE_STEVE_JOURNEY,
  EXAMPLE_STEVE_JOURNEY_TIMELINE,
  buildJourneyStory,
  type LifeGraphKey,
  type JourneyStoryNode,
} from './life-graph';

export {
  MOBILE_HOME_QUESTION,
  MOBILE_HOME_SECTIONS,
  MOBILE_HOME_REJECTED,
  MOBILE_APP_NAME,
} from './mobile-home';

export {
  PASS_GATE_QUESTION,
  PASS_GATE_RULE,
  FOUNDRY_OUTCOME,
  HUMAN_OS_PRODUCT,
  HUMAN_OS_COMPONENTS,
  REMEMBERS_JOURNEYS,
  SCALE_VISION,
} from './gate';
