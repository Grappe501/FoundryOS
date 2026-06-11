import { NextResponse } from 'next/server';
import { categoryForEvent, insertValidationEvent, type ValidationEventType } from '@foundry/db';

export const dynamic = 'force-dynamic';

const ALLOWED: ValidationEventType[] = [
  'visitor_landed',
  'assessment_started',
  'assessment_completed',
  'path_started',
  'project_started',
  'session_visit',
  'account_created',
  'trial_started',
  'paid',
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : null;
  const event_type = body.event_type as ValidationEventType;

  if (!visitor_id || !ALLOWED.includes(event_type)) {
    return NextResponse.json({ ok: false, error: 'invalid payload' }, { status: 400 });
  }

  const persisted = await insertValidationEvent({
    visitor_id,
    event_type,
    category: categoryForEvent(event_type),
    landing_page: typeof body.landing_page === 'string' ? body.landing_page.slice(0, 200) : undefined,
    source: typeof body.source === 'string' ? body.source.slice(0, 200) : undefined,
    path_slug: typeof body.path_slug === 'string' ? body.path_slug.slice(0, 100) : undefined,
    metadata:
      body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? (body.metadata as Record<string, unknown>)
        : {},
  });

  return NextResponse.json({ ok: true, persisted });
}
