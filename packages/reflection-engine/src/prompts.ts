import type { ProjectReflectionTemplate } from './types';

export const PASS_010_REFLECTION_ENGINE = 'Reflection Engine';

/** Exemplar reflection templates — every project ends with structured reflection */
export const REFLECTION_TEMPLATES: ProjectReflectionTemplate[] = [
  {
    slug: 'deliver-first-speech',
    project_slug: 'deliver-first-speech',
    domain_slug: 'public-speaking',
    display_name: 'Deliver First Speech',
    completion_prompts: [
      { slug: 'surprised', question: 'What surprised you?', sort_order: 1 },
      { slug: 'went-well', question: 'What went well?', sort_order: 2 },
      { slug: 'would-change', question: 'What would you change?', sort_order: 3 },
      { slug: 'learned', question: 'What did you learn?', sort_order: 4 },
    ],
    status: 'exemplar',
  },
  {
    slug: 'grow-first-tomatoes',
    project_slug: 'grow-first-tomatoes',
    domain_slug: 'gardening',
    display_name: 'Grow First Tomatoes',
    completion_prompts: [
      { slug: 'worked', question: 'What worked?', sort_order: 1 },
      { slug: 'failed', question: 'What failed?', sort_order: 2 },
      { slug: 'try-differently', question: 'What would you try differently?', sort_order: 3 },
    ],
    status: 'exemplar',
  },
  {
    slug: 'build-first-application',
    project_slug: 'build-first-application',
    domain_slug: 'ai-builder',
    display_name: 'Build First Application',
    completion_prompts: [
      { slug: 'hardest', question: 'What was hardest?', sort_order: 1 },
      { slug: 'skill-missing', question: 'What skill was missing?', sort_order: 2 },
      { slug: 'helped-most', question: 'What helped most?', sort_order: 3 },
    ],
    status: 'exemplar',
  },
];

export function getReflectionTemplate(projectSlug: string): ProjectReflectionTemplate | undefined {
  return REFLECTION_TEMPLATES.find((t) => t.project_slug === projectSlug);
}
