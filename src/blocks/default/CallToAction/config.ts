import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: {
      de: 'Call to Action',
      en: 'Call to Action',
    },
    plural: {
      de: 'Calls to Action',
      en: 'Calls to Action',
    },
  },
  imageURL: 'https://olhcgaubgmyusgdwslov.supabase.co/storage/v1/object/public/admin/CTABlock.png',
  fields: [
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
      localized: true,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Wide', value: 'wide' },
        { label: 'Center and High', value: 'high' },
      ],
      defaultValue: 'wide',
      required: true,
    },
  ],
}
