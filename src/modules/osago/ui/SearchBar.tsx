import React from 'react'
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="mb-8">
      <label className="sr-only" htmlFor="osago-search">
        Поиск по материалам
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input
          aria-label="Поиск по материалам"
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#ffdd2d]"
          id="osago-search"
          placeholder="Поиск по базе знаний"
          type="search"
        />
      </div>
    </div>
  )
}
