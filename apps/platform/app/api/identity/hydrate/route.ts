import { NextResponse } from 'next/server';
import { hydratePortableIdentity } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

/** GET /api/identity/hydrate — rebuild portable identity from cloud (040D Test) */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  }

  const bundle = await hydratePortableIdentity(user.id);
  return NextResponse.json({ ok: true, bundle });
}
