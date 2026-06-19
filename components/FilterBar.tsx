'use client'

import type {ProjectCategory} from '@/lib/types'

const CATEGORIES: Array<ProjectCategory | 'All'> = [
  'All',
  'Showreel',
  'Logo animation',
  'Brand identity',
]

interface FilterBarProps {
  active: ProjectCategory | 'All'
  onChange: (category: ProjectCategory | 'All') => void
}

export default function FilterBar({active, onChange}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-colors duration-200 ${
            active === cat
              ? 'bg-white text-black'
              : 'border border-neutral-600 text-neutral-400 hover:border-white hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
