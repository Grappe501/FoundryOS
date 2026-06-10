import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Vertical domain resolution — NOT per-topic subdomains.
 * books.foundryos.com/fantasy → vertical: books, topic: fantasy
 * bourbon.foundryos.com/distilleries/buffalo-trace → vertical: bourbon, path segments
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  const verticalSlug = hostname.split('.')[0];
  const pathname = request.nextUrl.pathname;
  const topicSlug = pathname.split('/').filter(Boolean)[0] || null;

  const response = NextResponse.next();
  response.headers.set('x-foundry-vertical', verticalSlug);
  if (topicSlug) response.headers.set('x-foundry-topic', topicSlug);
  response.headers.set('x-foundry-host', hostname);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
