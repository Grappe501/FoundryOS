import Link from 'next/link';
import { getMissionCount } from '../../../lib/immersion/registry';
import { CHESS_MISSIONS, CHESS_PORTFOLIO_LABEL } from '../../../lib/chess-world';

export const metadata = { title: `${CHESS_PORTFOLIO_LABEL} | Chess` };

export default function ChessPortfolioPage() {
  const missionCount = getMissionCount('chess');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{CHESS_PORTFOLIO_LABEL}</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Log games, post-mortems, puzzle streaks, and tournament results. Completed missions appear here automatically when you finish the Debrief step.
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 16 }}>
        {missionCount} missions on the Beginner → Master path.
      </p>
      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>What to log</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.9, marginTop: 12 }}>
          <li>PGN or scoresheet for every rated game</li>
          <li>One-sentence lesson from each post-mortem</li>
          <li>Repertoire updates after deviations</li>
          <li>Tournament standings and energy notes</li>
        </ul>
      </section>
      <Link href="/chess/missions/first-complete-game" style={{ display: 'inline-block', marginTop: 24, padding: '12px 20px', background: '#3A4A3A', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 14, textDecoration: 'none' }}>
        Log evidence — Mission 1 →
      </Link>
      <p style={{ marginTop: 16, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        First mission: {CHESS_MISSIONS[0]?.title}
      </p>
    </section>
  );
}
