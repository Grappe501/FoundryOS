import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DISTILLERY_WARS } from '../../../../lib/bourbon-level-1/wars';
import { DistilleryWarCompare } from '../../../../components/bourbon/level-1/DistilleryWars';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DISTILLERY_WARS.map((w) => ({ slug: w.slug }));
}

export default async function DistilleryWarPage({ params }: Props) {
  const { slug } = await params;
  if (!DISTILLERY_WARS.some((w) => w.slug === slug)) notFound();
  const war = DISTILLERY_WARS.find((w) => w.slug === slug)!;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/wars" style={{ color: '#6B6B70', fontSize: 13 }}>← All wars</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>{war.title}</h1>
      <DistilleryWarCompare slug={slug} />
    </section>
  );
}
