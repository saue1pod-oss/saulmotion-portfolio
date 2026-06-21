'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScrollProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))})

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  // Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'})
  }, [pathname])

  return null
}
