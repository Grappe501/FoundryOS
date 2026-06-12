import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export default function CivicLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/civic-engagement" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Civic Engagement</Link>
      <WorldLoreHub worldSlug="civic-engagement" accent="#7BA3C9" backHref="/civic-engagement" backLabel="Civic world" />
    </section>
  );
}
