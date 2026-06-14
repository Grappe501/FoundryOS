import Link from 'next/link';
import { WaterProofLabPanel } from '../../../components/bourbon/level-2/WaterProofLabPanel';

export const metadata = {
  title: 'Water & Proof Lab | Bourbon Level 2 | Foundry',
  description: 'Proof ladders, barrel proof showdown, and one-drop water experiments.',
};

export default function WaterProofLabPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Water & Proof Lab</h1>
      <WaterProofLabPanel />
    </section>
  );
}
