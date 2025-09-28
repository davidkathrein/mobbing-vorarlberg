import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      required: true,
      fields: [
        link({
          appearances: false,
          overrides: {
            label: {
              en: 'Custom nested Links in Dropdown',
              de: 'Custom verschachtelte Links im Dropdown',
            },
          },
        }),
        {
          name: 'nestedLinks',
          label: {
            en: 'Nested Links in Dropdown',
            de: 'Verschachtelte Links im Dropdown',
          },
          type: 'group',
          fields: [
            linkGroup({
              appearances: false,
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData?.fillNestedLinksContent === 'custom',
                },
              },
            }),
            {
              name: 'fillNestedLinksContent',
              type: 'radio',
              options: ['custom', 'categories'],
              defaultValue: 'custom',
              label: {
                en: 'Fill nested Links (dropdown) with',
                de: 'Fülle verschachtelte Links (dropdown) mit',
              },
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'navButtons',
      type: 'array',
      fields: [
        link({
          appearances: ['default', 'outline'],
        }),
      ],
      maxRows: 2,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
