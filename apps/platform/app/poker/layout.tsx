import { ConsumerNav } from '../../components/ConsumerNav';
import { PokerSubNav } from '../../components/poker-world/PokerSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function PokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/poker" />
      <ConsumerNav />
      <PokerSubNav />
      {children}
    </main>
  );
}
