import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {getProjectBySlug} from '@/lib/queries'
import {urlFor} from '@/lib/sanity'

interface Props {
  params: {slug: string}
}

export default async function ProjectPage({params}: Props) {
  const project = await getProjectBySlug(params.slug)

  if (!project) notFound()

  const coverUrl = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(900).fit('crop').url()
    : null

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cover image */}
      {coverUrl && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={coverUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Back */}
        <Link
          href="/"
          className="mb-10 inline-block text-xs uppercase tracking-widest text-neutral-400 hover:text-white"
        >
          ← Back
        </Link>

        {/* Meta */}
        <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
          {project.category}
        </p>
        <h1 className="mb-6 text-4xl font-light leading-tight md:text-5xl">
          {project.title}
        </h1>

        <div className="mb-10 flex gap-8 text-sm text-neutral-400">
          {project.client && (
            <div>
              <span className="block text-xs uppercase tracking-widest">Client</span>
              <span className="text-white">{project.client}</span>
            </div>
          )}
          {project.year && (
            <div>
              <span className="block text-xs uppercase tracking-widest">Year</span>
              <span className="text-white">{project.year}</span>
            </div>
          )}
        </div>

        {project.shortDescription && (
          <p className="mb-12 text-lg leading-relaxed text-neutral-300">
            {project.shortDescription}
          </p>
        )}

        {/* Vimeo embed */}
        {project.videoUrl && (
          <div className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden">
              <iframe
                src={toVimeoEmbed(project.videoUrl)}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                title={project.title}
              />
            </div>
          </div>
        )}

        {/* Case study */}
        {project.caseStudy && project.caseStudy.length > 0 && (
          <div className="prose prose-invert prose-neutral max-w-none">
            <PortableText value={project.caseStudy} />
          </div>
        )}
      </div>
    </main>
  )
}

function toVimeoEmbed(url: string): string {
  // https://vimeo.com/123456789 → https://player.vimeo.com/video/123456789
  const match = url.match(/vimeo\.com\/(\d+)/)
  if (match) return `https://player.vimeo.com/video/${match[1]}`
  return url
}
