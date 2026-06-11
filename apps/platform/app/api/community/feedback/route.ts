import { NextResponse } from 'next/server';
import { submitPeerFeedback } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const post_id = typeof body.post_id === 'string' ? body.post_id : '';
  const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

  if (!post_id || !comment) {
    return NextResponse.json({ ok: false, error: 'post_id and comment required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : 'anonymous';
  const from_user_slug = user?.id ?? visitor_id;
  const from_author_label =
    typeof body.display_name === 'string'
      ? body.display_name.slice(0, 80)
      : user?.email?.split('@')[0] ?? 'Member';

  const result = await submitPeerFeedback({
    post_id,
    from_user_slug,
    from_user_id: user?.id,
    from_author_label,
    comment,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
