import { ConsumerNav } from '../../components/ConsumerNav';
import { FiSubNav } from '../../components/fi-world/FiSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function FiLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/financial-independence" />
      <ConsumerNav />
      <FiSubNav />
      {children}
    </main>
  );
}
