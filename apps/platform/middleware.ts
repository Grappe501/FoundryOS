import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FACTORY_CONSUMER_ROUTES } from './lib/generated/world-factory-routes';

const CONSUMER_PREFIXES = [
  '/future-proof',
  '/explore',
  '/ai-builder',
  '/financial-independence',
  '/public-speaking',
  '/trinity',
  '/parents',
  '/my-journey',
  '/sign-in',
  '/create-account',
  '/account',
  '/beta',
  '/pricing',
  '/auth',
  '/api',
  ...FACTORY_CONSUMER_ROUTES,
];

function isConsumerPath(pathname: string): boolean {
  if (pathname === '/') return true;
  return CONSUMER_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith('/_next') || /\.[a-z0-9]+$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/operator')) {
    if (
      pathname === '/operator' ||
      pathname === '/operator/' ||
      pathname.startsWith('/operator/beta') ||
      pathname.startsWith('/operator/invites') ||
      pathname.startsWith('/operator/analytics') ||
      pathname.startsWith('/operator/feedback')
    ) {
      return NextResponse.next();
    }
    const inner = pathname.slice('/operator'.length) || '/';
    return NextResponse.rewrite(new URL(inner, request.url));
  }

  if (isConsumerPath(pathname)) {
    return NextResponse.next();
  }

  const operatorUrl = new URL(`/operator${pathname}`, request.url);
  return NextResponse.redirect(operatorUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
