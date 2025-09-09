import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise, { locales } from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { Config } from '@/payload-types'

export const revalidate = 600
const PAGE_LIMIT = 96

type Args = {
  params: Promise<{
    pageNumber: string
    lang: Config['locale']
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const [payload, { lang, pageNumber }] = await Promise.all([
    getPayload({ config: configPromise }),
    paramsPromise,
  ])

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: PAGE_LIMIT,
    page: sanitizedPageNumber,
    overrideAccess: false,
    locale: lang,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Unsere Angebote {sanitizedPageNumber}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={PAGE_LIMIT}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} locale={lang} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Angebote ${pageNumber || ''} - Mobbing Vorarlberg`,
  }
}
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const params: any[] = []

  // Generate params for each locale
  for (const lang of locales) {
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
      locale: lang as Config['locale'],
    })

    const totalPages = Math.ceil(totalDocs / PAGE_LIMIT) // Note: using 96 to match your limit above

    for (let i = 1; i <= totalPages; i++) {
      params.push({
        lang,
        pageNumber: String(i),
      })
    }
  }

  return params
}
