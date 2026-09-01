import { NextResponse } from 'next/server';
import { kellyCampaign } from '../../../../../lib/talent-foundry/campaigns/kelly';
import { loadResumePlace } from '../../../../../lib/talent-foundry/resume/store';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const session = await loadResumePlace(token, kellyCampaign.id);
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ ok: true, session });
}
