import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { OsagoPage } from '@/payload-types'
import { Breadcrumbs } from '@/modules/osago/ui/Breadcrumbs'
import { SearchBar } from '@/modules/osago/ui/SearchBar'
import { getOsagoPageData } from '@/modules/osago/server/getOsagoPageData'
import { InfoSection } from '@/modules/osago/ui/InfoSection'
import { ApplicationForm } from '@/modules/osago/ui/ApplicationForm'

type InfoSectionBlock = Extract<
  NonNullable<OsagoPage['layout']>[number],
  { blockType: 'info-section' }
>

type ApplicationFormBlock = Extract<
  NonNullable<OsagoPage['layout']>[number],
  { blockType: 'application-form' }
>

type ArticleEntry = {
  slug: string
  link: NonNullable<InfoSectionBlock['links']>[number]
  block: InfoSectionBlock
}

const ARTICLE_DESCRIPTIONS: Record<string, string> = {
  why: 'Разбираемся, зачем нужен полис ОСАГО, какие риски он покрывает и почему без него нельзя выезжать на дорогу.',
  cost: 'Говорим про тарифы, периоды действия полиса и то, от чего зависит итоговая стоимость страхования.',
  params: 'Поясняем ключевые параметры договора ОСАГО и какие данные понадобятся для оформления.',
  'bonus-malus': 'Объясняем коэффициент бонус-малус (КБМ), как он влияет на цену полиса и как его проверить.',
  'how-to-buy': 'Пошагово показываем, как оформить ОСАГО онлайн в экосистеме Согаза и какие данные подготовить.',
  payment: 'Рассказываем про доступные способы оплаты полиса и что делать, если платёж не прошёл.',
  delivery: 'Гид по получению электронного и бумажного полиса, а также проверке его подлинности.',
  'update-policy': 'Инструкция, как корректировать данные в действующем полисе и какие документы потребуются.',
  renew: 'Подготовка к продлению ОСАГО: сроки, скидки и на что обратить внимание при повторном оформлении.',
}

const getSlugFromHref = (href?: string | null) => {
  if (!href) return null
  const cleaned = href.replace(/^\/+/, '')
  if (!cleaned.startsWith('osago')) return null
  return cleaned.replace(/^osago\/?/, '').split('/').filter(Boolean)[0] ?? null
}

const buildArticleIndex = (layout?: OsagoPage['layout']) => {
  if (!layout) return []

  return layout
    .filter((block): block is InfoSectionBlock => block.blockType === 'info-section')
    .flatMap((block) => {
      return (block.links ?? [])
        .map((link) => {
          const slug = getSlugFromHref(link.href)
          if (!slug) return null

          return {
            slug,
            link,
            block,
          } as ArticleEntry
        })
        .filter(Boolean) as ArticleEntry[]
    })
}

const getArticleBySlug = (layout: OsagoPage['layout'], slug: string) => {
  const articles = buildArticleIndex(layout)
  return articles.find((article) => article.slug === slug) ?? null
}

const getApplicationFormBlock = (layout?: OsagoPage['layout']) => {
  return layout?.find(
    (block): block is ApplicationFormBlock => block.blockType === 'application-form',
  )
}

export async function generateStaticParams() {
  const pageData = await getOsagoPageData()
  if (!pageData?.layout) {
    return []
  }

  return buildArticleIndex(pageData.layout).map(({ slug }) => ({ slug }))
}

type PageParams = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const pageData = await getOsagoPageData()
  if (!pageData?.layout) {
    return { title: 'ОСАГО — материалы' }
  }

  const article = getArticleBySlug(pageData.layout, slug)
  const description = article ? ARTICLE_DESCRIPTIONS[slug] : undefined

  return {
    title: article ? `${article.link.text} — ОСАГО` : 'ОСАГО — материалы',
    description,
  }
}

export default async function OsagoArticlePage({ params }: PageParams) {
  const { slug } = await params
  const pageData = await getOsagoPageData()

  if (!pageData?.layout) {
    notFound()
  }

  const article = getArticleBySlug(pageData.layout, slug)

  if (!article) {
    notFound()
  }

  const applicationFormBlock = getApplicationFormBlock(pageData.layout)
  const breadcrumbItems = [
    ...(pageData.breadcrumbs ?? []),
    { label: article.link.text, href: article.link.href ?? `/osago/${slug}` },
  ]

  return (
    <section className="bg-[#f6f7f8]">
      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <SearchBar />

        <article className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <p className="text-sm text-[#000078] font-semibold uppercase tracking-wide">Материал ОСАГО</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{article.link.text}</h1>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {ARTICLE_DESCRIPTIONS[slug] ??
              'Мы подготовили материалы, которые помогут разобраться в тонкостях ОСАГО и быстрее оформить полис.'}
          </p>

          <InfoSection
            links={article.block.links ?? []}
            showMoreLink={article.block.showMoreLink ?? undefined}
            title={article.block.title}
          />
        </article>

        {applicationFormBlock && <ApplicationForm {...applicationFormBlock} />}
      </div>
    </section>
  )
}

