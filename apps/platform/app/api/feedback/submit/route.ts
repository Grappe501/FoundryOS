import { NextResponse } from 'next/server';
import { insertTesterFeedback } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const confused = typeof body.confused === 'string' ? body.confused.trim() : '';
  const liked = typeof body.liked === 'string' ? body.liked.trim() : '';
  const build_next = typeof body.build_next === 'string' ? body.build_next.trim() : '';

  if (!confused || !liked || !build_next) {
    return NextResponse.json({ ok: false, error: 'All three fields required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : undefined;

  const result = await insertTesterFeedback({
    visitor_id,
    user_id: user?.id,
    email: user?.email ?? undefined,
    segment: typeof body.segment === 'string' ? body.segment : undefined,
    world_slug: typeof body.world_slug === 'string' ? body.world_slug : undefined,
    mission_slug: typeof body.mission_slug === 'string' ? body.mission_slug : undefined,
    confused,
    liked,
    build_next,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
