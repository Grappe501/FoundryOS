import { BourbonPortfolioView } from '../../../components/bourbon-world/BourbonPortfolioView';

export const metadata = { title: 'My Bourbon Journey | Bourbon World' };

export default function BourbonPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My Bourbon Journey</h1>
      <BourbonPortfolioView />
    </section>
  );
}
