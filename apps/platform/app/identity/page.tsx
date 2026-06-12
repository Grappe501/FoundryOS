import { IdentityNarrativePage } from '../../components/identity-narrative/IdentityNarrativePage';

export const metadata = {
  title: 'Identity | Foundry',
  description: 'Who you are becoming — narrative identity, not course progress.',
};

export default function IdentityPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <IdentityNarrativePage />
    </main>
  );
}
