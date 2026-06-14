import Link from 'next/link';
import { Suspense } from 'react';
import { LabelDecoderPageClient } from './LabelDecoderPageClient';

export const metadata = { title: 'Label Decoder | Bourbon Level 4 | Foundry' };

export default function LabelDecoderPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-4" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 4 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Label Decoder</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Eight drills — read DSP, proof, age, category cold. Predict the pour before X-Ray reveal.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <LabelDecoderPageClient />
      </Suspense>
    </section>
  );
}
