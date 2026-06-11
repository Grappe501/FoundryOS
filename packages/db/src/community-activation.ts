import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type CommunityPostRow = {
  id: string;
  world_slug: string;
  community_id: string | null;
  user_id: string | null;
  user_slug: string;
  author_label: string | null;
  post_type: 'challenge' | 'showcase' | 'reflection';
  title: string | null;
  body: string;
  week_key: string;
  created_at: string;
  feedback_count?: number;
};

export type CommunityMemberRow = {
  id: string;
  community_id: string;
  user_slug: string;
  user_id: string | null;
  display_name: string | null;
  role: string;
  help_count: number;
  recognition: string | null;
  joined_at: string;
};

export type CommunityActivationStats = {
  member_count: number;
  posts_this_week: number;
  challenge_submissions: number;
  showcase_posts: number;
  peer_feedback_count: number;
  mentor_count: number;
};

export type CommunityActivationMetrics = {
  challenge_participation: number;
  community_posts: number;
  mentor_activity: number;
  peer_feedback: number;
  by_world: Record<string, CommunityActivationStats>;
};

export function getWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function communitySlugForWorld(worldSlug: string): string {
  return `${worldSlug}-community`;
}

export async function ensureWorldCommunity(input: {
  world_slug: string;
  display_name: string;
  tagline: string;
  community_type: string;
}): Promise<{ id: string; slug: string } | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const slug = communitySlugForWorld(input.world_slug);
  const { data, error } = await client
    .from('community_instances')
    .upsert(
      {
        slug,
        display_name: input.display_name,
        tagline: input.tagline,
        vertical_slug: input.world_slug,
        domain_slug: input.world_slug,
        community_type: input.community_type,
        host_user_slug: 'foundry-host',
        member_count: 0,
        status: 'active',
        metadata: { capabilities: ['members', 'challenges', 'showcase', 'mentorship'] },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' },
    )
    .select('id, slug')
    .single();

  if (error || !data) return null;
  return { id: data.id as string, slug: data.slug as string };
}

export async function joinWorldCommunity(input: {
  world_slug: string;
  user_slug: string;
  user_id?: string;
  display_name?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  const slug = communitySlugForWorld(input.world_slug);
  const { data: community } = await client.from('community_instances').select('id, member_count').eq('slug', slug).maybeSingle();
  if (!community) return { ok: false, error: 'Community not found' };

  const { error } = await client.from('community_members').upsert(
    {
      community_id: community.id,
      user_slug: input.user_slug,
      user_id: input.user_id ?? null,
      display_name: input.display_name ?? null,
      role: 'member',
    },
    { onConflict: 'community_id,user_slug' },
  );

  if (error) return { ok: false, error: error.message };

  const { count } = await client
    .from('community_members')
    .select('*', { count: 'exact', head: true })
    .eq('community_id', community.id);

  await client
    .from('community_instances')
    .update({ member_count: count ?? 1, updated_at: new Date().toISOString() })
    .eq('id', community.id);

  return { ok: true };
}

export async function getCommunityMember(
  world_slug: string,
  user_slug: string,
): Promise<CommunityMemberRow | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const slug = communitySlugForWorld(world_slug);
  const { data: community } = await client.from('community_instances').select('id').eq('slug', slug).maybeSingle();
  if (!community) return null;

  const { data } = await client
    .from('community_members')
    .select('*')
    .eq('community_id', community.id)
    .eq('user_slug', user_slug)
    .maybeSingle();

  return data as CommunityMemberRow | null;
}

export async function listCommunityMembers(world_slug: string, limit = 20): Promise<CommunityMemberRow[]> {
  if (!isSupabaseConfigured()) return [];
  const client = createServiceClient();
  if (!client) return [];

  const slug = communitySlugForWorld(world_slug);
  const { data: community } = await client.from('community_instances').select('id').eq('slug', slug).maybeSingle();
  if (!community) return [];

  const { data } = await client
    .from('community_members')
    .select('*')
    .eq('community_id', community.id)
    .order('help_count', { ascending: false })
    .limit(limit);

  return (data ?? []) as CommunityMemberRow[];
}

export async function listCommunityPosts(world_slug: string, limit = 30): Promise<CommunityPostRow[]> {
  if (!isSupabaseConfigured()) return [];
  const client = createServiceClient();
  if (!client) return [];

  const { data: posts } = await client
    .from('community_posts')
    .select('*')
    .eq('world_slug', world_slug)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (!posts) return [];

  const ids = posts.map((p) => p.id);
  const { data: feedbackCounts } = await client.from('community_peer_feedback').select('post_id').in('post_id', ids);

  const countMap: Record<string, number> = {};
  for (const f of feedbackCounts ?? []) {
    countMap[f.post_id] = (countMap[f.post_id] ?? 0) + 1;
  }

  return posts.map((p) => ({
    ...(p as CommunityPostRow),
    feedback_count: countMap[p.id] ?? 0,
  }));
}

