import { NextResponse } from 'next/server';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { PortableCollectorState, PortableMemoryState } from '@foundry/personal-database';
import {
  migrateLocalBundleToCloud,
  upsertPortableMemoryState,
  upsertPortableCollectorState,
  upsertUserArtifact,
  insertGraphTraversal,
} from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

/** POST /api/identity/migrate — one-time local → cloud upload on sign-in */
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

  const result = await migrateLocalBundleToCloud(user.id, {
    artifacts: (body.artifacts as FoundryArtifact[]) ?? [],
    memory_state: (body.memory_state as PortableMemoryState) ?? {
      version: 1,
      last_visit: {},
      atlas_views: [],
      context_notes: [],
      intent_notes: [],
      memory_objects: [],
      graph_views: [],
      saved_rabbit_holes: [],
      comparisons: [],
      first_unlock_times: {},
    },
    collector_state: (body.collector_state as PortableCollectorState | null) ?? null,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

/** PATCH — incremental persist (artifact, memory snapshot, graph event) */
export async function PATCH(request: Request) {
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

  const kind = body.kind as string;

  if (kind === 'artifact') {
    const artifact = body.artifact as FoundryArtifact;
    if (!artifact?.id) {
      return NextResponse.json({ ok: false, error: 'Missing artifact' }, { status: 400 });
    }
    const r = await upsertUserArtifact(user.id, { ...artifact, user_id: user.id });
    return NextResponse.json({ ok: r.ok, error: r.error });
  }

  if (kind === 'memory_state') {
    const state = body.memory_state as PortableMemoryState;
    if (!state?.version) {
      return NextResponse.json({ ok: false, error: 'Missing memory_state' }, { status: 400 });
    }
    const r = await upsertPortableMemoryState(user.id, state);
    return NextResponse.json({ ok: r.ok, error: r.error });
  }

  if (kind === 'graph') {
    const event = body.event as {
      world_slug: string;
      node_slug: string;
      node_title: string;
      node_type?: string;
      source?: 'atlas' | 'graph' | 'compare' | 'search';
      entered_at?: string;
    };
    if (!event?.world_slug || !event?.node_slug) {
      return NextResponse.json({ ok: false, error: 'Missing graph event' }, { status: 400 });
    }
    const r = await insertGraphTraversal(user.id, {
      world_slug: event.world_slug,
      node_slug: event.node_slug,
      node_title: event.node_title ?? event.node_slug,
      node_type: event.node_type ?? 'graph',
      source: event.source ?? 'graph',
      entered_at: event.entered_at,
    });
    return NextResponse.json({ ok: r.ok, error: r.error });
  }

  if (kind === 'collector_state') {
    const state = body.collector_state as PortableCollectorState;
    if (!state) {
      return NextResponse.json({ ok: false, error: 'Missing collector_state' }, { status: 400 });
    }
    const r = await upsertPortableCollectorState(user.id, state);
    return NextResponse.json({ ok: r.ok, error: r.error });
  }

  return NextResponse.json({ ok: false, error: 'Unknown kind' }, { status: 400 });
}
