import { NextResponse } from 'next/server';
import { getMissionCompletionsForUser, upsertMissionCompletion } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: true, entries: [] });
  }

  const rows = await getMissionCompletionsForUser(user.id);
  const entries = rows.map((r) => ({
    missionSlug: r.mission_slug,
    missionTitle: r.mission_title,
    completedAt: r.completed_at,
    reflection: r.reflection ?? '',
    portfolioKey: r.portfolio_key,
    worldSlug: r.world_slug,
  }));

  return NextResponse.json({ ok: true, entries });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const world_slug = typeof body.world_slug === 'string' ? body.world_slug : '';
  const mission_slug = typeof body.mission_slug === 'string' ? body.mission_slug : '';
  const mission_title = typeof body.mission_title === 'string' ? body.mission_title : '';
  const portfolio_key = typeof body.portfolio_key === 'string' ? body.portfolio_key : '';
  const reflection = typeof body.reflection === 'string' ? body.reflection : undefined;

  if (!world_slug || !mission_slug || !mission_title || !portfolio_key) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  const result = await upsertMissionCompletion({
    user_id: user.id,
    world_slug,
    mission_slug,
    mission_title,
    portfolio_key,
    reflection,
    user_email: user.email ?? undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
