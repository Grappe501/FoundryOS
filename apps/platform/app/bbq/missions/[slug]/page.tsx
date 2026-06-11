import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldMissionRunner } from '../../../../components/world/WorldMissionRunner';
import { BBQ_MISSIONS, BBQ_PORTFOLIO_KEY, BBQ_PORTFOLIO_LABEL, getBbqMission } from '../../../../lib/bbq-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BBQ_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function BbqMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getBbqMission(slug);
  if (!mission) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bbq/missions" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>← All missions</Link>
      <p style={{ color: '#B06B50', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Mission {mission.number}</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8, border: '1px solid #4A3020' }}>
        <p style={{ color: '#B06B50', fontSize: 13, margin: 0 }}><strong style={{ fontWeight: 400 }}>Future-proof: </strong>{mission.futureProof}</p>
      </section>
      <WorldMissionRunner mission={mission} portfolioKey={BBQ_PORTFOLIO_KEY} basePath="/bbq" pathSlug="bbq" portfolioLabel={BBQ_PORTFOLIO_LABEL} />
    </section>
  );
}
