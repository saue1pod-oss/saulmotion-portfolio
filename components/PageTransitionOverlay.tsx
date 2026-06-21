'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname} from 'next/navigation'
import {AnimatePresence, motion} from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1] as const

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
    // Panel holds briefly at center, then exits
    const t = setTimeout(() => setVisible(false), 420)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{x: '100%'}}
          animate={{x: '0%', transition: {duration: 0.38, ease: EASE}}}
          exit={{x: '-100%', transition: {duration: 0.38, ease: EASE}}}
          className="pointer-events-none fixed inset-0 z-50 bg-[#FF454E]"
        />
      )}
    </AnimatePresence>
  )
}
