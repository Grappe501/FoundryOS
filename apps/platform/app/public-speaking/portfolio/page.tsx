import { PsPortfolioView } from '../../../components/ps-world/PsPortfolioView';

export const metadata = { title: 'My Speaking Portfolio | Public Speaking World' };

export default function PsPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My Speaking Portfolio</h1>
      <PsPortfolioView />
    </section>
  );
}
