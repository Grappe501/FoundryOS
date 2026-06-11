import { CivicEngagementPortfolioView } from '../../../components/civic-engagement-world/CivicEngagementPortfolioView';

export const metadata = { title: 'My Civic Portfolio | Civic Engagement World' };

export default function CivicEngagementPortfolioPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>My Civic Portfolio</h1>
      <CivicEngagementPortfolioView />
    </section>
  );
}
