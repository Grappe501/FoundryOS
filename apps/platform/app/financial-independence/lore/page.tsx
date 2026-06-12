import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export default function FiLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/financial-independence" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Financial Independence</Link>
      <WorldLoreHub worldSlug="financial-independence" accent="var(--foundry-success)" backHref="/financial-independence" backLabel="FI world" />
    </section>
  );
}
