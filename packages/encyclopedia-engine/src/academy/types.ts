/** Academy — same engine, every vertical: bourbon.foundryos.com/academy */

export type AcademyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type AcademyLesson = {
  slug: string;
  level: AcademyLevel;
  title: string;
  description: string;
  entity_slugs: string[];
  estimated_minutes: number;
  path: string;
};

export type AcademyCurriculum = {
  vertical_id: string;
  vertical_slug: string;
  display_name: string;
  academy_path: string;
  levels: Array<{
    level: AcademyLevel;
    title: string;
    lessons: AcademyLesson[];
  }>;
};
