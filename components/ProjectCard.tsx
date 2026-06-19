'use client'

import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/lib/sanity'
import type {ProjectSummary} from '@/lib/types'

export default function ProjectCard({project}: {project: ProjectSummary}) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(600).fit('crop').url()
    : null

  return (
    <Link
      href={`/proyecto/${project.slug.current}`}
      className="group block overflow-hidden bg-neutral-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-widest text-neutral-400">
          {project.category}
        </p>
        <h2 className="text-sm font-medium text-white">{project.title}</h2>
      </div>
    </Link>
  )
}
