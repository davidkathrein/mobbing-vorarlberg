import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

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
    },
    {
      name: 'link',
      label: 'Erscheint bei der Team-Übersicht als Button.',
      required: false,
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: false,
        },
        {
          name: 'label',
          type: 'text',
          required: false,
        },
      ],
    },
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
      ],
    },
  ],
  timestamps: true,
}
