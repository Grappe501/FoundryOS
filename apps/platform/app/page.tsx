import Link from 'next/link';
import { ConsumerNav } from '../components/ConsumerNav';
import { FoundryAccessOptions } from '../components/FoundryAccessOptions';
import { DailyFoundryHook } from '../components/living-worlds/LivingWorldPanels';
import { CrossWorldEventsPanel } from '../components/world-events/WorldEventsToday';
import { TrinityHub } from '../components/trinity/TrinityHub';

export const metadata = {
  title: 'Foundry — Paths to Mastery',
  description:
    'Missions, builds, and portfolios — not courses. Build future-proof skills across every world.',
};

export default function ConsumerHomePage() {
  return (
    <main className="foundry-page">
      <ConsumerNav />

      <section className="foundry-card--hero">
        <p className="foundry-eyebrow">Foundry</p>
        <h1 className="foundry-h1 foundry-display">
          Master a craft. Log the evidence. Teach what you know.
        </h1>
        <p className="foundry-lead" style={{ maxWidth: 560 }}>
          Not courses. Not worksheets.{' '}
          <strong style={{ fontWeight: 500, color: 'var(--foundry-text)' }}>
            Missions, builds, and portfolios
          </strong>{' '}
          across worlds that build future-proof skill.
        </p>
        <p
          style={{
            color: 'var(--foundry-text-faint)',
            fontSize: 14,
            marginTop: 14,
            fontStyle: 'italic',
            maxWidth: 480,
          }}
        >
          Help me become the person I want to be — that is the private intent behind every path.
        </p>
        <FoundryAccessOptions />
        <div className="foundry-btn-row">
          <Link href="/future-proof" className="foundry-btn foundry-btn--primary">
            Start assessment →
          </Link>
          <Link href="/explore" className="foundry-btn foundry-btn--secondary">
            Explore worlds
          </Link>
          <Link href="/beta" className="foundry-btn foundry-btn--success">
            Join beta
          </Link>
          <Link href="/pricing" className="foundry-btn foundry-btn--ghost">
            Pricing
          </Link>
        </div>
      </section>

      <DailyFoundryHook />

      <CrossWorldEventsPanel />

      <section className="foundry-card" style={{ marginTop: 32, padding: 24 }}>
        <h2 className="foundry-section-label" style={{ marginBottom: 0 }}>
          How it works
        </h2>
        <p className="foundry-lead" style={{ fontSize: 15, marginTop: 12 }}>
          Mission → Build → Show → Debrief → Refine → Teach. Every world follows the same loop. Your
          evidence travels with you.
        </p>
        <Link href="/my-journey" className="foundry-link-success" style={{ display: 'inline-block', marginTop: 16, fontSize: 14 }}>
          Log your first evidence →
        </Link>
      </section>

      <p style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <Link href="/trinity" className="foundry-faint">
          The Trinity
        </Link>
        {' · '}
        <Link href="/explore" className="foundry-faint">
          Explore paths
        </Link>
        {' · '}
        <Link href="/future-proof" className="foundry-faint">
          Future-Proof assessment
        </Link>
      </p>
    </main>
  );
}
