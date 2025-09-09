import type { Block, TypedUser } from 'payload'

export const TeamList: Block = {
  slug: 'teamList',
  labels: {
    singular: 'Team',
    plural: 'Team Blöcke',
  },
  imageURL: 'https://olhcgaubgmyusgdwslov.supabase.co/storage/v1/object/public/admin/TeamBlock.png',
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
      required: false,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.type !== 'lowImpact',
      },
    },
  ],
  interfaceName: 'TeamList',
}
