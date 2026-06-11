import { NextResponse } from 'next/server';
import { insertBetaWaitlist, type BetaSegment } from '@foundry/db';

export const dynamic = 'force-dynamic';

const SEGMENTS: BetaSegment[] = ['student', 'parent', 'adult_learner', 'educator', 'hobbyist'];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const segment = body.segment as BetaSegment;
  const interested_worlds = Array.isArray(body.interested_worlds)
    ? body.interested_worlds.filter((w): w is string => typeof w === 'string').slice(0, 12)
    : [];

  if (!email || !email.includes('@') || !SEGMENTS.includes(segment) || interested_worlds.length === 0) {
    return NextResponse.json({ ok: false, error: 'Email, segment, and at least one world required' }, { status: 400 });
  }

  const result = await insertBetaWaitlist({
    email,
    segment,
    interested_worlds,
    visitor_id: typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : undefined,
    source: 'beta_page',
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
