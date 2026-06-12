import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export default function CivicLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/civic-engagement" style={{ color: '#6B6B70', fontSize: 13 }}>← Civic Engagement</Link>
      <WorldLoreHub worldSlug="civic-engagement" accent="#7BA3C9" backHref="/civic-engagement" backLabel="Civic world" />
    </section>
  );
}
