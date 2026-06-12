import Link from 'next/link';
import { DistilleryWarsList } from '../../../components/bourbon/level-1/DistilleryWars';

export const metadata = { title: 'Distillery Wars | Bourbon | Foundry' };

export default function DistilleryWarsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Distillery wars</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>Side-by-side — vote with your palate.</p>
      <DistilleryWarsList />
    </section>
  );
}
