import { cache } from 'react'
import { draftMode } from 'next/headers'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { getPayloadApp } from '@/shared/server/getPayloadApp'

export type PageDocument = RequiredDataFromCollectionSlug<'pages'>

export const getPageBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadApp()

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as PageDocument | undefined) ?? null
})

export async function getAllPageSlugs() {
  const payload = await getPayloadApp()

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return pages.docs.map(({ slug }) => slug).filter((slug): slug is string => Boolean(slug && slug !== 'home'))
}

