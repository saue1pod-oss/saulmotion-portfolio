'use client'

import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const NAV_LINKS = [
  {label: 'Projects', href: '/'},
  {label: 'About',    href: '/about'},
  {label: 'Contact',  href: '/contact'},
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/images/saulmotion-wordmark-white.png"
          alt="SaulMotion"
          height={28}
          width={168}
          style={{height: 28, width: 'auto'}}
          priority
        />
      </Link>

      <div className="flex items-center gap-6">
        {NAV_LINKS.map(({label, href}) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={label}
              href={href}
              className="text-[12px] tracking-wide transition-colors duration-150"
              style={{color: isActive ? 'rgba(245,245,240,1)' : 'rgba(245,245,240,0.55)'}}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
