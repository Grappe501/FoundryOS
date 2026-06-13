import { NextResponse } from 'next/server';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import {
  createReview,
  extractReviewFromArtifact,
  inferReviewType,
  listReviewsForEntity,
  reviewToArtifact,
  reviewsFromArtifacts,
  validateReview,
} from '@foundry/review-engine';
import { upsertUserArtifact, listUserArtifacts } from '@foundry/db';
import { createClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

function hydrateReviewResponse(artifact: FoundryArtifact) {
  const review = extractReviewFromArtifact(artifact);
  return { artifact, review };
}

/** GET /api/reviews?world=bourbon&entity=wild-turkey-101&entity_type=bottle */
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

  const reviews = listReviewsForEntity(artifacts, filter);
  const hydrated = reviews
    .map((r) => {
      const art = artifacts.find((a) => a.type === 'review' && a.metadata.payload?.id === r.id);
      return art ? hydrateReviewResponse(art) : { artifact: null, review: r };
    })
    .filter((h) => h.review);

  return NextResponse.json({ ok: true, reviews: hydrated, count: hydrated.length });
}

/** POST /api/reviews — validate, artifact, graph link, identity-sync via client path */
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
  const review_type =
    (body.review_type as ReturnType<typeof inferReviewType>) ??
    inferReviewType(world_slug, entity_type);

  const input = {
    user_id: user.id,
    world_slug,
    entity_slug,
    entity_type,
    review_type,
    title: String(body.title ?? ''),
    body: String(body.body ?? ''),
    who_this_is_for: String(body.who_this_is_for ?? ''),
    who_should_skip: body.who_should_skip ? String(body.who_should_skip) : undefined,
    what_surprised_me: String(body.what_surprised_me ?? ''),
    what_to_try_next: String(body.what_to_try_next ?? ''),
    confidence_level: body.confidence_level as 'low' | 'medium' | 'high' | 'expert' | undefined,
    experience_context: body.experience_context ? String(body.experience_context) : undefined,
    review_dimensions: body.review_dimensions as Record<string, string> | undefined,
    privacy: body.privacy as 'private' | 'public' | 'community' | undefined,
    value_note: body.value_note ? String(body.value_note) : undefined,
    beginner_note: body.beginner_note ? String(body.beginner_note) : undefined,
    entity_title: body.entity_title ? String(body.entity_title) : undefined,
  };

  const validation = validateReview(input);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const created = createReview(input);
  if (!created.ok) {
    return NextResponse.json({ ok: false, errors: created.errors }, { status: 400 });
  }

  const artifactInput = reviewToArtifact(created.review, input.entity_title);
  const now = new Date().toISOString();
  const artifact: FoundryArtifact = {
    id: `art_${created.review.id}`,
    type: 'review',
    user_id: user.id,
    metadata: {
      ...artifactInput.metadata,
      evidence: 'self_reported',
    },
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
    ...hydrateReviewResponse(artifact),
    identity_sync: 'review_published',
  });
}
