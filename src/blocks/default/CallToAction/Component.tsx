import React from 'react'

import type { Config, CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CTAHigh } from './High/Component'
import { CTAWide } from './Wide/Component'

export const CallToActionBlock: React.FC<CTABlockProps & { locale: Config['locale'] }> = (
  props,
) => {
  return (
    <div className="container">
      {props.variant === 'high' ? (
        <CTAHigh {...props} locale={props.locale} />
      ) : (
        <CTAWide {...props} locale={props.locale} />
      )}
    </div>
  )
}
