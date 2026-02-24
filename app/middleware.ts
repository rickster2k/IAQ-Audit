import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // ─── Admin Routes ───────────────────────────────────────────────
  if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const headers = new Headers(req.headers)
    if (token) headers.set('x-debug-token', JSON.stringify(token))

    if (!token) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    if (!token.admin) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    return NextResponse.next({ request: { headers } })
  }

  // ─── User Report Routes ─────────────────────────────────────────
  if (url.pathname === '/user/report' || url.pathname.startsWith('/user/report/')) {
    const token = req.cookies.get('user-audit-token')

    if (!token) {
      url.pathname = '/user/login'
      return NextResponse.redirect(url)
    }

    try {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
      await jwtVerify(token.value, secret)
    } catch {
      url.pathname = '/user/login'
      return NextResponse.redirect(url)
    }
  }

  // ─── All other routes are public ────────────────────────────────
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/user/report', '/user/report/:path*'],
}