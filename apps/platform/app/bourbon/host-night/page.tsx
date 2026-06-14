import Link from 'next/link';
import { Suspense } from 'react';
import { HostNightPageClient } from './HostNightPageClient';

export const metadata = { title: 'Host Night Kits | Bourbon Level 2 | Foundry' };

export default function HostNightPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Host Night Kits</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Six pre-built host scenarios — pour order, talking points, avoid traps. Guests rank before you lecture.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <HostNightPageClient />
      </Suspense>
    </section>
  );
}
