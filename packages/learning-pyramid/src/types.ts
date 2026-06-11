/**
 * Foundry Learning Pyramid — not courses. Road to Mastery.
 * AI handles recall. Humans develop judgment.
 */

export type PyramidLayer =
  | 'definitions'  // What is it?
  | 'concepts'     // Why does it work?
  | 'execution'    // How do I use it?
  | 'projects'     // Build something
  | 'mastery';     // Teach it

export type PyramidLayerDef = {
  layer: PyramidLayer;
  level: 1 | 2 | 3 | 4 | 5;
  question: string;
  description: string;
};

export type AcademicDomain = {
  slug: string;
  display_name: string;
  discipline: string;
  care_reason: string;
  /** Layer content templates — not memorization, understanding */
  layers: Record<PyramidLayer, string[]>;
  road_slug: string;
  status: 'exemplar' | 'planned';
};
