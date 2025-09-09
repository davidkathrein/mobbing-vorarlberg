import React from 'react'

import type { Config, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero'] & { locale: Config['locale'] }> = ({
  links,
  media,
  richText,
  locale,
}) => {
  return (
    <div>
      <div className="container mb-8">
        {richText && (
          <RichText className="mb-6" data={richText} enableGutter={false} lang={locale} />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} locale={locale} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
              locale={locale}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} lang={locale} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
