'use client'

import { useMemo, useState } from 'react'

import type { OsagoPage } from '@/payload-types'

import { FilterBar } from './FilterBar'
import { PageBuilder } from './PageBuilder'

type InfoSectionBlock = Extract<
  NonNullable<OsagoPage['layout']>[number],
  { blockType: 'info-section' }
>

type OsagoPageViewProps = {
  layout: NonNullable<OsagoPage['layout']>
  tags: string[]
}

export function OsagoPageView({ layout, tags }: OsagoPageViewProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((current) => current !== tag) : [...prev, tag],
    )
  }

  const handleReset = () => setSelectedTags([])

  const filteredLayout = useMemo(() => {
    if (selectedTags.length === 0) {
      return layout
    }

    return layout.map((block) => {
      if (block.blockType !== 'info-section') {
        return block
      }

      const filteredLinks = block.links?.filter((link) => selectedTags.includes(link.text)) ?? []

      if (filteredLinks.length === 0) {
        return null
      }

      return {
        ...block,
        links: filteredLinks,
      } as InfoSectionBlock
    }).filter(Boolean) as NonNullable<OsagoPage['layout']>
  }, [layout, selectedTags])

  return (
    <div className="space-y-6">
      <FilterBar onReset={handleReset} onToggle={handleToggle} selected={selectedTags} tags={tags} />

      <PageBuilder layout={filteredLayout} />
    </div>
  )
}

