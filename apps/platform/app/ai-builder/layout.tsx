import { ConsumerNav } from '../../components/ConsumerNav';
import { AiBuilderSubNav } from '../../components/ai-builder/AiBuilderSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

const shell = {
  minHeight: '100vh' as const,
  backgroundColor: '#08080A',
  color: '#E8E8EC',
  padding: '2rem',
  maxWidth: 960,
  margin: '0 auto',
};

export default function AiBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={shell}>
      <ValidationPageTracker page="/ai-builder" />
      <ConsumerNav />
      <AiBuilderSubNav />
      {children}
    </main>
  );
}
