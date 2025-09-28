import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { linkGroup } from '@/fields/linkGroup'

export const socialMediaOptions = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'YouTube', value: 'youtube' },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navLinkItems',
      type: 'array',
      fields: [
        {
          name: 'navLinkItem',
          type: 'group',
          fields: [
            {
              name: 'groupTitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'fillNestedLinksContent',
              dbName: 'fillNestedLinksContent',
              type: 'radio',
              options: ['custom', 'categories'],
              label: {
                en: 'Fill nested Links (dropdown) with',
                de: 'Fülle verschachtelte Links (dropdown) mit',
              },
            },
            linkGroup({
              appearances: false,
              overrides: {
                dbName: 'links',
                admin: {
                  condition: (_, siblingData) =>
                    siblingData?.fillNestedLinksContent === 'custom' ||
                    !siblingData?.fillNestedLinksContent,
                },
                maxRows: 6,
              },
            }),
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
        description: 'Hauptnavigation im Footer.',
      },
    },
    {
      name: 'socialLinks',
      admin: {
        description: 'Icon Leiste unten rechts im Footer.',
      },
      type: 'array',
      localized: false,
      fields: [
        {
          name: 'socialLinkItem',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: socialMediaOptions,
              required: true,
            },
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
