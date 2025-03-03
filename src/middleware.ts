import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/config/session'
import { cookies, headers } from 'next/headers'

// 1. Specify protected and public routes
const publicRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {

  try {

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    // 
    // 3. Decrypt the session from the cookie
    const session = await verifySession(req)


    // 4. Redirect to /login if the user is not authenticated
    if (session == null && !isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // 5. Redirect to /dashboard if the user is authenticated
    if (isPublicRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    const response = NextResponse.next()


    console.log(response.status)
    return response
  } catch (error) {
    // Handle any unexpected errors
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/error', req.nextUrl))

  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  // runtime: 'nodejs',

}