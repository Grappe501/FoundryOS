import type { AssemblyOutput } from './types';

/**
 * Score generated content — publish gate uses overall_score >= 70
 * v1: heuristic scoring (AI scoring in later pass)
 */
export function scoreAssembly(output: Omit<AssemblyOutput, 'overall_score' | 'page_scores' | 'publish_decision'>): {
  overall_score: number;
  page_scores: Record<string, number>;
} {
  const page_scores: Record<string, number> = {};

  for (const page of output.content_pages) {
    let score = 40;
    if (page.title && page.title.length > 10) score += 15;
    if (page.path) score += 10;
    if (page.content_source === 'generated') score += 5;
    page_scores[page.content_type] = Math.min(score, 85);
  }

  let overall = 0;
  if (output.entity.description && output.entity.description.length > 20) overall += 15;
  if (Object.keys(output.entity.attributes).length > 0) overall += 10;
  if (output.content_pages.length >= 11) overall += 25;
  if (output.relationships.length > 0) overall += 15;
  if (output.seo.structured_data.length > 0) overall += 15;
  if (output.seo.internal_links.length >= 3) overall += 10;
  if (output.encyclopedia?.sections?.length >= 10) overall += 10;
  if (output.expert?.care_reason && output.expert.care_reason.length > 50) overall += 10;
  if (output.expert?.beginner_path && output.expert?.expert_path) overall += 5;
  if (output.expert?.beginner_journey && output.expert?.expert_journey) overall += 5;
  if (output.expert?.community_use_cases?.length) overall += 5;
  if (output.expert?.search_context?.keywords?.length) overall += 5;

  const pageAvg =
    Object.values(page_scores).reduce((a, b) => a + b, 0) /
    Math.max(Object.values(page_scores).length, 1);

  overall = Math.round(Math.min(100, overall * 0.6 + pageAvg * 0.4));

  return { overall_score: overall, page_scores };
}
