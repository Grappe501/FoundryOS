import { NextResponse } from 'next/server';
import { ensureWorldCommunity, joinWorldCommunity } from '@foundry/db';
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
  const config = getCommunityWorldConfig(world_slug);
  if (!config) {
    return NextResponse.json({ ok: false, error: 'Unknown world' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : 'anonymous';
  const user_slug = user?.id ?? visitor_id;
  const display_name =
    typeof body.display_name === 'string'
      ? body.display_name.slice(0, 80)
      : user?.email?.split('@')[0] ?? 'Member';

  await ensureWorldCommunity({
    world_slug: config.slug,
    display_name: config.name,
    tagline: config.weeklyChallengeTheme,
    community_type: config.communityType,
  });

  const result = await joinWorldCommunity({
    world_slug: config.slug,
    user_slug,
    user_id: user?.id,
    display_name,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
