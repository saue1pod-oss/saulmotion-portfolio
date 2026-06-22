'use client'

import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import Player from '@vimeo/player'

interface Props {
  videoId?: string | null
  title: string
  coverImageUrl?: string | null
  featured?: boolean
  /** Extra classes for the outer wrapper (aspect ratio, etc.) */
  className?: string
}

/**
 * Reusable hover-video thumbnail.
 * Lazy-mounts the Vimeo iframe via IntersectionObserver, initialises the
 * SDK only after the iframe is in the DOM, and plays/pauses on hover.
 * Used by both ProjectCard (home grid) and the footage grid on project pages.
 */
export default function VideoThumbnail({videoId, title, coverImageUrl, featured, className = ''}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const playerRef    = useRef<Player | null>(null)

  const [isMounted,  setIsMounted]  = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isHovered,  setIsHovered]  = useState(false)

  // Level 1: mount iframe only when container enters viewport (skip if no video)
  useEffect(() => {
    if (!videoId || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsMounted(true); observer.disconnect() } },
      {threshold: 0.1},
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Level 2: initialise SDK after iframe is in DOM
  useEffect(() => {
    if (!isMounted || !iframeRef.current) return
    const player = new Player(iframeRef.current)
    playerRef.current = player
    player.ready().then(() => {
      player.pause().catch(() => null)
      setVideoReady(true)
    })
    return () => { player.destroy(); playerRef.current = null }
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
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={featured ? {boxShadow: '0 0 0 1px rgba(255,69,78,0.5)'} : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cover image */}
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}

      {/* Vimeo iframe — lazy mounted */}
      {isMounted && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?background=1&muted=1&loop=1&autoplay=0`}
          allow="autoplay"
          title={title}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
          style={{pointerEvents: 'none'}}
        />
      )}
    </div>
  )
}
