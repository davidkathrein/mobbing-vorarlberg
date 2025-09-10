import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Das Profilbild des Benutzers.',
      },
    },
    {
      name: 'jobDescription',
      type: 'text',
      localized: true,
      maxLength: 20,
      admin: {
        condition: (data) => {
          return data?.roles?.team === true
        },
      },
    },
    {
      name: 'biography',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    // link({
    //   appearances: false,
    //   localized: false,
    //   labelRequired: false,
    //   overrides: {
    //     required: false,
    //   },
    // }),
    {
      name: 'roles',
      type: 'group',
      fields: [
        {
          name: 'admin',
          type: 'checkbox',
          admin: {
            description:
              'Kann alle Seiten bearbeiten. Voller Zugriff auf alle Benutzeroberflächen!',
          },
          defaultValue: false,
        },
        {
          name: 'team',
          type: 'checkbox',
          admin: {
            description: 'Wird auf Team-Seite angezeigt. Kann keine Seiten bearbeiten.',
          },
          defaultValue: true,
        },
        {
          name: 'sorting_index',
          type: 'number',
          admin: {
            condition: (_data, siblingData) => siblingData?.team === true,
            step: 0.01,
            description: 'Je höher der Wert, desto weiter oben erscheint das Team-Mitglied.',
          },
          defaultValue: 0,
        },
      ],
    },
  ],
  timestamps: true,
}
