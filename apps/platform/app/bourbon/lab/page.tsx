import Link from 'next/link';
import { BourbonLab } from '../../../components/bourbon/level-1/BourbonLab';

export const metadata = { title: 'Bourbon Lab | Foundry' };

export default function BourbonLabPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon Lab</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>Char, age, proof — slide and learn. Educational, not lab-exact.</p>
      <BourbonLab />
    </section>
  );
}
