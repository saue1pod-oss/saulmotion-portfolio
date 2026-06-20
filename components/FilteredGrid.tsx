'use client'

import {useState} from 'react'
import FilterBar from './FilterBar'
import ProjectCard from './ProjectCard'
import type {ProjectSummary, ProjectCategory} from '@/lib/types'

export default function FilteredGrid({projects}: {projects: ProjectSummary[]}) {
  const [active, setActive] = useState<ProjectCategory | 'All'>('All')

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <div className="mb-8">
        <FilterBar active={active} onChange={setActive} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-neutral-500">
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
