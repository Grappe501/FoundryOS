import Link from 'next/link';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';

export default function CivicTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/civic-engagement" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Civic world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldEventsToday worldSlug="civic-engagement" accent="#7BA3C9" />
      </div>
    </section>
  );
}
