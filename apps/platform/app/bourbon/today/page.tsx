import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { WorldEventsToday } from '../../../components/world-events/WorldEventsToday';
import { RabbitHoleOfDay } from '../../../components/bourbon/intelligence/RabbitHoleOfDay';

export const metadata = { title: "What's Alive Today | Bourbon | Foundry" };

export default function BourbonTodayPage() {
  const content = getBourbonPageDepth('today')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon" backLabel="← Bourbon world">
      <RabbitHoleOfDay compact />
      <div style={{ marginTop: 28 }}>
        <WorldEventsToday worldSlug="bourbon" accent="var(--foundry-primary)" />
      </div>
    </BourbonDeepPageShell>
  );
}
