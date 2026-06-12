import { BottleProgressionView } from '../../../../components/bourbon/level-1/BottleProgressionHub';
import { BOURBON_BOTTLES } from '../../../../lib/bourbon-level-1/bottles';

export function generateStaticParams() {
  return BOURBON_BOTTLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = BOURBON_BOTTLES.find((x) => x.slug === slug);
  return { title: b ? `${b.name} | Bottle Progression` : 'Bottle | Foundry' };
}

export default async function BottlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <section style={{ marginTop: 16 }}>
      <BottleProgressionView slug={slug} />
    </section>
  );
}
