import { ConsumerNav } from '../../components/ConsumerNav';
import { CivicEngagementSubNav } from '../../components/civic-engagement-world/CivicEngagementSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function CivicEngagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/civic-engagement" />
      <ConsumerNav />
      <CivicEngagementSubNav />
      {children}
    </main>
  );
}
