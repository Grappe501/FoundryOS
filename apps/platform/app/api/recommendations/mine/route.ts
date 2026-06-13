import { NextResponse } from 'next/server';
import { recommendationsFromArtifacts } from '@foundry/recommendation-engine-v2';
import { listUserArtifacts } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

/** GET /api/recommendations/mine */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  const artifacts = await listUserArtifacts(user.id);
  const recommendations = recommendationsFromArtifacts(artifacts);

  return NextResponse.json({
    ok: true,
    recommendations: recommendations.map((r) => {
      const art = artifacts.find((a) => a.type === 'recommendation' && a.metadata.payload?.id === r.id);
      return { recommendation: r, artifact: art ?? null };
    }),
    count: recommendations.length,
    by_world: recommendations.reduce<Record<string, number>>((acc, r) => {
      acc[r.world_slug] = (acc[r.world_slug] ?? 0) + 1;
      return acc;
    }, {}),
  });
}
