import { ConsumerNav } from '../../components/ConsumerNav';
import { PokerSubNav } from '../../components/poker-world/PokerSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function PokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/poker" />
      <ConsumerNav />
      <PokerSubNav />
      {children}
    </main>
  );
}
