import { NextResponse } from 'next/server';
import { getDatabaseStatus } from '@foundry/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = await getDatabaseStatus();
  return NextResponse.json(status, {
    status: status.connected ? 200 : 503,
  });
}
