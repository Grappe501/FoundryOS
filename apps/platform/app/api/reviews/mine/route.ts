import { NextResponse } from 'next/server';
import { extractReviewFromArtifact, reviewsFromArtifacts } from '@foundry/review-engine';
import { listUserArtifacts } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

/** GET /api/reviews/mine — all reviews for signed-in user */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  const artifacts = await listUserArtifacts(user.id);
  const reviews = reviewsFromArtifacts(artifacts);

  return NextResponse.json({
    ok: true,
    reviews: reviews.map((r) => {
      const art = artifacts.find((a) => a.type === 'review' && a.metadata.payload?.id === r.id);
      return { review: r, artifact: art ?? null };
    }),
    count: reviews.length,
    by_world: reviews.reduce<Record<string, number>>((acc, r) => {
      acc[r.world_slug] = (acc[r.world_slug] ?? 0) + 1;
      return acc;
    }, {}),
  });
}
