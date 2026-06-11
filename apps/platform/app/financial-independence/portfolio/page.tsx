import { FiPortfolioView } from '../../../components/fi-world/FiPortfolioView';

export const metadata = { title: 'My Wealth Portfolio | Financial Independence World' };

export default function FiPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My Wealth Portfolio</h1>
      <FiPortfolioView />
    </section>
  );
}
