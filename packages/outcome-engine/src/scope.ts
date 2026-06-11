/**
 * Scope protection — infrastructure, not everything to everyone.
 */
export const SCOPE_DOCTRINE = {
  opportunity:
    'Become the infrastructure that powers Knowledge, Mastery, Projects, Community, Identity, Legacy, Mentorship, Purpose, and Outcomes.',
  risk: 'Becoming everything to everyone by building each layer forever without the equation.',
  rule: 'Build transformation systems — not isolated features.',
} as const;

/** PASS-009: entities connect to transformation systems, not standalone information */
export const TRANSFORMATION_SYSTEM_COMPONENTS = [
  'outcomes',
  'paths',
  'projects',
  'communities',
  'mentors',
  'roles',
  'legacy',
] as const;

export const PASS_009_TITLE = 'Transformation System Factory';

export const PASS_009_GUIDANCE =
  "Don't think about generating entities. Think about generating Transformation Systems.";

export const PASS_009_NOT = 'Entity Factory';

export const PASS_009_IS =
  'Manufacture entire transformation ecosystems — Life Journey through Legacy — from DNA blueprints and templates.';

/** Leadership sign-off — PASS-009 approved */
export const PASS_009_STATUS = 'approved' as const;

export const ENTITY_WITHOUT_TRANSFORMATION =
  'An entity by itself is just information. An entity connected to a transformation system becomes part of a journey.';

/** PASS-009+ — content is byproduct of the transformation graph */
export const DEFENSIBILITY_FOCUS =
  'PASS-009 is the first pass about defensibility. The moat is the Transformation Graph — not AI, content, or courses.';
