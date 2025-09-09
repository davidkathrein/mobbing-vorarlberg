import React from 'react'
import type { CollectionConfig, PayloadComponent } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { colorField } from '@/fields/colorpicker'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    colorField({
      name: 'backgroundColor',
      label: 'Farbe',
      admin: {
        description: {
          en: 'Backgroundcolor of the Category-Tag. Generate colors on https://coolors.co/generate. Paste as hex value, e.g. #ff0000.',
          de: 'Hintergrundfarbe des Kategorie-Tags. Farben generieren auf https://coolors.co/generate. Als Hex-Wert einfügen, z.B. #ff0000.',
        },
      },
      validate: (value: any) => {
        if (typeof value === 'string' && !/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
          return 'Please enter a valid hex color code, e.g. #ff0000'
        }
        return true
      },
    }),
    ...slugField(),
  ],
}
