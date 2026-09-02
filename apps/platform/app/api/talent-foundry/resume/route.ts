import { NextResponse } from 'next/server';
import { createResumePlace, ResumeUnavailableError } from '../../../../lib/talent-foundry/resume/store';
import type { TalentFoundrySession } from '../../../../lib/talent-foundry/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const session = body.session as TalentFoundrySession | undefined;
  if (!session || session.v !== 1 || !session.identity?.firstName || !session.flags?.identified) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const { token } = await createResumePlace(session);
    return NextResponse.json({ ok: true, token });
  } catch (err) {
    if (err instanceof Error && err.message === 'not_identified') {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (err instanceof ResumeUnavailableError) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
