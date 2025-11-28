import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/modules/osago/ui/Breadcrumbs'
import { OsagoPageView } from '@/modules/osago/ui/OsagoPageView'
import { SearchBar } from '@/modules/osago/ui/SearchBar'
import { getOsagoPageData } from '@/modules/osago/server/getOsagoPageData'
import type { OsagoPage } from '@/payload-types'

type InfoSectionBlock = Extract<
  NonNullable<OsagoPage['layout']>[number],
  { blockType: 'info-section' }
>

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getOsagoPageData()

  return {
    title: pageData?.title ?? 'ОСАГО',
    description:
      'Шаблон страницы ОСАГО на Payload CMS. Настройте контент в админке и получите готовую продуктовую страницу.',
  }
}

export default async function OsagoPage() {
  const pageData = await getOsagoPageData()

  if (!pageData) {
    notFound()
  }

  const layout = pageData.layout ?? []

  const tags = Array.from(
    new Set(
      layout
        .filter((block): block is InfoSectionBlock => block.blockType === 'info-section')
        .flatMap((block) => block.links?.map((link) => link.text) ?? [])
        .filter(Boolean),
    ),
  )

  return (
    <section className="bg-[#f6f7f8]">
      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
        {/* Хлебные крошки управляются из Payload, поэтому редактируются контент-менеджером */}
        <Breadcrumbs items={pageData.breadcrumbs ?? []} />

        <SearchBar />

        <OsagoPageView layout={layout} tags={tags} />
      </div>
    </section>
  )
}
