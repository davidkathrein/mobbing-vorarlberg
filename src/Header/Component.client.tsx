'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuState, setMenuState] = React.useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header
        className="navbar fixed top-0 left-0 right-0 z-20 [body[data-payload-admin-bar=true]]:top-[var(--payload-admin-bar-height)]"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <nav
          data-state={menuState && 'active'}
          className="fixed z-20 w-full border-b border-dashed bg-background backdrop-blur sm:relative sm:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 sm:gap-0 sm:py-4">
              <div className="flex w-full justify-between sm:w-auto">
                <Link href="/" aria-label="home" className="flex items-center space-x-2">
                  <Logo />
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 sm:hidden"
                >
                  <Menu
                    className={cn(
                      'm-auto size-6 duration-200 transform',
                      menuState ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
                    )}
                  />
                  <X
                    className={cn(
                      'absolute inset-0 m-auto size-6 duration-200 transform',
                      menuState
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-180 scale-0 opacity-0',
                    )}
                  />
                </button>
              </div>
              <HeaderNav data={data} isOpen={menuState} />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
