import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { ExploreCatalog } from '../../components/ExploreCatalog';
import { ExploreViewTracker } from '../../components/ExploreViewTracker';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';
import { EXPLORE_HERO, countExploreCatalogPaths, countExploreLivePaths } from '../../lib/explore-catalog';

export const metadata = {
  title: 'Explore | Foundry',
  description: 'Explore what you can become. Every path Foundry is building — from Future-Proof to Bourbon to Financial Independence.',
};

export default function ExplorePage() {
  const total = countExploreCatalogPaths();
  const live = countExploreLivePaths();

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <ValidationPageTracker page="/explore" />
      <ExploreViewTracker />
      <ConsumerNav />

      <section style={{ marginTop: 24 }}>
        <p
          style={{
            color: '#6B9B6B',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Explore what you can become
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
          {EXPLORE_HERO.title}
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.6 }}>{EXPLORE_HERO.subtitle}</p>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>
          {total} paths catalogued · {live} live now · more opening through 2027
        </p>
        <Link
          href="/future-proof"
          style={{
            display: 'inline-block',
            marginTop: 20,
            padding: '14px 24px',
            background: '#2A4A2A',
            borderRadius: 6,
            color: '#E8E8EC',
            fontSize: 14,
            fontWeight: 400,
            textDecoration: 'none',
          }}
        >
          Start here — take the assessment →
        </Link>
      </section>

      <ExploreCatalog />

      <section style={{ marginTop: 40, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>New here?</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>
          Don&apos;t pick a path blind. The Future-Proof Assessment shows where you are and what to start first.
        </p>
        <Link
          href="/future-proof"
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '12px 20px',
            background: '#2A4A2A',
            borderRadius: 6,
            color: '#E8E8EC',
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Start here →
        </Link>
      </section>
    </main>
  );
}
