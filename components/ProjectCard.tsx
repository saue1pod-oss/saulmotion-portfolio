'use client'

import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Player from '@vimeo/player'
import {urlFor} from '@/lib/sanity'
import {toVimeoId} from '@/lib/utils'
import type {ProjectSummary} from '@/lib/types'

export default function ProjectCard({project}: {project: ProjectSummary}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<Player | null>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(450).fit('crop').url()
    : null

  const videoId = project.mainVideo ? toVimeoId(project.mainVideo) : null

  // Level 1: mount iframe only when card enters viewport
  useEffect(() => {
    if (!videoId || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true)
          observer.disconnect()
        }
      },
      {threshold: 0.1},
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [videoId])

  // Level 2: initialize SDK only after iframe is in the DOM
  useEffect(() => {
    if (!isMounted || !iframeRef.current) return
    const player = new Player(iframeRef.current)
    playerRef.current = player
    player.ready().then(() => {
      // background=1 auto-plays; pause immediately and wait for hover
      player.pause().catch(() => null)
      setVideoReady(true)
    })
    return () => {
      player.destroy()
      playerRef.current = null
    }
  }, [isMounted])

  function handleMouseEnter() {
    if (!playerRef.current || !videoReady) return
    setIsHovered(true)
    playerRef.current.play().catch(() => null)
  }

  function handleMouseLeave() {
    if (!playerRef.current) return
    setIsHovered(false)
    playerRef.current.pause().catch(() => null)
    playerRef.current.setCurrentTime(0).catch(() => null)
  }

  const showVideo = isHovered && videoReady

  return (
    <Link
      href={`/proyecto/${project.slug.current}`}
      className="group block overflow-hidden bg-neutral-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden"
        style={project.featured ? {boxShadow: '0 0 0 1px rgba(255,69,78,0.5)'} : undefined}
      >
        {/* Cover image — fades out when video is active */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}

        {/* Vimeo iframe — lazy mounted, fades in on hover */}
        {isMounted && videoId && (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${videoId}?background=1&muted=1&loop=1&autoplay=0`}
            allow="autoplay"
            title={project.title}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out ${
              showVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{pointerEvents: 'none'}}
          />
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-widest text-neutral-400">
          {project.category}
        </p>
        <h2 className="font-serif text-sm italic text-white">{project.title}</h2>
      </div>
    </Link>
  )
}
