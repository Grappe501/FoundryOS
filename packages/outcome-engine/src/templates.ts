/**
 * Transformation Templates — factory assembles domains from templates,
 * not invented structure every time.
 */
export type TransformationTemplateSlug = 'hobby' | 'academic' | 'career' | 'leadership';

export type TransformationTemplate = {
  slug: TransformationTemplateSlug;
  display_name: string;
  description: string;
  layers: string[];
  /** Maps to hierarchy keys the template emphasizes */
  hierarchy_levels: string[];
};

export const TRANSFORMATION_TEMPLATES: TransformationTemplate[] = [
  {
    slug: 'hobby',
    display_name: 'Hobby Template',
    description: 'Passion domains — knowledge through legacy via practice and community.',
    layers: ['Knowledge', 'Path', 'Projects', 'Community', 'Mentorship', 'Legacy'],
    hierarchy_levels: ['domain', 'path', 'project', 'community', 'mentorship', 'legacy'],
  },
  {
    slug: 'academic',
    display_name: 'Academic Template',
    description: 'Disciplines — definitions through research, not isolated courses.',
    layers: ['Definitions', 'Concepts', 'Execution', 'Projects', 'Research', 'Mentorship'],
    hierarchy_levels: ['domain', 'knowledge', 'path', 'project', 'entity', 'mentorship'],
  },
  {
    slug: 'career',
    display_name: 'Career Template',
    description: 'Professional growth — skills through leadership and mentorship.',
    layers: ['Skills', 'Projects', 'Experience', 'Leadership', 'Mentorship'],
    hierarchy_levels: ['domain', 'project', 'path', 'role', 'mentorship'],
  },
  {
    slug: 'leadership',
    display_name: 'Leadership Template',
    description: 'Influence domains — communication through teaching others.',
    layers: ['Communication', 'Influence', 'Projects', 'Community', 'Teaching'],
    hierarchy_levels: ['domain', 'path', 'project', 'community', 'mentorship', 'legacy'],
  },
];

export function getTransformationTemplate(slug: TransformationTemplateSlug): TransformationTemplate | undefined {
  return TRANSFORMATION_TEMPLATES.find((t) => t.slug === slug);
}
