import { ConsumerNav } from '../../components/ConsumerNav';
import { BbqSubNav } from '../../components/bbq-world/BbqSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function BbqLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/bbq" />
      <ConsumerNav />
      <BbqSubNav />
      {children}
    </main>
  );
}
