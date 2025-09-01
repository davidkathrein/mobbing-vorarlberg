'use client'
import React, { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import Link from 'next/link'
import { ArrowRight, Menu, Rocket, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import BannerLabel from '@/components/BannerLabel'

export const CenterBigImageHero: React.FC<Page['hero']> = ({ links, media, richText, banner }) => {
  return (
    <div className="relative pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
          <BannerLabel
            type={banner?.type ?? undefined}
            text={Array.isArray(banner?.links) ? banner.links[0].link.label : undefined}
            hasIcon={true}
            url={Array.isArray(banner?.links) ? banner.links[0].link.url : undefined}
          />
          {richText && (
            <RichText className="mt-6 mb-8" data={richText} enableGutter={false} enableProse />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="relative mt-16">
        <div
          aria-hidden
          className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
        />
        <div className="relative mx-auto max-w-6xl overflow-hidden px-4">
          <Image
            className="z-2 border-border/25 relative hidden rounded-2xl border dark:block"
            src="/music.png"
            alt="app screen"
            width={2796}
            height={2008}
          />
          <Image
            className="z-2 border-border/25 relative rounded-2xl border dark:hidden"
            src="/music-light.png"
            alt="app screen"
            width={2796}
            height={2008}
          />
        </div>
      </div>
    </div>
  )
}
