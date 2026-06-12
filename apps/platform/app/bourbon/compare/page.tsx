import Link from 'next/link';
import { CompareFiveTool } from '../../../components/bourbon/level-1/CompareFiveTool';

export const metadata = { title: 'Compare 5 Bottles | Bourbon | Foundry' };

export default function ComparePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Compare 5 bottles</h1>
      <CompareFiveTool />
    </section>
  );
}
