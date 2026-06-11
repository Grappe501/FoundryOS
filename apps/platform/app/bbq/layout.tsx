import { ConsumerNav } from '../../components/ConsumerNav';
import { BbqSubNav } from '../../components/bbq-world/BbqSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function BbqLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/bbq" />
      <ConsumerNav />
      <BbqSubNav />
      {children}
    </main>
  );
}
