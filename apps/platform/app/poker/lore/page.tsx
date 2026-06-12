import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = { title: 'Poker Lore | Foundry' };

export default function PokerLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/poker" style={{ color: '#6B6B70', fontSize: 13 }}>← Poker world</Link>
      <WorldLoreHub worldSlug="poker" accent="#7B8FD4" backHref="/poker" backLabel="Poker world" />
    </section>
  );
}
