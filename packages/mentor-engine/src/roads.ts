import type { MasteryRoad } from './types';

function academicRoad(
  slug: string,
  display_name: string,
  domain_slug: string,
  levels: Array<{ name: string; layer: MasteryRoad['levels'][0]['layer'] }>
): MasteryRoad {
  return {
    slug,
    display_name,
    domain_slug,
    pyramid_layers: ['definitions', 'concepts', 'execution', 'projects', 'mastery'],
    status: 'exemplar' as const,
    levels: levels.map((l, i) => ({
      level: i + 1,
      name: l.name,
      layer: l.layer,
      milestones: [
        {
          slug: `${slug}-level-${i + 1}`,
          title: l.name,
          description: `Complete ${l.layer} layer for ${display_name}`,
          requirement: `Layer ${i + 1}: ${l.name}`,
          sort_order: 1,
        },
      ],
    })),
  };
}

export const ROAD_TO_PHYSICS_EXPERT = academicRoad('road-to-physics-expert', 'Road to Physics Expert', 'physics', [
  { name: 'Learn', layer: 'definitions' },
  { name: 'Apply', layer: 'execution' },
  { name: 'Build', layer: 'projects' },
  { name: 'Research', layer: 'concepts' },
  { name: 'Mentor', layer: 'mastery' },
]);

export const ROAD_TO_AI_BUILDER = academicRoad('road-to-ai-builder', 'Road to AI Builder', 'computer-science', [
  { name: 'Learn', layer: 'definitions' },
  { name: 'Apply', layer: 'execution' },
  { name: 'Build', layer: 'projects' },
  { name: 'Ship', layer: 'projects' },
  { name: 'Mentor', layer: 'mastery' },
]);

export const ROAD_TO_MENTOR = {
  slug: 'road-to-mentor',
  display_name: 'Road to Mentor',
  tagline: 'The ultimate path — helping others become who they want to be',
  description: 'After Programmer, Historian, Speaker, Entrepreneur — teach the next generation.',
  status: 'planned' as const,
};

export const MASTERY_ROAD_CATALOG: MasteryRoad[] = [
  ROAD_TO_PHYSICS_EXPERT,
  ROAD_TO_AI_BUILDER,
];

export function getMasteryRoad(slug: string): MasteryRoad | undefined {
  return MASTERY_ROAD_CATALOG.find((r) => r.slug === slug);
}
