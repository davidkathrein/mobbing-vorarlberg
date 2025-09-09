import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported languages
const SUPPORTED_LANGS = ['de', 'en']
const DEFAULT_LANG = 'de'

// Special routes to exclude from language prefixing
const SPECIAL_ROUTES = [
  'admin',
  'api',
  '_next',
  'next',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'static',
  'media',
]

function detectLang(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang?.startsWith('en')) return 'en'
  return DEFAULT_LANG
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const firstSegment = pathname.split('/')[1]

  // If the path already starts with a supported language, continue
  if (SUPPORTED_LANGS.includes(firstSegment)) {
    return NextResponse.next()
  }

  // If the path starts with a special route, continue
  if (SPECIAL_ROUTES.includes(firstSegment)) {
    return NextResponse.next()
  }

  const lang = detectLang(request)

  const newUrl = new URL(request.url)
  newUrl.pathname = `/${lang}${pathname}`

  return NextResponse.redirect(newUrl)
}
