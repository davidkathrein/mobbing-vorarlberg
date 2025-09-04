import type { Block, TypedUser } from 'payload'

export const TeamList: Block = {
  slug: 'teamList',
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
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'paragraph',
      type: 'textarea',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type !== 'lowImpact',
      },
    },
  ],
  interfaceName: 'TeamList',
}
