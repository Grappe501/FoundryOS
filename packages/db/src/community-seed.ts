import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import {
  ensureWorldCommunity,
  getWeekKey,
} from './community-activation';
import { COMMUNITY_WORLD_META } from './community-seed-meta';

export type SeedDiscussion = { title: string; body: string; author: string };
export type SeedShowcase = { title: string; body: string; author: string };
export type SeedWeeklyChallenge = { theme: string; prompt: string };
export type SeedMentor = {
  display_name: string;
  bio: string;
  help_count: number;
  recognition: string;
};
export type SeedMember = { display_name: string; role: string; help_count?: number };

export type SeedWorldBundle = {
  world_slug: string;
  mentor: SeedMentor;
  members: SeedMember[];
  discussions: SeedDiscussion[];
  showcases: SeedShowcase[];
  weeklyChallenges: SeedWeeklyChallenge[];
};

function slugForSeedUser(world: string, name: string): string {
  return `seed-${world}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function offsetWeekKey(weekOffset: number, from = new Date()): string {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + weekOffset * 7);
  return getWeekKey(d);
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export async function isCommunitySeeded(world_slug: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const client = createServiceClient();
  if (!client) return false;
  const { count } = await client
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('world_slug', world_slug)
    .eq('is_seeded', true);
  return (count ?? 0) > 0;
}

async function clearSeededWorld(client: ReturnType<typeof createServiceClient>, world_slug: string) {
  if (!client) return;
  const { data: posts } = await client.from('community_posts').select('id').eq('world_slug', world_slug).eq('is_seeded', true);
  const ids = (posts ?? []).map((p) => p.id);
  if (ids.length) await client.from('community_peer_feedback').delete().in('post_id', ids);
  await client.from('community_posts').delete().eq('world_slug', world_slug).eq('is_seeded', true);
  await client.from('community_weekly_challenges').delete().eq('world_slug', world_slug);
  const slug = `${world_slug}-community`;
  const { data: community } = await client.from('community_instances').select('id').eq('slug', slug).maybeSingle();
  if (community) {
    await client.from('community_members').delete().eq('community_id', community.id).eq('is_seeded', true);
  }
}

export type WeeklyChallengeRow = {
  id: string;
  world_slug: string;
  week_key: string;
  theme: string;
  prompt: string;
  is_seeded: boolean;
  created_at: string;
};

export async function listWeeklyChallenges(world_slug: string, limit = 12): Promise<WeeklyChallengeRow[]> {
  if (!isSupabaseConfigured()) return [];
  const client = createServiceClient();
  if (!client) return [];
  const { data } = await client
    .from('community_weekly_challenges')
    .select('*')
    .eq('world_slug', world_slug)
    .order('week_key', { ascending: false })
    .limit(limit);
  return (data ?? []) as WeeklyChallengeRow[];
}

export async function getCurrentWeeklyChallenge(world_slug: string): Promise<WeeklyChallengeRow | null> {
  const week = getWeekKey();
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;
  const { data } = await client
    .from('community_weekly_challenges')
    .select('*')
    .eq('world_slug', world_slug)
    .eq('week_key', week)
    .maybeSingle();
  return data as WeeklyChallengeRow | null;
}

export async function seedCommunityWorld(
  bundle: SeedWorldBundle,
  options: { force?: boolean } = {},
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  if (!options.force && (await isCommunitySeeded(bundle.world_slug))) {
    return { ok: true, skipped: true };
  }

  if (options.force) await clearSeededWorld(client, bundle.world_slug);

  const meta = COMMUNITY_WORLD_META[bundle.world_slug];
  if (!meta) return { ok: false, error: `Unknown world meta: ${bundle.world_slug}` };

  const community = await ensureWorldCommunity({
    world_slug: bundle.world_slug,
    display_name: meta.display_name,
    tagline: meta.tagline,
    community_type: meta.community_type,
  });
  if (!community) return { ok: false, error: 'Failed to ensure community' };

  const mentorSlug = slugForSeedUser(bundle.world_slug, 'mentor');
  await client.from('community_members').upsert(
    {
      community_id: community.id,
      user_slug: mentorSlug,
      display_name: bundle.mentor.display_name,
      role: 'mentor',
      help_count: bundle.mentor.help_count,
      recognition: bundle.mentor.recognition,
      is_seeded: true,
    },
    { onConflict: 'community_id,user_slug' },
  );

  for (const m of bundle.members) {
    await client.from('community_members').upsert(
      {
        community_id: community.id,
        user_slug: slugForSeedUser(bundle.world_slug, m.display_name),
        display_name: m.display_name,
        role: m.role,
        help_count: m.help_count ?? 0,
        is_seeded: true,
      },
      { onConflict: 'community_id,user_slug' },
    );
  }

  for (let i = 0; i < bundle.weeklyChallenges.length; i++) {
    const wc = bundle.weeklyChallenges[i]!;
    const weekOffset = i - (bundle.weeklyChallenges.length - 1);
    const week_key = offsetWeekKey(weekOffset);
    await client.from('community_weekly_challenges').upsert(
      {
        world_slug: bundle.world_slug,
        week_key,
        theme: wc.theme,
        prompt: wc.prompt,
        is_seeded: true,
      },
      { onConflict: 'world_slug,week_key' },
    );
  }

  const discussionPosts = bundle.discussions.map((disc, i) => ({
    world_slug: bundle.world_slug,
    community_id: community.id,
    user_slug: slugForSeedUser(bundle.world_slug, disc.author.split('·')[0]?.trim() ?? disc.author),
    author_label: disc.author,
    post_type: 'discussion' as const,
    title: disc.title,
    body: disc.body,
    week_key: getWeekKey(new Date(daysAgo(i * 3))),
    is_seeded: true,
    created_at: daysAgo(i * 3 + 1),
  }));

  const showcasePosts = bundle.showcases.map((show, i) => ({
    world_slug: bundle.world_slug,
    community_id: community.id,
    user_slug: slugForSeedUser(bundle.world_slug, show.author.split('·')[0]?.trim() ?? show.author),
    author_label: show.author,
    post_type: 'showcase' as const,
    title: show.title,
    body: show.body,
    week_key: getWeekKey(new Date(daysAgo(i * 5))),
    is_seeded: true,
    created_at: daysAgo(i * 5 + 2),
  }));

  const sampleChallenges = bundle.members.slice(0, 2).map((m, i) => ({
    world_slug: bundle.world_slug,
    community_id: community.id,
    user_slug: slugForSeedUser(bundle.world_slug, m.display_name),
    author_label: m.display_name,
    post_type: 'challenge' as const,
    title: `Challenge response — ${offsetWeekKey(-i)}`,
    body: `Completed this week's challenge. ${bundle.weeklyChallenges[bundle.weeklyChallenges.length - 1 - i]?.prompt ?? 'Shared my progress.'}`,
    week_key: offsetWeekKey(-i),
    is_seeded: true,
    created_at: daysAgo(i * 7 + 1),
  }));

  const allPosts = [...discussionPosts, ...showcasePosts, ...sampleChallenges];
  const { data: inserted, error: postError } = await client.from('community_posts').insert(allPosts).select('id, post_type');
  if (postError) return { ok: false, error: postError.message };

  const showcaseIds = (inserted ?? [])
    .filter((p) => p.post_type === 'showcase')
    .slice(0, 3)
    .map((p) => p.id);

  for (const postId of showcaseIds) {
    await client.from('community_peer_feedback').insert({
      post_id: postId,
      from_user_slug: mentorSlug,
      from_author_label: bundle.mentor.display_name,
      comment: 'Strong structure — consider adding one metric or photo next time. Keep posting.',
    });
  }

  const { count: memberCount } = await client
    .from('community_members')
    .select('*', { count: 'exact', head: true })
    .eq('community_id', community.id);

  await client
    .from('community_instances')
    .update({ member_count: memberCount ?? 0, updated_at: new Date().toISOString() })
    .eq('id', community.id);

  return { ok: true };
}

export async function seedAllCommunities(
  bundles: SeedWorldBundle[],
  options: { force?: boolean } = {},
): Promise<{ ok: boolean; seeded: string[]; skipped: string[]; errors: string[] }> {
  const seeded: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const bundle of bundles) {
    const result = await seedCommunityWorld(bundle, options);
    if (result.skipped) skipped.push(bundle.world_slug);
    else if (result.ok) seeded.push(bundle.world_slug);
    else errors.push(`${bundle.world_slug}: ${result.error}`);
  }

  if (isSupabaseConfigured()) {
    const client = createServiceClient();
    if (client) {
      await client.from('platform_metrics').upsert(
        {
          metric_key: 'pass028a_community_seeded',
          metric_value: { worlds: seeded.concat(skipped), at: new Date().toISOString() },
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'metric_key' },
      );
    }
  }

  return { ok: errors.length === 0, seeded, skipped, errors };
}

export async function ensureCommunitySeeded(bundles: SeedWorldBundle[]): Promise<void> {
  for (const bundle of bundles) {
    if (!(await isCommunitySeeded(bundle.world_slug))) {
      await seedCommunityWorld(bundle);
    }
  }
}
