'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'

// Timing (total ~1580ms):
//   0ms    panel fades in                  (200ms)
//   80ms   monogram scale+fade in          (250ms, delay 80ms)
//   200ms  onAnimationComplete → router.push fires here (panel fully opaque)
//   200ms  hold begins (new page mounts invisibly behind panel)
//  1300ms  setIsVisible(false) → exit starts  (HOLD_MS = 1100ms after cover)
//  1300ms  panel + monogram fade out       (280ms)
//  1580ms  fully clear, new page revealed
const COVER_MS = 200   // panel fade-in duration
const HOLD_MS  = 1100  // pause after fully covered, before exit
const EXIT_MS  = 280   // panel fade-out duration

const panelVariants = {
  hidden:  {opacity: 0, transition: {duration: EXIT_MS  / 1000, ease: 'easeIn'  as const}},
  visible: {opacity: 1, transition: {duration: COVER_MS / 1000, ease: 'easeOut' as const}},
}
const logoVariants = {
  hidden:  {opacity: 0, scale: 0.85},
  visible: {opacity: 1, scale: 1,   transition: {duration: 0.25, ease: [0.33, 1, 0.68, 1] as const, delay: 0.08}},
  exit:    {opacity: 0, scale: 1.1, transition: {duration: EXIT_MS / 1000, ease: 'easeIn' as const}},
}

export default function PageTransitionOverlay() {
  const router   = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const pendingHref   = useRef<string | null>(null)
  const isActive      = useRef(false)   // ref-based guard — immune to render batching
  const isCoveringRef = useRef(false)   // true while panel is animating in

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Let browser handle modifier-key clicks (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

      const anchor = (e.target as Element).closest('a[href]')
      if (!anchor) return
      const href = (anchor as HTMLAnchorElement).getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      if (href === pathname) return  // same page, nothing to do
      if (isActive.current) return   // already transitioning

      e.preventDefault()
      pendingHref.current  = href
      isActive.current     = true
      isCoveringRef.current = true
      setIsVisible(true)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  // Fires when the panel's `animate` state ("visible") completes.
  // This is the earliest moment the screen is fully covered — safe to navigate.
  function onPanelAnimationComplete(definition: string | object) {
    if (definition !== 'visible' || !isCoveringRef.current) return
    isCoveringRef.current = false

    if (pendingHref.current) router.push(pendingHref.current)

    // Start the hold timer; at the end, trigger AnimatePresence exit
    setTimeout(() => setIsVisible(false), HOLD_MS)
  }

  // Fires after the exit animation fully completes (AnimatePresence callback)
  function onExitComplete() {
    pendingHref.current = null
    isActive.current    = false
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="logo-wipe"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onAnimationComplete={onPanelAnimationComplete}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Image
              src="/images/saulmotion-monogram-white.png"
              alt="SaulMotion"
              width={80}
              height={80}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
