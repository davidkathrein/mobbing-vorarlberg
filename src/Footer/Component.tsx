import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Config, Footer as FooterInterface } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { socialMediaOptions } from './config'
import type { ReactElement } from 'react'

const linksOld = [
  {
    group: 'Product',
    items: [
      {
        title: 'Features',
        href: '#',
      },
      {
        title: 'Solution',
        href: '#',
      },
      {
        title: 'Customers',
        href: '#',
      },
      {
        title: 'Pricing',
        href: '#',
      },
      {
        title: 'Help',
        href: '#',
      },
      {
        title: 'About',
        href: '#',
      },
    ],
  },
  {
    group: 'Solution',
    items: [
      {
        title: 'Startup',
        href: '#',
      },
      {
        title: 'Freelancers',
        href: '#',
      },
      {
        title: 'Organizations',
        href: '#',
      },
      {
        title: 'Students',
        href: '#',
      },
      {
        title: 'Collaboration',
        href: '#',
      },
      {
        title: 'Design',
        href: '#',
      },
      {
        title: 'Management',
        href: '#',
      },
    ],
  },
  {
    group: 'Company',
    items: [
      {
        title: 'About',
        href: '#',
      },
      {
        title: 'Careers',
        href: '#',
      },
      {
        title: 'Blog',
        href: '#',
      },
      {
        title: 'Press',
        href: '#',
      },
      {
        title: 'Contact',
        href: '#',
      },
      {
        title: 'Help',
        href: '#',
      },
    ],
  },
  {
    group: 'Legal',
    items: [
      {
        title: 'Licence',
        href: '#',
      },
      {
        title: 'Privacy',
        href: '#',
      },
      {
        title: 'Cookies',
        href: '#',
      },
      {
        title: 'Security',
        href: '#',
      },
    ],
  },
]

const SITE_NAME = 'Mobbing Vorarlberg'

// Union type for allowed social platform values
type SocialValue = (typeof socialMediaOptions)[number]['value']

// Key-value map: platform => SVG icon
const SOCIAL_ICONS: Record<SocialValue, ReactElement> = {
  facebook: (
    <svg
      className="size-6"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
      />
    </svg>
  ),
  instagram: (
    <svg
      className="size-6"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
      />
    </svg>
  ),
  linkedin: (
    <svg
      className="size-6"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
      />
    </svg>
  ),
  twitter: (
    <svg
      className="size-6"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
      />
    </svg>
  ),
  youtube: (
    <svg
      className="size-6"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4A4 4 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a4 4 0 0 0 2.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 0 0 2.8-2.8c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.75 15.5v-7l6 3.5z"
      />
    </svg>
  ),
}

const renderSocialMediaLink = (icon: SocialValue, key?: any) => {
  // Runtime guard in case of stale config
  if (!socialMediaOptions.some((option) => option.value === icon)) return null

  const label = socialMediaOptions.find((o) => o.value === icon)?.label || icon
  const svg = SOCIAL_ICONS[icon]

  return (
    <Link
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-primary block"
      key={key}
    >
      {svg}
    </Link>
  )
}

export async function Footer({ locale }: { locale: Config['locale'] }) {
  const footerData: FooterInterface = await getGlobal('footer', 1, locale)
  const links = footerData?.navLinkItems || []

  return (
    <footer className="border-b pt-20 bg-background" data-theme="dark">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href={`/${locale}/`} aria-label="go home" className="block size-fit">
              <Logo />
            </Link>
          </div>

          <div
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3"
            style={{
              gridAutoColumns: '1fr',
              gridTemplateColumns: `repeat(${links.length}, 1fr)`,
            }}
          >
            {links.map((link, index) => {
              const groupTitle = link.navLinkItem.groupTitle
              const childrenLinks = link.navLinkItem.links
              return (
                <div key={index} className="space-y-4 text-sm">
                  <span className="block font-medium dark:text-white">{groupTitle}</span>
                  {childrenLinks?.map((item, index) => (
                    <CMSLink
                      key={index}
                      url={item.link.url}
                      reference={item.link.reference}
                      locale={locale}
                      className="text-muted-foreground hover:text-primary block duration-150"
                    >
                      <span>{item.link.label}</span>
                    </CMSLink>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} {SITE_NAME} &{' '}
            <Link
              className="hover:text-primary"
              href="https://davidkathrein.at"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Kathrein
            </Link>
            . Alle Rechte vorbehalten.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {footerData?.socialLinks &&
              footerData.socialLinks.map((link, index) =>
                renderSocialMediaLink(link.socialLinkItem.type, index),
              )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
