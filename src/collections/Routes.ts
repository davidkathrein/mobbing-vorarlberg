import React from 'react'
import type { CollectionConfig, PayloadComponent } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { colorField } from '@/fields/colorpicker'

export const Routes: CollectionConfig = {
  slug: 'routes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    plural: {
      de: 'Statische Seiten',
      en: 'Static Pages',
    },
    singular: {
      de: 'Statische Seite',
      en: 'Static Page',
    },
  },
  admin: {
    useAsTitle: 'title',
    description: {
      en: 'Here are programmatically generated pages defined (only used to show them in the internal link reference field). You do never need to change anything here.',
      de: 'Hier sind programmatisch generierte Seiten definiert (nur um sie im internen Link-Referenzfeld anzuzeigen). Du musst hier nie etwas ändern.',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    ...slugField(),
  ],
}
