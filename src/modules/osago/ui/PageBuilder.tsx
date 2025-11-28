'use client'

import type { OsagoPage } from '@/payload-types'
import { ApplicationForm } from './ApplicationForm'
import { FaqCards } from './FaqCards'
import { FeedbackSection } from './FeedbackSection'
import { HeroSection } from './HeroSection'
import { InfoSection } from './InfoSection'

type LayoutBlock = NonNullable<OsagoPage['layout']>[number]

function BlockRenderer({ block }: { block: LayoutBlock }) {
  switch (block.blockType) {
    case 'hero-section':
      return (
        <HeroSection
          ctaButton={block.ctaButton}
          title={block.title}
        />
      )

    case 'faq-cards':
      return <FaqCards cards={block.cards ?? []} />

    case 'info-section':
      return (
        <InfoSection
          links={block.links ?? []}
          showMoreLink={block.showMoreLink ?? undefined}
          title={block.title}
        />
      )

    case 'application-form':
      return <ApplicationForm {...block} />

    default:
      return null
  }
}

interface PageBuilderProps {
  layout: NonNullable<OsagoPage['layout']>
}

export function PageBuilder({ layout }: PageBuilderProps) {
  if (layout.length === 0) {
    return null
  }

  return (
    <>
      {layout.map((block, index) => (
        <BlockRenderer key={block.id ?? `${block.blockType}-${index}`} block={block} />
      ))}

      {/* Поведенческий блок выводим в конце страницы вне CMS */}
      <FeedbackSection />
    </>
  )
}
