import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'centerBigImage',
      label: 'Type',
      admin: {
        description: 'Hero Variante auswählen, kann meistens bei Standard belassen werden.',
      },
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Center Big Image',
          value: 'centerBigImage',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'announcement',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'showAnnouncement',
          type: 'checkbox',
          label: 'Show Announcement',
          required: false,
          defaultValue: false,
        },
        link({
          appearances: ['default'],
          overrides: {
            admin: {
              condition: (_, { type, showAnnouncement } = {}) => !!showAnnouncement,
            },
          },
        }),
      ],
      admin: {
        condition: (_, { type } = {}) => ['centerBigImage'].includes(type),
      },
    },
  ],
  label: false,
}
