import { ConsumerNav } from '../../components/ConsumerNav';
import { MyFutureDashboard } from '../../components/living-worlds/MyFutureDashboard';

export const metadata = {
  title: 'My Future | Foundry',
  description: 'What you are trying to become — ambitions and dreams your mentors remember.',
};

export default function MyFuturePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 16 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          PASS-034A · Identity & ambition
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>My Future</h1>
        <MyFutureDashboard />
      </section>
    </main>
  );
}
