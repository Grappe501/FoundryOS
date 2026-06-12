import Link from 'next/link';
import { BeyondTheBottleHub } from '../../../components/bourbon/level-1/BeyondTheBottleHub';

export default function BourbonWildIndexPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <BeyondTheBottleHub />
    </section>
  );
}
