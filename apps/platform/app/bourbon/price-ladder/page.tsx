import Link from 'next/link';
import { PriceLadderTool } from '../../../components/bourbon/level-3/PriceLadderTool';

export const metadata = { title: 'Price Ladder | Bourbon Level 3 | Foundry' };

export default function PriceLadderPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-3" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 3 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Price Ladder</h1>
      <PriceLadderTool />
    </section>
  );
}
