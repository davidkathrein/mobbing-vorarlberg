import { formatDateTime } from 'src/utilities/formatDateTime'
import React, { Fragment } from 'react'

import type { Config, Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { isColorLight as isColorLightFn } from '@/utilities/colorChecks'
import { CMSLink } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

export const PostHero: React.FC<{
  post: Post
  locale: Config['locale']
}> = ({ post, locale }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasCategories && (
              <div className="uppercase text-sm mb-6 flex flex-wrap gap-1">
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category

                    const titleToUse = categoryTitle || 'Untitled category'
                    const color = category.backgroundColor
                    const isColorLight = color ? isColorLightFn(color) : false

                    const isLast = index === categories.length - 1

                    return (
                      <CMSLink locale={locale} url={'/#'} key={index}>
                        <Badge
                          variant="default"
                          style={{
                            backgroundColor: category.backgroundColor ?? 'hsla(var(--primary))',
                          }}
                          className={cn(
                            isColorLight ? 'text-secondary-foreground' : 'text-primary-foreground',
                          )}
                        >
                          {titleToUse}
                        </Badge>
                        {!isLast && <Fragment>,</Fragment>}
                      </CMSLink>
                    )
                  }
                  return null
                })}
              </div>
            )}
            {/* {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )} */}
            <div></div>
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover"
            resource={heroImage}
            locale={locale}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
