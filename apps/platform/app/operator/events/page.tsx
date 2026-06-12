import Link from 'next/link';
import { LIVE_EVENT_WORLDS, allEventDefinitions, validateEventPools } from '@foundry/world-events-engine';
import { OperatorEventsViewer } from '../../../components/operator/OperatorEventsViewer';

export const metadata = {
  title: 'World Events | Operator',
  description: 'Daily and weekly world state across all active worlds.',
};

export default function OperatorEventsPage() {
  const validation = validateEventPools();
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/discovery" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Discovery</Link>
      <Link href="/operator/collections" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Collections</Link>

      <p style={{ color: '#D4847A', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-034L · World Events Engine
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>World Events</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Events are world state — not content. Daily mysteries, weekly rivalries, challenges, and debates rotate across {LIVE_EVENT_WORLDS.length} worlds.
      </p>

      <section style={{ marginTop: 20, padding: 16, background: '#0F1218', border: '1px solid #2A2A3A', borderRadius: 8 }}>
        <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>Principle</p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8, fontFamily: 'monospace', lineHeight: 1.8 }}>
          Open Foundry → something is happening here today
        </p>
      </section>

      <section style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div style={{ padding: 14, background: '#0F0F12', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Definitions</p>
          <p style={{ color: '#E8E8EC', fontSize: 22, marginTop: 6 }}>{allEventDefinitions().length}</p>
        </div>
        <div style={{ padding: 14, background: '#0F0F12', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Validation</p>
          <p style={{ color: validation.ok ? '#6B9B6B' : '#8B4545', fontSize: 14, marginTop: 6 }}>{validation.ok ? 'PASS' : 'FAIL'}</p>
        </div>
      </section>

      <OperatorEventsViewer />
    </main>
  );
}
