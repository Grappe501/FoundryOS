import Link from 'next/link';
import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

const slug = 'bourbon' as const;
const config = getWorldExperienceConfig(slug)!;

export const metadata = {
  title: `${config.displayName} World | Foundry`,
  description: config.identityPromise,
};

export default function BourbonWorldPage() {
  return (
    <>
      <WorldPremiumHub slug={slug} />
      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/explore/bourbon" style={{ color: '#6B6B70' }}>Explore path</Link>
      </p>
    </>
  );
}
