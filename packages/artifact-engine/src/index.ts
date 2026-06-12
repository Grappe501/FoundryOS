export type {
  ArtifactType,
  ArtifactRelationType,
  ArtifactPrivacy,
  ArtifactEvidenceLevel,
  GraphEntityRef,
  ArtifactRelation,
  ArtifactMetadata,
  FoundryArtifact,
  ArtifactSemanticRole,
  CreateArtifactInput,
} from './types';
export {
  ARTIFACT_TYPES,
  WORLD_ARTIFACT_EXAMPLES,
  artifactTypesForWorld,
  semanticRolesForType,
} from './registry';
export { ARTIFACT_PROGRESSION, type ArtifactProgressionStage } from './progression';
export {
  createArtifact,
  getArtifact,
  listArtifacts,
  countUserArtifacts,
  linkArtifactToGraphNode,
  validateArtifactEngine,
  getArtifactEngineStats,
} from './engine';
