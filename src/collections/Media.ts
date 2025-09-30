import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

export const sanitizeFileName: CollectionBeforeOperationHook = async ({ req }) => {
  const file = req.file
  if (typeof file?.name === 'string') {
    file.name = slugify(file.name, { strict: true })
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Wird angezeigt, wenn Bild nicht geladen werden kann. Wichtig für Suchmaschine und Barrierefreiheit.',
      },
      localized: true,
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      localized: true,
    },
  ],
  upload: {
    // // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    // staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'wide',
        width: 3840,
        height: 1500,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeOperation: [sanitizeFileName],
  },
}
