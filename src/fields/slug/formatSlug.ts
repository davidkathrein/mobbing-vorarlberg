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
  ({ data, originalDoc, operation, value }) => {
    console.log('formatSlugHook called with value:', data)
    const title = typeof data?.[fallback] === 'string' ? (data?.[fallback] as string) : undefined
    const prevSlug = (originalDoc as any)?.slug as string | undefined
    const prevTitle = (originalDoc as any)?.[fallback] as string | undefined
    const status = (data as any)?._status as string | undefined
    const isUnpublished = status !== 'published'
    const slugLock = (data as any)?.slugLock ?? (originalDoc as any)?.slugLock

    // 1) If user entered a non-empty, non-UUID value -> normalize and keep it
    if (
      slugLock !== true &&
      typeof value === 'string' &&
      value.trim().length > 0 &&
      !isUUID(value)
    ) {
      return formatSlug(value)
    }

    // 2) If slug is missing/empty or is a UUID, and we have a title, derive from title
    const incomingEmpty = !value || (typeof value === 'string' && value.trim().length === 0)
    const looksLikeUUID = typeof value === 'string' && isUUID(value)
    if ((incomingEmpty || looksLikeUUID || !prevSlug || isUUID(prevSlug)) && title) {
      return formatSlug(title)
    }

    // 2b) If title changed and doc is not published yet, sync slug to new title
    const titleChanged =
      typeof title === 'string' &&
      typeof prevTitle === 'string' &&
      formatSlug(title) !== formatSlug(prevTitle || '')
    if (operation === 'update' && isUnpublished && titleChanged && title) {
      return formatSlug(title)
    }

    // 3) On create, no title yet -> generate a uuid-based slug to avoid empty
    if (operation === 'create') {
      return uuidv4()
    }

    // 4) Otherwise, let Payload keep the current value
    return value
  }
