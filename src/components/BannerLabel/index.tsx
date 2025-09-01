import React from 'react'
import { CMSLink } from '../Link'
import { ArrowRight } from 'lucide-react'

interface BannerLabelProps {
  type?: string
  text?: string
  hasIcon?: boolean
  url: string | undefined | null
}

export default function BannerLabel({ type, text, hasIcon, url }: BannerLabelProps) {
  return (
    <CMSLink
      url={url ?? '#'}
      className="rounded-(--radius) mx-auto flex w-fit items-center gap- border p-1 pr-3"
    >
      <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
        {type}
      </span>
      <span className="text-sm mx-2">{text ?? 'Bannertext in Pages/Hero eingeben.'}</span>
      <span className="bg-(--color-border) block h-4 w-px"></span>

      {hasIcon && <ArrowRight className="size-4" />}
    </CMSLink>
  )
}
