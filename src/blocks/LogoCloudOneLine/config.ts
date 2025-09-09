import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logos',
  labels: {
    singular: {
      de: 'Logos (zB Sponsoren)',
      en: 'Logos (eg Sponsors)',
    },
    plural: {
      de: 'Logos (zB Sponsoren)',
      en: 'Logos (eg Sponsors)',
    },
  },
  imageURL:
    'https://olhcgaubgmyusgdwslov.supabase.co/storage/v1/object/public/admin/LogoCloudBlock.png',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
      label: 'Text Links neben den Logos.',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'textLogo',
          type: 'text',
          required: false,
          localized: false,
          admin: {
            condition: (_, siblingData) => !siblingData.logo,
            description: 'Text logos will be used if no image is selected',
          },
        },
      ],
    },
  ],
  interfaceName: 'LogoCloud',
}
