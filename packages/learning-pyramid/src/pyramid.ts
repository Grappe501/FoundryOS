import type { PyramidLayer, PyramidLayerDef } from './types';

export const FOUNDRY_UNIVERSITY_TAGLINE = 'Not courses. Road to Mastery.';

export const TUTORING_VS_FOUNDRY = {
  tutoring: 'Pass the test',
  foundry: 'Become the expert',
} as const;

/** AI-era learning — understand, use, create, teach */
export const AI_ERA_LEARNING = ['Understand', 'Use', 'Create', 'Teach'] as const;

export const LEARNING_PYRAMID: PyramidLayerDef[] = [
  { layer: 'definitions', level: 1, question: 'What is it?', description: 'Simple explanations, visuals, examples' },
  { layer: 'concepts', level: 2, question: 'Why does it work?', description: 'Philosophy, mental models, intuition' },
  { layer: 'execution', level: 3, question: 'How do I use it?', description: 'Problems, exercises, labs, guided examples' },
  { layer: 'projects', level: 4, question: 'Build something', description: 'Real outputs — labs, apps, archives' },
  { layer: 'mastery', level: 5, question: 'Teach it', description: 'Mentor, guides, curricula, study groups' },
];

export function getLayer(layer: PyramidLayer): PyramidLayerDef | undefined {
  return LEARNING_PYRAMID.find((l) => l.layer === layer);
}
