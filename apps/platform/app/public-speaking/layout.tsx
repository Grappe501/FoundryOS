import { ConsumerNav } from '../../components/ConsumerNav';
import { PsSubNav } from '../../components/ps-world/PsSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function PsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/public-speaking" />
      <ConsumerNav />
      <PsSubNav />
      {children}
    </main>
  );
}
