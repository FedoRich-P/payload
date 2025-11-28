'use client'

import { Button } from '@/components/ui/button'

interface FilterBarProps {
  tags: string[]
  selected: string[]
  onToggle(tag: string): void
  onReset?: () => void
}

export function FilterBar({ tags, selected, onToggle, onReset }: FilterBarProps) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selected.includes(tag)

        return (
          <Button
            key={tag}
            aria-pressed={isSelected}
            onClick={() => onToggle(tag)}
            variant={isSelected ? 'default' : 'outline'}
          >
            {tag}
          </Button>
        )
      })}

      {selected.length > 0 && (
        <Button onClick={onReset} variant="ghost">
          Сбросить
        </Button>
      )}
    </div>
  )
}
