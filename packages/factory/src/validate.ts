import type { AssemblyOutput } from './types';

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

/** Validate assembly output before scoring/storage */
export function validateAssembly(output: Partial<AssemblyOutput>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!output.entity?.slug) errors.push('entity.slug required');
  if (!output.entity?.display_name) errors.push('entity.display_name required');
  if (!output.content_pages?.length) errors.push('content_pages required');
  if (output.content_pages && output.content_pages.length < 11) {
    warnings.push(`expected 11 content types, got ${output.content_pages.length}`);
  }
  if (!output.seo?.canonical_url) errors.push('seo.canonical_url required');
  if (!output.encyclopedia?.sections?.length) errors.push('encyclopedia sections required');
  if (output.encyclopedia && output.encyclopedia.sections.length < 10) {
    warnings.push(`expected 10 encyclopedia sections, got ${output.encyclopedia.sections.length}`);
  }
  if (!output.relationships?.length) warnings.push('no relationships generated');
  if (!output.expert?.care_reason || output.expert.care_reason.length < 20) {
    errors.push('expert factory: care_reason required (Why should someone care?)');
  }
  if (!output.expert?.beginner_path) warnings.push('expert factory: beginner_path missing');
  if (!output.expert?.expert_path) warnings.push('expert factory: expert_path missing');
  if (!output.expert?.beginner_journey) warnings.push('expert factory: beginner_journey missing');
  if (!output.expert?.community_use_cases?.length) warnings.push('expert factory: community_use_cases missing');

  return { valid: errors.length === 0, errors, warnings };
}
