import React from 'react'

import type { Config, CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import MouseSpotlightGlow from '@/components/motion-primitives/mouse-spotlight-glow'

type Props = CTABlockProps & { locale: Config['locale'] }

export const CTAWide: React.FC<Props> = ({ links, richText, locale }) => {
  return (
    <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-end">
      <MouseSpotlightGlow />
      <div className="max-w-[48rem] flex items-center prose-h3:mb-1 z-10">
        {richText && (
          <RichText
            className="mb-0 prose prose-headings:!text-left"
            data={richText}
            enableGutter={false}
            lang={locale}
          />
        )}
      </div>
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-4 z-10">
        {(links || []).map(({ link }, i) => {
          return <CMSLink key={i} size="lg" {...link} locale={locale} />
        })}
      </div>
    </div>
  )
}
