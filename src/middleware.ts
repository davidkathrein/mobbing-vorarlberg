import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const acceptLang = request.headers.get('accept-language')
    let lang = 'de' // default

    if (acceptLang?.startsWith('en')) lang = 'en'
    // Add more as needed

    return NextResponse.redirect(new URL(`/${lang}/`, request.url))
  }
  return NextResponse.next()
}
