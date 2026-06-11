import { getWorldDepthOrThrow } from '../../../../lib/world-depth/registry';
import { WorldLearnGuide } from '../../../../components/world-depth/WorldLearnGuide';

export function generateStaticParams() {
  const bundle = getWorldDepthOrThrow('financial-independence');
  return bundle.seoGuides.map((g) => ({ slug: g.slug }));
}

export default async function LearnGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getWorldDepthOrThrow('financial-independence');
  return <WorldLearnGuide bundle={bundle} basePath="/financial-independence" guideSlug={slug} />;
}
