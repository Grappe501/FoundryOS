import { DetectiveCaseView } from '../../../../components/bourbon/level-1/BourbonDetectiveHub';
import { DETECTIVE_CASES } from '../../../../lib/bourbon-level-1/agency/detective-cases';

export function generateStaticParams() {
  return DETECTIVE_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = DETECTIVE_CASES.find((x) => x.slug === slug);
  return { title: c ? `${c.title} | Bourbon Detective` : 'Case | Bourbon Detective' };
}

export default async function DetectiveCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <section style={{ marginTop: 16 }}>
      <DetectiveCaseView slug={slug} />
    </section>
  );
}
