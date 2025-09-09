import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Config } from '@/payload-types'

export const Message: React.FC<
  {
    message: SerializedEditorState
  } & { locale: Config['locale'] }
> = ({ message, locale }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} lang={locale} />}
    </Width>
  )
}
