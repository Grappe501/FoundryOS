import { NextResponse } from 'next/server';
import { getWeekKey, submitCommunityPost } from '@foundry/db';
import { getCommunityWorldConfig } from '../../../../lib/community-worlds';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const world_slug = typeof body.world_slug === 'string' ? body.world_slug : '';
  const post_type = body.post_type as 'challenge' | 'showcase' | 'reflection' | 'discussion';
  const text = typeof body.body === 'string' ? body.body.trim() : '';

  if (!world_slug || !['challenge', 'showcase', 'reflection', 'discussion'].includes(post_type) || !text) {
    return NextResponse.json({ ok: false, error: 'world_slug, post_type, and body required' }, { status: 400 });
  }

  if (post_type === 'discussion') {
    const discussionTitle = typeof body.title === 'string' ? body.title.trim() : '';
    if (!discussionTitle) {
      return NextResponse.json({ ok: false, error: 'title required for discussions' }, { status: 400 });
    }
  }

  if (!getCommunityWorldConfig(world_slug)) {
    return NextResponse.json({ ok: false, error: 'Unknown world' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : 'anonymous';
  const user_slug = user?.id ?? visitor_id;
  const author_label =
    typeof body.display_name === 'string'
      ? body.display_name.slice(0, 80)
      : user?.email?.split('@')[0] ?? 'Member';

  const result = await submitCommunityPost({
    world_slug,
    user_slug,
    user_id: user?.id,
    author_label,
    post_type,
    title: typeof body.title === 'string' ? body.title.slice(0, 120) : undefined,
    body: text,
    week_key: getWeekKey(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    post: {
      id: result.id,
      world_slug,
      user_slug,
      author_label,
      post_type,
      title: typeof body.title === 'string' ? body.title : null,
      body: text,
      week_key: getWeekKey(),
      created_at: new Date().toISOString(),
      feedback_count: 0,
    },
  });
}
