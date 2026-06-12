import { ConsumerNav } from '../../components/ConsumerNav';
import { BourbonSubNav } from '../../components/bourbon-world/BourbonSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function BourbonLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/bourbon" />
      <ConsumerNav />
      <BourbonSubNav />
      {children}
    </main>
  );
}
