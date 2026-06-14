import { NextResponse } from 'next/server';
import type { AtlasAskPrompt } from '@foundry/atlas-aware-ai';
import type { FoundryOrchestrationAction } from '@foundry/ai-orchestration';
import { getOrchestrationEngineStats, validateOrchestrationEngine } from '@foundry/ai-orchestration';
import { runFoundryOrchestration } from '../../../../lib/ai-orchestration/assemble';
import type { UserSegment } from '../../../../lib/world-governance';

export const dynamic = 'force-dynamic';

type Body = {
  world_slug: string;
  action: FoundryOrchestrationAction;
  user_segment?: UserSegment;
  entity_slug?: string;
  atlas_prompt?: AtlasAskPrompt;
  comparison?: {
    label_a: string;
    label_b: string;
    slug_a: string;
    slug_b: string;
    world_slug: string;
  };
};

export async function GET() {
  const validation = validateOrchestrationEngine();
  const stats = getOrchestrationEngineStats();
  return NextResponse.json({ ok: validation.ok, errors: validation.errors, stats });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.world_slug || !body.action) {
    return NextResponse.json({ error: 'world_slug and action required' }, { status: 400 });
  }

  const result = runFoundryOrchestration(
    {
      world_slug: body.world_slug,
      action: body.action,
      user_segment: body.user_segment ?? 'adult',
      entity_slug: body.entity_slug,
      atlas_prompt: body.atlas_prompt,
      comparison: body.comparison,
    },
    { world_slug: body.world_slug, entity_slug: body.entity_slug },
  );

  return NextResponse.json(result);
}
