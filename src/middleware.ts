import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = await fetch(new URL('/api/auth/session', req.url), {
    method: 'GET',
    headers: { cookie: req.headers.get('cookie') || '' },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  const { user } = await res.json();

  // Verify if the user is authenticated
  if (!user) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
}

// Private routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
