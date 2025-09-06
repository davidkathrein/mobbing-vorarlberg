import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: {
      de: 'Bild Block',
      en: 'Image Block',
    },
    plural: {
      de: 'Bilder Blöcke',
      en: 'Image Blocks',
    },
  },
  imageURL:
    'https://olhcgaubgmyusgdwslov.supabase.co/storage/v1/object/public/admin/MediaBlock.png',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
