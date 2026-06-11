import type { AcademyLesson } from './types';

type LevelSeed = { level: number; title: string; tagline: string; missionSlug?: string };

const LESSON_TEMPLATES = [
  (title: string) => ({ prefix: 'Introduction', focus: `Understand the basics of ${title.toLowerCase()}` }),
  (title: string) => ({ prefix: 'Practice', focus: `Apply ${title.toLowerCase()} in a small real-world exercise` }),
  (title: string) => ({ prefix: 'Common mistakes', focus: `Avoid beginner errors in ${title.toLowerCase()}` }),
  (title: string) => ({ prefix: 'Go deeper', focus: `Build confidence with intermediate ${title.toLowerCase()} skills` }),
  (title: string) => ({ prefix: 'Level checkpoint', focus: `Demonstrate what you can do at this level of ${title.toLowerCase()}` }),
];

export function buildAcademyLessons(
  levels: LevelSeed[],
  domainLabel: string,
): AcademyLesson[] {
  const lessons: AcademyLesson[] = [];

  for (const level of levels) {
    LESSON_TEMPLATES.forEach((template, i) => {
      const t = template(level.title);
      const slug = `level-${level.level}-lesson-${i + 1}`;
      lessons.push({
        level: level.level,
        slug,
        title: `${t.prefix}: ${level.title}`,
        description: `${t.focus}. ${level.tagline}`,
        outcome: `You will be able to explain and practice key ideas from ${level.title} in plain language.`,
        recommendedMission: i === 4 ? level.missionSlug : undefined,
      });
    });
  }

  return lessons;
}

export function enrichAcademyLessons(
  lessons: AcademyLesson[],
  domainLabel: string,
): AcademyLesson[] {
  return lessons.map((lesson) => ({
    ...lesson,
    description: lesson.description.replace(/this level/gi, `${domainLabel} level ${lesson.level}`),
    outcome: lesson.outcome || `You will be able to apply ${domainLabel} skills at level ${lesson.level}.`,
  }));
}
