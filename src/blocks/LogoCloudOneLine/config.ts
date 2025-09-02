import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logos',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
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
