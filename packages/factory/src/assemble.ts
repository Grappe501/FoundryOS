import { generateEncyclopedia, generateRecipesForEntity } from '@foundry/encyclopedia-engine';
import { buildContent } from './ai/content-builder';
import { buildEntity } from './ai/entity-builder';
import { buildRelationships } from './ai/relationship-builder';
import { buildSeo } from './ai/seo-builder';
import { generateExpertAssets } from './expert-factory';
import { decidePublish } from './publish-decision';
import { scoreAssembly } from './score';
import type { AssemblyInput, AssemblyOutput, PipelineStage } from './types';
import { validateAssembly } from './validate';

function runId(): string {
  return `factory-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Self-Assembly Engine v1
 *
 * OpenAI → Generate → Validate → Score → Store → Publish Decision
 * v1: structural generation (AI enrichment optional via OPENAI_API_KEY later)
 */
export async function assembleEntity(input: AssemblyInput): Promise<AssemblyOutput> {
  const stages: PipelineStage[] = [];

  // Generate (AI #1–4)
  const [entity, content, relationships, seo] = await Promise.all([
    buildEntity(input),
    buildContent(input),
    buildRelationships(input),
    buildSeo(input),
  ]);

  const encyclopedia = generateEncyclopedia({
    entity_slug: input.slug,
    entity_display_name: input.topic,
    entity_type: input.entity_type,
    vertical_id: input.vertical_id,
    vertical_domain: input.vertical_domain,
    attributes: input.attributes,
  });

  const recipes = generateRecipesForEntity(input.slug, input.entity_type, input.vertical_id ?? 'unknown');
  const expert = generateExpertAssets(input);

  stages.push('generate');

  const content_pages = content.pages.map((p) => ({
    ...p,
    content_score: 0,
  }));

  let output: Omit<AssemblyOutput, 'overall_score' | 'page_scores' | 'publish_decision'> = {
    run_id: runId(),
    input,
    entity,
    content,
    relationships,
    seo,
    content_pages,
    encyclopedia,
    recipes,
    expert,
    stages_completed: stages,
    generated_at: new Date().toISOString(),
    status: 'draft',
  };

  // Validate
  const validation = validateAssembly(output);
  if (!validation.valid) {
    throw new Error(`Factory validation failed: ${validation.errors.join(', ')}`);
  }
  stages.push('validate');

  // Score
  const { overall_score, page_scores } = scoreAssembly(output);
  output.content_pages = content_pages.map((p) => ({
    ...p,
    content_score: page_scores[p.content_type] ?? 0,
  }));
  stages.push('score');

  // Publish decision (always hold in v1 — not published automatically)
  const publish_decision = decidePublish(overall_score, true);
  stages.push('publish_decision', 'queued');

  return {
    ...output,
    overall_score,
    page_scores,
    publish_decision,
    stages_completed: stages,
    status: 'queued',
  };
}

/** Alias for npm run build:topic */
export async function assembleTopic(input: AssemblyInput): Promise<AssemblyOutput> {
  return assembleEntity(input);
}
