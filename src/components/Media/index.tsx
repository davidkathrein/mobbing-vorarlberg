import React, { Fragment } from 'react'

import type { Props as OProps } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import { Config } from '@/payload-types'

type Props = OProps & { locale: Config['locale'], isWideImage?: boolean }

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource, locale, isWideImage = false } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
