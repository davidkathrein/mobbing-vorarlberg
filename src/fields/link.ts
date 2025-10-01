import type { Field, GroupField, TextFieldValidation } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  /**
   * Control whether nested url/reference/label are localized. Defaults to true.
   */
  localized?: boolean
  /**
   * Control whether label is required. Defaults to true.
   */
  labelRequired?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const urlValidate: TextFieldValidation = (value) => {
  if (typeof value !== 'string' || value.trim() === '') {
    return 'URL is required.'
  }
  const trimmed = value.trim()

  const validProtocols = ['http://', 'https://', 'mailto:', '/']
  const hasValidProtocol = validProtocols.some((proto) => trimmed.startsWith(proto))

  if (!hasValidProtocol) {
    return "URL must start with 'http://', 'https://', or 'mailto:' or must be relative '/'."
  }

  for (const proto of validProtocols) {
    if (trimmed.startsWith(proto)) {
      if (trimmed.length === proto.length) {
        return 'URL cannot be empty.'
      }
    }
  }

  return true
}

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  localized = true,
  labelRequired = true,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          // {
          //   name: 'newTab',
          //   type: 'checkbox',
          //   admin: {
          //     style: {
          //       alignSelf: 'flex-end',
          //     },
          //     width: '50%',
          //   },
          //   label: 'Open in new tab',
          // },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      localized,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'routes', 'posts', 'categories'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      localized,
      admin: {
        description:
          "Email addresses are added in this format: 'mailto:example@google.com'. This format works on all email links.",
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      validate: urlValidate,
      defaultValue: 'https://',
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          localized,
          admin: {
            width: '50%',
            description: 'Text des Links.',
          },
          label: 'Label',
          required: labelRequired,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: {
          en: 'Choose how the link should be rendered.',
          de: 'Wähle, wie der Link aussehen soll.',
        },
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
