'use client'

import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  {label: 'Projects', href: '/'},
  {label: 'About',    href: '/about'},
]

const SOCIAL_LINKS = [
  {label: 'Instagram', href: '#'},
  {label: 'LinkedIn',  href: '#'},
  {label: 'Vimeo',     href: '#'},
]

export default function Footer() {
  return (
    <footer
      className="mt-auto px-6 pb-8 pt-10 md:px-10"
      style={{borderTop: '0.5px solid rgba(255,255,255,0.12)'}}
    >
      {/* ── Top row: wordmark + nav ──────────────────────────── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/saulmotion-wordmark-white.png"
            alt="SaulMotion"
            height={28}
            width={168}
            style={{height: 28, width: 'auto'}}
          />
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({label, href}) => (
            <Link
              key={label}
              href={href}
              className="text-[12px] tracking-wide text-white/50 transition-colors duration-150 hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-[12px] tracking-wide transition-colors duration-150 hover:opacity-80"
            style={{color: '#FF454E'}}
          >
            Contact →
          </Link>
        </nav>
      </div>

      {/* ── Separator ────────────────────────────────────────── */}
      <div
        className="my-8"
        style={{borderTop: '0.5px solid rgba(255,255,255,0.08)'}}
      />

      {/* ── Bottom row: copyright + social ───────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-[11px]"
          style={{color: 'rgba(245,245,240,0.35)'}}
        >
          © 2025 SaulMotion. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({label, href}, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && (
                <span
                  className="text-[9px]"
                  style={{color: 'rgba(245,245,240,0.2)'}}
                >
                  •
                </span>
              )}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-widest transition-colors duration-150"
                style={{color: 'rgba(245,245,240,0.45)'}}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF454E')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,240,0.45)')}
              >
                {label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
