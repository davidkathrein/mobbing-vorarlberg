import type { Block } from 'payload'
import { type IconName } from 'lucide-react/dynamic'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ_ICON_NAMES: IconName[] = [
  'help-circle',
  'info',
  'calendar',
  'globe',
  'mail',
  'phone',
  'credit-card',
  'user',
  'settings',
  'clock',
  'truck',
  'book-open',
]

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  imageURL: 'https://olhcgaubgmyusgdwslov.supabase.co/storage/v1/object/public/admin/FAQBlock.png',
  fields: [
    {
      name: 'header',
      type: 'richText',
      label: 'Header',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
          ]
        },
      }),
    },
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: FAQ_ICON_NAMES,
          required: true,
        },
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          localized: true,
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
}
