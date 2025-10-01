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

const langSegment = `:lang((?!${SPECIAL_ROUTES.join('|')}).*)`

const redirects = async () => {
  // redirect all en to de as we dont have localization utilized enough yet
  const disableEnRedirects = {
    source: '/en/:path*',
    destination: '/de/:path*',
    permanent: true,
  }

  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirectCategoriesToFilter = {
    source: '/categories/:slug', // dynamic segment
    destination: '/posts?categories=[":slug"]',
    permanent: true, // 308 redirect (permanent)
  }

  const redirectCategoriesToFilterWithLang = {
    source: `/${langSegment}/categories/:slug`,
    destination: '/:lang/posts?categories=[":slug"]',
    permanent: true, // 308 redirect (permanent)
  }

  const redirectRoutesToRootWithLang = {
    source: `/${langSegment}/routes`,
    destination: '/:lang',
    permanent: true,
  }

  const redirects = [
    disableEnRedirects,
    internetExplorerRedirect,
    redirectCategoriesToFilter,
    redirectCategoriesToFilterWithLang,
    redirectRoutesToRootWithLang,
  ]

  return redirects
}

export default redirects
