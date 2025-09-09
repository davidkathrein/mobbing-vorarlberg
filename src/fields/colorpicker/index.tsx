import type { TextField } from 'payload'

export const colorField = (overrides?: Omit<TextField, 'type'>): TextField => {
  const { name = 'color', label = 'Color', admin, ...rest } = overrides ?? {}

  return {
    type: 'text',
    name,
    label,
    admin: {
      ...admin,
      components: {
        Field: '@/fields/colorpicker/ColorPicker#ColorPicker',
      },
    },
    ...rest,
  } as TextField
}
