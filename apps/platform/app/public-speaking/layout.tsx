import { ConsumerNav } from '../../components/ConsumerNav';
import { PsSubNav } from '../../components/ps-world/PsSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function PsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/public-speaking" />
      <ConsumerNav />
      <PsSubNav />
      {children}
    </main>
  );
}
