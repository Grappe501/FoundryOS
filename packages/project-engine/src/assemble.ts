import type { FoundryProject } from './types';

export type ProjectAssembly = {
  project: FoundryProject;
  connects_to: {
    path?: string;
    knowledge: boolean;
    academy: boolean;
    community: boolean;
    identity: boolean;
  };
  total_steps: number;
};

/** Projects sit between knowledge and visible expertise */
export function assembleProject(project: FoundryProject): ProjectAssembly {
  return {
    project,
    connects_to: {
      path: project.path_slug,
      knowledge: true,
      academy: project.category === 'experience' || project.category === 'document',
      community: project.category === 'host' || project.category === 'organize',
      identity: true,
    },
    total_steps: project.steps.length,
  };
}

export function calculateProjectProgress(
  project: FoundryProject,
  completedStepSlugs: string[]
): { progress_pct: number; steps_completed: string[]; steps_total: number } {
  const total = project.steps.length;
  const completed = completedStepSlugs.filter((s) => project.steps.some((step) => step.slug === s));
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  return { progress_pct: pct, steps_completed: completed, steps_total: total };
}
