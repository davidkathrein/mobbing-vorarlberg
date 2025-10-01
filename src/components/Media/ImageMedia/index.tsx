'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Config } from '@/payload-types'

type Props = MediaProps & {
  locale: Config['locale']
  isWideImage?: boolean
}

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<Props> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority = false,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    locale,
    isWideImage,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth, sizes } = resource

    // Use wide variant if isWideImage is true and wide size exists
    if (isWideImage && sizes?.wide?.url) {
      width = sizes.wide.width!
      height = sizes.wide.height!
      alt = altFromResource || ''
      src = getMediaUrl(sizes.wide.url, resource.updatedAt)
    } else {
      width = fullWidth!
      height = fullHeight!
      alt = altFromResource || ''
      src = getMediaUrl(url, resource.updatedAt)
    }
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  if (src === '') console.error('ImageMedia: No image source provided. ')

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        // placeholder="blur"
        priority={priority}
        loading={loading}
        sizes={sizes}
        src={src}
      />
    </picture>
  )
}
