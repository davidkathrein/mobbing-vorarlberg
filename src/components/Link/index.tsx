import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Category, Config, Media, Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'categories' | 'media' | 'routes'
    value: Page | Post | Category | Media | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  locale: Config['locale']
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    locale,
  } = props
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL

  function isInternalUrl(url: string) {
    if (newTab) return false
    url = url.trim().toLowerCase()
    if (url.startsWith('mailto:')) return true
    if (url.includes('api/')) return true
    if (url.startsWith('/')) return true
    if (!SITE_URL) throw new Error('NEXT_PUBLIC_SERVER_URL is not defined in .env')

    try {
      const parsed = new URL(url, SITE_URL)
      return parsed.hostname === new URL(SITE_URL).hostname
    } catch (e) {
      return false
    }
  }

  let href = url

  if (type === 'reference' && reference?.value) {
    if (reference.relationTo === 'media') {
      // Handle media references
      if (typeof reference.value === 'object' && 'url' in reference.value) {
        href = 'api/media/' + reference.value.filename
      }
    } else if (
      typeof reference.value === 'object' &&
      'slug' in reference.value &&
      reference.value.slug
    ) {
      // Handle slugs (pages, categories, posts, etc.)
      const prefix =
        reference.relationTo !== 'pages' && reference.relationTo !== 'routes'
          ? `/${reference.relationTo}`
          : ''
      href = `/${locale}${prefix}/${reference.value.slug}`
    }
  }

  if (!href || href.length === 0) {
    console.error('CMSLink: no URL provided.')
    return null
  }

  if (href.trim() === 'https://') {
    href = '/#'
  }

  const isInternal = isInternalUrl(href)

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = !isInternal ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
