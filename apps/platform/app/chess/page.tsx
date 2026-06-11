import Link from 'next/link';
import {
  CHESS_ACADEMY_LEVELS,
  CHESS_COMMUNITY,
  CHESS_CORE_PROMISE,
  CHESS_LOOP,
  CHESS_MISSIONS,
} from '../../lib/chess-world';
import { CHESS_IMMERSION } from '../../lib/immersion/worlds/chess';

export const metadata = {
  title: 'Chess World | Foundry',
  description: CHESS_CORE_PROMISE,
};

export default function ChessWorldPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <section style={{ padding: 32, background: '#0F0F12', border: '1px solid #3A4A3A', borderRadius: 8 }}>
        <p style={{ color: '#8A9B7A', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Think Deeply · Skills Guild
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Chess World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>{CHESS_CORE_PROMISE}</p>
        <p style={{ color: '#8A9B7A', fontSize: 14, marginTop: 16 }}>Path: Beginner → Master · {CHESS_IMMERSION.estimatedHours} hours · {CHESS_IMMERSION.missionTarget} missions</p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/chess/missions/first-complete-game"
            style={{ padding: '14px 24px', background: '#3A4A3A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}
          >
            Start Mission 1 →
          </Link>
          <Link
            href="/chess/academy"
            style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}
          >
            Academy levels
          </Link>
          <Link
            href="/chess/community"
            style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}
          >
            Chess Study Circle
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>How Foundry works</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          {CHESS_LOOP.map((item, i) => (
            <span key={item.step}>
              {i > 0 ? ' → ' : ''}
              {item.step}
            </span>
          ))}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>Tracks</h2>
        {CHESS_IMMERSION.tracks.map((t) => (
          <p key={t.slug} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{t.label}</strong> — {t.description}
          </p>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>Missions</h2>
        {CHESS_MISSIONS.map((m) => (
          <Link
            key={m.slug}
            href={`/chess/missions/${m.slug}`}
            style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #1A1A1E', textDecoration: 'none', color: '#E8E8EC', fontSize: 14 }}
          >
            Mission {m.number}: {m.title}
          </Link>
        ))}
        <Link href="/chess/missions" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: '#8A9B7A', textDecoration: 'none' }}>
          View by track →
        </Link>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>Academy — Beginner to Master</h2>
        {CHESS_ACADEMY_LEVELS.map((l) => (
          <p key={l.slug} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>
              Level {l.level}: {l.title}
            </strong>{' '}
            — {l.tagline}
          </p>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#8A9B7A', margin: 0 }}>{CHESS_COMMUNITY.name}</h2>
        {CHESS_COMMUNITY.features.map((f) => (
          <p key={f.title} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{f.title}</strong> — {f.description}
          </p>
        ))}
      </section>

      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/explore/chess" style={{ color: '#6B6B70' }}>
          Explore path
        </Link>
      </p>
    </section>
  );
}
