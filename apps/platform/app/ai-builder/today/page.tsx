import Link from 'next/link';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';

export const metadata = { title: "What's Alive Today | AI Builder | Foundry" };

export default function AiBuilderTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/ai-builder" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← AI Builder world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldEventsToday worldSlug="ai-builder" accent="var(--foundry-success)" />
      </div>
    </section>
  );
}
