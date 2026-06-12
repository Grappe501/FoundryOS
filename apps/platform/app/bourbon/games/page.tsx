import Link from 'next/link';
import { BlindTastingGames } from '../../../components/bourbon/level-1/BlindTastingGames';

export const metadata = { title: 'Blind Tasting Games | Bourbon | Foundry' };

export default function BourbonGamesPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Blind tasting games</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>Mystery bottle · Distillery match · Brackets — beat your buddy.</p>
      <BlindTastingGames />
    </section>
  );
}
