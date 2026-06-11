/** Reflection — what I learned after action */
export type ReflectionPrompt = {
  slug: string;
  question: string;
  sort_order: number;
};

export type ProjectReflectionTemplate = {
  slug: string;
  project_slug: string;
  domain_slug: string;
  display_name: string;
  completion_prompts: ReflectionPrompt[];
  status: 'exemplar' | 'planned';
};

export type TransformationInsight = {
  slug: string;
  path_slug: string;
  insight: string;
  source: 'reflection' | 'graph' | 'mentor';
  sample_size?: number;
  status: 'exemplar' | 'planned';
};
