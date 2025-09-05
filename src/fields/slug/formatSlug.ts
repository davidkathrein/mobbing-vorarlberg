import type { FieldHook } from 'payload'
import { v4 as uuidv4 } from 'uuid'
import isUUID from '@/utilities/isUUIDV4'

export const formatSlug = (val: string): string | undefined =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    console.log('value to format: ', value)
    if (typeof value === 'string' && !isUUID(value)) {
      return formatSlug(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      console.log('fallbackdata: ', fallbackData)
      if (typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    // dont allow empty slugs. Instead generate a new uuid
    return uuidv4()
  }
