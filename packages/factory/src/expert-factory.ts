import type { AcademyCurriculum } from '@foundry/encyclopedia-engine';
import type { MasteryPath } from '@foundry/path-engine';
import type { AssemblyInput } from './types';

export type ComparisonDraft = {
  slug: string;
  title: string;
  compare_entity_slugs: string[];
  summary: string;
  status: 'draft';
};

export type TriviaDraft = {
  slug: string;
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  status: 'draft';
};

export type CollectionSuggestionDraft = {
  slug: string;
  title: string;
  description: string;
  suggested_entity_slugs: string[];
  status: 'draft';
};

export type RankingDraft = {
  slug: string;
  title: string;
  criteria: string[];
  seed_entity_slugs: string[];
  status: 'draft';
};

export type CommunityChallengeDraft = {
  slug: string;
  title: string;
  description: string;
  path_slug: string;
  duration_days: number;
  status: 'draft';
};

export type SearchContextDraft = {
  entity_slug: string;
  keywords: string[];
  semantic_tags: string[];
  related_verticals: string[];
  traverse_layers: Array<'encyclopedia' | 'academy' | 'collections' | 'reviews' | 'paths' | 'clubs'>;
};

export type CommunityUseCaseDraft = {
  slug: string;
  title: string;
  why_community_cares: string;
  suggested_activities: string[];
  status: 'draft';
};

export type TransformationJourneyDraft = {
  slug: string;
  journey_type: 'beginner' | 'expert';
  title: string;
  narrative: string;
  year_span: string;
  milestones: string[];
  status: 'draft';
};

/** PASS-009 gate — every entity must answer this */
export const ENTITY_CARE_QUESTION = 'Why should someone care?';

/** Foundry organizes transformation, not information */
export const TRANSFORMATION_PRINCIPLE =
  'Foundry is not organizing information. Foundry is organizing transformation.';

