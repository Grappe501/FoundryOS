import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldMissionRunner } from '../../../../components/world/WorldMissionRunner';
import {
  CHESS_MISSIONS,
  CHESS_PORTFOLIO_KEY,
  CHESS_PORTFOLIO_LABEL,
  getChessMission,
} from '../../../../lib/chess-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CHESS_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function ChessMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getChessMission(slug);
  if (!mission) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/chess/missions" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, textDecoration: 'none' }}>
        ← All missions
      </Link>
      <p style={{ color: '#8A9B7A', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>
        Mission {mission.number}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#0F120F', borderRadius: 8, border: '1px solid #3A4A3A' }}>
        <p style={{ color: '#8A9B7A', fontSize: 13, margin: 0 }}>
          <strong style={{ fontWeight: 400 }}>Why this matters: </strong>
          {mission.futureProof}
        </p>
      </section>
      <WorldMissionRunner
        mission={mission}
        portfolioKey={CHESS_PORTFOLIO_KEY}
        basePath="/chess"
        pathSlug="chess"
        portfolioLabel={CHESS_PORTFOLIO_LABEL}
        reflectionPlaceholder="Post-mortem: what did you miss? What line or pattern will you drill next?"
      />
    </section>
  );
}
