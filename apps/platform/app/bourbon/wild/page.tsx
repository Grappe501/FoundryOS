import Link from 'next/link';
import { BeyondTheBottleHub } from '../../../components/bourbon/level-1/BeyondTheBottleHub';

export default function BourbonWildIndexPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <BeyondTheBottleHub />
    </section>
  );
}
