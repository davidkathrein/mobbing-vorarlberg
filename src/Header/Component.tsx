import { HeaderClient } from './Component.client'
import { getGlobal } from '@/utilities/getGlobals'
import type { Config } from '@/payload-types'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header({ locale }: { locale: Config['locale'] }) {
  const headerData: Header = await getGlobal('header', 1, locale)

  return <HeaderClient data={headerData} locale={locale} />
}
