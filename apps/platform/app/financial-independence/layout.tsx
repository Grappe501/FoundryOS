import { ConsumerNav } from '../../components/ConsumerNav';
import { FiSubNav } from '../../components/fi-world/FiSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function FiLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/financial-independence" />
      <ConsumerNav />
      <FiSubNav />
      {children}
    </main>
  );
}
