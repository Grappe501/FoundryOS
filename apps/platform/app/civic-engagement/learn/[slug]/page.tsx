import { getWorldDepthOrThrow } from '../../../../lib/world-depth/registry';
import { WorldLearnGuide } from '../../../../components/world-depth/WorldLearnGuide';

export function generateStaticParams() {
  const bundle = getWorldDepthOrThrow('civic-engagement');
  return bundle.seoGuides.map((g) => ({ slug: g.slug }));
}

export default async function LearnGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getWorldDepthOrThrow('civic-engagement');
  return <WorldLearnGuide bundle={bundle} basePath="/civic-engagement" guideSlug={slug} />;
}