export async function submitCommunityPost(input: {
  world_slug: string;
  user_slug: string;
  user_id?: string;
  author_label?: string;
  post_type: 'challenge' | 'showcase' | 'reflection';
  title?: string;
  body: string;
  week_key?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  const slug = communitySlugForWorld(input.world_slug);
  const { data: community } = await client.from('community_instances').select('id').eq('slug', slug).maybeSingle();

  const { data, error } = await client
    .from('community_posts')
    .insert({
      world_slug: input.world_slug,
      community_id: community?.id ?? null,
      user_slug: input.user_slug,
      user_id: input.user_id ?? null,
      author_label: input.author_label ?? null,
      post_type: input.post_type,
      title: input.title ?? null,
      body: input.body,
      week_key: input.week_key ?? getWeekKey(),
    })
    .select('id')
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id };
}

export async function submitPeerFeedback(input: {
  post_id: string;
  from_user_slug: string;
  from_user_id?: string;
  from_author_label?: string;
  comment: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  const { data: post } = await client.from('community_posts').select('user_slug, community_id').eq('id', input.post_id).maybeSingle();
  if (!post) return { ok: false, error: 'Post not found' };

  const { error } = await client.from('community_peer_feedback').insert({
    post_id: input.post_id,
    from_user_slug: input.from_user_slug,
    from_user_id: input.from_user_id ?? null,
    from_author_label: input.from_author_label ?? null,
    comment: input.comment,
  });

  if (error) return { ok: false, error: error.message };

  if (post.community_id && post.user_slug !== input.from_user_slug) {
    const { data: helper } = await client
      .from('community_members')
      .select('id, help_count')
      .eq('community_id', post.community_id)
      .eq('user_slug', input.from_user_slug)
      .maybeSingle();

    if (helper) {
      await client
        .from('community_members')
        .update({ help_count: (helper.help_count ?? 0) + 1 })
        .eq('id', helper.id);
    }
  }

  return { ok: true };
}

export async function getCommunityActivationStats(world_slug: string): Promise<CommunityActivationStats> {
  if (!isSupabaseConfigured()) {
    return { member_count: 0, posts_this_week: 0, challenge_submissions: 0, showcase_posts: 0, peer_feedback_count: 0, mentor_count: 0 };
  }
  const client = createServiceClient();
  if (!client) {
    return { member_count: 0, posts_this_week: 0, challenge_submissions: 0, showcase_posts: 0, peer_feedback_count: 0, mentor_count: 0 };
  }

  const week = getWeekKey();
  const slug = communitySlugForWorld(world_slug);
  const { data: community } = await client.from('community_instances').select('id, member_count').eq('slug', slug).maybeSingle();

  const { count: postsWeek } = await client
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('world_slug', world_slug)
    .eq('week_key', week);

  const { count: challenges } = await client
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('world_slug', world_slug)
    .eq('post_type', 'challenge');

  const { count: showcases } = await client
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('world_slug', world_slug)
    .eq('post_type', 'showcase');

  let peerFeedback = 0;
  const { data: worldPosts } = await client.from('community_posts').select('id').eq('world_slug', world_slug);
  if (worldPosts && worldPosts.length > 0) {
    const { count } = await client
      .from('community_peer_feedback')
      .select('*', { count: 'exact', head: true })
      .in(
        'post_id',
        worldPosts.map((p) => p.id),
      );
    peerFeedback = count ?? 0;
  }

  let mentorCount = 0;
  if (community) {
    const { count } = await client
      .from('community_members')
      .select('*', { count: 'exact', head: true })
      .eq('community_id', community.id)
      .gte('help_count', 3);
    mentorCount = count ?? 0;
  }

  return {
    member_count: community?.member_count ?? 0,
    posts_this_week: postsWeek ?? 0,
    challenge_submissions: challenges ?? 0,
    showcase_posts: showcases ?? 0,
    peer_feedback_count: peerFeedback,
    mentor_count: mentorCount,
  };
}

export async function getCommunityActivationMetrics(): Promise<CommunityActivationMetrics> {
  const worlds = [
    'ai-builder',
    'financial-independence',
    'public-speaking',
    'bourbon',
    'bbq',
    'poker',
    'civic-engagement',
  ];

  const by_world: Record<string, CommunityActivationStats> = {};
  let challenge_participation = 0;
  let community_posts = 0;
  let mentor_activity = 0;
  let peer_feedback = 0;

  for (const w of worlds) {
    const stats = await getCommunityActivationStats(w);
    by_world[w] = stats;
    challenge_participation += stats.challenge_submissions;
    community_posts += stats.posts_this_week;
    mentor_activity += stats.mentor_count;
    peer_feedback += stats.peer_feedback_count;
  }

  return { challenge_participation, community_posts, mentor_activity, peer_feedback, by_world };
}
