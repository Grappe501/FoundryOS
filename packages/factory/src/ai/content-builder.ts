import { generateContentPages } from '@foundry/content-engine';
import type { AssemblyInput, ContentBundle } from '../types';

/**
 * AI #2 — Content Builder
 * Overview, History, FAQ, Guides, Comparisons, Rankings, Collections, etc.
 */
export async function buildContent(input: AssemblyInput): Promise<ContentBundle> {
  const pages = generateContentPages({
    target_type: 'entity',
    target_slug: input.slug,
    target_display_name: input.topic,
    vertical_domain: input.vertical_domain,
    entity_type: input.entity_type,
  });

  return {
    pages,
    review_framework: {
      prompt: `Review ${input.topic} as an expert in ${input.entity_type}.`,
      criteria: ['accuracy', 'specificity', 'usefulness', 'tone', 'completeness'],
    },
  };
}
