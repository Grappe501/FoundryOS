import { NextResponse } from 'next/server';
import { buildContinuePayload } from '../../../../lib/talent-foundry/evidence';
import { postVolunteerToRedDirt } from '../../../../lib/talent-foundry/reddirt';
import type { TalentFoundrySession } from '../../../../lib/talent-foundry/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const session = body.session as TalentFoundrySession | undefined;
  const identity = session?.identity;
  if (!session || session.v !== 1 || !identity?.email || !identity.submissionId || !identity.firstName) {
    return NextResponse.json({ ok: false, error: 'not_identified' }, { status: 400 });
  }

  const payload = buildContinuePayload(session);
  const result = await postVolunteerToRedDirt({
    identity: {
      firstName: identity.firstName,
      lastName: identity.lastName,
      phone: identity.phone,
      email: identity.email,
      zip: identity.zip,
      startWhen: identity.startWhen,
    },
    talentFoundry: payload,
    availability: [
      identity.startWhen,
      session.conversion.weekly,
      session.conversion.times.join(', '),
      session.conversion.littleRock ? `Little Rock: ${session.conversion.littleRock}` : '',
    ]
      .filter(Boolean)
      .join(' · ')
      .slice(0, 500),
    skills: session.conversion.areas.join(', ').slice(0, 2000),
    leadershipInterest: session.conversion.leadership === 'yes' || session.flags.volunteerCommitment === 'yes',
    interests: session.conversion.areas.slice(0, 18),
    notes: `Pathway ${session.pathwayId ?? ''} · Mission ${session.missionId ?? ''}`.slice(0, 3000),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    ok: true,
    submissionId: result.submissionId,
    userId: result.userId,
    workflowIntakeId: result.workflowIntakeId,
  });
}
