import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware Supabase Auth — refresh session di setiap request.
 * Dioptimasi: skip auth check untuk route publik, dan redirect ke login
 * jika user belum login di route terproteksi.
 */

// Route yang tidak perlu auth check
const PUBLIC_ROUTES = ['/login', '/auth/callback', '/auth/auth-code-error']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth check untuk route publik
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session & cek auth
  const { data: { user } } = await supabase.auth.getUser()

  // Jika route terproteksi dan user belum login → redirect ke login
  if (!isPublicRoute && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // Jika user sudah login tapi akses halaman login → redirect ke dashboard
  if (isPublicRoute && user && pathname === '/login') {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}