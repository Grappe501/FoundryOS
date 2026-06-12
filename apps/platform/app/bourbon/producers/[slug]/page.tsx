import { notFound } from 'next/navigation';
import { ProducerProfileView } from '../../../../components/bourbon/ProducerProfileView';
import { getProducerDepth } from '../../../../lib/bourbon-depth/producer-depth';
import { peopleForProducer } from '../../../../lib/bourbon-depth/people';
import { getBourbonProducer, listBourbonProducers } from '../../../../lib/world-depth/bourbon-producers';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listBourbonProducers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getBourbonProducer(slug);
  if (!p) return { title: 'Producer | Bourbon World' };
  return {
    title: `${p.name} | Producer Atlas`,
    description: p.differentiator.slice(0, 160),
  };
}

export default async function BourbonProducerPage({ params }: Props) {
  const { slug } = await params;
  const producer = getBourbonProducer(slug);
  if (!producer) notFound();

  const compareTargets = producer.compareWith
    .map((s) => getBourbonProducer(s))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, name: p!.name }));

  return (
    <section style={{ marginTop: 8 }}>
      <ProducerProfileView
        producer={producer}
        compareTargets={compareTargets}
        depth={getProducerDepth(slug)}
        masters={peopleForProducer(slug)}
      />
    </section>
  );
}
