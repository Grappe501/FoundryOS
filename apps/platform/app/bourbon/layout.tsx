import { ConsumerNav } from '../../components/ConsumerNav';
import { BourbonSubNav } from '../../components/bourbon-world/BourbonSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function BourbonLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/bourbon" />
      <ConsumerNav />
      <BourbonSubNav />
      {children}
    </main>
  );
}
