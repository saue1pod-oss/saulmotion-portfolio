import {notFound} from 'next/navigation'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {getProjectBySlug} from '@/lib/queries'
import {toVimeoEmbed, toVimeoId} from '@/lib/utils'
import VideoThumbnail from '@/components/VideoThumbnail'

interface Props {
  params: {slug: string}
}

const sectionLabel = 'text-[11px] uppercase tracking-[0.18em] text-white/40 font-medium'

export default async function ProjectPage({params}: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  const metadata: {label: string; value: string}[] = [
    ...(project.client        ? [{label: 'Client',  value: project.client}]        : []),
    ...(project.year          ? [{label: 'Year',    value: String(project.year)}]   : []),
    ...(project.collaborators ? [{label: 'Studio',  value: project.collaborators}]  : []),
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      {/* ── Back ──────────────────────────────────────────────── */}
      <div className="flex justify-end px-6 py-3 md:px-10">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/70"
        >
          ← Back
        </Link>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 pb-32 md:px-10">

        {/* ── 1. Text + Metadata ────────────────────────────────── */}
        <section className="mb-14 max-w-[620px] pt-6">
          {/* Eyebrow */}
          {project.category && (
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{color: '#FF454E'}}
            >
              {project.category}
            </p>
          )}

          {/* Title */}
          <h1
            className="mb-5 font-serif text-[36px] italic leading-[1.08] tracking-[-0.02em] md:text-[42px]"
          >
            {project.title}
          </h1>

          {/* Short description */}
          {project.shortDescription && (
            <p className="mb-8 text-[14px] leading-[1.65] text-white/70">
              {project.shortDescription}
            </p>
          )}

          {/* Metadata */}
          {metadata.length > 0 && (
            <dl className="border-t border-white/[0.10] pt-5 space-y-2.5">
              {metadata.map(({label, value}) => (
                <div key={label} className="flex gap-6 text-[13px]">
                  <dt className="w-16 shrink-0 text-white/40">{label}</dt>
                  <dd className="text-white/80">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* ── 2. Main video ─────────────────────────────────────── */}
        {project.mainVideo && (
          <section className="mb-20">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <iframe
                src={toVimeoEmbed(project.mainVideo)}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                title={project.title}
              />
            </div>
          </section>
        )}

        {/* ── 3. Additional footage ─────────────────────────────── */}
        {project.additionalVideos && project.additionalVideos.length > 0 && (
          <section className="mb-20">
            <p className={`${sectionLabel} mb-5`}>Additional Footage</p>
            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
              {project.additionalVideos.map((v) => {
                const vid = toVimeoId(v.videoUrl)
                return (
                  <div key={v._key}>
                    <VideoThumbnail
                      videoId={vid}
                      title={v.caption ?? project.title}
                      autoplay
                      className="aspect-video"
                    />
                    {v.caption && (
                      <p className="mt-2 text-[11px] text-white/40">{v.caption}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── 4. Case study ─────────────────────────────────────── */}
        {project.caseStudy && project.caseStudy.length > 0 && (
          <section className="max-w-[620px]">
            <p className={`${sectionLabel} mb-6`}>Case Study</p>
            <div className="space-y-5 text-[13px] leading-[1.75] text-white/70">
              <PortableText value={project.caseStudy} />
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
