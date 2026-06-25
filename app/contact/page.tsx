import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact — SaulMotion',
  description: 'Get in touch with Saúl — motion designer based in Bogotá.',
}

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div
        className="mx-auto max-w-screen-xl px-7 md:px-10"
        style={{paddingTop: 56, paddingBottom: 96}}
      >
        <div className="flex flex-col gap-14 md:flex-row md:gap-16">

          {/* ── Left: info ───────────────────────────────────────── */}
          <div className="flex flex-col md:max-w-[400px]" style={{gap: 24}}>
            {/* Eyebrow */}
            <p
              className="text-[11px] font-medium uppercase"
              style={{letterSpacing: '0.2em', color: '#FF454E'}}
            >
              Contact
            </p>

            {/* Headline */}
            <h1
              className="font-serif italic leading-[1.08]"
              style={{fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '-0.02em'}}
            >
              Let&apos;s work together.
            </h1>

            {/* Description */}
            <p
              className="text-[14px] leading-[1.75]"
              style={{color: 'rgba(245,245,240,0.6)'}}
            >
              Have a project in mind? I&apos;d love to hear about it. Send me a message and
              I&apos;ll get back to you as soon as possible.
            </p>

            {/* Email */}
            <div
              style={{
                borderTop: '0.5px solid rgba(255,255,255,0.1)',
                paddingTop: 16,
              }}
            >
              <a
                href="mailto:hello@saulmotion.com"
                className="text-[13px] transition-opacity hover:opacity-70"
                style={{color: '#FF454E'}}
              >
                saue1pod@gmail.com
              </a>
            </div>
          </div>

          {/* ── Right: form ──────────────────────────────────────── */}
          <div className="flex-1">
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  )
}
