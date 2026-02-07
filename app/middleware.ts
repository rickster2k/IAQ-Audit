import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // Only protect /admin and its subpaths
  if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
    // Read JWT token from cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Attach token info as a header for debugging in browser
    const headers = new Headers(req.headers)
    if (token) headers.set('x-debug-token', JSON.stringify(token))

    // Not logged in → redirect to home
    if (!token) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    // Logged in but not admin → redirect to home
    if (!token.admin) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    // Admin user → allow request, pass debug header
    return NextResponse.next({ request: { headers } })
  }

  // All other routes are public
  return NextResponse.next()
}

// Apply middleware only to /admin and its subpaths
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
