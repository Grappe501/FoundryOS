export type {
  HumanOutcome,
  LifeJourney,
  DomainPurpose,
  TransformationSystemComponent,
  TransformationSystemLink,
} from './types';

export {
  FOUNDRY_EQUATION,
  FOUNDRY_MISSION,
  FOUNDRY_EQUATION_FLOW,
  AGENCY_BRIDGE,
} from './equation';

export {
  FOUNDRY_OBJECT_HIERARCHY,
  COMMUNITY_SPEAKER_GRAPH_EXAMPLE,
  HIERARCHY_FLOW,
  type FoundryObjectLevel,
} from './hierarchy';

export {
  TRANSFORMATION_TEMPLATES,
  getTransformationTemplate,
  type TransformationTemplate,
  type TransformationTemplateSlug,
} from './templates';

export {
  DNA_REGISTRY,
  PUBLIC_SPEAKING_DNA,
  AI_BUILDER_DNA,
  getDomainDNA,
  type FoundryDNARecord,
} from './dna';

export { FOUNDRY_PRODUCTS, ACADEMIC_OPPORTUNITY } from './business-model';

export {
  PRIMARY_DASHBOARD_QUESTION,
  NORTH_STAR_NOT,
  TRANSFORMATION_DATA_VISION,
  PASS_009_FACTORY_NAME,
  PASS_009_FACTORY_MISSION,
} from './north-star';

export {
  SCOPE_DOCTRINE,
  TRANSFORMATION_SYSTEM_COMPONENTS,
  PASS_009_TITLE,
  PASS_009_GUIDANCE,
  PASS_009_NOT,
  PASS_009_IS,
  PASS_009_STATUS,
  ENTITY_WITHOUT_TRANSFORMATION,
  DEFENSIBILITY_FOCUS,
} from './scope';

export { REAL_MARKETS } from './markets';

export {
  LIFE_JOURNEYS_REGISTRY,
  getLifeJourney,
  getJourneysForOutcome,
} from './journeys/catalog';

export { COMMUNITY_LEADER_OUTCOMES } from './journeys/community-leader';

export {
  TRANSFORMATION_DATA_PRINCIPLE,
  EXAMPLE_TRANSFORMATION_INSIGHTS,
  type TransformationInsight,
} from './transformation-data';

export {
  buildTransformationSystemLinks,
  assessTransformationSystem,
  type TransformationSystem,
} from './transformation-system';

export {
  HUMAN_POTENTIAL_INFRASTRUCTURE,
  HUMAN_DEVELOPMENT_LAYERS,
  NOT_EDUCATION_NOT_SOCIAL_NOT_AI,
} from './infrastructure';

export {
  PURPOSE_QUESTION,
  DOMAIN_PURPOSE_EXAMPLES,
  getDomainPurpose,
} from './purpose';

export {
  HUMAN_OUTCOMES_REGISTRY,
  getHumanOutcome,
  getOutcomesForDomain,
} from './outcomes/catalog';

export {
  CORE_ENGINES,
  FOUNDRY_STARTS_WITH,
  OUTCOME_PRINCIPLE,
} from './engines';

export { ULTIMATE_FACTORY_ECOSYSTEM } from './factories';

export { TWENTY_YEAR_VISION } from './journey';
