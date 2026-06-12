import Link from 'next/link';
import { FlavorWheelBuilder } from '../../../components/bourbon/level-1/FlavorWheelBuilder';

export const metadata = { title: 'Flavor Wheel Builder | Bourbon | Foundry' };

export default function FlavorWheelPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Flavor wheel builder</h1>
      <FlavorWheelBuilder />
    </section>
  );
}
