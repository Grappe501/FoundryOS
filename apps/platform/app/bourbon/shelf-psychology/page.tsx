import Link from 'next/link';
import { ShelfPsychologyTool } from '../../../components/bourbon/level-1/ShelfPsychologyTool';

export const metadata = { title: 'Shelf Psychology | Bourbon | Foundry' };

export default function ShelfPsychologyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>What your shelf says about you</h1>
      <ShelfPsychologyTool />
    </section>
  );
}
