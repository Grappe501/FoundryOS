import { BbqPortfolioView } from '../../../components/bbq-world/BbqPortfolioView';

export const metadata = { title: 'My BBQ Journal | BBQ World' };

export default function BbqPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My BBQ Journal</h1>
      <BbqPortfolioView />
    </section>
  );
}
