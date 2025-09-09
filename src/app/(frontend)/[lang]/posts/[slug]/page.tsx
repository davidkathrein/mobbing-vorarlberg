import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/default/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise, { locales } from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Config, Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const params: { lang: string; slug: string }[] = []

  // Generate params for each locale
  for (const lang of locales) {
    const posts = await payload.find({
      locale: lang as Config['locale'],
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    posts.docs.forEach((doc) => {
      let slug: string

      if (typeof doc.slug === 'string') {
        slug = doc.slug
      } else if (typeof doc.slug === 'object' && doc.slug !== null) {
        slug =
          (doc.slug as any)[lang] || (doc.slug as any).de || (Object.values(doc.slug)[0] as string)
      } else {
        console.log('couldnt extract slug from post', doc)
        return // Skip invalid slugs
      }

      if (slug) {
        params.push({
          lang: lang as string,
          slug,
        })
      }
    })
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    lang: Config['locale']
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', lang = 'de' } = await paramsPromise
  const url = `/${lang}/posts/${slug}`
  const post = await queryPostBySlug({ slug, lang })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} locale={lang} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={post.content}
            enableGutter={false}
            lang={lang}
          />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
              locale={lang}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', lang = 'de' } = await paramsPromise
  const post = await queryPostBySlug({ slug, lang: 'de' })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, lang }: { slug: string; lang: Config['locale'] }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: lang,
    fallbackLocale: 'de',
  })

  return result.docs?.[0] || null
})
