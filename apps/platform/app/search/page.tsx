import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { GlobalSearchPanel } from '../../components/search/GlobalSearchPanel';

export const metadata = {
  title: 'Search | Foundry',
  description: 'Search worlds, academy lessons, glossary terms, guides, and incoming paths.',
};

export default function SearchPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Global search
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>Search Foundry</h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.6 }}>
          Worlds, lessons, glossary, encyclopedia, guides, and incoming paths — with audience filters.
        </p>
        <GlobalSearchPanel />
        <Link href="/explore" style={{ display: 'inline-block', marginTop: 32, color: '#6B6B70', fontSize: 13 }}>
          ← Explore catalog
        </Link>
      </section>
    </main>
  );
}
