import Link from 'next/link';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';

export default function PublicSpeakingTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/public-speaking" style={{ color: '#6B6B70', fontSize: 13 }}>← Public Speaking</Link>
      <div style={{ marginTop: 12 }}>
        <WorldEventsToday worldSlug="public-speaking" accent="#7B8FD4" />
      </div>
    </section>
  );
}
