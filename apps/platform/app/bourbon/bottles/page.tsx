import Link from 'next/link';
import { BottleProgressionHub } from '../../../components/bourbon/level-1/BottleProgressionHub';

export const metadata = { title: 'Bottle Progression | Bourbon | Foundry', description: 'What each bottle teaches — who it is for — what comes next.' };

export default function BottlesPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bottle progression</h1>
      <BottleProgressionHub />
    </section>
  );
}
