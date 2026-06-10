import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Resolves standalone site by hostname.
 * bourbon-connoisseur.foundryos.app → slug: bourbon-connoisseur
 * Pass 2: lookup app_sites in Supabase
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = host.split('.')[0];

  const response = NextResponse.next();
  response.headers.set('x-foundry-site-slug', slug);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
