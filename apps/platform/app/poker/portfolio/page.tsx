import { PokerPortfolioView } from '../../../components/poker-world/PokerPortfolioView';

export const metadata = { title: 'My Poker Journey | Poker World' };

export default function PokerPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My Poker Journey</h1>
      <PokerPortfolioView />
    </section>
  );
}
