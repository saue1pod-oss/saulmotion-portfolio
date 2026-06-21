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

const BRAND = '#FF454E'
const BRAND_BG = 'rgba(255,69,78,0.08)'

export default function FilterBar({active, onChange}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-150"
            style={
              isActive
                ? {border: `1px solid ${BRAND}`, color: BRAND, background: BRAND_BG}
                : {border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)', background: 'transparent'}
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                const el = e.currentTarget
                el.style.borderColor = BRAND
                el.style.color = BRAND
                el.style.background = BRAND_BG
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,0.2)'
                el.style.color = 'rgba(255,255,255,0.4)'
                el.style.background = 'transparent'
              }
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
