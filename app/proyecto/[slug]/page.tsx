import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {getProjectBySlug} from '@/lib/queries'
import {urlFor} from '@/lib/sanity'
import {toVimeoEmbed} from '@/lib/utils'
import Nav from '@/components/Nav'

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
      <Nav />

      <div className="mx-auto max-w-3xl px-6 py-10">
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

        {/* Main video */}
        {project.mainVideo && (
          <div className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden">
              <iframe
                src={toVimeoEmbed(project.mainVideo)}
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

        {/* Additional videos */}
        {project.additionalVideos && project.additionalVideos.length > 0 && (
          <div className="mt-16 space-y-10">
            {project.additionalVideos.map((v) => (
              <div key={v._key}>
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe
                    src={toVimeoEmbed(v.videoUrl)}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    title={v.caption ?? project.title}
                  />
                </div>
                {v.caption && (
                  <p className="mt-3 text-sm text-neutral-400">{v.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

