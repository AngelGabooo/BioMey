import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Cache para recursos estáticos de Next.js
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache para imágenes
  if (request.nextUrl.pathname.startsWith('/images')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=604800'
    );
  }

  // Cache para fonts
  if (request.nextUrl.pathname.startsWith('/fonts')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // No cache para HTML (página principal)
  if (request.nextUrl.pathname === '/') {
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/_next/static/:path*',
    '/images/:path*',
    '/fonts/:path*',
  ],
};