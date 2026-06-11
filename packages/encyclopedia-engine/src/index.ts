export type {
  EncyclopediaSectionSlug,
  EncyclopediaSection,
  EncyclopediaSectionContent,
  EncyclopediaEntry,
  EncyclopediaInput,
  GeographicPerspective,
  EncyclopediaSource,
} from './types';

export { ENCYCLOPEDIA_SECTIONS, getSection } from './sections';
export { generateEncyclopedia, encyclopediaPath } from './generate';

export type { AcademyLevel, AcademyLesson, AcademyCurriculum } from './academy/types';
export { BOURBON_ACADEMY, ACADEMY_CURRICULA, getAcademyForVertical, academyUrl } from './academy/curricula';

export type { RecipeItemType, RecipeItem, RecipeCollection } from './recipes/types';
export { generateRecipesForEntity } from './recipes/generate';

export type { KnowledgeDomain, UserKnowledgeProfile } from './knowledge-profile/types';

export type {
  SemanticSearchScope,
  SemanticSearchQuery,
  SemanticSearchResult,
} from './search/types';
export { SEMANTIC_SEARCH_EXAMPLES } from './search/types';

export type { ClubIntelligence, UserContributionType } from './community/types';

/** Foundry Knowledge Universe — the actual moat */
export const KNOWLEDGE_UNIVERSE_LAYERS = [
  'Encyclopedia',
  'Academy',
  'Recipes & Paths',
  'Knowledge Profiles',
  'Semantic Search',
  'Friend Group Intelligence',
  'Community Contributions',
] as const;
