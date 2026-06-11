import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldMissionRunner } from '../../../../components/world/WorldMissionRunner';
import { PS_MISSIONS, PS_PORTFOLIO_KEY, getPsMission } from '../../../../lib/public-speaking-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PS_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function PsMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getPsMission(slug);
  if (!mission) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/public-speaking/missions" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>← All missions</Link>
      <p style={{ color: '#6B8BB8', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Mission {mission.number}</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#121820', borderRadius: 8, border: '1px solid #3A4A6A' }}>
        <p style={{ color: '#6B8BB8', fontSize: 13, margin: 0 }}><strong style={{ fontWeight: 400 }}>Future-proof: </strong>{mission.futureProof}</p>
      </section>
      <WorldMissionRunner mission={mission} portfolioKey={PS_PORTFOLIO_KEY} basePath="/public-speaking" pathSlug="public-speaking" portfolioLabel="My Speaking Portfolio" />
    </section>
  );
}
