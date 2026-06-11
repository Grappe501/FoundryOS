import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldMissionRunner } from '../../../../components/world/WorldMissionRunner';
import { FI_MISSIONS, FI_PORTFOLIO_KEY, getFiMission } from '../../../../lib/financial-independence-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FI_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function FiMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getFiMission(slug);
  if (!mission) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/financial-independence/missions" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>← All missions</Link>
      <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Mission {mission.number}</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8, border: '1px solid #4A4020' }}>
        <p style={{ color: '#C8A96E', fontSize: 13, margin: 0 }}><strong style={{ fontWeight: 400 }}>Future-proof: </strong>{mission.futureProof}</p>
      </section>
      <WorldMissionRunner mission={mission} portfolioKey={FI_PORTFOLIO_KEY} basePath="/financial-independence" pathSlug="financial-independence" />
    </section>
  );
}
