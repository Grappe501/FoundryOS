import { notFound } from 'next/navigation';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { CommunityActivationHub } from '../../../components/community/CommunityActivationHub';
import { CommunityFeedTracker } from '../../../components/community/CommunityFeedTracker';
import { getCommunityWorldConfig } from '../../../lib/community-worlds';
import { getSessionUser } from '../../../lib/supabase/server';
import {
  ensureWorldCommunity,
  getCommunityActivationStats,
  getCommunityMember,
  listCommunityMembers,
  listCommunityPosts,
} from '@foundry/db';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ world: string }>;
};

export default async function CommunityWorldPage({ params }: Props) {
  const { world } = await params;
  const config = getCommunityWorldConfig(world);
  if (!config) notFound();

  await ensureWorldCommunity({
    world_slug: config.slug,
    display_name: config.name,
    tagline: config.weeklyChallengeTheme,
    community_type: config.communityType,
  });

  const user = await getSessionUser();
  const userSlug = user?.id ?? 'anonymous';
  const userLabel = user?.email?.split('@')[0] ?? 'Guest';

  const [posts, members, member, stats] = await Promise.all([
    listCommunityPosts(config.slug),
    listCommunityMembers(config.slug),
    user ? getCommunityMember(config.slug, user.id) : getCommunityMember(config.slug, 'anonymous'),
    getCommunityActivationStats(config.slug),
  ]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <CommunityFeedTracker worldSlug={config.slug} />
      <CommunityActivationHub
        config={config}
        initialPosts={posts}
        initialMembers={members}
        isMember={Boolean(member)}
        userLabel={userLabel}
        userSlug={user?.id ?? ''}
        stats={stats}
      />
    </main>
  );
}
