import { getWorldDepthOrThrow } from '../../../../lib/world-depth/registry';
import { WorldAcademyLesson } from '../../../../components/world-depth/WorldAcademyLesson';

export function generateStaticParams() {
  const bundle = getWorldDepthOrThrow('bourbon');
  return bundle.academyLessons.filter((l) => l.sections?.length).map((l) => ({ slug: l.slug }));
}

export default async function BourbonAcademyLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getWorldDepthOrThrow('bourbon');
  return <WorldAcademyLesson bundle={bundle} basePath="/bourbon" lessonSlug={slug} />;
}
