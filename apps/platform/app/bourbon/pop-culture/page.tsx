import Link from 'next/link';
import { PopCultureView } from '../../../components/bourbon/level-1/PopCultureView';

export const metadata = { title: 'Bourbon Pop Culture | Foundry' };

export default function PopCulturePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: '#6B6B70', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon pop culture</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>Movies · music · sports · politics</p>
      <PopCultureView />
    </section>
  );
}
