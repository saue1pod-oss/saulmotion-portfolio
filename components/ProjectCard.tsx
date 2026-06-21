'use client'

import Link from 'next/link'
import {urlFor} from '@/lib/sanity'
import {toVimeoId} from '@/lib/utils'
import VideoThumbnail from './VideoThumbnail'
import type {ProjectSummary} from '@/lib/types'

export default function ProjectCard({project}: {project: ProjectSummary}) {
  const coverImageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(450).fit('crop').url()
    : null

  const videoId = project.mainVideo ? toVimeoId(project.mainVideo) : null

  return (
    <Link
      href={`/proyecto/${project.slug.current}`}
      className="group block overflow-hidden bg-neutral-900"
    >
      <VideoThumbnail
        videoId={videoId}
        title={project.title}
        coverImageUrl={coverImageUrl}
        className="aspect-video"
      />

      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-widest text-neutral-400">
          {project.category}
        </p>
        <h2 className="text-sm font-medium text-white">{project.title}</h2>
      </div>
    </Link>
  )
}
