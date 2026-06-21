'use client'

import {useEffect, useLayoutEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import Lottie from 'lottie-react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const STORAGE_KEY = 'sm_loading_seen'
const LOTTIE_PATH = '/lottie/saulmotion-logo.json'

export default function LoadingScreen() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)
  const [animData, setAnimData] = useState<object | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (pathname !== '/' || sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(false)
      return
    }
    sessionStorage.setItem(STORAGE_KEY, '1')
    fetch(LOTTIE_PATH)
      .then((r) => r.json())
      .then((data) => setAnimData(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleComplete() {
    setFadingOut(true)
    setTimeout(() => setVisible(false), 450)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {animData && (
        <div className="w-full max-w-sm px-8 sm:max-w-md md:max-w-lg">
          <Lottie
            animationData={animData}
            loop={false}
            autoplay
            renderer={"canvas" as "svg"}
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  )
}
