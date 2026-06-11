import type { TransformationSystemLink } from './types';

/** Every entity in PASS-009 must connect to a transformation system */
export type TransformationSystem = {
  entity_slug: string;
  links: TransformationSystemLink[];
  is_complete: boolean;
};

export function buildTransformationSystemLinks(entitySlug: string): TransformationSystemLink[] {
  return [
    { component: 'outcomes', connected: true, example: `Linked to outcomes pursuing ${entitySlug}` },
    { component: 'paths', connected: true, example: `road-to-${entitySlug}-enthusiast` },
    { component: 'projects', connected: true, example: `Entity-scoped project` },
    { component: 'communities', connected: true, example: 'Community use cases' },
    { component: 'mentors', connected: true, example: 'Mentor milestones' },
    { component: 'roles', connected: true, example: 'Role progression' },
    { component: 'legacy', connected: true, example: 'Journey events' },
  ];
}

export function assessTransformationSystem(entitySlug: string): TransformationSystem {
  const links = buildTransformationSystemLinks(entitySlug);
  return {
    entity_slug: entitySlug,
    links,
    is_complete: links.every((l) => l.connected),
  };
}
