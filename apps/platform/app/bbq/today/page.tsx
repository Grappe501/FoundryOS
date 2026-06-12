import Link from 'next/link';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';

export default function BbqTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bbq" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← BBQ world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldEventsToday worldSlug="bbq" accent="#D4847A" />
      </div>
    </section>
  );
}
