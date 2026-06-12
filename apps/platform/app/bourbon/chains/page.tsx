import Link from 'next/link';
import { ProgressionChainsView } from '../../../components/bourbon/intelligence/ProgressionChainsView';

export const metadata = { title: 'Bottle Progression Chains | Bourbon | Foundry' };

export default function ChainsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13 }}>← Bottle progression</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Legendary bottle chains</h1>
      <ProgressionChainsView />
    </section>
  );
}
