import Link from 'next/link';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';

export default function PokerTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/poker" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Poker world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldEventsToday worldSlug="poker" accent="#7B8FD4" />
      </div>
    </section>
  );
}
