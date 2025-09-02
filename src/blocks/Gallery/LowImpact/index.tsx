import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/payload-types'

type Props = {
  member: User
  index: number
}

export const Component: FC<Props> = ({ member, index }) => {
  const media = typeof member.profilePicture === 'object' ? member.profilePicture : null
  return (
    <div key={member.id} className="group overflow-hidden">
      {media && media.url ? (
        <Image
          className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
          src={media.url}
          alt={media.alt ?? member.name ?? ''}
          width="826"
          height="1239"
        />
      ) : (
        <div>Kein Bild hinzugefügt.</div>
      )}
      <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
        <div className="flex justify-between">
          <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
            {member.name}
          </h3>
          <span className="text-xs">_0{index + 1}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {member.jobDescription}
          </span>
          <Link
            href={member.link?.url ?? '#'}
            className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
          >
            {' '}
            {member.link?.label ?? 'Kontakt'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Component
