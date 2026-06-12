import { BourbonGraphExplorer } from '../../../../components/bourbon/BourbonGraphExplorer';
import { BOURBON_BOTTLES } from '../../../../lib/bourbon-level-1/bottles';
import { BOURBON_PRODUCERS } from '../../../../lib/world-depth/bourbon-producers';
import { PEOPLE_REGISTRY } from '@foundry/bourbon-intelligence';

export function generateStaticParams() {
  const bottleSlugs = BOURBON_BOTTLES.map((b) => ({ slug: b.slug }));
  const producerSlugs = BOURBON_PRODUCERS.map((p) => ({ slug: p.slug }));
  const peopleSlugs = PEOPLE_REGISTRY.map((p) => ({ slug: p.slug }));
  const termSlugs = [{ slug: 'bottled-in-bond' }, { slug: 'mash-bill' }, { slug: 'proof' }];
  const debateSlugs = [{ slug: 'bib-still-matters' }, { slug: 'best-value-bourbon' }];
  return [...bottleSlugs, ...producerSlugs, ...peopleSlugs, ...termSlugs, ...debateSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug.replace(/-/g, ' ')} | Bourbon Graph` };
}

export default async function BourbonGraphPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BourbonGraphExplorer slug={slug} />;
}
