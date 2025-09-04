import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CTAHigh } from './High/Component'
import { CTAWide } from './Wide/Component'

export const CallToActionBlock: React.FC<CTABlockProps> = (props) => {
  return (
    <div className="container">
      {props.variant === 'high' ? <CTAHigh {...props} /> : <CTAWide {...props} />}
    </div>
  )
}
