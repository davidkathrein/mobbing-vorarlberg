import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Config, Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

type Props = Page['hero'] & {
  locale: Config['locale']
}

export const CenterBigImageHero: React.FC<Props> = ({
  links,
  media,
  richText,
  announcement,
  locale,
}) => {
  return (
    <>
      <div className="overflow-hidden">
        <section>
          <div className="relative pt-20 md:pt-32">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {announcement && announcement.link && !!announcement.showAnnouncement && (
                  <AnimatedGroup variants={transitionVariants}>
                    <CMSLink
                      url={announcement?.link.url ?? '/home'}
                      reference={announcement?.link?.reference}
                      className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                      locale={locale}
                    >
                      <span className="text-foreground text-sm">{announcement?.link.label}</span>
                      <span className="block h-4 w-0.5 border-l bg-background"></span>

                      <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                          <span className="flex size-6">
                            <ArrowRight className="m-auto size-3" />
                          </span>
                          <span className="flex size-6">
                            <ArrowRight className="m-auto size-3" />
                          </span>
                        </div>
                      </div>
                    </CMSLink>
                  </AnimatedGroup>
                )}

                {richText && (
                  <AnimatedGroup
                    variants={{
                      container: {
                        visible: {
                          transition: {
                            staggerChildren: 0.25,
                            delayChildren: 0.1,
                          },
                        },
                      },
                      ...transitionVariants,
                    }}
                    className="mt-12"
                  >
                    <RichText data={richText} className="prose prose-h1:text-6xl" lang={locale} />
                  </AnimatedGroup>
                )}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.4,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  {Array.isArray(links) && links.length > 0 && (
                    <ul className="flex md:justify-center gap-4">
                      {links.map(({ link }, i) => {
                        return (
                          <li key={i}>
                            <CMSLink {...link} size={'lg'} locale={locale} />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </AnimatedGroup>
              </div>
            </div>
            {media && typeof media === 'object' && media.url && (
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.4,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="container"
              >
                <div className="relative -mr-56 mt-8 overflow-hidden sm:mr-0 sm:mt-12 md:mt-20">
                  <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                    <Image
                      className="bg-background aspect-15/8 relative rounded-2xl"
                      src={media.url}
                      alt={media.alt ?? ''}
                      width="2700"
                      height="1440"
                    />
                  </div>
                </div>
              </AnimatedGroup>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default CenterBigImageHero
