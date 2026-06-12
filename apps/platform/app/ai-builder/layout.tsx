import { ConsumerNav } from '../../components/ConsumerNav';
import { AiBuilderSubNav } from '../../components/ai-builder/AiBuilderSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function AiBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/ai-builder" />
      <ConsumerNav />
      <AiBuilderSubNav />
      {children}
    </main>
  );
}
