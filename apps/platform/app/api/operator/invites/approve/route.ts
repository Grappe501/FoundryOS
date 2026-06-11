import { NextResponse } from 'next/server';
import { approveBetaTester, type BetaSegment } from '@foundry/db';

export const dynamic = 'force-dynamic';

const SEGMENTS: BetaSegment[] = ['student', 'parent', 'adult_learner', 'educator', 'hobbyist'];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id : '';
  const starting_world_slug = typeof body.starting_world_slug === 'string' ? body.starting_world_slug : '';
  const assigned_segment = body.assigned_segment as BetaSegment | undefined;
  const operator_notes = typeof body.operator_notes === 'string' ? body.operator_notes : undefined;

  if (!id || !starting_world_slug) {
    return NextResponse.json({ ok: false, error: 'id and starting_world_slug required' }, { status: 400 });
  }

  if (assigned_segment && !SEGMENTS.includes(assigned_segment)) {
    return NextResponse.json({ ok: false, error: 'Invalid segment' }, { status: 400 });
  }

  const result = await approveBetaTester({
    id,
    starting_world_slug,
    assigned_segment,
    operator_notes,
    send_invite: true,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, entry: result.entry });
}
