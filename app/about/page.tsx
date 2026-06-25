import Image from 'next/image'

export const metadata = {
  title: 'About — SaulMotion',
  description: 'Motion designer based in Bogotá, Colombia specializing in brand animation.',
}

export default function AboutPage() {
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
              <p
                className="text-[14px] leading-[1.75]"
                style={{color: 'rgba(245,245,240,0.7)'}}
              >
                A motion designer based in Bogotá, Colombia. I specialize in{' '}
                <span className="font-medium text-[#F5F5F0]">brand animation</span>: giving
                identity systems a way to move, breathe, and connect across every screen.
              </p>

              <p
                className="text-[14px] leading-[1.75]"
                style={{color: 'rgba(245,245,240,0.7)'}}
              >
                With 5 years of experience working alongside leading creative agencies, I&apos;ve
                helped brands like{' '}
                <span className="font-medium text-[#F5F5F0]">
                  Terpel, Ramo, JGB, and Caracol TV
                </span>{' '}
                bring their identities to life through animated logos, motion systems, and
                rebranding narratives. For me, the goal is always the same: identity that moves
                with purpose.
              </p>
            </div>
          </div>

          {/* ── Right: photo ─────────────────────────────────────── */}
          <div className="mx-auto w-full max-w-[320px] shrink-0 md:mx-0 md:w-[300px] lg:w-[360px]">
            <div
              className="relative w-full overflow-hidden"
              style={{aspectRatio: '1/1', borderRadius: 24, background: '#1B1B1B'}}
            >
              <Image
                src="/images/saul-photo.jpeg"
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
