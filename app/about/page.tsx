import Image from 'next/image'
import type {Metadata} from 'next'
import {PortableText} from '@portabletext/react'
import {getAboutData} from '@/lib/queries'
import {urlFor} from '@/lib/sanity'
import type {PortableTextBlock} from '@/lib/types'

export const metadata: Metadata = {
  title: 'About — SaulMotion',
  description:
    "Hey, I'm Saúl — a motion designer based in Bogotá, Colombia, specialized in brand animation and identity systems.",
}

const portableTextComponents = {
  marks: {
    highlight: ({children}: {children: React.ReactNode}) => (
      <span className="font-medium text-[#F5F5F0]">{children}</span>
    ),
  },
}

// Fallback paragraphs shown when no CMS document exists yet
const fallbackP1: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'p1',
    children: [
      {_type: 'span', _key: 's1', text: 'A motion designer based in Bogotá, Colombia. I specialize in ', marks: []},
      {_type: 'span', _key: 's2', text: 'brand animation', marks: ['highlight']},
      {_type: 'span', _key: 's3', text: ': giving identity systems a way to move, breathe, and connect across every screen.', marks: []},
    ],
    markDefs: [],
    style: 'normal',
  },
]

const fallbackP2: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'p2',
    children: [
      {_type: 'span', _key: 's1', text: "With 5 years of experience working alongside leading creative agencies, I've helped brands like ", marks: []},
      {_type: 'span', _key: 's2', text: 'Terpel, Ramo, JGB, and Caracol TV', marks: ['highlight']},
      {_type: 'span', _key: 's3', text: ' bring their identities to life through animated logos, motion systems, and rebranding narratives. For me, the goal is always the same: identity that moves with purpose.', marks: []},
    ],
    markDefs: [],
    style: 'normal',
  },
]

export default async function AboutPage() {
  const about = await getAboutData()

  const photoSrc = about?.photo
    ? urlFor(about.photo).width(800).height(800).fit('crop').url()
    : '/images/saul-photo.jpeg'

  const paragraph1 = about?.paragraph1 ?? fallbackP1
  const paragraph2 = about?.paragraph2 ?? fallbackP2

  return (
    <main>
      <div
        className="mx-auto max-w-screen-xl px-7 pb-32 pt-14 md:px-10"
        style={{paddingTop: 56, paddingBottom: 96}}
      >
        <div
          className="flex flex-col-reverse gap-14 md:flex-row md:items-center"
          style={{gap: undefined}}
        >
          {/* ── Left: text ───────────────────────────────────────── */}
          <div className="flex flex-col md:max-w-[520px]" style={{gap: 24}}>
            {/* Eyebrow */}
            <p
              className="text-[11px] font-medium uppercase"
              style={{letterSpacing: '0.2em', color: '#FF454E'}}
            >
              About
            </p>

            {/* Headline */}
            <h1
              className="font-serif italic leading-[1.08]"
              style={{fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '-0.02em'}}
            >
              Hey, I&apos;m Saúl
            </h1>

            {/* Body */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              <div
                className="text-[14px] leading-[1.75]"
                style={{color: 'rgba(245,245,240,0.7)'}}
              >
                <PortableText value={paragraph1} components={portableTextComponents} />
              </div>

              <div
                className="text-[14px] leading-[1.75]"
                style={{color: 'rgba(245,245,240,0.7)'}}
              >
                <PortableText value={paragraph2} components={portableTextComponents} />
              </div>
            </div>
          </div>

          {/* ── Right: photo ─────────────────────────────────────── */}
          <div className="mx-auto w-full max-w-[320px] shrink-0 md:mx-0 md:w-[300px] lg:w-[360px]">
            <div
              className="relative w-full overflow-hidden"
              style={{aspectRatio: '1/1', borderRadius: 24, background: '#1B1B1B'}}
            >
              <Image
                src={photoSrc}
                alt="Saúl Hernández"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
