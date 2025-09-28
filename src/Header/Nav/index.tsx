'use client'

import React from 'react'

import type { Category, Header as HeaderType } from '@/payload-types'
import type { Config } from 'src/payload-types'

import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  data: HeaderType
  categories: Category[]
  isOpen: boolean
  locale: Config['locale']
}> = ({ data, categories, isOpen, locale = 'de' }) => {
  const navItems = data?.navItems || []
  const navButtons = data?.navButtons || []

  return (
    <nav
      className={cn('flex flex-col gap-6 sm:gap-2 sm:flex-row', isOpen ? 'flex' : 'hidden sm:flex')}
    >
      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList>
          {navItems.map(({ link, nestedLinks }, i) => {
            let children = nestedLinks?.links || []

            if (nestedLinks?.fillNestedLinksContent === 'categories') {
              children = categories.map((cat) => ({
                link: {
                  type: 'custom',
                  label: `Für ${cat.title}`,
                  url: '/categories/' + cat.slug,
                },
              }))
            }

            if (children.length > 0 && nestedLinks?.fillNestedLinksContent !== 'none') {
              return (
                <NavigationMenuItem key={i} className="relative">
                  <NavigationMenuTrigger className="p-2 bg-transparent">
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="text-foreground"
                      locale={locale}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="top-11 bg-background rounded-md shadow-lg">
                    <div className="grid gap-4 p-4 w-48">
                      {children.map((childLink, j) => (
                        <NavigationMenuLink key={j} asChild>
                          <CMSLink {...childLink.link} appearance="link" locale={locale} />
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            }

            return (
              <NavigationMenuItem key={i} className="p-2">
                <NavigationMenuLink asChild>
                  <CMSLink
                    {...link}
                    appearance="link"
                    className="text-foreground"
                    locale={locale}
                  />
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile navigation - fallback to simple list */}
      <div className="flex flex-col gap-2 sm:hidden">
        {navItems.map(({ link, nestedLinks }, i) => {
          let children = nestedLinks?.links || []

          if (nestedLinks?.fillNestedLinksContent === 'categories') {
            children = categories.map((cat) => ({
              link: {
                type: 'custom',
                label: `Für ${cat.title}`,
                url: '/categories/' + cat.slug,
              },
            }))
          }

          if (children.length > 0 && nestedLinks?.fillNestedLinksContent !== 'none') {
            return (
              <div key={i} className="flex flex-col gap-2">
                <CMSLink {...link} appearance="link" className="text-foreground" locale={locale} />
                <div className="ml-4 flex flex-col gap-1">
                  {children.map((childLink: any, j: number) => (
                    <CMSLink
                      key={j}
                      {...childLink.link}
                      appearance="link"
                      className="text-sm text-muted-foreground"
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            )
          }

          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-foreground"
              locale={locale}
            />
          )
        })}
      </div>
      <div className="flex w-full sm:flex-row-reverse flex-reverse space-y-0 gap-3 sm:border-l sm:pl-6">
        {navButtons.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance={link.appearance ?? 'default'}
              size="sm"
              locale={locale}
            />
          )
        })}
      </div>
    </nav>
  )
}
