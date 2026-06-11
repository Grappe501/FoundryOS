import type { AssemblyOutput, FactoryRunRecord } from './types';

/**
 * Store assembly output in Supabase (content_pages, entities, factory_runs).
 * OpenAI generates. Supabase owns.
 *
 * v1: returns store plan — CLI/seed applies when service role available.
 */
export type StorePlan = {
  entity_insert: Record<string, unknown>;
  content_page_inserts: Record<string, unknown>[];
  relationship_inserts: Record<string, unknown>[];
  encyclopedia_inserts: Record<string, unknown>[];
  recipe_inserts: Record<string, unknown>[];
  mastery_path_inserts: Record<string, unknown>[];
  expert_factory_inserts: Record<string, unknown>[];
  factory_run: FactoryRunRecord;
};

export function buildStorePlan(output: AssemblyOutput): StorePlan {
  return {
    entity_insert: {
      slug: output.entity.slug,
      display_name: output.entity.display_name,
      entity_type: output.entity.entity_type,
      description: output.entity.description,
      metadata: output.entity.metadata,
      status: 'draft',
    },
    content_page_inserts: output.content_pages.map((p) => ({
      path: p.path,
      title: p.title,
      status: 'draft',
      content_source: p.content_source,
      content_score: p.content_score,
      minimum_publish_score: p.minimum_publish_score,
    })),
    encyclopedia_inserts: output.encyclopedia.sections.map((s) => ({
      entity_slug: output.entity.slug,
      section_slug: s.section,
      title: s.title,
      body: s.body,
      metadata: s.metadata,
      sources: s.sources,
      content_score: s.content_score,
      status: 'draft',
    })),
    recipe_inserts: output.recipes.items.map((r) => ({
      slug: r.slug,
      item_type: r.item_type,
      title: r.title,
      path: r.path,
      status: 'draft',
    })),
    relationship_inserts: output.relationships.map((r) => ({
      relationship_type: r.relationship_type,
      target_slug: r.target_slug,
      strength: r.strength,
      metadata: r.metadata,
    })),
    mastery_path_inserts: [output.expert.beginner_path, output.expert.expert_path].map((p) => ({
      slug: p.slug,
      display_name: p.display_name,
      tagline: p.tagline,
      vertical_slug: p.vertical_slug,
      tier: p.tier,
      assembled_from: p.assembled_from,
      milestones: p.milestones,
      estimated_weeks: p.estimated_weeks,
      status: 'draft',
      entity_slug: output.entity.slug,
    })),
    expert_factory_inserts: [
      {
        entity_slug: output.entity.slug,
        output_type: 'care_reason',
        payload: { reason: output.expert.care_reason },
        status: 'draft',
      },
      {
        entity_slug: output.entity.slug,
        output_type: 'academy',
        payload: output.expert.academy,
        status: 'draft',
      },
      {
        entity_slug: output.entity.slug,
        output_type: 'beginner_journey',
        payload: output.expert.beginner_journey,
        status: 'draft',
      },
      {
        entity_slug: output.entity.slug,
        output_type: 'expert_journey',
        payload: output.expert.expert_journey,
        status: 'draft',
      },
      {
        entity_slug: output.entity.slug,
        output_type: 'search_context',
        payload: output.expert.search_context,
        status: 'draft',
      },
      ...output.expert.comparisons.map((c) => ({
        entity_slug: output.entity.slug,
        output_type: 'comparison' as const,
        payload: c,
        status: 'draft' as const,
      })),
      ...output.expert.community_use_cases.map((c) => ({
        entity_slug: output.entity.slug,
        output_type: 'community_use_case' as const,
        payload: c,
        status: 'draft' as const,
      })),
      ...output.expert.community_challenges.map((c) => ({
        entity_slug: output.entity.slug,
        output_type: 'community_challenge' as const,
        payload: c,
        status: 'draft' as const,
      })),
    ],
    factory_run: {
      id: output.run_id,
      run_type: 'entity',
      input: output.input,
      output,
      status: output.status,
      overall_score: output.overall_score,
      publish_decision: output.publish_decision,
    },
  };
}
