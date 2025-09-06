'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; isOpen: boolean }> = ({ data, isOpen }) => {
  const navItems = data?.navItems || []
  const navButtons = data?.navButtons || []

  return (
    <nav
      className={cn('flex flex-col gap-6 sm:gap-2 sm:flex-row', isOpen ? 'flex' : 'hidden sm:flex')}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="mr-6 text-foreground" />
        })}
      </div>
      <div className="flex w-full sm:flex-row-reverse flex-reverse space-y-0 gap-3 sm:border-l sm:pl-6">
        {navButtons.map(({ link }, i) => {
          const href =
            link.type === 'reference' &&
            typeof link.reference?.value === 'object' &&
            link.reference.value.slug
              ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${
                  link.reference.value.slug
                }`
              : link.url

          if (!href) return null

          return <CMSLink key={i} {...link} appearance={link.appearance ?? 'default'} size="sm" />
        })}
      </div>
    </nav>
  )
}
