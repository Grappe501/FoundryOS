/**
 * Transformation Analytics — more important than page views (PASS-010).
 */
export const TRANSFORMATION_ANALYTICS_METRICS = [
  { key: 'active_transformations', label: 'Active Transformations', priority: 1 },
  { key: 'completed_transformations', label: 'Completed Transformations', priority: 2 },
  { key: 'transformation_insights_captured', label: 'Transformation Insights Captured', priority: 3 },
  { key: 'mentorship_connections', label: 'Mentorship Connections', priority: 4 },
  { key: 'projects_completed', label: 'Projects Completed', priority: 5 },
  { key: 'path_completion_rate', label: 'Path Completion Rate', priority: 6 },
] as const;

export type TransformationAnalyticsSnapshot = {
  active_transformations: number;
  completed_transformations: number;
  transformation_insights_captured: number;
  mentorship_connections: number;
  projects_completed: number;
  path_completion_rate: number;
};

export function getTransformationAnalytics(live?: Partial<TransformationAnalyticsSnapshot>): TransformationAnalyticsSnapshot {
  return {
    active_transformations: live?.active_transformations ?? 0,
    completed_transformations: live?.completed_transformations ?? 0,
    transformation_insights_captured: live?.transformation_insights_captured ?? 0,
    mentorship_connections: live?.mentorship_connections ?? 0,
    projects_completed: live?.projects_completed ?? 0,
    path_completion_rate: live?.path_completion_rate ?? 0,
  };
}

/** Metrics that should supersede page views in Mission Control */
export const SUPERSEDES_PAGE_VIEWS = [
  'active_transformations',
  'completed_transformations',
  'transformation_insights_captured',
  'path_completion_rate',
  'mentorship_connections',
] as const;
