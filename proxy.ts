import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  // Fast redirect from root to Arthur AI Assistant
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard/assistant', request.url))
  }
}

export const config = {
  matcher: '/',
}
