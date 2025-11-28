'use client'

import React from 'react'

interface Link {
  text: string
  href: string
}

interface InfoSectionProps {
  title: string
  links: Link[]
  showMoreLink?: string
}

export function InfoSection({ title, links, showMoreLink = 'Подробнее' }: InfoSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-8 mb-6 border-2 border-[#000078]">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-gray-900 mb-6 text-2xl font-bold">{title}</h2>
          <ul className="space-y-4 mb-6">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-700 border-b-2 border-gray-300 hover:text-[#0088cc] transition-colors text-lg"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="text-[#000078] border-b-2 border-transparent hover:border-[#000078] transition-border inline-block font-medium"
          >
            {showMoreLink}
          </a>
        </div>
      </div>
    </section>
  )
}
