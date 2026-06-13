'use client';

import Link from 'next/link';
import { TastingLabTool } from './TastingLabTool';

/** Mash bill flight — defaults to mashbill-triangle in Tasting Lab */
export function MashBillFlightPanel() {
  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, marginTop: 0 }}>
        The core Level 2 homework: taste the mash bill fork before you chase single barrels. Start with the triangle, then run the wheated duel.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/bourbon/tasting-lab" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, background: 'var(--foundry-border-warm)', color: 'var(--foundry-primary)', textDecoration: 'none' }}>
          Open full Tasting Lab →
        </Link>
        <Link href="/bourbon/comparison-grid?preset=mashbill-three" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
          Mash bill grid →
        </Link>
        <Link href="/bourbon/academy/mash-bill-in-the-mouth" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
          Academy lesson →
        </Link>
      </div>
      <div style={{ marginTop: 32 }}>
        <TastingLabTool initialFlightId="mashbill-triangle" />
      </div>
    </div>
  );
}
