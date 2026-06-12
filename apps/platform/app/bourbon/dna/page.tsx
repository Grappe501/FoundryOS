import Link from 'next/link';
import { BourbonDNAProfile } from '../../../components/bourbon/level-1/BourbonDNAProfile';

export const metadata = { title: 'Bourbon DNA | Foundry' };

export default function BourbonDnaPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Your Bourbon DNA</h1>
      <BourbonDNAProfile />
    </section>
  );
}
