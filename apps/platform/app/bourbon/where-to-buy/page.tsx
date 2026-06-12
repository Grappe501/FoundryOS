import Link from 'next/link';
import { WhereToBuyGuide } from '../../../components/bourbon/level-1/WhereToBuyGuide';

export const metadata = { title: 'Where to Buy Bourbon | Foundry' };

export default function WhereToBuyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: '#6B6B70', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Where to buy bourbon</h1>
      <WhereToBuyGuide />
    </section>
  );
}
