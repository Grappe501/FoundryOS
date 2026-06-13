import Link from 'next/link';
import { MashBillFlightPanel } from '../../../components/bourbon/level-2/MashBillFlightPanel';

export const metadata = { title: 'Mash Bill Flight | Bourbon Level 2 | Foundry' };

export default function MashBillFlightPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Mash bill flight</h1>
      <MashBillFlightPanel />
    </section>
  );
}
