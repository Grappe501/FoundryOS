import Link from 'next/link';
import { PourImpactGuide } from '../../../components/bourbon/level-1/PourImpactGuide';

export const metadata = { title: 'Pour Impact Guide | Bourbon | Foundry' };

export default function PourGuidePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: '#6B6B70', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Pour impact guide</h1>
      <PourImpactGuide />
    </section>
  );
}
