'use client';

import Link from 'next/link';
import { TastingLabTool } from './TastingLabTool';

/** Water & proof — proof ladder + barrel proof showdown */
export function WaterProofLabPanel() {
  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, marginTop: 0 }}>
        Higher proof carries more flavor and more heat. This lab holds proof as the variable — one drop of water on the highest pour only, never a splash.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/bourbon/academy/water-and-proof-experiment" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
          Academy lesson →
        </Link>
        <Link href="/bourbon/comparison-grid?preset=barrel-proof-four" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
          Barrel proof grid →
        </Link>
        <Link href="/bourbon/tasting-lab?flight=barrel-proof-showdown" style={{ padding: '10px 16px', fontSize: 13, borderRadius: 6, background: 'var(--foundry-border-warm)', color: 'var(--foundry-primary)', textDecoration: 'none' }}>
          Barrel proof flight →
        </Link>
      </div>
      <div style={{ marginTop: 32 }}>
        <TastingLabTool initialFlightId="proof-ladder" proofMode />
      </div>
    </div>
  );
}
