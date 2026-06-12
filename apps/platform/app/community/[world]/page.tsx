import { notFound } from 'next/navigation';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { CommunityActivationHub } from '../../../components/community/CommunityActivationHub';
import { CommunityFeedTracker } from '../../../components/community/CommunityFeedTracker';
import { CommunityEventsStrip } from '../../../components/world-events/WorldEventsToday';
import { getCommunityWorldConfig } from '../../../lib/community-worlds';
import { getSeedBundleForWorld, ALL_COMMUNITY_SEEDS } from '../../../lib/community-seed';
import { getSessionUser } from '../../../lib/supabase/server';
import {
  ensureWorldCommunity,
  ensureCommunitySeeded,
  getCommunityActivationStats,
  getCommunityMember,
  getCurrentWeeklyChallenge,
  listCommunityMembers,
  listCommunityPosts,
  listWeeklyChallenges,
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

  await ensureCommunitySeeded(ALL_COMMUNITY_SEEDS);

  const user = await getSessionUser();
  const userLabel = user?.email?.split('@')[0] ?? 'Guest';
  const seedBundle = getSeedBundleForWorld(config.slug);

  const [posts, members, member, stats, currentChallenge, weeklyChallenges] = await Promise.all([
    listCommunityPosts(config.slug, 50),
    listCommunityMembers(config.slug, 30),
    user ? getCommunityMember(config.slug, user.id) : getCommunityMember(config.slug, 'anonymous'),
    getCommunityActivationStats(config.slug),
    getCurrentWeeklyChallenge(config.slug),
    listWeeklyChallenges(config.slug, 12),
  ]);

  const challengeTheme = currentChallenge?.theme ?? config.weeklyChallengeTheme;
  const challengePrompt = currentChallenge?.prompt ?? config.weeklyChallengePrompt;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <CommunityEventsStrip worldSlug={config.slug} accent="var(--foundry-success)" />
      <CommunityFeedTracker worldSlug={config.slug} />
      <CommunityActivationHub
        config={config}
        initialPosts={posts}
        initialMembers={members}
        isMember={Boolean(member)}
        userLabel={userLabel}
        userSlug={user?.id ?? ''}
        stats={stats}
        mentorProfile={seedBundle?.mentor}
        weeklyChallenge={{ theme: challengeTheme, prompt: challengePrompt, week_key: currentChallenge?.week_key }}
        weeklyChallenges={weeklyChallenges.map((w) => ({
          theme: w.theme,
          prompt: w.prompt,
          week_key: w.week_key,
        }))}
      />
    </main>
  );
}
