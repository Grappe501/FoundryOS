import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export default function FiLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/financial-independence" style={{ color: '#6B6B70', fontSize: 13 }}>← Financial Independence</Link>
      <WorldLoreHub worldSlug="financial-independence" accent="#6B9B6B" backHref="/financial-independence" backLabel="FI world" />
    </section>
  );
}
