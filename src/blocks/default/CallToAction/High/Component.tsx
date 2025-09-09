import React from 'react'

import type { Config, CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import MouseSpotlightGlow from '@/components/motion-primitives/mouse-spotlight-glow'

type Props = CTABlockProps & { locale: Config['locale'] }

export const CTAHigh: React.FC<Props> = ({ links, richText, locale }) => {
  return (
    <div className="bg-card rounded border-border border px-4 py-8 flex flex-col gap-6 items-center text-center">
      <MouseSpotlightGlow />
      {richText && (
        <RichText
          className="mb-0 prose prose-h3:text-2xl prose-h3:mb-2 max-w-[40rem] z-10"
          data={richText}
          enableGutter={false}
          lang={locale}
        />
      )}
      <div className="flex flex-row gap-4 z-10">
        {(links || []).map(({ link }, i) => {
          return <CMSLink key={i} size="default" {...link} locale={locale} />
        })}
      </div>
    </div>
  )
}

// <div className='relative aspect-video h-[200px] rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black'>

//     </div>
