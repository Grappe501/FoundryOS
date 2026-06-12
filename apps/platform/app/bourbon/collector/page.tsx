import Link from 'next/link';
import { CollectorTrackPicker } from '../../../components/bourbon/level-1/CollectorTrackPicker';

export const metadata = { title: 'Collector Track | Bourbon | Foundry' };

export default function CollectorTrackPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Collector track</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>Beginner · enthusiast · collector — different tools, same obsession.</p>
      <CollectorTrackPicker />
    </section>
  );
}
