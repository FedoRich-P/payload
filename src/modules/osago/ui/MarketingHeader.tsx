import React from 'react'
import { User } from 'lucide-react'

export function MarketingHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <div className="flex h-10 w-[70px] items-center justify-center rounded-lg bg-[#000078] text-white">
            СОГАЗ
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-900">
            <a className="transition-colors hover:text-gray-600" href="#">
              Частным лицам
            </a>
            <a className="transition-colors hover:text-gray-600" href="#">
              Бизнесу
            </a>
            <a className="transition-colors hover:text-gray-600" href="#">
              Премиум
            </a>
            <a className="transition-colors hover:text-gray-600" href="#">
              Еще
            </a>
          </nav>
        </div>
        <a className="flex items-center gap-2 text-[#000078] transition-colors hover:text-[#006ba3]" href="#">
          Личный кабинет
          <User className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}
