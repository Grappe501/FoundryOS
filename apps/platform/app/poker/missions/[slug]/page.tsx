import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldMissionRunner } from '../../../../components/world/WorldMissionRunner';
import { POKER_MISSIONS, POKER_PORTFOLIO_KEY, POKER_PORTFOLIO_LABEL, getPokerMission } from '../../../../lib/poker-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POKER_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function PokerMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getPokerMission(slug);
  if (!mission) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/poker/missions" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>← All missions</Link>
      <p style={{ color: '#6B8BB8', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Mission {mission.number}</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8, border: '1px solid #3A4A6A' }}>
        <p style={{ color: '#6B8BB8', fontSize: 13, margin: 0 }}><strong style={{ fontWeight: 400 }}>Future-proof: </strong>{mission.futureProof}</p>
      </section>
      <WorldMissionRunner mission={mission} portfolioKey={POKER_PORTFOLIO_KEY} basePath="/poker" pathSlug="poker" portfolioLabel={POKER_PORTFOLIO_LABEL} />
    </section>
  );
}
