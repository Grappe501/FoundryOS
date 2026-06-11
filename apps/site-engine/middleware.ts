import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveRoute } from '@foundry/vertical-resolver';

/**
 * PASS-005: Vertical Resolution Engine
 * books.foundryos.com/fantasy/overview → vertical: Books, topic: fantasy, content: overview
 */
export function middleware(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    'localhost';

  const { vertical, path } = resolveRoute(host, request.nextUrl.pathname);

  const response = NextResponse.next();
  response.headers.set('x-foundry-host', vertical.host);
  response.headers.set('x-foundry-domain', vertical.domain);
  response.headers.set('x-foundry-site-slug', vertical.site_slug);
  response.headers.set('x-foundry-vertical-id', vertical.vertical_id ?? '');
  response.headers.set('x-foundry-vertical-name', vertical.vertical_name);
  response.headers.set('x-foundry-theme', vertical.theme);
  response.headers.set('x-foundry-launch-status', vertical.launch_status);
  response.headers.set('x-foundry-site-name', vertical.site_display_name);
  response.headers.set('x-foundry-route-kind', path.kind);
  response.headers.set('x-foundry-canonical-path', path.canonical_path);

  if (path.topic_slug) response.headers.set('x-foundry-topic', path.topic_slug);
  if (path.content_type) response.headers.set('x-foundry-content-type', path.content_type);
  if (path.entity_slug) response.headers.set('x-foundry-entity', path.entity_slug);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