/** PASS-009: Expert Factory — everything an entity needs to create experts */
export type ExpertFactoryOutput = {
  /** Required — not just "what is it?" but "why care?" */
  care_reason: string;
  academy: AcademyCurriculum;
  comparisons: ComparisonDraft[];
  trivia: TriviaDraft[];
  collection_suggestions: CollectionSuggestionDraft[];
  rankings: RankingDraft[];
  beginner_path: MasteryPath;
  expert_path: MasteryPath;
  beginner_journey: TransformationJourneyDraft;
  expert_journey: TransformationJourneyDraft;
  community_use_cases: CommunityUseCaseDraft[];
  community_challenges: CommunityChallengeDraft[];
  search_context: SearchContextDraft;
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * When an entity is created, generate expert-development assets as drafts.
 * OpenAI generates → Supabase owns → score → queue.
 */
export function generateExpertAssets(input: AssemblyInput): ExpertFactoryOutput {
  const entitySlug = input.slug;
  const name = input.topic;
  const verticalSlug = input.vertical_domain.replace(/\.foundryos\.com$/, '').split('.').pop() ?? input.vertical_domain;

  const academy: AcademyCurriculum = {
    vertical_id: input.vertical_id ?? input.vertical_domain,
    vertical_slug: verticalSlug,
    display_name: `${name} Academy`,
    academy_path: `/academy/${entitySlug}`,
    levels: [
      {
        level: 1,
        title: `Introduction to ${name}`,
        lessons: [
          {
            slug: `${entitySlug}-basics`,
            level: 1,
            title: `${name} essentials`,
            description: `Foundational knowledge about ${name}`,
            entity_slugs: [entitySlug],
            estimated_minutes: 15,
            path: `/academy/${entitySlug}/basics`,
          },
        ],
      },
      {
        level: 2,
        title: `Deep dive: ${name}`,
        lessons: [
          {
            slug: `${entitySlug}-deep-dive`,
            level: 2,
            title: `Expert context for ${name}`,
            description: `History, comparisons, and mastery context`,
            entity_slugs: [entitySlug],
            estimated_minutes: 30,
            path: `/academy/${entitySlug}/deep-dive`,
          },
        ],
      },
    ],
  };

  const beginner_path: MasteryPath = {
    slug: `road-to-${entitySlug}-enthusiast`,
    display_name: `Road to ${name} Enthusiast`,
    tagline: `From curious to confident with ${name}`,
    vertical_id: input.vertical_id ?? input.vertical_domain,
    vertical_slug: verticalSlug,
    tier: 'enthusiast',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'reviews'],
    estimated_weeks: 4,
    status: 'draft',
    milestones: [
      {
        slug: `learn-${entitySlug}-basics`,
        category: 'learn',
        title: `Learn ${name} basics`,
        description: `Complete entity academy introduction`,
        requirement: 'Complete Academy Level 1',
        academy_lesson_slug: `${entitySlug}-basics`,
        sort_order: 1,
      },
      {
        slug: `experience-review-${entitySlug}`,
        category: 'experience',
        title: `Review ${name}`,
        description: 'Publish your first review',
        requirement: '1 review',
        target_count: 1,
        sort_order: 2,
      },
    ],
  };

  const expert_path: MasteryPath = {
    slug: `road-to-${entitySlug}-expert`,
    display_name: `Road to ${name} Expert`,
    tagline: `Recognized expertise around ${name}`,
    vertical_id: input.vertical_id ?? input.vertical_domain,
    vertical_slug: verticalSlug,
    tier: 'expert',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'collections', 'contribute', 'mentor', 'community'],
    estimated_weeks: 24,
    status: 'draft',
    milestones: [
      {
        slug: `learn-${entitySlug}-mastery`,
        category: 'learn',
        title: `Master ${name} context`,
        description: 'Complete deep-dive academy + encyclopedia',
        requirement: 'Academy Level 2 + encyclopedia',
        academy_lesson_slug: `${entitySlug}-deep-dive`,
        encyclopedia_sections: ['history', 'expert_perspective'],
        sort_order: 1,
      },
      {
        slug: `contribute-${entitySlug}-guide`,
        category: 'contribute',
        title: `Write a ${name} guide`,
        description: 'Publish editorial guide',
        requirement: '1 guide',
        target_count: 1,
        sort_order: 2,
      },
      {
        slug: `mentor-${entitySlug}`,
        category: 'mentor',
        title: 'Help newcomers',
        description: 'Answer questions in community',
        requirement: '5 helpful responses',
        target_count: 5,
        sort_order: 3,
      },
    ],
  };

  const care_reason = `${name} matters because it is a gateway to real expertise — not just facts. ` +
    `Understanding ${name} helps you build taste, context, and community around ${verticalSlug}. ` +
    `Foundry organizes your transformation from curious beginner to recognized expert.`;

  const beginner_journey: TransformationJourneyDraft = {
    slug: `${entitySlug}-beginner-journey`,
    journey_type: 'beginner',
    title: `Beginner journey: ${name}`,
    narrative: `Start curious. Learn what ${name} is and why it matters. Review, collect, join a path.`,
    year_span: 'Year 1',
    milestones: [
      `Discover ${name}`,
      `Complete first academy lesson`,
      `Publish first review`,
      `Start Road to ${name} Enthusiast`,
    ],
    status: 'draft',
  };

  const expert_journey: TransformationJourneyDraft = {
    slug: `${entitySlug}-expert-journey`,
    journey_type: 'expert',
    title: `Expert journey: ${name}`,
    narrative: `Years of paths, projects, and community. Mentor others. Earn recognized expertise.`,
    year_span: 'Years 3–20',
    milestones: [
      `Complete expert path`,
      `Host community project`,
      `Mentor newcomers`,
      `Legacy profile`,
    ],
    status: 'draft',
  };

  return {
    care_reason,
    academy,
    comparisons: [
      {
        slug: `${entitySlug}-vs-similar`,
        title: `${name} vs similar`,
        compare_entity_slugs: [entitySlug],
        summary: `Draft comparison framework for ${name}`,
        status: 'draft',
      },
    ],
    trivia: [
      {
        slug: `${entitySlug}-trivia-1`,
        question: `What makes ${name} distinctive?`,
        answer: `Draft answer for ${name} — scored and queued`,
        difficulty: 'beginner',
        status: 'draft',
      },
    ],
    collection_suggestions: [
      {
        slug: `${entitySlug}-starter-collection`,
        title: `Starter collection: ${name}`,
        description: `Essential entities to understand ${name}`,
        suggested_entity_slugs: [entitySlug],
        status: 'draft',
      },
    ],
    rankings: [
      {
        slug: `${slugify(name)}-community-ranking`,
        title: `Community ranking: ${name} peers`,
        criteria: ['quality', 'popularity', 'expertise'],
        seed_entity_slugs: [entitySlug],
        status: 'draft',
      },
    ],
    beginner_path,
    expert_path,
    beginner_journey,
    expert_journey,
    community_use_cases: [
      {
        slug: `${entitySlug}-tasting-club`,
        title: `Blind tasting club around ${name}`,
        why_community_cares: `Shared tastings build vocabulary and belonging around ${name}`,
        suggested_activities: ['Monthly blind tasting', 'Rankings vote', 'Academy path for newcomers'],
        status: 'draft',
      },
      {
        slug: `${entitySlug}-collector-circle`,
        title: `Collector circle for ${name}`,
        why_community_cares: `Collectors compare notes, shelves, and discoveries`,
        suggested_activities: ['Shelf comparisons', 'Want list trades', 'Distillery visit project'],
        status: 'draft',
      },
    ],
    community_challenges: [
      {
        slug: `${entitySlug}-30-day-challenge`,
        title: `30-day ${name} challenge`,
        description: `Community challenge to master ${name} basics`,
        path_slug: beginner_path.slug,
        duration_days: 30,
        status: 'draft',
      },
    ],
    search_context: {
      entity_slug: entitySlug,
      keywords: [name, input.entity_type, verticalSlug],
      semantic_tags: [input.entity_type, 'expert-development', verticalSlug],
      related_verticals: [verticalSlug],
      traverse_layers: ['encyclopedia', 'academy', 'collections', 'reviews', 'paths', 'clubs'],
    },
  };
}

export const EXPERT_FACTORY_OUTPUTS = [
  'Care Reason',
  'Encyclopedia',
  'Academy',
  'Recipes',
  'Comparisons',
  'Trivia',
  'Collections',
  'Rankings',
  'Beginner Path',
  'Expert Path',
  'Beginner Journey',
  'Expert Journey',
  'Projects',
  'Community Use Cases',
  'Community Challenges',
  'Related Entities',
  'Search Context',
] as const;
