import { ConsumerNav } from '../../components/ConsumerNav';
import { ChessSubNav } from '../../components/chess-world/ChessSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function ChessLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="foundry-page">
      <ValidationPageTracker page="/chess" />
      <ConsumerNav />
      <ChessSubNav />
      {children}
    </main>
  );
}
