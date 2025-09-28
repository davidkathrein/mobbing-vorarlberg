const redirects = async () => {
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

  const redirectAngeboteToPosts = {
    source: '/angebote',
    destination: '/posts',
    permanent: true,
  }
  const redirects = [internetExplorerRedirect, redirectCategoriesToFilter]

  return redirects
}

export default redirects
