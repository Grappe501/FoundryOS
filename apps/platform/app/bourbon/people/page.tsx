import Link from 'next/link';
import { LeaderSlotsIndex } from '../../../components/bourbon/LeaderSlots';

export const metadata = { title: 'Leaders & Reviews | Bourbon | Foundry' };

export default function BourbonLeadersPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/producers" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Producer Atlas</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Leaders & reviews</h1>
      <LeaderSlotsIndex />
    </section>
  );
}
