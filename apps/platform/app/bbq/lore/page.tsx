import Link from 'next/link';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = { title: 'BBQ Lore | Foundry' };

export default function BbqLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bbq" style={{ color: '#6B6B70', fontSize: 13 }}>← BBQ world</Link>
      <WorldLoreHub worldSlug="bbq" accent="#D4847A" backHref="/bbq" backLabel="BBQ world" />
    </section>
  );
}
