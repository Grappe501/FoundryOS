import type { MasteryPath, PathMilestone } from './types';

/**
 * A path is assembled from:
 * Academy + Knowledge + Collections + Reviews + Community + Projects
 */
export type PathAssembly = {
  path: MasteryPath;
  components: {
    academy: { lessons_required: string[] };
    knowledge: { encyclopedia_sections: string[] };
    collections: { min_entities?: number };
    reviews: { min_count?: number };
    community: { club_required: boolean };
    projects: { guides_required?: number };
  };
  total_milestones: number;
  categories: Record<string, number>;
};

export function assemblePath(path: MasteryPath): PathAssembly {
  const academyLessons = path.milestones
    .map((m) => m.academy_lesson_slug)
    .filter((s): s is string => Boolean(s));

  const encyclopediaSections = path.milestones.flatMap((m) => m.encyclopedia_sections ?? []);

  const reviewsMilestone = path.milestones.find((m) => m.category === 'experience' && m.target_count);
  const collectMilestone = path.milestones.find((m) => m.category === 'collect' && m.target_count);
  const contributeMilestone = path.milestones.find((m) => m.category === 'contribute' && m.target_count);

  const categories = path.milestones.reduce(
    (acc, m) => {
      acc[m.category] = (acc[m.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    path,
    components: {
      academy: { lessons_required: [...new Set(academyLessons)] },
      knowledge: { encyclopedia_sections: [...new Set(encyclopediaSections)] },
      collections: { min_entities: collectMilestone?.target_count },
      reviews: { min_count: reviewsMilestone?.target_count },
      community: { club_required: path.assembled_from.includes('community') },
      projects: { guides_required: contributeMilestone?.target_count },
    },
    total_milestones: path.milestones.length,
    categories,
  };
}

export function calculateProgress(
  path: MasteryPath,
  completedMilestoneSlugs: string[]
): UserPathProgressShape {
  const total = path.milestones.length;
  const completed = completedMilestoneSlugs.filter((s) =>
    path.milestones.some((m) => m.slug === s)
  ).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    path_slug: path.slug,
    progress_pct: pct,
    milestones_completed: completedMilestoneSlugs,
    milestones_total: total,
    mastery_label: pct >= 100 ? path.display_name.replace('Road to ', '') : undefined,
  };
}

type UserPathProgressShape = {
  path_slug: string;
  progress_pct: number;
  milestones_completed: string[];
  milestones_total: number;
  mastery_label?: string;
};

export function milestoneByCategory(milestones: PathMilestone[], category: PathMilestone['category']) {
  return milestones.filter((m) => m.category === category);
}
