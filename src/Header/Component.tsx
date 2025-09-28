import { HeaderClient } from './Component.client'
import { getGlobal } from '@/utilities/getGlobals'
import type { Config } from '@/payload-types'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header, Category } from '@/payload-types'

export async function Header({ locale }: { locale: Config['locale'] }) {
  const headerData = (await getGlobal('header', 1, locale)) as Header

  // Fetch categories for navigation
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    locale,
    limit: 100,
    select: {
      id: true,
      slug: true,
      title: true,
    },
  })

  return (
    <>
      <HeaderClient data={headerData} categories={categories.docs} locale={locale} />
    </>
  )
}
