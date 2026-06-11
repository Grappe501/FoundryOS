import { PortfolioView } from '../../../components/ai-builder/PortfolioView';

export const metadata = { title: 'My AI Portfolio | AI Builder World' };

export default function PortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My AI Portfolio</h1>
      <PortfolioView />
    </section>
  );
}
