/**
 * Transformation Velocity — how fast and how successfully people transform (PASS-010).
 * The graph learns from completion timelines and predictive projects.
 */
export type TransformationVelocitySnapshot = {
  path_slug: string;
  path_display_name: string;
  average_completion_months: number;
  fastest_completion_months: number;
  completion_rate_pct: number;
  most_predictive_projects: Array<{
    slug: string;
    display_name: string;
    predictive_weight: number;
  }>;
  status: 'exemplar' | 'planned';
};

/** Illustrative velocity until live journey data accumulates */
export const EXAMPLE_TRANSFORMATION_VELOCITY: TransformationVelocitySnapshot[] = [
  {
    path_slug: 'road-to-confident-speaker',
    path_display_name: 'Road to Public Speaker',
    average_completion_months: 28,
    fastest_completion_months: 11,
    completion_rate_pct: 0,
    most_predictive_projects: [
      { slug: 'deliver-first-speech', display_name: 'Deliver first speech', predictive_weight: 95 },
      { slug: 'join-speaker-circle', display_name: 'Join speaker circle', predictive_weight: 88 },
      { slug: 'mentor-beginner', display_name: 'Mentor beginner', predictive_weight: 82 },
    ],
    status: 'exemplar',
  },
  {
    path_slug: 'road-to-ai-builder',
    path_display_name: 'Road to AI Builder',
    average_completion_months: 18,
    fastest_completion_months: 9,
    completion_rate_pct: 42,
    most_predictive_projects: [
      { slug: 'build-first-application', display_name: 'Build first real application', predictive_weight: 92 },
    ],
    status: 'exemplar',
  },
];

export const TRANSFORMATION_VELOCITY_LABEL = 'Transformation Velocity';
