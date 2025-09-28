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
            {
              name: 'fillNestedLinksContent',
              type: 'radio',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Custom', value: 'custom' },
                { label: 'Categories', value: 'categories' },
              ],
              defaultValue: 'none',
              label: {
                en: 'Fill nested Links (dropdown) with',
                de: 'Fülle verschachtelte Links (dropdown) mit',
              },
            },
            linkGroup({
              appearances: false,
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData?.fillNestedLinksContent === 'custom',
                },
              },
            }),
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
