import type { Block, TypedUser } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'highImpact',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        // {
        //   label: 'Medium Impact',
        //   value: 'mediumImpact',
        // },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'paragraph',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.type !== 'lowImpact',
      },
    },
  ],
  interfaceName: 'TeamList',
}
