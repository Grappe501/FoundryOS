import { NextResponse } from 'next/server';
import { buildIdentifyPayload } from '../../../../lib/talent-foundry/evidence';
import { postVolunteerToRedDirt } from '../../../../lib/talent-foundry/reddirt';
import type { TalentFoundrySession } from '../../../../lib/talent-foundry/types';

export const dynamic = 'force-dynamic';

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const firstName = str(body.firstName, 80);
  const lastName = str(body.lastName, 80);
  const phone = str(body.phone, 40);
  const email = str(body.email, 160).toLowerCase();
  const zip = str(body.zip, 12);
  const startWhen = str(body.startWhen, 120);
  const consent = body.consent === true;
  const session = body.session as TalentFoundrySession | undefined;

  const fields: Record<string, string> = {};
  if (!firstName) fields.firstName = 'First name is needed.';
  if (!lastName) fields.lastName = 'Last name is needed.';
  if (phone.replace(/\D/g, '').length < 7) fields.phone = 'A phone number helps the campaign reach you.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Enter a usable email.';
  if (zip.length < 3) fields.zip = 'ZIP looks too short.';
  if (!startWhen) fields.startWhen = 'When can you start?';
  if (!consent) fields.consent = 'Please confirm we may share this with the campaign.';
  if (Object.keys(fields).length) {
    return NextResponse.json({ ok: false, error: 'validation', fields }, { status: 400 });
  }
  if (!session || session.v !== 1 || !Array.isArray(session.evidence)) {
    return NextResponse.json({ ok: false, error: 'validation', fields: { form: 'Journey is missing. Start again if needed.' } }, { status: 400 });
  }

  const identity = { firstName, lastName, phone, email, zip, startWhen };
  const result = await postVolunteerToRedDirt({
    identity,
    talentFoundry: buildIdentifyPayload(session, startWhen),
    availability: `Start: ${startWhen}`,
    notes: `Talent Foundry identity. Start: ${startWhen}`,
    leadershipInterest: session.flags.volunteerCommitment === 'yes',
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
