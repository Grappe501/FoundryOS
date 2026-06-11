import { ConsumerNav } from '../../components/ConsumerNav';
import { CivicEngagementSubNav } from '../../components/civic-engagement-world/CivicEngagementSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function CivicEngagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/civic-engagement" />
      <ConsumerNav />
      <CivicEngagementSubNav />
      {children}
    </main>
  );
}
