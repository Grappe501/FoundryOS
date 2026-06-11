export type {
  AssemblyInput,
  AssemblyOutput,
  PipelineStage,
  PublishDecision,
  EntityDraft,
  RelationshipDraft,
  SeoDraft,
  ContentBundle,
  FactoryRunRecord,
} from './types';

export { assembleEntity, assembleTopic } from './assemble';
export { validateAssembly } from './validate';
export { scoreAssembly } from './score';
export { decidePublish } from './publish-decision';
export { buildStorePlan, type StorePlan } from './store';

export {
  generateExpertAssets,
  EXPERT_FACTORY_OUTPUTS,
  type ExpertFactoryOutput,
  type ComparisonDraft,
  type TriviaDraft,
  type CollectionSuggestionDraft,
  type RankingDraft,
  type CommunityChallengeDraft,
  type CommunityUseCaseDraft,
  type TransformationJourneyDraft,
  type SearchContextDraft,
  ENTITY_CARE_QUESTION,
  TRANSFORMATION_PRINCIPLE,
} from './expert-factory';

export { buildEntity } from './ai/entity-builder';
export { buildContent } from './ai/content-builder';
export { buildRelationships } from './ai/relationship-builder';
export { buildSeo } from './ai/seo-builder';

/** Foundry Factory pipeline — PASS-009 manufactures transformation systems */
export const FACTORY_PIPELINE = [
  'Life Journeys + Outcomes Registry',
  'Transformation Templates + DNA Blueprints',
  'Transformation System Factory',
  'Four Engines (Knowledge · Mastery · Project · Community)',
  'Identity + Legacy',
  'Vertical Resolver',
  'Deployment Engine',
] as const;

export {
  FOUR_ENGINES,
  SELF_ASSEMBLY_STACK,
  SELF_ASSEMBLY_PRINCIPLE,
  FOUNDRY_FACTORY_ECOSYSTEM,
  IDENTITY_DOMAIN_CATEGORIES,
  IDENTITY_DOMAIN_CATALOG,
} from '@foundry/domain-registry';

export {
  LEARNING_PYRAMID,
  FOUNDRY_UNIVERSITY_TAGLINE,
  LIFELONG_EXPERT_DEVELOPMENT,
  ACADEMIC_DOMAIN_CATALOG,
} from '@foundry/learning-pyramid';

export {
  MENTOR_ENGINE_TAGLINE,
  ROAD_TO_MENTOR,
  MASTERY_ROAD_CATALOG,
} from '@foundry/mentor-engine';

export {
  CORE_ENGINES,
  PURPOSE_QUESTION,
  HUMAN_OUTCOMES_REGISTRY,
  HUMAN_DEVELOPMENT_LAYERS,
  HUMAN_POTENTIAL_INFRASTRUCTURE,
  OUTCOME_PRINCIPLE,
  FOUNDRY_STARTS_WITH,
  ULTIMATE_FACTORY_ECOSYSTEM,
  TWENTY_YEAR_VISION,
  DOMAIN_PURPOSE_EXAMPLES,
  FOUNDRY_EQUATION,
  FOUNDRY_MISSION,
  PASS_009_GUIDANCE,
  SCOPE_DOCTRINE,
} from '@foundry/outcome-engine';

export { validateTransformationSystem, ENTITY_WITHOUT_TRANSFORMATION } from './transformation-system';

export {
  manufactureTransformationSystem,
  assembleTransformationEcosystem,
  validateTransformationEcosystem,
  generateEcosystemAssets,
  PASS_009_FACTORY_NAME,
  PASS_009_FACTORY_MISSION,
  type TransformationEcosystemBlueprint,
} from './transformation-system-factory';
