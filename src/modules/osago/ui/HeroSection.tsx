import React from 'react'

interface HeroSectionProps {
  title: string
  ctaButton?: {
    text?: string
    url?: string
  }
}

export function HeroSection({ title, ctaButton }: HeroSectionProps) {
  return (
    <section className="mb-6 bg-white py-10">
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">{title}</h1>

        {ctaButton?.text && (
          <a
            className="inline-flex items-center justify-center rounded-lg bg-[#000078] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#010157]"
            href={ctaButton.url ?? '#application-form'}
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </section>
  )
}
