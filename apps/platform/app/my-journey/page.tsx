import { ConsumerNav } from '../../components/ConsumerNav';
import { LivingJourneyDashboard } from '../../components/living-worlds/LivingWorldPanels';

export const metadata = {
  title: 'My Journey | Foundry',
  description: 'Your living story across seven worlds — mentors, evidence, and what comes next.',
};

export default function MyJourneyPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 16 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Living journey · PASS-034
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>
          Not a dashboard — a story. Mentors read your missions, reflections, and journals to suggest what matters next.
        </p>
        <LivingJourneyDashboard />
      </section>
    </main>
  );
}
