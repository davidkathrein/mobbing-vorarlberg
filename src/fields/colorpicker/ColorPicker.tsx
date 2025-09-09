'use client'

import { useField, useLocale, TextInput } from '@payloadcms/ui'

import './styles.css'

export const ColorPicker = ({
  field,
  path,
}: {
  field: { label: string; required?: boolean; admin?: { description?: string } }
  path: string
}) => {
  const { label, required = false, admin } = field
  const { value, setValue } = useField<string>({ path })
  const locale = useLocale()

  return (
    <div className={'color-picker'}>
      <label className={'field-label'}>
        {typeof label === 'string' ? label : label[locale.code]}{' '}
        {required && <span className="required">*</span>}
      </label>
      {typeof admin?.description === 'string' && (
        <div className="field-description">{admin.description}</div>
      )}
      {typeof admin?.description === 'object' && (
        <div className="field-description">{admin.description[locale.code]}</div>
      )}

      <div className={'color-picker-row'}>
        <input type="color" value={value ?? '#000000'} onChange={(e) => setValue(e.target.value)} />
        <TextInput
          label=""
          path={path}
          onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
          value={value}
        />
      </div>
    </div>
  )
}

export default ColorPicker
