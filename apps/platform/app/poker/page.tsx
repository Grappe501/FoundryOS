import Link from 'next/link';
import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

const slug = 'poker' as const;
const config = getWorldExperienceConfig(slug)!;

export const metadata = {
  title: `${config.displayName} World | Foundry`,
  description: config.identityPromise,
};

export default function PokerWorldPage() {
  return (
    <>
      <WorldPremiumHub slug={slug} />
      <p style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <Link href="/explore/poker" style={{ color: 'var(--foundry-text-faint)' }}>Explore path</Link>
      </p>
    </>
  );
}
