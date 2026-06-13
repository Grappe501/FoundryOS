import { NextResponse } from 'next/server';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import {
  createRecommendation,
  extractRecommendationFromArtifact,
  inferRecommendationType,
  listRecommendationsForEntity,
  recommendationToArtifact,
  validateRecommendation,
} from '@foundry/recommendation-engine-v2';
import { upsertUserArtifact, listUserArtifacts } from '@foundry/db';
import { createClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

function hydrate(artifact: FoundryArtifact) {
  return { artifact, recommendation: extractRecommendationFromArtifact(artifact) };
}

/** GET /api/recommendations?world=bourbon&entity=wild-turkey-101 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const world = searchParams.get('world');
  const entity = searchParams.get('entity');
  const entityType = searchParams.get('entity_type') ?? 'bottle';
  const mine = searchParams.get('mine') === 'true';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!world || !entity) {
    return NextResponse.json({ ok: false, error: 'Missing world or entity query params' }, { status: 400 });
  }

  if (!user && mine) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  const artifacts = user ? await listUserArtifacts(user.id, world) : [];
  const filter = {
    world_slug: world,
    entity_type: entityType,
    entity_slug: entity,
    user_id: mine ? user!.id : undefined,
    privacy: mine ? undefined : ('public' as const),
  };

  const recommendations = listRecommendationsForEntity(artifacts, filter);
  const hydrated = recommendations
    .map((r) => {
      const art = artifacts.find((a) => a.type === 'recommendation' && a.metadata.payload?.id === r.id);
      return art ? hydrate(art) : { artifact: null, recommendation: r };
    })
    .filter((h) => h.recommendation);

  return NextResponse.json({ ok: true, recommendations: hydrated, count: hydrated.length });
}

/** POST /api/recommendations */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const world_slug = String(body.world_slug ?? '');
  const entity_slug = String(body.entity_slug ?? '');
  const entity_type = String(body.entity_type ?? 'bottle');
  const recommendation_type =
    (body.recommendation_type as ReturnType<typeof inferRecommendationType>) ??
    inferRecommendationType(world_slug, entity_type);

  const input = {
    user_id: user.id,
    world_slug,
    entity_slug,
    entity_type,
    recommendation_type,
    title: String(body.title ?? ''),
    recommendation_reason: String(body.recommendation_reason ?? ''),
    who_this_is_for: String(body.who_this_is_for ?? ''),
    best_next_action: String(body.best_next_action ?? ''),
    what_to_watch_for: body.what_to_watch_for ? String(body.what_to_watch_for) : undefined,
    confidence_level: body.confidence_level as 'low' | 'medium' | 'high' | 'expert' | undefined,
    based_on_artifacts: body.based_on_artifacts as string[] | undefined,
    based_on_reviews: body.based_on_reviews as string[] | undefined,
    based_on_collections: body.based_on_collections as string[] | undefined,
    related_graph_nodes: body.related_graph_nodes as string[] | undefined,
    privacy: body.privacy as 'private' | 'public' | 'community' | undefined,
    budget_note: body.budget_note ? String(body.budget_note) : undefined,
    beginner_note: body.beginner_note ? String(body.beginner_note) : undefined,
    comparison_note: body.comparison_note ? String(body.comparison_note) : undefined,
    bourbon_context: body.bourbon_context ? String(body.bourbon_context) : undefined,
    entity_title: body.entity_title ? String(body.entity_title) : undefined,
  };

  const validation = validateRecommendation(input);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const created = createRecommendation(input);
  if (!created.ok) {
    return NextResponse.json({ ok: false, errors: created.errors }, { status: 400 });
  }

  const artifactInput = recommendationToArtifact(created.recommendation, input.entity_title);
  const now = new Date().toISOString();
  const artifact: FoundryArtifact = {
    id: `art_${created.recommendation.id}`,
    type: 'recommendation',
    user_id: user.id,
    metadata: { ...artifactInput.metadata, evidence: 'self_reported' },
    relations: artifactInput.relations ?? [],
    created_at: now,
    updated_at: now,
  };

  const persisted = await upsertUserArtifact(user.id, artifact);
  if (!persisted.ok) {
    return NextResponse.json({ ok: false, error: persisted.error }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    ...hydrate(artifact),
    identity_sync: 'recommendation_published',
  });
}
