import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/', '/discover', '/watchlist', '/movie', '/search'];
// Routes only for guests (redirect to / if already authed)
const GUEST_ROUTES = ['/login', '/register'];

function isProtected(pathname: string) {
  return PROTECTED_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
}

function isGuestOnly(pathname: string) {
  return GUEST_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;

  // Unauthenticated → protect private routes → redirect to login
  if (!isAuthenticated && isProtected(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already authenticated → don't show login/register
  if (isAuthenticated && isGuestOnly(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals, static files, and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
