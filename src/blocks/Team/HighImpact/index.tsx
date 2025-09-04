'use client'

import { useState } from 'react'
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from '@/components/motion-primitives/disclosure'
import { Transition } from 'motion/react'
import MotionImage from '@/components/motion-primitives/motion-image'
import { User } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

type Props = {
  member: User
}

export default function DisclosureCard({ member }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLockedOpen, setIsLockedOpen] = useState(false)

  const isOpen = isHovered || isLockedOpen

  const theme = 'dark'

  const imageVariants = {
    collapsed: { scale: 1, filter: 'blur(0px)' },
    expanded: { scale: 1.1, filter: 'blur(3px)' },
  }

  const contentVariants = {
    collapsed: { opacity: 0, y: 0 },
    expanded: { opacity: 1, y: 0 },
  }

  const transition: Transition = {
    type: 'spring',
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  }

  const media = typeof member.profilePicture === 'object' ? member.profilePicture : null
  console.log(member.link?.url ? member.link.url : 'no URL provided')

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-theme={theme}
    >
      {media?.url && (
        <MotionImage
          src={media?.url}
          width="826"
          height="1239"
          alt={media.alt ?? member.name ?? ''}
          className="pointer-events-none h-auto w-full select-none"
          animate={isOpen ? 'expanded' : 'collapsed'}
          variants={imageVariants}
          transition={transition}
        />
      )}
      <Disclosure
        onOpenChange={() => setIsLockedOpen((prev) => !prev)}
        open={isOpen}
        className="absolute bottom-0 left-0 right-0 bg-background px-4 pt-2"
        variants={contentVariants}
        transition={transition}
      >
        <DisclosureTrigger>
          <button
            className="w-full pb-2 text-left text-[14px] font-medium text-foreground"
            type="button"
            tabIndex={-1} // Prevent double toggling on card click
            style={{ pointerEvents: 'none' }}
          >
            <div className="flex justify-between">
              <h3 className="font-bold">{member.name}</h3>
              <span className="text-foreground/70 font-light">{member.jobDescription}</span>
            </div>
          </button>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="flex flex-col pb-4 text-sm">
            {member.biography ? (
              <RichText className="text-sm p-0" data={member.biography} />
            ) : (
              <div>Keine Beschreibung hinzugefügt.</div>
            )}
            <div className="pl-1 mt-4">
              <CMSLink
                className="text-foreground"
                url={member.link?.url ?? '#'}
                appearance="outline"
                size="sm"
              >
                {member.link?.label ?? 'Kontakt'}
              </CMSLink>
            </div>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  )
}
