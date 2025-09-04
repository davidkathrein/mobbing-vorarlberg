import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import MouseSpotlightGlow from '@/components/motion-primitives/mouse-spotlight-glow'

export const CTAWide: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
      <MouseSpotlightGlow />
      <div className="max-w-[48rem] flex items-center prose-h3:mb-1 z-10">
        {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
      </div>
      <div className="flex flex-col gap-8 z-10">
        {(links || []).map(({ link }, i) => {
          return <CMSLink key={i} size="lg" className="bg-accent-foreground" {...link} />
        })}
      </div>
    </div>
  )
}
