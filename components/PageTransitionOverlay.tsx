'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname} from 'next/navigation'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'

// Timing breakdown (total ~710ms):
//   0ms   panel fades in              (200ms)
//   80ms  monogram scale+fade in      (250ms, overlaps panel entry)
//   430ms setVisible(false) fires → AnimatePresence exit starts
//   430ms monogram + panel fade out   (280ms simultaneous)
//   710ms fully clear
const PANEL_ENTER   = {duration: 0.2,  ease: 'easeOut'} as const
const PANEL_EXIT    = {duration: 0.28, ease: 'easeIn'}  as const
const LOGO_ENTER    = {duration: 0.25, ease: [0.33, 1, 0.68, 1]} as const
const LOGO_EXIT     = {duration: 0.28, ease: 'easeIn'}  as const
const HOLD_MS       = 1430 // how long the overlay stays before AnimatePresence exit

export default function PageTransitionOverlay() {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    setKey((k) => k + 1)
    setVisible(true)
    const t = setTimeout(() => setVisible(false), HOLD_MS)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: PANEL_ENTER}}
          exit={{opacity: 0, transition: PANEL_EXIT}}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.85}}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {...LOGO_ENTER, delay: 0.08},
            }}
            exit={{opacity: 0, scale: 1.1, transition: LOGO_EXIT}}
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
