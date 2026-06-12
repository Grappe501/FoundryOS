import Link from 'next/link';
import { BeyondTheBottleHub } from '../../../components/bourbon/level-1/BeyondTheBottleHub';

export const metadata = {
  title: 'Bourbon Beyond the Bottle | Foundry',
  description: 'Origins, pop culture, connections — bourbon in the wild.',
};

export default function BeyondTheBottlePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <div style={{ marginTop: 12 }}>
        <BeyondTheBottleHub />
      </div>
    </section>
  );
}
