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
    destination: '/posts?categories=:slug', // query param passed along
    permanent: true, // 308 redirect (permanent)
  }

  const redirectCategoriesToFilterWithLang = {
    source: '/:lang/categories/:slug', // language-specific categories
    destination: '/:lang/posts?categories=:slug', // preserve language prefix
    permanent: true, // 308 redirect (permanent)
  }

  const redirectAngeboteToPosts = {
    source: '/angebote',
    destination: '/posts',
    permanent: true,
  }

  const redirectRoutesToRoot = {
    source: '/routes',
    destination: '/',
    permanent: true,
  }

  const redirectRoutesToRootWithLang = {
    source: '/:lang/routes',
    destination: '/:lang',
    permanent: true,
  }

  const redirects = [
    disableEnRedirects,
    internetExplorerRedirect,
    redirectCategoriesToFilter,
    redirectCategoriesToFilterWithLang,
    redirectAngeboteToPosts,
    redirectRoutesToRootWithLang,
  ]

  return redirects
}

export default redirects
