/**
 * Transformation Stories — design principle (not PASS-010 code yet).
 * Humans understand growth through stories, not counters.
 */
export const TRANSFORMATION_STORIES_PRINCIPLE = {
  timing: 'Design principle — not PASS-010 implementation yet',
  captures: ['Data', 'Evidence', 'Reflections', 'Insights'],
  humans_understand: 'Stories',
  not_meaningful: 'Projects Completed: 14',
  generates: 'Transformation Story — from the graph',
} as const;

export type TransformationStoryBeat = {
  year: number;
  event: string;
};

export type TransformationStory = {
  slug: string;
  display_name: string;
  aspiration: string;
  beats: TransformationStoryBeat[];
  status: 'exemplar' | 'planned';
};

/** Exemplar — far more meaningful than a project counter */
export const EXAMPLE_TRANSFORMATION_STORY: TransformationStory = {
  slug: 'community-speaker-journey',
  display_name: 'Transformation Story',
  aspiration: 'Become a better public speaker',
  beats: [
    { year: 2027, event: 'Joined Foundry — wanted to become a better public speaker' },
    { year: 2028, event: 'Delivered first speech' },
    { year: 2029, event: 'Started local speaking group' },
    { year: 2031, event: 'Mentored first new speaker' },
    { year: 2035, event: 'Recognized as community trainer' },
  ],
  status: 'exemplar',
};
