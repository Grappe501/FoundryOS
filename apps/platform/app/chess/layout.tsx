import { ConsumerNav } from '../../components/ConsumerNav';
import { ChessSubNav } from '../../components/chess-world/ChessSubNav';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export default function ChessLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ValidationPageTracker page="/chess" />
      <ConsumerNav />
      <ChessSubNav />
      {children}
    </main>
  );
}
