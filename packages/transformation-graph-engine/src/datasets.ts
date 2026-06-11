/**
 * Three compounding datasets — Foundry's future assets.
 */
export const COMPOUNDING_DATASETS = [
  {
    key: 'knowledge',
    name: 'Knowledge Dataset',
    question: 'What exists?',
    source: 'Encyclopedia, entities, content',
    status: 'building' as const,
  },
  {
    key: 'transformation',
    name: 'Transformation Dataset',
    question: 'What actions work?',
    source: 'Projects, evidence, graph weighting, velocity',
    status: 'building' as const,
  },
  {
    key: 'wisdom',
    name: 'Wisdom Dataset',
    question: 'What people learned?',
    source: 'Reflection Engine — rare',
    status: 'foundational' as const,
  },
  {
    key: 'journey',
    name: 'Journey Dataset',
    question: 'How people changed over time?',
    source: 'Longitudinal graph — foundation for Stories and Patterns',
    status: 'emerging' as const,
  },
] as const;

export const WISDOM_DATASET_PRINCIPLE =
  'The Reflection Engine creates the Wisdom Dataset. That is rare.';

export const JOURNEY_DATASET_PRINCIPLE =
  'The Journey Dataset — how people changed over time — becomes the foundation for Transformation Stories and Transformation Patterns.';
